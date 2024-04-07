import { type Carta, type DualTheme, type Plugin, type Theme } from 'carta-md';
import type { BundledTheme, CodeOptionsSingleTheme } from 'shiki';
import { markedHighlight } from 'marked-highlight';

type ShikiOptions = Omit<CodeOptionsSingleTheme<BundledTheme>, 'theme' | 'lang'>;
interface CodeExtensionOptions {
	/**
	 * Shiki options for the highlighter. The language is automatically set to the code block's language.
	 * If you want to load a custom theme/lang, remember to provide the corresponding file when loading
	 * carta!
	 *
	 * ```ts
	 * const carta = new Carta({
	 *   shikiOptions: {
	 *     themes: [...],
	 *     langs: [...]
	 *   }
	 * });
	 * ```
	 */
	shikiOptions?: ShikiOptions;
	/**
	 * Default language for code blocks.
	 * @default 'plaintext'
	 */
	defaultLang?: string;
	/**
	 * Shiki theme to use for code highlighting.
	 * @default Theme specified for the editor
	 */
	theme: Theme | DualTheme;

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

/**
 * Carta code highlighting plugin. Themes available on [GitHub](https://github.com/speed-highlight/core/tree/main/dist/themes).
 */
export const code = (options?: CodeExtensionOptions): Plugin => {
	let carta: Carta;
	return {
		onLoad: ({ carta: c }) => (carta = c),
		markedExtensions: [
			markedHighlight({
				langPrefix: options?.customHighlight?.langPrefix,
				async: true,
				async highlight(code, lang) {
					if (options?.customHighlight) {
						return await options.customHighlight.highlighter(code, lang);
					}

					const highlighter = await carta.highlighter();

					const defaultLang = options?.defaultLang ?? 'plaintext';
					const theme = options?.theme ?? highlighter.theme;

					lang = lang || defaultLang;

					// Load the theme if it's not already loaded
					const loadTheme = async (theme: Theme) => {
						const themeName = highlighter.isThemeRegistration(theme) ? theme.name ?? '' : theme;
						if (
							!highlighter.getLoadedThemes().includes(themeName) &&
							highlighter.isBundleTheme(themeName)
						) {
							await highlighter.loadTheme(themeName);
						}
					};

					if (highlighter.isSingleTheme(theme)) {
						await loadTheme(theme);
					} else {
						await loadTheme(theme.light);
						await loadTheme(theme.dark);
					}

					// Load the language if it's not already loaded
					if (
						!highlighter.getLoadedLanguages().includes(lang) &&
						highlighter.isBundleLanguage(lang)
					) {
						await highlighter.loadLanguage(lang);
					}

					if (highlighter.isSingleTheme(theme)) {
						return highlighter.codeToHtml(code, { lang, theme, ...options?.shikiOptions });
					} else {
						return highlighter.codeToHtml(code, { lang, themes: theme, ...options?.shikiOptions });
					}
				}
			})
		]
	};
};
