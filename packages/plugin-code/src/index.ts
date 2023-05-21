import type { CartaExtension } from 'carta-md';
import { highlightText } from '@speed-highlight/core';
import { detectLanguage } from '@speed-highlight/core/detect.js';
import { markedHighlight } from 'marked-highlight';

interface CodeExtensionOptions {
	/**
	 * Default language when none is provided.
	 */
	defaultLanguage?: string;
	/**
	 * Whether to autodetect a language when none is provided.
	 * Overwritten by `defaultLanguage`.
	 */
	autoDetect?: string;
	/**
	 * Line numbering.
	 * @defaults false.
	 */
	lineNumbering?: boolean;
}

/**
 * Carta code highlighting plugin. Themes available at https://github.com/speed-highlight/core/tree/main/dist/themes.
 */
export const code = (options?: CodeExtensionOptions): CartaExtension => {
	return {
		markedExtensions: [
			markedHighlight({
				langPrefix: 'shj-lang-',
				async: true,
				async highlight(code, lang) {
					lang ||= options?.defaultLanguage ?? '';
					if (lang) {
						try {
							return await highlightText(code, lang, true, {
								hideLineNumbers: !(options?.lineNumbering ?? false)
							});
						} catch (_) {
							/* empty */
						}
					}
					if (options?.autoDetect ?? true) {
						const detected = detectLanguage(code);
						return await highlightText(code, detected, true, {
							hideLineNumbers: !(options?.lineNumbering ?? false)
						});
					}
					return await highlightText(code, 'plain', true, {
						hideLineNumbers: !(options?.lineNumbering ?? false)
					});
				}
			})
		]
	};
};
