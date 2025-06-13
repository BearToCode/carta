import * as shiki from 'shiki';
import type { Intellisense, MaybePromise } from './utils';

/**
 * Custom TextMate grammar rule for the highlighter.
 */
export type GrammarRule = {
	name: string;
	type: 'block' | 'inline';
	definition: shiki.LanguageRegistration['repository'][string];
};

/**
 * Custom TextMate highlighting rule for the highlighter.
 */
export type HighlightingRule = {
	light: NonNullable<shiki.ThemeRegistration['tokenColors']>[number];
	dark: NonNullable<shiki.ThemeRegistration['tokenColors']>[number];
};

/**
 * Language for the highlighter.
 */
export type Language = Intellisense<shiki.BundledLanguage | CustomMarkdownLangName>;

/**
 * Theme name for the highlighter.
 */
export type ThemeName = Intellisense<
	shiki.BundledTheme | DefaultLightThemeName | DefaultDarkThemeName
>;

/**
 * Theme for the highlighter.
 */
export type Theme = ThemeName | shiki.ThemeRegistration;

/**
 * Dual theme for light and dark mode.
 */
export type DualTheme = {
	light: Theme;
	dark: Theme;
};

/**
 * Shiki options for the highlighter.
 */
export type ShikiOptions = {
	themes?: Array<shiki.ThemeInput | shiki.StringLiteralUnion<shiki.BundledTheme>>;
	langs?: (
		| shiki.LanguageInput
		| shiki.StringLiteralUnion<shiki.BundledLanguage>
		| shiki.SpecialLanguage
	)[];
};

/**
 * Options for the highlighter.
 */
export type HighlighterOptions = {
	/**
	 * Custom grammar rules for the highlighter.
	 */
	grammarRules: GrammarRule[];
	/**
	 * Custom highlighting rules for the highlighter.
	 */
	highlightingRules: HighlightingRule[];
	/**
	 * Theme for the highlighter.
	 */
	theme: Theme | DualTheme;
	/**
	 * Additional options for shiki.
	 */
	shiki?: ShikiOptions;
};

type CustomMarkdownLangName = Awaited<(typeof import('./assets/markdown'))['default']['name']>;
type DefaultLightThemeName = Awaited<(typeof import('./assets/theme-light'))['default']['name']>;
type DefaultDarkThemeName = Awaited<(typeof import('./assets/theme-dark'))['default']['name']>;

export const customMarkdownLangName: CustomMarkdownLangName = 'cartamd';
export const defaultLightThemeName: DefaultLightThemeName = 'carta-light';
export const defaultDarkThemeName: DefaultDarkThemeName = 'carta-dark';

/**
 * Load the return the default light and dark themes.
 * @returns The default light and dark themes.
 */
export async function loadDefaultTheme() {
	return {
		light: structuredClone((await import('./assets/theme-light')).default),
		dark: structuredClone((await import('./assets/theme-dark')).default)
	} satisfies DualTheme;
}

/**
 * Checks if a language is a bundled language.
 * @param lang The language to check.
 * @returns Whether the language is a bundled language.
 */
export const isBundleLanguage = (lang: string): lang is shiki.BundledLanguage =>
	Object.keys(shiki.bundledLanguages).includes(lang);

/**
 * Checks if a theme is a bundled theme.
 * @param theme The theme to check.
 * @returns Whether the theme is a bundled theme.
 */
export const isBundleTheme = (theme: string): theme is shiki.BundledTheme =>
	Object.keys(shiki.bundledThemes).includes(theme);

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
export const isThemeRegistration = (theme: Theme): theme is shiki.ThemeRegistration =>
	typeof theme == 'object';

/**
 * Injects custom grammar rules into the language definition.
 * @param lang The language definition to inject the rules into.
 * @param rules The grammar rules to inject.
 * @returns The language definition with the injected rules.
 */
export function injectGrammarRules(
	lang: Awaited<(typeof import('./assets/markdown'))['default']>,
	rules: GrammarRule[]
) {
	lang.repository = {
		...lang.repository,
		...Object.fromEntries(rules.map(({ name, definition }) => [name, definition]))
	};
	for (const rule of rules) {
		if (rule.type === 'block') {
			lang.repository.block.patterns.unshift({ include: `#${rule.name}` });
		} else {
			lang.repository.inline.patterns.unshift({ include: `#${rule.name}` });
		}
	}
}

/**
 * Injects custom highlighting rules into the theme.
 * @param theme The theme to inject the rules into.
 * @param rules The highlighting rules to inject.
 * @returns The theme with the injected rules.
 */
