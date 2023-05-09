import type { CartaExtension } from 'carta-md';
import { highlightText } from '@speed-highlight/core';
import { detectLanguage } from '@speed-highlight/core/detect.js';

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
			{
				langPrefix: 'shj-lang-',
				highlight(code, lang, cb) {
					(async () => {
						lang ||= options?.defaultLanguage ?? '';
						if (lang) {
							try {
								const highlighted = await highlightText(code, lang, true, {
									hideLineNumbers: !(options?.lineNumbering ?? false)
								});
								cb && cb(undefined, highlighted);
								return;
							} catch (_) {
								/* empty */
							}
						}
						if (options?.autoDetect ?? true) {
							const detected = detectLanguage(code);
							const highlighted = await highlightText(code, detected, true, {
								hideLineNumbers: !(options?.lineNumbering ?? false)
							});
							cb && cb(undefined, highlighted);
							return;
						}
						cb && cb(undefined, 'basic');
					})();
				}
			}
		]
	};
};
