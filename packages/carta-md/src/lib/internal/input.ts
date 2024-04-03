import type { Listener } from './carta';
import type { Prefix } from './prefixes';
import type { KeyboardShortcut } from './shortcuts';
import { TextAreaHistory as TextAreaHistory, type TextAreaHistoryOptions } from './history';
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
	readonly listeners: Listener<any>[];
	readonly historyOpts?: Partial<TextAreaHistoryOptions>;
}

export class InputEnhancer {
	private pressedKeys: Set<string>;
	private escapePressed = false;
	// Used to detect keys that actually changed the textarea value
	private onKeyDownValue: string | undefined;

	public history: TextAreaHistory;
	public readonly events = new EventTarget();

	constructor(
		public readonly textarea: HTMLTextAreaElement,
		public readonly container: HTMLDivElement,
		private readonly settings: InputSettings
	) {
		this.pressedKeys = new Set();

		textarea.addEventListener('keydown', this.handleKeyDown.bind(this));
		textarea.addEventListener('keyup', this.handleKeyUp.bind(this));

		textarea.addEventListener('focus', () => {
			this.pressedKeys.clear();
			this.escapePressed = false;
		});
		textarea.addEventListener('blur', () => {
			this.pressedKeys.clear();
		});

		textarea.addEventListener('mousedown', this.handleMouseDown.bind(this));

		this.history = new TextAreaHistory(settings.historyOpts);
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
				this.update();
			}

