import {
	getHighlighter,
	type BundledTheme,
	type ThemeInput,
	type StringLiteralUnion,
	type BundledLanguage,
	type SpecialLanguage,
	type LanguageInput,
	type LanguageRegistration,
	type HighlighterGeneric,
	bundledLanguages,
	bundledThemes,
	type ThemeRegistration
} from 'shiki';
import type { Intellisense } from './utils';

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
	themes?: Array<ThemeInput | StringLiteralUnion<BundledTheme>>;
	langs?: (LanguageInput | StringLiteralUnion<BundledLanguage> | SpecialLanguage)[];
};

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
 * Language for the highlighter.
 */
export type Language = Intellisense<BundledLanguage | CustomMarkdownLangName>;
/**
 * Theme name for the highlighter.
 */
export type ThemeName = Intellisense<BundledTheme | DefaultLightThemeName | DefaultDarkThemeName>;
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
	// Inject rules into the custom markdown language
	const injectGrammarRules = (
		lang: Awaited<(typeof import('./assets/markdown'))['default']>,
		rules: GrammarRule[]
	) => {
		lang.repository = {
			...langDefinition.repository,
			...Object.fromEntries(rules.map(({ name, definition }) => [name, definition]))
		};
		for (const rule of rules) {
			if (rule.type === 'block') {
				lang.repository.block.patterns.unshift({ include: `#${rule.name}` });
			} else {
				lang.repository.inline.patterns.unshift({ include: `#${rule.name}` });
			}
		}
	};

	const injectHighlightRules = (theme: ThemeRegistration, rules: HighlightingRule[]) => {
		if (theme.type === 'light') {
			theme.tokenColors ||= [];
			theme.tokenColors.unshift(...rules.map(({ light }) => light));
		} else {
			theme.tokenColors ||= [];
			theme.tokenColors.unshift(...rules.map(({ dark }) => dark));
		}
	};

	// Additional themes and languages provided by the user
	const themes = shiki?.themes ?? [];
	const langs = shiki?.langs ?? [];

	const highlighter: HighlighterGeneric<BundledLanguage, BundledTheme> = await getHighlighter({
		themes,
		langs
	});

	// Custom markdown language
	const langDefinition = (await import('./assets/markdown')).default;
	injectGrammarRules(langDefinition, grammarRules);
	await highlighter.loadLanguage(langDefinition);

	// Custom themes
	if (isSingleTheme(theme)) {
		let registration: ThemeRegistration;
		if (isThemeRegistration(theme)) {
			registration = theme;
		} else {
			registration = (await bundledThemes[theme as BundledTheme]()).default;
		}

		injectHighlightRules(registration, highlightingRules);

		await highlighter.loadTheme(registration);
	} else {
		const { light, dark } = theme;

		let lightRegistration: ThemeRegistration;
		let darkRegistration: ThemeRegistration;

		if (isThemeRegistration(light)) {
			lightRegistration = light;
		} else {
			lightRegistration = (await bundledThemes[light as BundledTheme]()).default;
		}

		if (isThemeRegistration(dark)) {
			darkRegistration = dark;
		} else {
			darkRegistration = (await bundledThemes[dark as BundledTheme]()).default;
		}

		injectHighlightRules(lightRegistration, highlightingRules);
		injectHighlightRules(darkRegistration, highlightingRules);

		await highlighter.loadTheme(lightRegistration);
		await highlighter.loadTheme(darkRegistration);
	}

	return {
		theme,
		lang: customMarkdownLangName,
		...highlighter
	};
}
export interface Highlighter extends HighlighterGeneric<BundledLanguage, BundledTheme> {
	/**
	 * The language specified for the highlighter.
	 */
	theme: Theme | DualTheme;
	/**
	 * The theme specified for the highlighter.
	 */
	lang: Language;
}

/**
 * Checks if a language is a bundled language.
 * @param lang The language to check.
 * @returns Whether the language is a bundled language.
 */
export const isBundleLanguage = (lang: string): lang is BundledLanguage =>
	Object.keys(bundledLanguages).includes(lang);
/**
 * Checks if a theme is a bundled theme.
 * @param theme The theme to check.
 * @returns Whether the theme is a bundled theme.
 */
export const isBundleTheme = (theme: string): theme is BundledTheme =>
	Object.keys(bundledThemes).includes(theme);
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
 * Checks if a theme is a theme registration.
 * @param theme The theme to check.
 * @returns Whether the theme is a theme registration.
 */
export const isThemeRegistration = (theme: Theme): theme is ThemeRegistration =>
	typeof theme == 'object';

/**
 * Find all nested languages in the markdown text and load them into the highlighter.
 * @param text Markdown text to parse for nested languages.
 * @returns The set of nested languages found in the text.
 */
const findNestedLanguages = (text: string): Set<string> => {
	const languages = new Set<string>();

	const regex = /```([a-z]+)\n([\s\S]+?)\n```/g;
	let match: RegExpExecArray | null;
	while ((match = regex.exec(text))) {
		languages.add(match[1]);
	}
	return languages;
};

/**
 * Load all nested languages found in the markdown text into the highlighter.
 * @param highlighter The highlighter instance.
 * @param text The text to parse for nested languages.
 * @returns Whether the highlighter was updated with new languages.
 */
export const loadNestedLanguages = async (highlighter: Highlighter, text: string) => {
	text = text.replaceAll('\r\n', '\n'); // Normalize line endings

	const languages: Set<string> = findNestedLanguages(text);
	const loadedLanguages: Array<string> = highlighter.getLoadedLanguages();
	let updated: boolean = false;
	for (const lang: string of languages) {
		if (await loadLanguage(highlighter, lang, loadedLanguages))
			updated = true
	}

	return {
		updated
	};
};

/**
 * Load one language into the highlighter.
 * @param highlighter The highlighter instance.
 * @param lang The language to load.
 * @returns Whether the highlighter was updated with the new language.
 */
export const loadLanguage = async (highlighter: Highlighter, lang: string, loadedLanguages: Array<string> | undefined): Promise<boolean> => {
	if (!loadedLanguages)
		loadedLanguages = highlighter.getLoadedLanguages();

	let updated: boolean = false;
	if (isBundleLanguage(lang) && !loadedLanguages.includes(lang)) {
		await highlighter.loadLanguage(lang);
		loadedLanguages.push(lang);
		updated = true;
	}

	return updated;
};
