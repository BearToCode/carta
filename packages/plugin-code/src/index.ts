import type { DualTheme, Theme, Plugin } from 'carta-md';
import type { HighlighterGeneric } from 'shiki';
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
					if (!theme) {
						theme = highlighter.theme!; // Use the theme specified in the highlighter
					}

					if (highlighter.isSingleTheme(theme)) {
						processor.use(
							rehypeShikiFromHighlighter,
							highlighter.shiki! as HighlighterGeneric<string, string>,
							{ ...options, theme }
						);
					} else {
						processor.use(
							rehypeShikiFromHighlighter,
							highlighter.shiki! as HighlighterGeneric<string, string>,
							{ ...options, themes: theme }
						);
					}
				}
			}
		]
	};
};
