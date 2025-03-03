import flexsearch from 'flexsearch';
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';

export const documentName = 'search-index.json';

const getFilePath = (filename: string) => path.resolve('./static', filename);

export type StoredDocument = flexsearch.Document<IndexablePageFragment, true>;

export interface IndexablePageFragment {
	path: string;
	content: string;
	html: string;
	title: string;
}

export type EnrichedSearchResult = IndexablePageFragment & {
	match?: {
		heading?: {
			text: string;
			id: string;
		};
		text: string;
	};
};

/**
 * Create a new search index
 * @returns A promise that resolves to a new search index
 */
export async function createNewIndex(): Promise<StoredDocument> {
	console.log('Generating new search index...');

	return new flexsearch.Document<IndexablePageFragment, true>({
		tokenize: 'full',
		cache: true,
		context: true,
		document: {
			id: 'path',
			index: ['title', 'content'],
			store: true
		}
	});
}

/**
 * Load the search index from the file
 * @returns A promise that resolves to the search index loaded from the file, or null if the file does not exist
 */
export async function loadIndexFromFile(): Promise<StoredDocument | null> {
	console.log('Loading search index from file...');

	const filepath = getFilePath(documentName);
	try {
		const text = readFileSync(filepath, 'utf8');

		const json = await JSON.parse(text);

		const index = await createNewIndex();
		for (const [key, value] of Object.entries(json)) {
			index.add(key, value as IndexablePageFragment);
		}

		console.log('Search index loaded from file');

		return index;
	} catch (e) {
		const error = e as NodeJS.ErrnoException;

		// Check if the file was not found
		if (error.code === 'ENOENT') {
			console.log('Search index file not found');
			return null;
		}

		// Otherwise, log as error
		console.error('Error loading search index from file', e);
		return null;
	}
}

/**
 * Write the index to the file, overwriting the existing file if it exists
 * @param index The index to write to the file
 */
export async function writeIndexToFile(index: StoredDocument) {
	const filepath = getFilePath(documentName);
	const dirpath = path.dirname(filepath);

	console.log(`Writing search index to file: ${filepath}`);

	// Create directory recursively
	mkdirSync(dirpath, {
		recursive: true
	});

	const exportRecord: Record<string, IndexablePageFragment> = {};
	await index.export(function (key, value) {
		exportRecord[key] = value;
	});

	writeFileSync(filepath, JSON.stringify(exportRecord, null, 2), { encoding: 'utf8', flag: 'w' });
}

export async function addPageToIndex(index: StoredDocument, page: IndexablePageFragment) {
	console.log('Adding page to search index:', page.path);
	index.add(page.path, page);
}

export function enrichResult(result: IndexablePageFragment, query: string): EnrichedSearchResult {
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
