import { detectLanguage } from '@speed-highlight/core/detect.js';
import {
	highlightText,
	loadLanguage,
	type ShjLanguage,
	type ShjLanguageDefinition
} from '@speed-highlight/core';
import type { CartaExtension } from './carta';
import cartaMarkdown from './shj';

// Workaround to add intellisense
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Nothing {}
type Union<T, U> = T | (U & Nothing);

type Lang = Union<ShjLanguage, string>;

/**
 * Highlight text using Speed-Highlight. May return null on error(usually if requested
 * language is not supported).
 * @param text Text to highlight.
 * @param lang Language to use, for example "js" or "c"
 * @param hideLineNumbers Whether to hide line numbering.
 * @returns Highlighted html text.
 */
export async function highlight(
	text: string,
	lang: Lang,
	hideLineNumbers?: boolean
): Promise<string | null> {
	try {
		return await highlightText(text, lang, true, { hideLineNumbers: hideLineNumbers ?? true });
	} catch (_) {
		return null;
	}
}

/**
 * Highlight text using Speed-Highlight with detected language.
 * @param text Text to highlight.
 * @param hideLineNumbers Whether to hide line numbering.
 * @returns Highlighted html text.
 */
export async function highlightAutodetect(text: string, hideLineNumbers?: boolean) {
	const lang = await detectLanguage(text);
	return await highlightText(text, lang, true, { hideLineNumbers: hideLineNumbers ?? true });
}

/**
 * Load a custom language for reference in highlight rules.
 * @param id Id of the language.
 * @param langModule A module that has the default export set to an array of HighlightRule.
 * @example
 * ```
 * // language.ts
 * import type { HighlightLanguage } from 'carta-md';
 *
 * export default [
 *   {
 * 		match: /helloworld/g,
 *      type: 'kwd'
 * 	 }
 * ] satisfies HighlightLanguage;
 * ```
 * And in another file:
 * ```
 * import("./path/to/language")
 *   .then(module => Carta.loadCustomLanguage("lang-name", module));
 * ```
 */
export function loadCustomLanguage(id: string, langModule: { default: ShjLanguageDefinition }) {
	return loadLanguage(id, langModule);
}

export interface HighlightFunctions {
	highlight: typeof highlight;
	highlightAutodetect: typeof highlightAutodetect;
	loadCustomLanguage: typeof loadCustomLanguage;
}

/**
 * Load custom markdown syntax highlighting rules.
 * Automatically called when a Carta instance is created.
 * @param extensions Additional extensions used in Carta.
 */
export async function loadCustomMarkdown(extensions: CartaExtension[] = []) {
	const highlightRules = extensions.map((ext) => ext.highlightRules ?? []).flat();
	const lang = Array.prototype.concat(cartaMarkdown, highlightRules);
	loadCustomLanguage('cartamd', { default: lang });
}