			this.onKeyDownValue = undefined;
		} else {
			// On newline
			if (key === 'enter') {
				// Check prefixes
				this.handleNewLine(e);
			} else if (key == 'tab' && !this.escapePressed) {
				e.preventDefault(); // Don't select other stuff

				if (e.shiftKey) {
					// Unindent
					const line = this.getLine();
					const lineStart = line.start;
					const lineContent = line.value;
					const position = this.textarea.selectionStart;

					// Check if the line starts with a tab
					if (lineContent.startsWith('\t')) {
						// Remove the tab
						this.removeAt(lineStart, 1);
						this.textarea.selectionStart = position - 1;
						this.textarea.selectionEnd = position - 1;
					}
				} else {
					const position = this.textarea.selectionStart;
					this.insertAt(this.textarea.selectionStart, '\t');
					this.textarea.selectionStart = position + 1;
					this.textarea.selectionEnd = position + 1;
				}

				this.update();
			} else if (key === 'escape') {
				this.escapePressed = true;
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
					this.update();
					return;
				}

				const newPrefix = prefix.maker(match, line);
				this.insertAt(cursor, '\n' + newPrefix);

				this.update();
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
	public update = () => this.events.dispatchEvent(new Event('update'));

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
		return {
			x: inputX + spanX,
			y: inputY + spanY,

			left: inputX + spanX,
			top: inputY + spanY,
			right: this.textarea.clientWidth - inputX,
			bottom: this.textarea.clientHeight - inputY
		};
	}

	/**
	 * Moves an element next to the caret. Shall be called every time the element
	 * changes width, height or the caret position changes. Consider using `bindToCaret` instead.
	 *
	 * @example
	 * ```svelte
	 * <script>
	 *   // ...
	 *
	 *   export let carta;
	 *
	 *   let caretPosition;
	 *   let elem;
	 *
	 *   onMount(() => {
	 *     carta.input.addEventListener('input', handleInput);
	 *   });
	 *
	 *   onDestroy(() => {
	 *     carta.input.removeEventListener('input', handleInput);
	 *   });
	 *
	 *   function handleInput() {
	 *   	 caretPosition = carta.input.getCursorXY();
	 *   }
	 *
	 *   $: {
	 *     caretPosition, elem.clientWidth, elem.clientHeight;
	 *     carta.input.moveElemToCaret(elem);
	 *   }
	 * </script>
	 *
	 * <div bind:this={elem}>
	 *   <!-- My stuff -->
	 * </div>
	 * ```
	 *
	 * @param elem The element to move.
	 */
	public moveElemToCaret(elem: HTMLElement) {
		const elemWidth = elem.clientWidth;
		const elemHeight = elem.clientHeight;

		const caretPosition = this.getCursorXY();
		const fontSize = this.getRowHeight();

		// Left/Right
		let left: number | undefined = caretPosition.left;
		let right: number | undefined;

		if (
			elemWidth < this.container.clientWidth &&
			left + elemWidth - this.container.scrollLeft >= this.container.clientWidth
		) {
			right = this.container.clientWidth - left;
			left = undefined;
		}
		// Top/Bottom
		let top: number | undefined = caretPosition.top;
		let bottom: number | undefined;

		if (
			elemHeight < this.container.clientHeight &&
			top + elemHeight - this.container.scrollTop >= this.container.clientHeight
		) {
			bottom = this.container.clientHeight - top;
			top = undefined;
		}

		elem.style.left = left !== undefined ? left + 'px' : 'unset';
		elem.style.right = right !== undefined ? right + 'px' : 'unset';
		elem.style.top = top !== undefined ? top + fontSize + 'px' : 'unset';
		elem.style.bottom = bottom !== undefined ? bottom + 'px' : 'unset';
	}

	/**
	 * **Internal**: Svelte action to bind an element to the caret position.
	 * Use `bindToCaret` from the `carta` instance instead.
	 * @param elem The element to position.
	 * @param portal The portal to append the element to. Defaults to `document.body`.
	 */
	public $bindToCaret(
		elem: HTMLElement,
		data: { portal: HTMLElement; editorElement?: HTMLElement }
	) {
		// Move the element to body
		data.portal.appendChild(elem);
		// Add theme class as the the teleported element is not a child of the container
		const themeClass = Array.from(data.editorElement?.classList ?? []).find((c) =>
			c.startsWith('carta-theme__')
		);
		elem.classList.add(themeClass ?? 'carta-theme__default');
		elem.style.position = 'fixed';

		const callback = () => {
			const relativePosition = this.getCursorXY();
			const absolutePosition = {
				x: relativePosition.x + this.textarea.getBoundingClientRect().left,
				y: relativePosition.y + this.textarea.getBoundingClientRect().top
			};

			const fontSize = this.getRowHeight();
			const width = elem.clientWidth;
			const height = elem.clientHeight;

			// Left/Right
			let left: number | undefined = absolutePosition.x;
			let right: number | undefined;

			if (left + width >= window.innerWidth) {
				right = window.innerWidth - left;
				left = undefined;
			}

			// Top/Bottom
			let top: number | undefined = absolutePosition.y;
			let bottom: number | undefined;

			if (top + height >= window.innerHeight) {
				bottom = window.innerHeight - top;
				top = undefined;
			}

			elem.style.left = left !== undefined ? left + 'px' : 'unset';
			elem.style.right = right !== undefined ? right + 'px' : 'unset';
			elem.style.top = top !== undefined ? top + fontSize + 'px' : 'unset';
			elem.style.bottom = bottom !== undefined ? bottom + 'px' : 'unset';
		};

		this.textarea.addEventListener('input', callback);
		window.addEventListener('resize', callback);
		window.addEventListener('scroll', callback);

		// Initial positioning
		callback();

		return {
			destroy: () => {
				try {
					data.portal.removeChild(elem);
				} catch (e: unknown) {
					// Ignore
				}
				this.textarea.removeEventListener('input', callback);
				window.removeEventListener('resize', callback);
				window.removeEventListener('scroll', callback);
			}
		};
	}

	/**
	 * Get rough value for a row of the textarea.
	 */
	public getRowHeight() {
		// Turns out calculating line height is quite tricky
		const rawLineHeight = getComputedStyle(this.container).lineHeight;

		const lineHeight = parseFloat(rawLineHeight);
		const fontSize = parseFloat(getComputedStyle(this.container).fontSize);

		if (isNaN(lineHeight)) {
			// "normal" => use default 1.2 value for all modern browser
			return Math.ceil(fontSize * 1.2);
		}
		if (rawLineHeight.endsWith('em')) {
			return Math.ceil(lineHeight * fontSize);
		}
		if (rawLineHeight.endsWith('%')) {
			return Math.ceil((lineHeight / 100) * fontSize);
		}
		if (rawLineHeight.endsWith('px')) {
			return Math.ceil(lineHeight);
		}

		// Line height can also be a multiplier of the font size
		return Math.ceil(fontSize * lineHeight);
	}
}
