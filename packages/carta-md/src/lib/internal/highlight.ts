import type {
	BundledTheme,
	BundledLanguage,
	LanguageRegistration,
	ThemeRegistration,
	HighlighterCore,
	DynamicImportLanguageRegistration,
	DynamicImportThemeRegistration
} from 'shiki';
import type { Intellisense } from './utils';
import customMarkdown from './assets/markdown';
import getWasm from 'shiki/wasm';

/**
 * Custom TextMate grammar rule for the highlighter.
 */
export type GrammarRule = {
	name: string;
	type: 'block' | 'inline';
	definition: LanguageRegistration['repository'][string];
};

/**
 * Custom TextMate highlighting rule for the highlighter.
 */
export type HighlightingRule = {
	light: NonNullable<ThemeRegistration['tokenColors']>[number];
	dark: NonNullable<ThemeRegistration['tokenColors']>[number];
};

/**
 * Shiki options for the highlighter.
 */
export type ShikiOptions = {
	bundle?: ShikiBundle;
	themes?: Array<Theme>;
	langs?: Array<Language>;
};

export type ShikiBundle = () => Promise<{
	bundledLanguages: Record<string, DynamicImportLanguageRegistration>;
	bundledThemes: Record<string, DynamicImportThemeRegistration>;
}>;

type CustomMarkdownLangName = Awaited<(typeof import('./assets/markdown'))['default']['name']>;
type DefaultLightThemeName = Awaited<(typeof import('./assets/theme-light'))['default']['name']>;
type DefaultDarkThemeName = Awaited<(typeof import('./assets/theme-dark'))['default']['name']>;
export const customMarkdownLangName: CustomMarkdownLangName = 'cartamd';
export const defaultLightThemeName: DefaultLightThemeName = 'carta-light';
export const defaultDarkThemeName: DefaultDarkThemeName = 'carta-dark';
export const loadDefaultTheme = async (): Promise<{
	light: ThemeRegistration;
	dark: ThemeRegistration;
}> => ({
	light: structuredClone((await import('./assets/theme-light')).default),
	dark: structuredClone((await import('./assets/theme-dark')).default)
});

/**
 * Language name for the highlighter.
 */
export type LanguageName = Intellisense<BundledLanguage | CustomMarkdownLangName>;
/**
 * Theme name for the highlighter.
 */
export type ThemeName = Intellisense<BundledTheme | DefaultLightThemeName | DefaultDarkThemeName>;
/**
 * Language for the highlighter.
 */
export type Language = LanguageName | LanguageRegistration;
/**
 * Theme for the highlighter.
 */
export type Theme = ThemeName | ThemeRegistration;
/**
 * Dual theme for light and dark mode.
 */
export type DualTheme = {
	light: Theme;
	dark: Theme;
};

/**
 * Options for the highlighter.
 */
export type HighlighterOptions = {
	grammarRules: GrammarRule[];
	highlightingRules: HighlightingRule[];
	theme: Theme | DualTheme;
	shiki?: ShikiOptions;
};

/**
 * Loads the highlighter instance, with custom rules and options. Uses Shiki under the hood.
 * @param rules Custom rules for the highlighter, from plugins.
 * @param options Custom options for the highlighter.
 * @returns The highlighter instance.
 */
export async function loadHighlighter({
	grammarRules,
	highlightingRules,
	theme,
	shiki
}: HighlighterOptions): Promise<Highlighter> {
	const highlighter = new Highlighter({
		grammarRules,
		highlightingRules
	});
	const bundle = shiki?.bundle;
	const themes = shiki?.themes ?? [];
	const langs = shiki?.langs ?? [];

	await highlighter.loadBundle(bundle);
	for (const lang of langs) {
		await highlighter.loadLanguage(lang);
	}
	for (const theme of themes) {
		await highlighter.loadTheme(theme);
	}

	await highlighter.loadLanguage(customMarkdown);
	// The markdown theme does not need to be loaded

	await highlighter.setMarkdownLanguage(customMarkdown);
	await highlighter.setMarkdownTheme(theme);

	return highlighter;
}

export class Highlighter {
	private mGrammarRules: GrammarRule[];
	private mHighlightingRules: HighlightingRule[];

