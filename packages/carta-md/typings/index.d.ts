declare module '@speed-highlight/core' {
	export type ShjOptions = {
		hideLineNumbers?: boolean;
	};

	/**
	 * @function highlightText
	 * @async
	 * Highlight a string passed as argument and return it
	 * @example
	 * elm.innerHTML = await highlightText(code, 'js');
	 * @param {String} src The code
	 * @param {String} lang The language of the code
	 * @param {Boolean} [multiline=true] If it is multiline, it will add a wrapper for the line numbering and header
	 * @param {ShjOptions} [opt={}] Customization options
	 * @returns {Promise<String>} The highlighted string
	 */
	export function highlightText(
		src: string,
		lang: string,
		multiline?: boolean,
		opt?: ShjOptions
	): Promise<string>;

	export type ShjLanguage = Array<
		| { type: string; match: RegExp }
		| { extand: string }
		| {
				match: RegExp;
				sub:
					| string
					| ((code: string) => { type: string; sub: Array<{ match: RegExp; sub: string }> });
		  }
	>;

	/**
	 * @function loadLanguage
	 * Load a language and add it to the langs object
	 * @param {String} languageName The name of the language
	 * @param {ShjLanguage} language The language
	 */
	export function loadLanguage(languageName: string, language: Language): Promise<void>;
}

declare module '@speed-highlight/core/detect' {
	/**
	 * @function detectLanguage
	 * Try to find the language the given code belong to
	 * @param {String} code The code
	 * @returns {ShjLanguage} The language of the code
	 */
	export function detectLanguage(code: string): string;
}