export function injectHighlightRules(theme: shiki.ThemeRegistration, rules: HighlightingRule[]) {
	if (theme.type === 'light') {
		theme.tokenColors ||= [];
		theme.tokenColors.unshift(...rules.map(({ light }) => light));
	} else {
		theme.tokenColors ||= [];
		theme.tokenColors.unshift(...rules.map(({ dark }) => dark));
	}
}

/**
 * Highlighter instance for the highlighter manager.
 */
export type Highlighter = {
	/**
	 * Shortcut for highlighting a code block using the highlighter specific language
	 * and theme.
	 * @param code The code to highlight.
	 * @returns The highlighted code.
	 */
	codeToHtml: (code: string) => string;
	/**
	 * Gets the underlying shiki highlighter instance.
	 * @returns The underlying shiki highlighter instance.
	 */
	shikiHighlighter: () => ShikiHighlighter;
	settings: {
		/**
		 * The language hash assigned to this highlighter instance.
		 * It's the id of the language registered to shiki.
		 */
		langHash: string;
		/**
		 * The theme hash assigned to this highlighter instance.
		 * It's the id of the theme registered to shiki.
		 */
		themeHash:
			| string
			| {
					light: string;
					dark: string;
			  };
	};
	/**
	 * Reexported utilities functions.
	 */
	utils: {
		isBundleLanguage: typeof isBundleLanguage;
		isBundleTheme: typeof isBundleTheme;
		isDualTheme: typeof isDualTheme;
		isSingleTheme: typeof isSingleTheme;
		isThemeRegistration: typeof isThemeRegistration;
	};
};

export type ShikiHighlighter = shiki.HighlighterGeneric<shiki.BundledLanguage, shiki.BundledTheme>;

export type HighlighterManager = {
	shikiHighlighter: ShikiHighlighter;
	highlighters: Highlighter[];
};

// Store a single highlighter manager, with multiple languages if necessary.
let manager: MaybePromise<HighlighterManager> | null = null;

async function getManager() {
	if (manager !== null) return manager;

	// Immediately assign a promise to the manager variable
	// to prevent multiple calls to getManager from creating multiple instances
	// since shiki.getHighlighter is an async function.
	manager = (async () => ({
		shikiHighlighter: await shiki.createHighlighter({
			langs: [],
			themes: []
		}),
		highlighters: []
	}))();

	return manager;
}

/**
 * Simple hash function to generate a hash from a string.
 */
