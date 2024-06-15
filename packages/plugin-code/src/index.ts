import type { DualTheme, Theme, Plugin } from 'carta-md';
import type { Root } from 'hast';
import type { Transformer } from 'unified';
import type { HighlighterGeneric } from '@shikijs/core';
import type { RehypeShikiCoreOptions } from '@shikijs/rehype/core';
import rehypeShikiFromHighlighter from '@shikijs/rehype/core';

export type CodeExtensionOptions = Omit<RehypeShikiCoreOptions, 'theme' | 'themes'> & {
	theme?: Theme | DualTheme;
};

// FIXME: find a better solution then copy-pasting these functions in next version.
// However, when importing from carta-md, this causes a MODULE_NOT_FOUND error
// for some reason.
/**
 * Checks if a theme is a dual theme.
 * @param theme The theme to check.
 * @returns Whether the theme is a dual theme.
 */
export const isDualTheme = (theme: Theme | DualTheme): theme is DualTheme =>
	typeof theme == 'object' && 'light' in theme && 'dark' in theme;
/**
 * Checks if a theme is a single theme.
 * @param theme The theme to check.
 * @returns Whether the theme is a single theme.
 */
export const isSingleTheme = (theme: Theme | DualTheme): theme is Theme => !isDualTheme(theme);

/**
 * Carta code highlighting plugin. Themes available on [GitHub](https://github.com/speed-highlight/core/tree/main/dist/themes).
 */
export const code = (options?: CodeExtensionOptions): Plugin => {
	return {
		transformers: [
			{
				execution: 'async',
				type: 'rehype',
				async transform({ processor, carta }) {
					let theme = options?.theme;

					const cartaHighlighter = await carta.highlighter();
					if (!theme) {
						theme = cartaHighlighter.theme; // Use the theme specified in the highlighter
					}

					// https://github.com/shikijs/shiki/blob/v1.6.4/packages/rehype/src/core.ts#L72

					const rehypeShikiFromHighlighterWrapper = (
						highlighter: HighlighterGeneric<any, any>,
						options: RehypeShikiCoreOptions,
					): Transformer<Root, Root> => {
						const onError = options?.onError

						if (onError)
							delete options.onError

						const transformer: Transformer<Root, Root> = rehypeShikiFromHighlighter(highlighter, options);

						const regex = /^.*Language `([^`]+)` not found.*$/

						// @ts-ignore
						const transformerWrapper: Transformer<Root, Root> = async (tree: Root) => {
							try {
								// @ts-ignore
								transformer(tree)
							}
							catch(e: any) {
								let ignoreError = false

								if ((e instanceof Error) && e?.message) {
									const match: RegExpExecArray | null = regex.exec(e.message)

									if (match) {
										// load language into highlighter, then retry

										const lang: string = match[1]

										const updated: boolean = await carta.loadHighlighterLanguage(cartaHighlighter, lang)

										if (updated) {
											// @ts-ignore
											transformerWrapper(tree)
											ignoreError = true
										}
									}
								}

								if (!ignoreError) {
									if (onError)
										onError(e)
									else
										throw e
								}
							}
						}

						return transformerWrapper
					}

					if (isSingleTheme(theme)) {
						processor.use(rehypeShikiFromHighlighterWrapper, cartaHighlighter, { ...options, theme });
					} else {
						processor.use(rehypeShikiFromHighlighterWrapper, cartaHighlighter, { ...options, themes: theme });
					}
				}
			}
		]
	};
};
