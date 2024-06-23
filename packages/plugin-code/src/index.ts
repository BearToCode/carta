import type { DualTheme, Plugin, Theme } from 'carta-md';
import type { RehypeShikiOptions } from '@shikijs/rehype';
import type { CartaBrowser } from 'carta-md/bundle/browser';
import { loadDefaultTheme } from 'carta-md/core/highlight';
import rehypeShiki from '@shikijs/rehype';

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

					if (carta.bundle() == 'browser') {
						theme ??= (carta as CartaBrowser).theme ?? (await loadDefaultTheme());
					}

					processor.use(rehypeShiki, {
						...options,
						...(typeof theme == 'object' && 'light' in theme && 'dark' in theme
							? { themes: theme as DualTheme }
							: { theme: theme as Theme })
					});
				}
			}
		]
	};
};
