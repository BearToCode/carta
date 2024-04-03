import type { Plugin, HighlightFunctions } from 'carta-md';
import { markedHighlight } from 'marked-highlight';

interface CodeExtensionOptions {
	/**
	 * Default language when none is provided.
	 */
	defaultLanguage?: string;
	/**
	 * Whether to autodetect a language when none is provided.
	 * Overwritten by `defaultLanguage`.
	 */
	autoDetect?: string;
	/**
	 * Line numbering.
	 * @defaults false.
	 */
	lineNumbering?: boolean;

	/**
	 * Options for custom syntax highlighting.
	 */
	customHighlight?: {
		/**
		 * Custom highlight function. Beware that you'll have to provide your own styles.
		 * This function needs to convert a string of code into html.
		 */
		highlighter: (code: string, lang: string) => string | Promise<string>;
		/**
		 * The language tag found immediately after the code block opening marker is
		 * appended to this to form the class attribute added to the `<code>` element.
		 */
		langPrefix: string;
	};
}

let shj: HighlightFunctions;

/**
 * Carta code highlighting plugin. Themes available on [GitHub](https://github.com/speed-highlight/core/tree/main/dist/themes).
 */
export const code = (options?: CodeExtensionOptions): Plugin => {
	return {
		onLoad: ({ highlight }) => (shj = highlight),
		markedExtensions: [
			markedHighlight({
				langPrefix: options?.customHighlight?.langPrefix ?? 'shj-lang-',
				async: true,
				async highlight(code, lang) {
					if (options?.customHighlight) {
						return await options.customHighlight.highlighter(code, lang);
					}

					const { highlight, highlightAutodetect } = shj;

					lang ||= options?.defaultLanguage ?? '';
					let highlighted: string | null = null;

					if (lang) highlighted = await highlight(code, lang, !(options?.lineNumbering ?? false));
					if (highlighted) return highlighted;

					if (options?.autoDetect ?? true)
						return await highlightAutodetect(code, !(options?.lineNumbering ?? false));

					return (await highlight(code, 'plain', !(options?.lineNumbering ?? false))) as string;
				}
			})
		]
	};
};
