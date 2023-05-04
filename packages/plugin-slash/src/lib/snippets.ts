import type { CartaInput } from 'carta-md';

export interface SlashSnippet {
	/**
	 * Unique snipped identifier.
	 */
	id: string;
	title: string;
	description: string;
	/**
	 * Snipped callback.
	 * @param input Carta input.
	 */
	action: (input: CartaInput) => void;
}

function insertLine(input: CartaInput, string: string) {
	const line = input.getCurrentLine();
	if (line.value !== '') {
		input.insertAt(line.end, `\n${string}`);
		const newPos = line.end + string.length + 1;
		input.textarea.selectionStart = newPos;
		input.textarea.selectionEnd = newPos;
	} else {
		input.insertAt(line.end, `${string}`);
		const newPos = line.end + string.length + 1;
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
		action: (input) => insertLine(input, '# ')
	},
	{
		id: 'mediumHeading',
		title: 'Heading 2',
		description: 'Medium section heading',
		action: (input) => insertLine(input, '## ')
	},
	{
		id: 'smallHeading',
		title: 'Heading 3',
		description: 'Small section heading',
		action: (input) => insertLine(input, '### ')
	}
] as const satisfies readonly SlashSnippet[];

export type DefaultSnippetId = (typeof defaultSnippets)[number]['id'];
