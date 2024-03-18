import { detectLanguage } from '@speed-highlight/core/detect';
import {
	highlightText,
	loadLanguage,
	type ShjLanguage,
	type ShjToken
} from '@speed-highlight/core';
import type { CartaExtension } from './carta';
import cartaMarkdown from './shj';
import type { Intellisense } from './utils';

export type HighlightLanguage = Intellisense<ShjLanguage>;

export type ShjLanguageComponent =
	| { type: ShjToken; match: RegExp }
	| { extend: string }
	| {
			match: RegExp;
			sub:
				| string
				| ((code: string) => {
						type: ShjToken;
						sub: Array<{ match: RegExp; sub: string | Promise<string> }>;
				  });
	  };

export type ShjLanguageDefinition = Array<ShjLanguageComponent>;

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
	lang: HighlightLanguage,
	hideLineNumbers?: boolean
): Promise<string | null> {
	try {
		return await highlightText(text, lang as ShjLanguage, true, {
			hideLineNumbers: hideLineNumbers ?? true
		});
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
	// FIXME: this is wrong! There are wrong typings in the latest version of speed-highlight :(
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
export function loadCustomMarkdown(extensions: CartaExtension[] = []) {
	const highlightRules = extensions.map((ext) => ext.highlightRules ?? []).flat();
	const lang = [];
	lang.push(...cartaMarkdown, ...highlightRules);
	loadCustomLanguage('cartamd', { default: lang });
}
