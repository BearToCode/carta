import type { Carta, Plugin } from 'carta-md';
import type { Plugin as UnifiedPlugin } from 'unified';
import type * as hast from 'hast';
import { BROWSER } from 'esm-env';

export interface TikzExtensionOptions {
	/**
	 * Enables TikZJax console output (server and client).
	 */
	debug?: boolean;
	/**
	 * Class for generated svg div container.
	 */
	class?: string;
	/**
	 * Whether to center the generated expression.
	 * @default true
	 */
	center?: boolean;
	/**
	 * Post processing function for html.
	 * This also runs on stored html.
	 */
	postProcessing?: (html: string) => string;
}

/**
 * TikzJax extension for Carta.
 * @param options Tikz options.
 */
export const tikz = (options?: TikzExtensionOptions): Plugin => {
	return {
		onLoad: async ({ carta }) => {
			const highlighter = await carta.highlighter();
			if (!highlighter) return;
			await highlighter.loadLanguage('tex');
			carta.input?.update();
		},
		transformers: [
			{
				execution: 'async',
				type: 'rehype',
				transform({ carta, processor }) {
					processor.use(tikzTransformer, { carta, options });
				}
			}
		],
		listeners: [
			[
				'carta-render',
				async (e) => {
					if (BROWSER) {
						const module = await import('./browser');
						module.processTikzScripts(e, options);
					}
				}
			]
		],
		grammarRules: [
			{
				name: 'tikz',
				type: 'block',
				definition: {
					begin: '(^|\\G)(\\s*)(`{3,}|~{3,})\\s*(?i:(tikz)((\\s+|:|,|\\{|\\?)[^`]*)?$)',
					beginCaptures: {
						'3': { name: 'punctuation.definition.markdown' },
						'4': { name: 'fenced_code.block.language.markdown' },
						'5': { name: 'fenced_code.block.language.attributes.markdown' }
					},
					end: '(^|\\G)(\\2|\\s{0,3})(\\3)\\s*$',
					endCaptures: { '3': { name: 'punctuation.definition.markdown' } },
					name: 'markup.fenced_code.block.markdown',
					patterns: [
						{
							begin: '(^|\\G)(\\s*)(.*)',
							contentName: 'meta.embedded.block.latex',
							patterns: [{ include: 'text.tex' }],
							while: '(^|\\G)(?!\\s*([`~]{3,})\\s*$)'
						}
					]
				}
			}
		]
	};
};

const tikzTransformer: UnifiedPlugin<
	[{ carta: Carta; options: TikzExtensionOptions | undefined }],
	hast.Root
> = ({ carta, options }) => {
	return async function (tree) {
		if (BROWSER) {
			const browserModule = await import('./browser');
			return browserModule.browserTikzTransform(tree, carta, options);
		} else {
			const nodeModule = await import('./node');
			return await nodeModule.nodeTikzTransform(tree, carta, options);
		}
	};
};
