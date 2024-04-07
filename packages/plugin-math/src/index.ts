import type { Plugin } from 'carta-md';
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

/**
 * Carta math plugin. Code adapted from [marked-katex-extension](https://github.com/UziTech/marked-katex-extension).
 */
export const math = (options?: MathExtensionOptions): Plugin => {
	return {
		onLoad: async ({ carta }) => {
			const highlighter = await carta.highlighter();
			await highlighter.loadLanguage('latex');
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
		grammarRules: [
			{
				name: 'inline_math',
				type: 'inline',
				definition: {
					match: '(\\$+)((?:[^\\$]|(?!(?<!\\$)\\1(?!\\$))\\$)*+)(\\1)',
					name: 'markup.inline.math.markdown',
					captures: {
						'1': { name: 'punctuation.definition.latex.inline' },
						'2': { name: 'meta.embedded.block.latex', patterns: [{ include: 'text.tex.latex' }] },
						'3': { name: 'punctuation.definition.latex.inline' }
					}
				}
			},
			{
				name: 'block_math',
				type: 'block',
				definition: {
					begin: '(^|\\G)(\\s*)(\\${2,})\\s*(?=([^$]*)?$)',
					beginCaptures: {
						'3': { name: 'punctuation.definition.latex.block' }
					},
					endCaptures: { '3': { name: 'punctuation.definition.latex.block' } },
					end: '(^|\\G)(\\2|\\s{0,3})(\\3)\\s*$',
					name: 'markup.block.math.markdown',
					patterns: [
						{
							begin: '(^|\\G)(\\s*)(.*)',
							contentName: 'meta.embedded.block.latex',
							patterns: [{ include: 'text.tex.latex' }],
							while: '(^|\\G)(?!\\s*([$]{2,})\\s*$)'
						}
					]
				}
			}
		],
		highlightingRules: [
			{
				light: {
					scope: 'punctuation.definition.latex',
					settings: {
						foreground: '#5AF'
					}
				},
				dark: {
					scope: 'punctuation.definition.latex',
					settings: {
						foreground: '#4DACFA'
					}
				}
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
