import type { InputEnhancer } from 'carta-md';

export interface SlashSnippet {
	/**
	 * Unique snippet identifier.
	 */
	id: string;
	group: string;
	title: string;
	description: string;
	/**
	 * Snippet callback.
	 * @param input Carta input.
	 */
	action: (input: InputEnhancer) => void;
}

function insertLine(input: InputEnhancer, string: string) {
	const line = input.getLine();
	if (line.value !== '') {
		input.insertAt(line.end, `\n${string}`);
		const newPos = line.end + string.length + 1;
		input.textarea.selectionStart = newPos;
		input.textarea.selectionEnd = newPos;
	} else {
		input.insertAt(line.end, `${string}`);
		const newPos = line.end + string.length;
		input.textarea.selectionStart = newPos;
		input.textarea.selectionEnd = newPos;
	}
}

/**
 * Default slash snippets.
 */
export const defaultSnippets = [
	{
		id: 'bigHeading',
		title: 'Heading 1',
		description: 'Big section heading',
		group: 'Basic',
		action: (input) => insertLine(input, '# ')
	},
	{
		id: 'mediumHeading',
		title: 'Heading 2',
		description: 'Medium section heading',
		group: 'Basic',
		action: (input) => insertLine(input, '## ')
	},
	{
		id: 'smallHeading',
		title: 'Heading 3',
		description: 'Small section heading',
		group: 'Basic',
		action: (input) => insertLine(input, '### ')
	},
	{
		id: 'numberedList',
		title: 'Numbered List',
		description: 'Create a list with numbering',
		group: 'Basic',
		action: (input) => insertLine(input, '1. ')
	},
	{
		id: 'bulletedList',
		title: 'Bulleted List',
		description: 'Create a bulleted list',
		group: 'Basic',
		action: (input) => insertLine(input, '- ')
	},
	{
		id: 'taskList',
		title: 'Task List',
		description: 'Create a task list',
		group: 'Basic',
		action: (input) => insertLine(input, '- [ ] ')
	},
	{
		id: 'quote',
		title: 'Quote',
		description: 'Create a quote',
		group: 'Basic',
		action: (input) => insertLine(input, '> ')
	},
	{
		id: 'code',
		title: 'Code',
		description: 'Add a code block',
		group: 'Basic',
		action: (input) => {
			insertLine(input, '```\n');
			const pos = input.textarea.selectionStart;
			insertLine(input, '\n```');
			input.textarea.setSelectionRange(pos, pos);
		}
	}
] as const satisfies readonly SlashSnippet[];

export type DefaultSnippetId = (typeof defaultSnippets)[number]['id'];
