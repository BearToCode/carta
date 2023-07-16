import type { CartaListener } from './carta';
import { CartaHistory, type CartaHistoryOptions } from './history';
import type { Prefix } from './prefixes';
import type { KeyboardShortcut } from './shortcuts';
import { areEqualSets } from './utils';

/**
 * Text selection information.
 */
export interface TextSelection {
	start: number;
	end: number;
	direction: 'forward' | 'backward' | 'none';
	slice: string;
}

/**
 * Carta input settings.
 */
export interface InputSettings {
	readonly shortcuts: KeyboardShortcut[];
	readonly prefixes: Prefix[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	readonly listeners: CartaListener<any>[];
	readonly callback: () => void;
	readonly historyOpts?: Partial<CartaHistoryOptions>;
}

export class CartaInput {
	private pressedKeys: Set<string>;
	public readonly history: CartaHistory;
	// Used to detect keys that actually changed the textarea value
	private onKeyDownValue: string | undefined;

	constructor(
		public readonly textarea: HTMLTextAreaElement,
		private readonly settings: InputSettings
	) {
		this.pressedKeys = new Set();

		textarea.addEventListener('keydown', this.handleKeyDown.bind(this));
		textarea.addEventListener('keyup', this.handleKeyUp.bind(this));

		textarea.addEventListener('focus', () => {
			this.pressedKeys.clear();
		});
		textarea.addEventListener('blur', () => {
			this.pressedKeys.clear();
		});

		textarea.addEventListener('mousedown', this.handleMouseDown.bind(this));

		this.history = new CartaHistory(settings.historyOpts);
		// Save initial value
		this.history.saveState(this.textarea.value, this.textarea.selectionStart);

		// Register listeners
		for (const listener of settings.listeners) textarea.addEventListener(...listener);
	}

