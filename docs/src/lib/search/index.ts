import flexsearch from 'flexsearch';
import type { SvelteComponent } from 'svelte';

export interface SearchResult {
	path: string;
	content: string;
	html: string;
	title: string;
}

export type EnrichedSearchResult = SearchResult & {
	match?: {
		heading?: {
			text: string;
			id: string;
		};
		text: string;
	};
};

export async function initializeSearch() {
	const indexedPages = new flexsearch.Document<SearchResult, true>({
		tokenize: 'full',
		cache: true,
		context: true,
		document: {
			id: 'path',
			index: ['title', 'content'],
			store: true
		}
	});

	const pages = import.meta.glob('../../pages/**/*.svelte.md');
	await Promise.all(
		Object.keys(pages).map(async (page) => {
			const module = (await pages[page]()) as {
				default: typeof SvelteComponent;
				metadata: Record<string, unknown>;
			};
			const elem = document.createElement('div');
			new module.default({ target: elem });

			const path = page.replace('../../pages/', '').replace('.svelte.md', '');
			const title = module.metadata.title as string;
			const html = elem.innerHTML;
			const content = extractText(module.default);

			indexedPages.add({
				path,
				html,
				title,
				content
			});
		})
	);
	return indexedPages;
}

function extractText(component: typeof SvelteComponent) {
	const parentElem = document.createElement('div');
	new component({ target: parentElem });

	const text = parentElem.textContent ?? '';
	// Remove extra spaces
	return text.replace(/\s+/g, ' ').trim();
}

export function enrichResult(result: SearchResult, query: string): EnrichedSearchResult {
	let heading: HTMLHeadingElement | null = null;

	const parentElem = document.createElement('div');
	parentElem.innerHTML = result.html;

	for (const node of parentElem.childNodes) {
		const content = node.textContent?.replaceAll('\n', '').replace(/\s+/g, ' ').trim() ?? '';
		if (['h1', 'h2', 'h3'].includes(node.nodeName.toLowerCase())) {
			heading = node as HTMLHeadingElement;
		}
		if (content?.toLowerCase().includes(query.toLowerCase())) {
			return {
				...result,
				match: {
					heading: heading
						? {
								text: heading.textContent ?? '',
								id: heading.id
						  }
						: undefined,
					text: content
				}
			};
		}
	}

	return result;
}
