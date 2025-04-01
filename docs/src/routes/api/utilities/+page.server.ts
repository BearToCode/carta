import { highlightCodeBlocks } from '$lib/components/code';
import { deindent } from '$lib/utils';

const codeBlocks = {
	carta_render: {
		lang: 'ts',
		code: deindent`
      const carta = new Carta({
        /* ... */
      });
      const markdown = '# Some Markdown';
      const html = await carta.render(markdown);`
	},
	carta_renderSSR: {
		lang: 'ts',
		code: deindent`
      const carta = new Carta({
        /* ... */
      });
      const markdown = '# Some Markdown';
      const html = carta.renderSSR(markdown);`
	},
	carta_bindToCaret: {
		lang: 'svelte',
		code: deindent`
      <script>
        export let carta;
      </script>

      <div use:carta.bindToCaret>
        <!-- ... -->
      </div>`
	},
	carta_highlighter: {
		lang: 'ts',
		code: deindent`
      const highlighter = await carta.highlighter();
			const shiki = highlighter.shikiHighlighter();
			const html = await shiki.codeToHtml('console.log('Hello World!')', { lang: 'js' });
			`
	},
	isBundleLanguage: {
		lang: 'ts',
		code: `export const isBundleLanguage = (lang: string): lang is BundledLanguage;`
	},
	isBundleTheme: {
		lang: 'ts',
		code: `export const isBundleTheme = (theme: string): theme is BundledTheme;`
	},
	isDualTheme: {
		lang: 'ts',
		code: `export const isDualTheme = (theme: Theme | DualTheme): theme is DualTheme;`
	},
	isSingleTheme: {
		lang: 'ts',
		code: `export const isSingleTheme = (theme: Theme | DualTheme): theme is Theme;`
	},
	isThemeRegistration: {
		lang: 'ts',
		code: `export const isThemeRegistration = (theme: Theme): theme is ThemeRegistration;`
	}
} as const;

export const load = async () => {
	return {
		codeBlocks: await highlightCodeBlocks(codeBlocks)
	};
};
