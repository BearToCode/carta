import { math } from '@cartamd/plugin-math';
import { Carta, isBundleLanguage } from 'carta-md';

export type CodeBlock = {
	lang: string;
	code: string;
};

export type HighlightedCodeBlock = {
	lang: string;
	code: string;
	html: string;
};

export type RegisteredCodeBlocks<T extends string = string> = {
	[key in T]: CodeBlock;
};

export type HighlightedCodeBlocks<T extends string = string> = {
	[key in T]: HighlightedCodeBlock;
};

const carta = new Carta({
	sanitizer: false,
	theme: 'houston',
	extensions: [math()],
	shikiOptions: {
		themes: ['houston']
	}
});

/**
 * Highlights the code blocks.
 * @param codeBlocks The code blocks to highlight
 * @returns The highlighted code blocks
 */
export async function highlightCodeBlocks<T extends string>(
	codeBlocks: RegisteredCodeBlocks<T>
): Promise<HighlightedCodeBlocks<T>> {
	const highlightedCodeBlocks: HighlightedCodeBlocks<T> = {} as HighlightedCodeBlocks<T>;

	const highlighter = await carta.highlighter();
	if (!highlighter) {
		throw new Error('Failed to get highlighter');
	}

	const loadedLanguages = highlighter.getLoadedLanguages();

	for (const key in codeBlocks) {
		const codeBlock = codeBlocks[key];

		if (isBundleLanguage(codeBlock.lang) && !loadedLanguages.includes(codeBlock.lang)) {
			await highlighter.loadLanguage(codeBlock.lang);
			loadedLanguages.push(codeBlock.lang);
		}

		const html = highlighter.codeToHtml(codeBlock.code, {
			lang: codeBlock.lang,
			theme: 'houston'
		});

		highlightedCodeBlocks[key] = {
			lang: codeBlock.lang,
			code: codeBlock.code,
			html
		};
	}

	return highlightedCodeBlocks;
}
