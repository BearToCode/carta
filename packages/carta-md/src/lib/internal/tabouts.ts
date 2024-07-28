/**
 * Editor tab out information.
 */
export type TabOut = {
	/**
	 * The tab out's unique identifier.
	 */
	readonly id: string;
	/**
	 * The delimiter to look for when tabbing out.
	 */
	readonly delimiter: string | readonly string[];
};

/**
 * Default tab outs. Can be disabled in `Carta` by
 * passing the `disableDefaultTabOuts` option.
 */
export const defaultTabOuts = [
	{
		id: 'bold',
		delimiter: '**'
	},
	{
		id: 'italic',
		delimiter: ['*', '_']
	},
	{
		id: 'link',
		delimiter: ')'
	},
	{
		id: 'strikethrough',
		delimiter: '~~'
	},
	{
		id: 'inline-code',
		delimiter: '`'
	},
	{
		id: 'block-code',
		delimiter: '\n```'
	}
] as const satisfies readonly TabOut[];

export type DefaultTabOutId = (typeof defaultTabOuts)[number]['id'];
