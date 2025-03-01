import { codeToHtml } from 'shiki';

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

/**
 * Highlights the code blocks.
 * @param codeBlocks The code blocks to highlight
 * @returns The highlighted code blocks
 */
export async function highlightCodeBlocks<T extends string>(codeBlocks: RegisteredCodeBlocks<T>) {
	const highlightedCodeBlocks: HighlightedCodeBlocks<T> = {} as HighlightedCodeBlocks<T>;

	for (const key in codeBlocks) {
		const codeBlock = codeBlocks[key];
		const html = await codeToHtml(codeBlock.code, {
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
