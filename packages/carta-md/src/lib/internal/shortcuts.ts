import type { KeyboardShortcut } from './input';

/**
 * Default keyboard shortcuts. Can be disabled in `Carta` by
 * passing the `disableDefaultShortcuts` option.
 */
export const defaultKeyboardShortcuts: KeyboardShortcut[] = [
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
			const previousValue = input.history.undo();
			if (previousValue !== undefined) input.textarea.value = previousValue;
		}
	},
	// Redo
	{
		id: 'redo',
		combination: new Set(['control', 'y']),
		preventSave: true,
		action: (input) => {
			const successiveValue = input.history.redo();
			if (successiveValue !== undefined) input.textarea.value = successiveValue;
		}
	}
];
