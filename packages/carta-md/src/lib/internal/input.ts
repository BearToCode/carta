import { CartaHistory, type CartaHistoryOptions } from './history';
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
 * Keyboard shortcut data.
 */
export interface KeyboardShortcut {
	/**
	 * Set of keys, corresponding to the `e.key` of `KeyboardEvent`s, but lowercase.
	 */
	combination: Set<string>;
	/**
	 * Callback action.
	 * @param input Input helper.
	 */
	action: (input: CartaInput) => void;
	/**
	 * Prevent saving the current state in history.
	 */
	preventSave?: boolean;
}

export class CartaInput {
	private pressedKeys: Set<string>;
	public readonly history: CartaHistory;
	// Used to detect keys that actually changed value
	private onKeyDownValue: string | undefined;

	constructor(
		public readonly textarea: HTMLTextAreaElement,
		private readonly shortcuts: KeyboardShortcut[],
		private readonly onUpdate: () => void,
		historyOptions?: Partial<CartaHistoryOptions>
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

		this.history = new CartaHistory(historyOptions);
		// Save initial value
		this.history.saveState(this.textarea.value);
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
		const shortcuts = this.shortcuts.filter((shortcut) =>
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
				if (!shortcut.preventSave) this.history.saveState(this.textarea.value);
				this.onUpdate();
			}

			this.onKeyDownValue = undefined;
		} else {
			this.onKeyDownValue = this.textarea.value;
		}
	}

	private handleKeyUp(e: KeyboardEvent) {
		const key = e.key.toLowerCase();
		this.pressedKeys.delete(key);

		if (this.onKeyDownValue !== undefined && this.textarea.value != this.onKeyDownValue) {
			this.history.saveState(this.textarea.value);
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
}
