import { diffChars } from 'diff';

type Position = {
	line: number;
	span: number;
	char: number;
};

function checkPosition(position: Position, lines: Element[]): Position {
	const { line, span, char } = position;
	const lineElement = lines[line];
	const spanElement = lineElement.children[span] ?? lineElement;
	const text = spanElement.textContent ?? '';

	const nextPosition = { line, span, char };

	if (char >= text.length) {
		nextPosition.char = 0;
		nextPosition.span = span + 1;
	}

	if (nextPosition.span >= lineElement.children.length) {
		nextPosition.char = 0;
		nextPosition.span = 0;
		nextPosition.line = line + 1;
	}

	return nextPosition;
}

function nextPosition(position: Position, lines: Element[]): Position {
	const { line, span, char } = position;
	const lineElement = lines[line];
	const spanElement = lineElement.children[span] ?? lineElement;
	const text = spanElement.textContent ?? '';

	const nextPosition = { line, span, char: char + 1 };

	if (char + 1 >= text.length) {
		nextPosition.char = 0;
		nextPosition.span = span + 1;

		if (nextPosition.span >= lineElement.children.length) {
			nextPosition.span = 0;
			nextPosition.line = line + 1;
		}
	}

	return nextPosition;
}

function isAtEndOfText(position: Position, lines: Element[]): boolean {
	return position.line >= lines.length - 1 && isAtEndOfLine(position, lines);
}

function isAtEndOfLine(position: Position, lines: Element[]): boolean {
	const line = lines[position.line];
	return position.span >= line.children.length - 1 && isAtEndOfSpan(position, lines);
}

function isAtEndOfSpan(position: Position, lines: Element[]): boolean {
	const line = lines[position.line];
	const span = line.children[position.span] ?? line;
	return position.char >= (span.textContent ?? '').length - 1;
}

function getCurrentSpan(position: Position, lines: Element[]): HTMLElement {
	const line = lines[position.line];

	return (line.children[position.span] as HTMLElement) ?? line;
}

/**
 * Temporary updates the highlight overlay to reflect the changes between two text strings,
 * waiting for the actual update to be applied. This way, the user can immediately see the changes,
 * without a delay of around ~100ms. This makes the UI feel more responsive.
 * @param from Previous text.
 * @param to Current text.
 * @param currentHTML Current HTML content of the overlay.
 */
export function speculativeHighlightUpdate(from: string, to: string, currentHTML: string): string {
	const diff = diffChars(from.replaceAll('\r\n', '\n'), to.replaceAll('\r\n', '\n'));

	const tree = document.createElement('div');
	tree.innerHTML = currentHTML;

	const lines = Array.from(tree.querySelectorAll('.line'));
	let writingPosition: Position = { line: 0, span: 0, char: 0 };
	let readingPosition: Position = { line: 0, span: 0, char: 0 };

	const charAt = (position: Position): string => {
		const span = getCurrentSpan(position, lines);
		const text = span.textContent ?? '';
		return text[position.char];
	};

	const advance = () => {
		writingPosition = structuredClone(readingPosition);
		writingPosition.char++; // Always advance the writing position
		// Cannot read past the end of the text
		if (!isAtEndOfText(readingPosition, lines)) {
			readingPosition = nextPosition(readingPosition, lines);
		}
	};

	const onUnchangedCharacter = (char: string) => {
		if (char === '\n') {
			writingPosition.char = 0;
			writingPosition.span = 0;
			writingPosition.line++;
			readingPosition = structuredClone(writingPosition);
			return;
		}

		const c = charAt(readingPosition);
		if (c !== char) {
			console.warn(`Character mismatch: "${char}" !== "${c}" at: `, readingPosition, lines);
		}

		advance();
	};

	const onAddedCharacter = (char: string) => {
		if (char === '\n') {
			// We also need to move the text after the cursor to the next line
			const cutSpan = getCurrentSpan(writingPosition, lines);
			// All the following spans should be moved to the next line
			const nextSpans: Element[] = [];
			while (true) {
				const span = nextSpans.at(-1) ?? cutSpan;
				if (!span.nextElementSibling) {
					break;
				}
				nextSpans.push(span.nextElementSibling);
			}

			const text = cutSpan.textContent ?? '';
			const newText = text.slice(writingPosition.char);
			cutSpan.textContent = text.slice(0, writingPosition.char);

			const line = document.createElement('span');
			line.classList.add('line');

			const newlineNode = document.createTextNode('\n');

			if (newText !== '') {
				// Create a new span for the text
				const span = document.createElement('span');
				line.appendChild(span);
				span.textContent = newText;
				// Copy the styles from the cut span
				span.style.cssText = cutSpan.style.cssText;
			}
			// Move the other spans to the new line
			for (const span of nextSpans) {
				line.appendChild(span);
			}

			// Insert the new line after the current line
			const currentLine = lines[writingPosition.line];
			currentLine.after(newlineNode, line);

			lines.splice(writingPosition.line + 1, 0, line);
			readingPosition = { line: readingPosition.line + 1, span: 0, char: 0 };
			writingPosition = structuredClone(readingPosition);
			return;
		}

		const span = getCurrentSpan(writingPosition, lines);
		const text = span.textContent ?? '';
		span.textContent =
			text.slice(0, writingPosition.char) + char + text.slice(writingPosition.char);

		writingPosition.char++;
		// Check if we wrote in the same span
		if (
			writingPosition.line === readingPosition.line &&
			writingPosition.span === readingPosition.span
		) {
			readingPosition.char++;
		}
	};

	const onRemovedCharacter = (char: string) => {
		if (char === '\n') {
			// Move all the spans from the next line to the current line
			const currentLine = lines[readingPosition.line - 1];
			const nextLine = lines[readingPosition.line];

			const nextLineSpans = Array.from(nextLine.children);

			// Move the spans from the next line to the current line
			for (const span of nextLineSpans) {
				currentLine.appendChild(span);
			}

			// Remove the next line and the newline node
			const newlineNode = currentLine.nextSibling;
			newlineNode?.remove();
			nextLine.remove();
			lines.splice(readingPosition.line, 1);

			// Move the reading position to the end of the previous line (writing position is already there)
			readingPosition = structuredClone(writingPosition);
			// make sure that the reading position is not in an invalid state
			readingPosition = checkPosition(readingPosition, lines);

			return;
		}

		const span = getCurrentSpan(readingPosition, lines);
		const text = span.textContent ?? '';
		const removedChar = text[readingPosition.char];

		if (removedChar !== char) {
			console.warn(
				`Character mismatch: "${char}" !== "${removedChar}" at: `,
				readingPosition,
				lines
			);
		}

		span.textContent = text.slice(0, readingPosition.char) + text.slice(readingPosition.char + 1);
		if (span.textContent === '') {
			span.remove();
		}

		// make sure that the reading position is not in an invalid state
		readingPosition = checkPosition(readingPosition, lines);
	};

	readingPosition = checkPosition(readingPosition, lines); // Make sure the starting position is valid

	for (const change of diff) {
		switch (true) {
			case change.added:
				for (const char of change.value) {
					onAddedCharacter(char);
				}
				break;
			case change.removed:
				for (const char of change.value) {
					onRemovedCharacter(char);
				}
				break;
			default:
				for (const char of change.value) {
					onUnchangedCharacter(char);
				}
				break;
		}
	}

	return tree.innerHTML;
}
