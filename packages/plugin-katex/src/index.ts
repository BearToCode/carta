import type { CartaExtension } from 'carta-md';
import { marked } from 'marked';
import katex, { KatexOptions } from 'katex';

interface KatexExtensionOptions {
	/**
	 * Options for inline katex, eg: $a^2+b^2=c^2$
	 */
	inline?: {
		katexOptions?: KatexOptions;
	};
	/**
	 * Option for block katex, eg:
	 * $$
	 * a^2+b^2=c^2
	 * $$
	 */
	block?: {
		/**
		 * Tag the generated katex will be put into. Must have `display: block`.
		 */
		tag?: string;
		/**
		 * Class for generated katex.
		 */
		class?: string;
		katexOptions?: KatexOptions;
	};
}

/**
 * Carta katex plugin. Code adapted from [marked-katex-extension](https://github.com/UziTech/marked-katex-extension).
 */
export const KatexExtension = (options: KatexExtensionOptions): CartaExtension => {
	return {
		markedExtensions: [
			{
				extensions: [inlineKatex(options.inline), blockKatex(options.block)]
			}
		]
	};
};

const inlineKatex = (
	options?: KatexExtensionOptions['inline']
): marked.TokenizerAndRendererExtension => {
	return {
		name: 'inlineKatex',
		level: 'inline',
		start: (src) => src.indexOf('$'),
		tokenizer: (src) => {
			const match = src.match(/^\$+([^$\n]+?)\$+/);
			if (match) {
				return {
					type: 'inlineKatex',
					raw: match[0],
					text: match[1].trim()
				};
			}
		},
		renderer: (token) => katex.renderToString(token.text, options?.katexOptions)
	};
};

const blockKatex = (
	options?: KatexExtensionOptions['block']
): marked.TokenizerAndRendererExtension => {
	return {
		name: 'blockKatex',
		level: 'block',
		start: (src) => src.indexOf('\n$$'),
		tokenizer: (src) => {
			const match = src.match(/^\$\$+\n([^$]+?)\n\$\$+\n/);
			if (match) {
				return {
					type: 'blockKatex',
					raw: match[0],
					text: match[1].trim()
				};
			}
		},
		renderer: (token) => {
			const tag = options?.tag ?? 'p';
			return `<${tag} class="${options?.class ?? ''}">${katex.renderToString(
				token.text,
				options?.katexOptions
			)}</${tag}>`;
		}
	};
};
