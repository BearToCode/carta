import { dev } from '$app/environment';
import { base } from '$app/paths';
import {
	addPageToIndex,
	createNewIndex,
	loadIndexFromFile,
	writeIndexToFile,
	type IndexablePageFragment
} from '$lib/search';
import type { Handle } from '@sveltejs/kit';
import { JSDOM } from 'jsdom';

async function saveHtml(html: string, pathname: string) {
	const dom = new JSDOM(html);
	const contentElement = dom.window.document.querySelector('.searchable-content');
	const titleElement = dom.window.document.querySelector('.title');
	if (!contentElement) {
		console.warn(`No content found for ${pathname}`);
		return;
	}
	if (!titleElement) {
		console.warn(`No title found for ${pathname}`);
		return;
	}

	const searchableHtml = contentElement.innerHTML;
	const title = titleElement.textContent ?? '';

	const fragment: IndexablePageFragment = {
		path: pathname,
		content: contentElement.textContent ?? '',
		html: searchableHtml,
		title: title
	};

	const index = (await loadIndexFromFile()) ?? (await createNewIndex());
	await addPageToIndex(index, fragment);
	await writeIndexToFile(index);
}

/**
 * Runs at build time, used to render all the pages into static HTML and then txt, to be
 * able to be searched by the search engine.
 */
export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	const pathname = dev ? event.url.pathname : event.url.pathname.slice(base.length);

	if (!event.isDataRequest) {
		if (!response.bodyUsed) {
			const clone = response.clone();
			const html = await clone.text();
			await saveHtml(html, pathname);
		} else {
			console.warn(`Response body already used for ${pathname}`);
		}
	}

	return response;
};
