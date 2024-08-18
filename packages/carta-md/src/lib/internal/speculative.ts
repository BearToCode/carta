import { diffChars, type Change } from 'diff';

/**
 * Temporary updates the highlight overlay to reflect the changes between two text strings,
 * waiting for the actual update to be applied. This way, the user can immediately see the changes,
 * without a delay of around ~100ms. This makes the UI feel more responsive.
 * @param container The highlight overlay container.
 * @param from Previous text.
 * @param to Current text.
 */
export function speculativeHighlightUpdate(container: HTMLDivElement, from: string, to: string) {
	const diff = diffChars(from.replaceAll('\r\n', '\n'), to.replaceAll('\r\n', '\n'));

	const textNodes = textNodesUnder(container);

	if (textNodes.length == 0) {
		const tempNode = createTemporaryNode(container);
		if (!tempNode) return; // Could not create a temporary node
		textNodes.push(tempNode);
	}

	let currentNodeIdx = 0;
	let currentNodeCharIdx = 0; // char offset inside current node

	const advance = (count: number) => {
		let steps = 0;
		while (steps < count && currentNodeIdx < textNodes.length) {
			const node = textNodes[currentNodeIdx];
			const text = node.textContent ?? '';
			const availableNodeChars = text.length - currentNodeCharIdx;

			const stepsTaken = Math.min(availableNodeChars, count - steps);

			steps += stepsTaken;
			currentNodeCharIdx += stepsTaken;
			if (stepsTaken == availableNodeChars) {
				currentNodeIdx++;
				currentNodeCharIdx = 0;
			}
		}
	};

	const unchangedCallback = (change: Change) => {
		advance(change.value.length);
	};
	const addedCallback = (change: Change) => {
		const node = textNodes.at(currentNodeIdx) ?? createTemporaryNode(container);
		if (!node) return; // Could not create a temporary node

		const text = node.textContent ?? '';
		const pre = text.slice(0, currentNodeCharIdx);
		const post = text.slice(currentNodeCharIdx);

		node.textContent = pre + change.value + post;
		advance(change.value.length);
	};
	const removedCallback = (change: Change) => {
		let charsToRemove = change.value.length;

		while (charsToRemove > 0) {
			const node = textNodes.at(currentNodeIdx);
			if (!node) return; // Could not find a node

			const text = node.textContent ?? '';
			const availableNodeChars = text.length - currentNodeCharIdx;

			const stepsTaken = Math.min(availableNodeChars, charsToRemove);

			node.textContent =
				text.slice(0, currentNodeCharIdx) + text.slice(currentNodeCharIdx + stepsTaken);

			charsToRemove -= stepsTaken;
			if (stepsTaken == availableNodeChars) {
				currentNodeIdx++;
				currentNodeCharIdx = 0;
			}
		}
	};

	for (const change of diff) {
		if (change.added) {
			addedCallback(change);
		} else if (change.removed) {
			removedCallback(change);
		} else {
			unchangedCallback(change);
		}
	}
}

/**
 * Finds all text nodes under a given element.
 * @param elem The element to search for text nodes.
 * @returns The text nodes under the given element.
 */
function textNodesUnder(elem: HTMLElement) {
	const children = [];
	const walker = document.createTreeWalker(elem, NodeFilter.SHOW_TEXT);
	while (walker.nextNode()) {
		children.push(walker.currentNode);
	}
	return children;
}

/**
 * Creates a new text node appended to the last line of the container.
 * @param container The highlight overlay container.
 * @returns A new text node appended to the last line of the container.
 */
export function createTemporaryNode(container: HTMLDivElement) {
	const span = Array.from(container.querySelectorAll('.line')).at(-1);
	if (!span) return null; // Could not find a line

	const node = document.createTextNode('');
	span.appendChild(node);

	span.setAttribute('data-temp-node', 'true');
	return node;
}
