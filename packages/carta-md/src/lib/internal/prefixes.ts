/**
 * Text prefixes, default ones include the `- ` for bulleted lists,
 * `1. ` for numbered lists, `- [ ]` for task lists.
 */
export interface Prefix {
	/**
	 * Id of the prefix.
	 */
	id: string;
	/**
	 * Function that returns the prefix, if it is present.
	 * @param line The current line.
	 * @returns The prefix, or nothing if it was not.
	 */
	match: (line: string) => string | undefined;
	/**
	 * Function that returns the prefix for the new line.
	 * @param previousMatch The prefix matched in the `match` function.
	 * @param previousLine The previous line.
	 * @returns The new prefix.
	 */
	maker: (previousMatch: string, previousLine: string) => string;
}

export const defaultPrefixes = [
	{
		id: 'taskList',
		match: (line) => {
			const prefix = line.slice(0, 5);
			if (prefix.includes('- []')) return prefix;
			if (prefix.includes('- [ ]')) return prefix;
			if (prefix.includes('- [x]')) return prefix;
		},
		maker: () => '- [ ] '
	},
	{
		id: 'bulletedList',
		match: (line) => {
			const prefix = line.slice(0, 2);
			if (prefix === '- ') return prefix;
		},
		maker: () => '- '
	},
	{
		id: 'numberedList',
		match: (line) => line.match(/^\d+\./)?.at(0),
		maker: (prev) => `${Number(prev.slice(0, -1)) + 1}. `
	},
	{
		id: 'blockquote',
		match: (line) => line.match(/^(> *)+/gm)?.at(0),
		maker: (prev) => prev
	}
] as const satisfies readonly Prefix[];

export type DefaultPrefixId = (typeof defaultPrefixes)[number]['id'];
