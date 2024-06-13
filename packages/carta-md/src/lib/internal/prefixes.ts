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
	match: (line: string) => string | undefined | RegExpExecArray | null;
	/**
	 * Function that returns the prefix for the new line.
	 * @param previousMatch The prefix matched in the `match` function.
	 * @param previousLine The previous line.
	 * @returns The new prefix.
	 */
	maker: (previousMatch: string | RegExpExecArray, previousLine: string) => string;
}

const matchRegexs = {
	taskList: /^(\s*)(-\s+\[)[ xX]?(\]\s+)/,
	bulletedList: /^(\s*)([-*]\s+)/,
	numberedList: /^(\s*)(\d+)(\.\s+)/,
	blockquote: /^(\s*)([> ]*[>]\s+)/
};

export const defaultPrefixes = [
	{
		id: 'taskList',
		match: (line) => matchRegexs.taskList.exec(line),
		maker: (prev) => `${prev[1]}${prev[2]} ${prev[3]}`
	},
	{
		id: 'bulletedList',
		match: (line) => matchRegexs.bulletedList.exec(line),
		maker: (prev) => `${prev[1]}${prev[2]}`
	},
	{
		id: 'numberedList',
		match: (line) => matchRegexs.numberedList.exec(line),
		maker: (prev) => `${prev[1]}${Number(prev[2]) + 1}${prev[3]}`
	},
	{
		id: 'blockquote',
		match: (line) => matchRegexs.blockquote.exec(line),
		maker: (prev) => `${prev[1]}${prev[2]}`
	}
] as const satisfies readonly Prefix[];

export type DefaultPrefixId = (typeof defaultPrefixes)[number]['id'];