	private mShiki: HighlighterCore | undefined;
	private mBundledLanguages: Record<string, DynamicImportLanguageRegistration> = {};
	private mBundledThemes: Record<string, DynamicImportThemeRegistration> = {};
	private mTheme: Theme | DualTheme | undefined;
	private mLang: Language | undefined;

	public get shiki() {
		return this.mShiki;
	}
	public get bundledLanguages() {
		return this.mBundledLanguages;
	}
	public get bundledThemes() {
		return this.mBundledThemes;
	}
	public get theme() {
		return this.mTheme;
	}
	public get lang() {
		return this.mLang;
	}

	constructor({
		grammarRules,
		highlightingRules
	}: {
		grammarRules: GrammarRule[];
		highlightingRules: HighlightingRule[];
	}) {
		this.mGrammarRules = grammarRules;
		this.mHighlightingRules = highlightingRules;
	}

	/**
	 * Loads a bundle into the highlighter.
	 * @param bundle The bundle to load.
	 */
	public async loadBundle(bundle?: ShikiBundle) {
		if (bundle) {
			const module = await bundle();
			this.mBundledLanguages = module.bundledLanguages;
			this.mBundledThemes = module.bundledThemes;
		}
		const module = await import('shiki/core');
		this.mShiki = await module.getHighlighterCore({
			loadWasm: getWasm
		});
	}

	/**
	 * Loads a theme into the highlighter.
	 * @param language The language to load.
	 */
	public async loadLanguage(language: Language) {
		if (this.isLanguageRegistration(language)) {
			await this.shiki?.loadLanguage(language);
		} else if (this.isBundleLanguage(language)) {
			await this.shiki?.loadLanguage(this.bundledLanguages[language]);
		} else {
			console.error(
				'Failed to load language, probably it is not included in the current bundle: ',
				language
			);
		}
	}

	/**
	 * Loads a theme into the highlighter.
	 * @param theme The theme to load.
	 */
	public async loadTheme(theme: Theme) {
		if (this.isThemeRegistration(theme)) {
			await this.shiki?.loadTheme(theme);
		} else if (this.isBundleTheme(theme)) {
			const registration = (await this.bundledThemes[theme]()).default;
			await this.shiki?.loadTheme(registration);
		} else {
			console.error(
				'Failed to load theme, probably it is not included in the current bundle: ',
				theme
			);
		}
	}

	/**
	 * Sets the language used by the highlighter.
	 * @param language The language to set.
	 */
	public async setMarkdownLanguage(language: Language) {
		if (this.isLanguageRegistration(language)) {
			this.injectGrammarRules(language);
		} else {
			const [registration] = (await this.bundledLanguages[language]()).default;
			this.injectGrammarRules(registration);
		}

		this.mLang = language;
	}

	/**
	 * Sets the theme used by the highlighter to highlight custom markdown.
	 * @param theme The theme to set.
	 */
	public async setMarkdownTheme(theme: Theme | DualTheme) {
		const loadIfNeeded = async (theme: Theme) => {
			if (this.isThemeRegistration(theme)) {
				this.injectHighlightingRules(theme);
			} else {
				const registration = (await this.bundledThemes[theme]()).default;
				this.injectHighlightingRules(registration);
			}
		};

		if (this.isSingleTheme(theme)) {
			await loadIfNeeded(theme);
		} else {
			await loadIfNeeded(theme.light);
			await loadIfNeeded(theme.dark);
		}
		this.mTheme = theme;
	}

	/**
	 * Highlights markdown text.
	 * @param markdown The markdown to highlight.
	 * @returns The highlighted HTML.
	 */
	public highlightMarkdown(markdown: string) {
		if (this.isLanguageRegistration(this.mLang!)) {
			return this.highlight(markdown, this.mLang!.name);
		} else {
			return this.highlight(markdown, this.mLang!);
		}
	}

	/**
	 * Highlights code with a specific language.
	 * @param code The code to highlight
	 * @param lang The language of the code
	 * @returns The highlighted HTML
	 */
	public highlight(code: string, lang: string) {
		// console.log(lang, this.mTheme, this.shiki?.getLanguage('cartamd'));
		if (this.isSingleTheme(this.theme!)) {
			return this.shiki?.codeToHtml(code, {
				lang,
				theme: this.theme!
			});
		} else {
			return this.shiki?.codeToHtml(code, {
				lang,
				themes: this.theme!
			});
		}
	}

