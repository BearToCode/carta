declare module '@speed-highlight/core' {
	export type ShjLanguage = string;

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
	 * @param {ShjLanguage} lang The language of the code
	 * @param {Boolean} [multiline=true] If it is multiline, it will add a wrapper for the line numbering and header
	 * @param {ShjOptions} [opt={}] Customization options
	 * @returns {Promise<String>} The highlighted string
	 */
	export function highlightText(
		src: string,
		lang: ShjLanguage,
		multiline?: boolean,
		opt?: ShjOptions
	): Promise<string>;
}

declare module '@speed-highlight/core/detect.js' {
	/**
	 * @function detectLanguage
	 * Try to find the language the given code belong to
	 * @param {String} code The code
	 * @returns {ShjLanguage} The language of the code
	 */
	export function detectLanguage(code: string): ShjLanguage;
}
