import type { InputEnhancer } from './input';

/**
 * Keyboard shortcut data.
 */
export interface KeyboardShortcut {
	id: string;
	/**
	 * Set of keys, corresponding to the `e.key` of `KeyboardEvent`s, but lowercase.
	 */
	combination: Set<string>;
	/**
	 * Callback action.
	 * @param input Input helper.
	 */
	action: (input: InputEnhancer) => void;
	/**
	 * Prevent saving the current state in history.
	 */
	preventSave?: boolean;
}

/**
 * Default keyboard shortcuts. Can be disabled in `Carta` by
 * passing the `disableDefaultShortcuts` option.
 */
export const defaultKeyboardShortcuts = [
	// Bold text
	{
		id: 'bold',
		combination: new Set(['control', 'b']),
		action: (input) => input.toggleSelectionSurrounding('**')
	},
	// Italic text
	{
		id: 'italic',
		combination: new Set(['control', 'i']),
		action: (input) => input.toggleSelectionSurrounding('_')
	},
	// Quote
	{
		id: 'quote',
		combination: new Set(['control', 'shift', ',']),
		action: (input) => input.toggleLinePrefix('>')
	},
	// Link
	{
		id: 'link',
		combination: new Set(['control', 'k']),
		action: (input) => {
			input.toggleSelectionSurrounding(['[', ']']);
			const position = input.getSelection().end + 1;
			input.insertAt(position, '(url)');
			input.textarea.setSelectionRange(position + 1, position + 4);
		}
	},
	// Strikethrough
	{
		id: 'strikethrough',
		combination: new Set(['control', 'shift', 'x']),
		action: (input) => input.toggleSelectionSurrounding('~~')
	},
	// Code
	{
		id: 'code',
		combination: new Set(['control', 'e']),
		action: (input) => input.toggleSelectionSurrounding('`')
	},
	// Undo
	{
		id: 'undo',
		combination: new Set(['control', 'z']),
		preventSave: true,
		action: (input) => {
			const previousState = input.history.undo();
			if (!previousState) return;
			input.textarea.value = previousState.value;
			input.textarea.selectionStart = previousState.cursor;
			input.textarea.selectionEnd = previousState.cursor;
		}
	},
	// Redo
	{
		id: 'redo',
		combination: new Set(['control', 'y']),
		preventSave: true,
		action: (input) => {
			const successiveValue = input.history.redo();
			if (!successiveValue) return;
			input.textarea.value = successiveValue.value;
			input.textarea.selectionStart = successiveValue.cursor;
			input.textarea.selectionEnd = successiveValue.cursor;
		}
	}
] as const satisfies readonly KeyboardShortcut[];

export type DefaultShortcutId = (typeof defaultKeyboardShortcuts)[number]['id'];
