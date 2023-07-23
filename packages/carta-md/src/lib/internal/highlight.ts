import { detectLanguage } from '@speed-highlight/core/detect';
import { highlightText, loadLanguage } from '@speed-highlight/core';

export type HighlightRule =
	| { type: string; match: RegExp }
	| { extand: string }
	| {
			match: RegExp;
			sub:
				| string
				| ((code: string) => { type: string; sub: Array<{ match: RegExp; sub: string }> });
	  };

export type HighlightLanguage = Array<HighlightRule>;

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
	lang: string,
	hideLineNumbers?: boolean
): Promise<string | null> {
	try {
		return await highlightText(text, lang, true, { hideLineNumbers });
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
	const lang = detectLanguage(text);
	return await highlightText(text, lang, true, { hideLineNumbers });
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
export function loadCustomLanguage(id: string, langModule: { default: HighlightLanguage }) {
	return loadLanguage(id, langModule);
}

export interface HighlightFunctions {
	highlight: typeof highlight;
	highlightAutodetect: typeof highlightAutodetect;
	loadCustomLanguage: typeof loadCustomLanguage;
}