	/**
	 * Checks if a language is a bundled language.
	 * @param lang The language to check.
	 * @returns Whether the language is a bundled language.
	 */
	public isBundleLanguage = (lang: string): lang is BundledLanguage =>
		Object.keys(this.bundledLanguages).includes(lang);

	/**
	 * Checks if a theme is a bundled theme.
	 * @param theme The theme to check.
	 * @returns Whether the theme is a bundled theme.
	 */
	public isBundleTheme = (theme: string): theme is BundledTheme =>
		Object.keys(this.bundledThemes).includes(theme);

	/**
	 * Checks if a theme is a dual theme.
	 * @param theme The theme to check.
	 * @returns Whether the theme is a dual theme.
	 */
	public isDualTheme = (theme: Theme | DualTheme): theme is DualTheme =>
		typeof theme == 'object' && 'light' in theme && 'dark' in theme;

	/**
	 * Checks if a theme is a single theme.
	 * @param theme The theme to check.
	 * @returns Whether the theme is a single theme.
	 */
	public isSingleTheme = (theme: Theme | DualTheme): theme is Theme => !this.isDualTheme(theme);

	/**
	 * Checks if a language is a language registration.
	 * @param lang The language to check.
	 * @returns Whether the language is a language registration.
	 */
	public isLanguageRegistration = (lang: Language): lang is LanguageRegistration =>
		typeof lang == 'object';

	/**
	 * Checks if a theme is a theme registration.
	 * @param theme The theme to check.
	 * @returns Whether the theme is a theme registration.
	 */

	public isThemeRegistration = (theme: Theme): theme is ThemeRegistration =>
		typeof theme == 'object';

	/**
	 * Find all nested languages in the markdown text and load them into the highlighter.
	 * @param text Markdown text to parse for nested languages.
	 * @returns The set of nested languages found in the text.
	 */
	public findNestedLanguages = (text: string) => {
		const languages = new Set<string>();

		const regex = /```(\w+)$/gm;
		let match: RegExpExecArray | null;
		while ((match = regex.exec(text))) {
			languages.add(match[1]);
		}
		return languages;
	};

	/**
	 * Load all nested languages found in the markdown text into the highlighter.
	 * @param text The text to parse for nested languages.
	 * @returns Whether the highlighter was updated with new languages.
	 */
	public loadNestedLanguages = async (text: string) => {
		text = text.replaceAll('\r\n', '\n'); // Normalize line endings

		const languages = this.findNestedLanguages(text);
		const loadedLanguages = this.shiki!.getLoadedLanguages();
		let updated = false;
		for (const lang of languages) {
			if (this.isBundleLanguage(lang) && !loadedLanguages.includes(lang)) {
				await this.loadLanguage(lang);
				loadedLanguages.push(lang);
				updated = true;
			}
		}

		return {
			updated
		};
	};

	/**
	 * Inject custom Markdown grammar rules into the language.
	 * @param lang The language to inject the grammar rules into.
	 */
	private injectGrammarRules(lang: LanguageRegistration) {
		lang.repository = {
			...lang.repository,
			...Object.fromEntries(this.mGrammarRules.map(({ name, definition }) => [name, definition]))
		};
		for (const rule of this.mGrammarRules) {
			if (rule.type === 'block') {
				lang.repository.block.patterns!.unshift({ include: `#${rule.name}` });
			} else {
				lang.repository.inline.patterns!.unshift({ include: `#${rule.name}` });
			}
		}
	}

	/**
	 * Inject custom Markdown highlighting rules into the theme.
	 * @param theme The theme to inject the highlighting rules into.
	 */
	private injectHighlightingRules(theme: ThemeRegistration) {
		if (theme.type === 'light') {
			theme.tokenColors ||= [];
			theme.tokenColors.unshift(...this.mHighlightingRules.map(({ light }) => light));
		} else {
			theme.tokenColors ||= [];
			theme.tokenColors.unshift(...this.mHighlightingRules.map(({ dark }) => dark));
		}
	}
}
