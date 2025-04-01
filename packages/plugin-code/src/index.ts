import type { DualTheme, Theme, Plugin } from 'carta-md';
import type { RehypeShikiOptions } from '@shikijs/rehype';
import rehypeShikiFromHighlighter from '@shikijs/rehype/core';

export type CodeExtensionOptions = Omit<RehypeShikiOptions, 'theme' | 'themes'> & {
	theme?: Theme | DualTheme;
};

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

					const highlighter = await carta.highlighter();
					if (highlighter) {
						const shikiHighlighter = highlighter.shikiHighlighter();

						if (!theme) {
							theme = highlighter.settings.themeHash; // Use the theme specified in the highlighter
						}

						if (highlighter.utils.isSingleTheme(theme)) {
							processor.use(rehypeShikiFromHighlighter, shikiHighlighter, { ...options, theme });
						} else {
							processor.use(rehypeShikiFromHighlighter, shikiHighlighter, {
								...options,
								themes: theme
							});
						}
					}
				}
			}
		]
	};
};