	private isWordCharacter(char: string) {
		return new RegExp(/^[a-zA-Z0-9_\-']*$/).test(char);
	}

	private handleMouseDown(e: MouseEvent) {
		const cursor = this.getSelection().start;
		const currentChar = this.textarea.value.at(cursor);
		// Prevent the browser from selecting the space after the word on double clicks, if any
		if (e.detail == 2 && currentChar != '\n' && currentChar != ' ') {
			e.preventDefault();
			// Select the actual word/special chars
			const isWordChar = this.isWordCharacter(this.textarea.value[cursor]);
			let startPosition = cursor,
				endPosition = cursor;

			while (
				startPosition >= 0 &&
				this.isWordCharacter(this.textarea.value[startPosition]) == isWordChar &&
				this.textarea.value[startPosition] != ' '
			)
				startPosition--;
			while (
				endPosition < this.textarea.value.length &&
				this.isWordCharacter(this.textarea.value[endPosition]) == isWordChar &&
				this.textarea.value[endPosition] != ' '
			)
				endPosition++;

			this.textarea.setSelectionRange(startPosition + 1, endPosition);
		}
	}

	private handleKeyDown(e: KeyboardEvent) {
		const key = e.key.toLowerCase();
		this.pressedKeys.add(key);

		// Check for shortcuts
		const shortcuts = this.settings.shortcuts.filter((shortcut) =>
			areEqualSets(this.pressedKeys, shortcut.combination)
		);
		if (shortcuts.length > 0) {
			e.preventDefault();
			if (shortcuts.length > 1) {
				console.warn(
					`[carta] Multiple keyboard shortcuts have the same the combination: ${this.pressedKeys}`
				);
			}

			// Execute all the shortcuts
			for (const shortcut of shortcuts) {
				shortcut.action(this);
				// Save state for shortcuts
				if (!shortcut.preventSave)
					this.history.saveState(this.textarea.value, this.textarea.selectionStart);
				this.settings.callback();
			}

			this.onKeyDownValue = undefined;
		} else {
			// On newline
			if (key === 'enter') {
				// Check prefixes
				this.handleNewLine(e);
			} else if (key == 'tab') {
				e.preventDefault(); // Don't select other stuff
				const position = this.textarea.selectionStart;
				this.insertAt(this.textarea.selectionStart, '\t');
				this.textarea.selectionStart = position + 1;
				this.textarea.selectionEnd = position + 1;
				this.update();
			}
			this.onKeyDownValue = this.textarea.value;
		}
	}

	private handleKeyUp(e: KeyboardEvent) {
		const key = e.key.toLowerCase();
		this.pressedKeys.delete(key);

		if (this.onKeyDownValue !== undefined && this.textarea.value != this.onKeyDownValue) {
			this.history.saveState(this.textarea.value, this.textarea.selectionStart);
		}
	}

	private handleNewLine(e: KeyboardEvent) {
		const cursor = this.textarea.selectionStart;
		// Get all the line
		let lineStartingIndex;
		for (
			lineStartingIndex = cursor;
			lineStartingIndex > 0 && this.textarea.value.at(lineStartingIndex - 1) !== '\n';
			lineStartingIndex--
		);

		const line = this.textarea.value.slice(lineStartingIndex, cursor);
		for (const prefix of this.settings.prefixes) {
			const match = prefix.match(line);
			if (match) {
				e.preventDefault();

				// Check if anything was typed.
				// If not, remove the prefix.
				const content = line.slice(match.length).trim();
				if (content === '') {
					const line = this.getLine(lineStartingIndex);
					this.removeAt(lineStartingIndex, line.value.length);
					this.textarea.setSelectionRange(line.start, line.start);
					this.settings.callback();
					return;
				}

				const newPrefix = prefix.maker(match, line);
				this.insertAt(cursor, '\n' + newPrefix);

				this.settings.callback();
				// Update cursor position
				const newCursorPosition = cursor + newPrefix.length + 1;
				this.textarea.setSelectionRange(newCursorPosition, newCursorPosition);
				break;
			}
		}
	}

	/**
	 * Get the selected text data.
	 * @returns The selection text data.
	 */
	public getSelection(): TextSelection {
		const start = this.textarea.selectionStart;
		const end = this.textarea.selectionEnd;
		return {
			start,
			end,
			direction: this.textarea.selectionDirection,
			slice: this.textarea.value.slice(start, end)
		};
	}

	/**
	 * Get the current line, along with indices information.
	 * @returns Current line info.
	 */
	public getLine(index = this.textarea.selectionStart) {
		let lineStartingIndex, lineEndingIndex;
		for (
			lineStartingIndex = index;
			lineStartingIndex > 0 && this.textarea.value.at(lineStartingIndex - 1) !== '\n';
			lineStartingIndex--
		);
		for (
			lineEndingIndex = index;
			lineEndingIndex < this.textarea.value.length - 1 &&
			this.textarea.value.at(lineEndingIndex) !== '\n';
			lineEndingIndex++
		);
		return {
			start: lineStartingIndex,
			end: lineEndingIndex,
			value: this.textarea.value.slice(lineStartingIndex, lineEndingIndex)
			/**
			 * Position of the cursor relative to the line.
			 */
		};
	}

	/**
	 * Insert a string at a specific index.
	 * @param position The position at which to insert the string.
	 * @param string The string to insert.
	 */
	public insertAt(position: number, string: string) {
		const value = this.textarea.value;
		this.textarea.value = value.slice(0, position) + string + value.slice(position);
	}

	/**
	 * Remove `count` characters at the provided position.
	 * @param position The position to remove characters at.
	 * @param count The number of characters to remove.
	 */
	public removeAt(position: number, count = 1) {
		const value = this.textarea.value;
		this.textarea.value = value.slice(0, position) + value.slice(position + count);
	}

	/**
	 * Surround the current selection with a delimiter.
	 * @param delimiter The string delimiter.
	 */
	public toggleSelectionSurrounding(delimiter: string | [string, string]) {
		const selection = this.getSelection();

		const delimiterLeft = Array.isArray(delimiter) ? delimiter[0] : delimiter;
		const delimiterRight = Array.isArray(delimiter) ? delimiter[1] : delimiter;

		const prevSection = this.textarea.value.slice(
			selection.start - delimiterLeft.length,
			selection.start
		);
		const nextSection = this.textarea.value.slice(
			selection.end,
			selection.end + delimiterRight.length
		);

		if (prevSection === delimiterLeft && nextSection === delimiterRight) {
			this.removeAt(selection.end, delimiterRight.length);
			this.removeAt(selection.start - delimiterLeft.length, delimiterLeft.length);
			this.textarea.setSelectionRange(
				selection.start - delimiterRight.length,
				selection.end - delimiterRight.length
			);
		} else {
			this.insertAt(selection.end, delimiterRight);
			this.insertAt(selection.start, delimiterLeft);
			this.textarea.setSelectionRange(
				selection.start + delimiterLeft.length,
				selection.end + delimiterLeft.length
			);
		}
	}

	/**
	 * Toggle a prefix for the current line.
	 * @param prefix The string prefix.
	 * @param whitespace Whether to handle whitespace separations.
	 */
	public toggleLinePrefix(prefix: string, whitespace: 'attach' | 'detach' = 'attach') {
		const selection = this.getSelection();
		let index = selection.start;
		while (index > 0 && this.textarea.value.at(index - 1) !== '\n') index--;

		let newPosition = selection.start;

		const currentPrefix = this.textarea.value.slice(index, prefix.length);
		if (currentPrefix === prefix) {
			if (whitespace === 'attach' && this.textarea.value.at(index + prefix.length) === ' ') {
				this.removeAt(index, prefix.length + 1);
				newPosition -= prefix.length + 1;
			} else {
				this.removeAt(index, prefix.length);
				newPosition -= prefix.length;
			}
		} else {
			if (whitespace === 'attach') {
				this.insertAt(index, prefix + ' ');
				newPosition += prefix.length + 1;
			} else {
				this.insertAt(index, prefix);
				newPosition += prefix.length;
			}
		}

		this.textarea.setSelectionRange(newPosition, newPosition + selection.slice.length);
	}

	/**
	 * Update the textarea.
	 */
	public update = () => this.settings.callback();

	/**
	 * Returns x, y coordinates for absolute positioning of a span within a given text input
	 * at a given selection point. [Source](https://jh3y.medium.com/how-to-where-s-the-caret-getting-the-xy-position-of-the-caret-a24ba372990a)
	 * @param selectionPoint The selection point for the input. Defaults at current cursor position.
	 */
	public getCursorXY(selectionPoint: number = this.textarea.selectionStart) {
		const { offsetLeft: inputX, offsetTop: inputY } = this.textarea;
		const div = document.createElement('div');
		const copyStyle = getComputedStyle(this.textarea);
		for (const prop of copyStyle) {
			// This monstrosity is needed to prevent linting errors...
			div.style[prop as unknown as number] = copyStyle[prop as unknown as number];
		}
		const swap = '.';
		const inputValue =
			this.textarea.tagName === 'INPUT'
				? this.textarea.value.replace(/ /g, swap)
				: this.textarea.value;
		const textContent = inputValue.substr(0, selectionPoint);
		div.textContent = textContent;

		if (this.textarea.tagName === 'TEXTAREA') div.style.height = 'auto';
		if (this.textarea.tagName === 'INPUT') div.style.width = 'auto';

		// Create an element to measure cursor size
		const span = document.createElement('span');
		span.className += 'carta-font-code';
		span.textContent = inputValue.substr(selectionPoint) || '.';
		div.appendChild(span);
		document.body.appendChild(div);
		const { offsetLeft: spanX, offsetTop: spanY } = span;
		document.body.removeChild(div);

		// Add carta-input padding
		const cartaInput = document.querySelector('.carta-input');
		let padding = {
			top: 0,
			bottom: 0,
			left: 0,
			right: 0
		};
		if (cartaInput) {
			padding = {
				top: parseInt(getComputedStyle(cartaInput).paddingTop, 10),
				bottom: parseInt(getComputedStyle(cartaInput).paddingBottom, 10),
				left: parseInt(getComputedStyle(cartaInput).paddingLeft, 10),
				right: parseInt(getComputedStyle(cartaInput).paddingRight, 10)
			};
		}

		return {
			x: inputX + spanX + padding.left,
			y: inputY + spanY + padding.right,

			left: inputX + spanX + padding.left,
			top: inputY + spanY + padding.top,
			right: this.textarea.clientWidth - inputX + padding.right,
			bottom: this.textarea.clientHeight - inputY + padding.right
		};
	}
}
