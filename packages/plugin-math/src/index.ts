import type { Carta, CartaExtension } from 'carta-md';
import { TokenizerAndRendererExtension } from 'marked';
import katex, { KatexOptions } from 'katex';

interface MathExtensionOptions {
	/**
	 * Options for inline katex, eg: $a^2+b^2=c^2$
	 */
	inline?: {
		katexOptions?: KatexOptions;
		/**
		 * @default control+m
		 */
		shortcut?: Set<string>;
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
		 * Whether to center the generated expression.
		 * @default true
		 */
		center?: boolean;
		/**
		 * Class for generated katex.
		 */
		class?: string;
		/**
		 * @default ctrl+shift+m
		 */
		shortcut?: Set<string>;
		katexOptions?: KatexOptions;
	};
}

function safeRender(tex: string, options?: KatexOptions | undefined) {
	try {
		return katex.renderToString(tex, options);
	} catch (_) {
		return '';
	}
}

let carta: Carta;

/**
 * Carta math plugin. Code adapted from [marked-katex-extension](https://github.com/UziTech/marked-katex-extension).
 */
export const math = (options?: MathExtensionOptions): CartaExtension => {
	return {
		onLoad: ({ carta: c, highlight: shj }) => {
			carta = c;
			import('./latex.js')
				.then((module) => shj.loadCustomLanguage('latex', module))
				.then(() => carta.input?.update());
		},
		markedExtensions: [
			{
				extensions: [inlineKatex(options?.inline), blockKatex(options?.block)]
			}
		],
		shortcuts: [
			{
				id: 'inlineKatex',
				combination: options?.block?.shortcut ?? new Set(['control', 'm']),
				action: (input) => input.toggleSelectionSurrounding('$')
			},
			{
				id: 'blockKatex',
				combination: options?.block?.shortcut ?? new Set(['control', 'shift', 'm']),
				action: (input) => input.toggleSelectionSurrounding(['$$\n', '\n$$'])
			}
		],
		highlightRules: [
			{
				match: /\$[{}[\]a-zA-Z0-9.+-_=*/\\ ]+\$/g,
				sub: 'latex'
			},
			{
				match: /^\$\$+\n([^$]+?)\n\$\$+\n/gm,
				sub: 'latex'
			}
		]
	};
};

const inlineKatex = (options?: MathExtensionOptions['inline']): TokenizerAndRendererExtension => {
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
		renderer: (token) => safeRender(token.text, options?.katexOptions)
	};
};

const blockKatex = (options?: MathExtensionOptions['block']): TokenizerAndRendererExtension => {
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
			const center = options?.center ?? true;
			const katexOptions = options?.katexOptions ?? {};
			if (katexOptions?.displayMode === undefined) katexOptions.displayMode = true;
			return `
				<${tag} 
					class="${options?.class ?? ''}"
					${center ? 'align="center"' : ''}
				>${safeRender(token.text, katexOptions)}
				</${tag}>`;
		}
	};
};
