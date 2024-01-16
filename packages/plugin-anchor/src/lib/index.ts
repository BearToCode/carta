import type { CartaExtension } from 'carta-md';
import { generateUniqueSlug } from './slug';
export * from './default.css?inline';

export interface AnchorExtensionOptions {
	/**
	 * Maximum depth of headers to generate anchors for. Defaults to 6.
	 */
	maxDepth?: number;
}

/**
 * Carta anchor plugin. Adds support to render anchor links in header tags.
 */
export const anchor = (options?: AnchorExtensionOptions): CartaExtension => {
	let slugs: string[] = [];

	const maxDepth = options?.maxDepth ?? 6;

	return {
		// Reset the slug history after rendering completes, so the links persist after re-rendering
		listeners: [
			['carta-render', () => (slugs = [])],
			['carta-render-ssr', () => (slugs = [])]
		],
		markedExtensions: [
			{
				renderer: {
					heading(text, level, raw) {
						if (level > maxDepth) {
							return false;
						}

						const slug = generateUniqueSlug(raw, slugs);

						return `
          		<h${level}>
          		  <span>${text}</span>
          		  <a id="${slug}" href="#${slug}" class="anchor-link">
          		    <svg xmlns="http://www.w3.org/2000/svg"
									 viewBox="0 0 16 16" width="16" height="16"><path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"></path></svg>
          		  </a>
          		</h${level}>`;
					}
				}
			}
		]
	};
};