function simpleHash(str: string, seed = 0) {
	let h1 = 0xdeadbeef ^ seed,
		h2 = 0x41c6ce57 ^ seed;
	for (let i = 0, ch; i < str.length; i++) {
		ch = str.charCodeAt(i);
		h1 = Math.imul(h1 ^ ch, 2654435761);
		h2 = Math.imul(h2 ^ ch, 1597334677);
	}
	h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
	h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
	h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
	h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

	return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

function langAndGrammarHash(lang: string, rules: GrammarRule[]) {
	const grammarHash = rules
		.map(({ name }) => name)
		.toSorted()
		.join('');
	return `${lang}-${simpleHash(`${lang}${grammarHash}`)}`;
}

function themeAndHighlightingHash(theme: ThemeName, rules: HighlightingRule[]) {
	const highlightingHash = rules
		.map((rule) => `${rule.light}${rule.dark}`)
		.toSorted()
		.join('');
	return `${theme}-${simpleHash(`${theme}${highlightingHash}`)}`;
}

export async function loadHighlighter(options: HighlighterOptions): Promise<Highlighter> {
	const { grammarRules, highlightingRules, theme, shiki: shikiOptions } = options;
	const manager = await getManager();

	// Additional themes and languages provided by the user
	const langs = shikiOptions?.langs ?? [];
	const themes = shikiOptions?.themes ?? [];

	const loadedLangs = manager.shikiHighlighter.getLoadedLanguages();
	const loadedThemes = manager.shikiHighlighter.getLoadedThemes();

	const langsToLoad = langs.filter(
		(lang) => typeof lang != 'string' || !loadedLangs.includes(lang)
	);
	const themesToLoad = themes.filter(
		(theme) => typeof theme != 'string' || !loadedThemes.includes(theme)
	);

	manager.shikiHighlighter.loadLanguage(...(langsToLoad as shiki.LanguageInput[]));
	manager.shikiHighlighter.loadTheme(...(themesToLoad as shiki.ThemeInput[]));

	// Custom markdown language
	const langDefinition = (await import('./assets/markdown')).default;
	const langHash = langAndGrammarHash(langDefinition.name, grammarRules);

	// Check if there is an existing highlighter with the same language and grammar hash
	const langAlreadyLoaded = manager.highlighters.find(
		(highlighter) => highlighter.settings.langHash === langHash
	);

	if (!langAlreadyLoaded) {
		const langClone = structuredClone(langDefinition);
		// Load the custom language
		injectGrammarRules(langClone, grammarRules);
		(langClone as shiki.LanguageRegistration).name = langHash;
		await manager.shikiHighlighter.loadLanguage(langClone);
	}

	let themeHash: string | { light: string; dark: string };

	// Themes
	if (isSingleTheme(theme)) {
		let themeRegistration: shiki.ThemeRegistration;
		if (isThemeRegistration(theme)) {
			themeRegistration = theme;
		} else {
			themeRegistration = (await shiki.bundledThemes[theme as shiki.BundledTheme]()).default;
		}

		themeHash = themeAndHighlightingHash(themeRegistration.name ?? 'unknown', highlightingRules);

		const existingHighlighter = manager.highlighters.find(
			(highlighter) => highlighter.settings.themeHash === themeHash
		);

		if (!existingHighlighter) {
			const langClone: shiki.ThemeRegistration = structuredClone(langDefinition);
			injectHighlightRules(langClone, highlightingRules);
			langClone.name = themeHash;
			await manager.shikiHighlighter.loadTheme(langClone);
		}
	} else {
		const { light, dark } = theme;

		let lightRegistration: shiki.ThemeRegistration;
		let darkRegistration: shiki.ThemeRegistration;

		if (isThemeRegistration(light)) {
			lightRegistration = light;
		} else {
			lightRegistration = (await shiki.bundledThemes[light as shiki.BundledTheme]()).default;
		}

		if (isThemeRegistration(dark)) {
			darkRegistration = dark;
		} else {
			darkRegistration = (await shiki.bundledThemes[dark as shiki.BundledTheme]()).default;
		}

		const lightHash = themeAndHighlightingHash(
			lightRegistration.name ?? 'unknown',
			highlightingRules
		);
		const darkHash = themeAndHighlightingHash(
			darkRegistration.name ?? 'unknown',
			highlightingRules
		);

		themeHash = { light: lightHash, dark: darkHash };

		const existingHighlighter = manager.highlighters.find(
			(highlighter) =>
				highlighter.settings.themeHash === lightHash || highlighter.settings.themeHash === darkHash
		);

		if (!existingHighlighter) {
			const lightClone: shiki.ThemeRegistration = structuredClone(lightRegistration);
			const darkClone: shiki.ThemeRegistration = structuredClone(darkRegistration);
			injectHighlightRules(lightClone, highlightingRules);
			injectHighlightRules(darkClone, highlightingRules);
			lightClone.name = lightHash;
			darkClone.name = darkHash;
			await manager.shikiHighlighter.loadTheme(lightClone);
			await manager.shikiHighlighter.loadTheme(darkClone);
		}
	}

	const highlighter: Highlighter = {
		codeToHtml: (code) => {
			if (isSingleTheme(theme)) {
				// Single theme
				return manager.shikiHighlighter.codeToHtml(code, {
					lang: langHash,
					theme: themeHash as string,
					tabindex: -1
				});
			} else {
				// Dual theme
				return manager.shikiHighlighter.codeToHtml(code, {
					lang: langHash,
					themes: {
						light: (themeHash as { light: string; dark: string }).light as string,
						dark: (themeHash as { light: string; dark: string }).dark as string
					},
					tabindex: -1
				});
			}
		},
		shikiHighlighter: () => manager.shikiHighlighter,
		settings: {
			langHash,
			themeHash
		},
		utils: {
			isBundleLanguage,
			isBundleTheme,
			isDualTheme,
			isSingleTheme,
			isThemeRegistration
		}
	};

	manager.highlighters.push(highlighter);
	return highlighter;
}

/**
 * Find all nested languages in the markdown text and load them into the highlighter.
 * @param text Markdown text to parse for nested languages.
 * @returns The set of nested languages found in the text.
 */
const findNestedLanguages = (text: string) => {
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
 * @param highlighter The highlighter instance.
 * @param text The text to parse for nested languages.
 * @returns Whether the highlighter was updated with new languages.
 */
export const loadNestedLanguages = async (highlighter: Highlighter, text: string) => {
	text = text.replaceAll('\r\n', '\n'); // Normalize line endings

	const languages = findNestedLanguages(text);
	const loadedLanguages = highlighter.shikiHighlighter().getLoadedLanguages();
	let updated = false;
	for (const lang of languages) {
		if (isBundleLanguage(lang) && !loadedLanguages.includes(lang)) {
			await highlighter.shikiHighlighter().loadLanguage(lang);
			loadedLanguages.push(lang);
			updated = true;
		}
	}

	return {
		updated
	};
};
