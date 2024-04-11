import rehypeSlug, { type Options as SlugOptions } from 'rehype-slug';
import rehypeAutolinkHeadings, { type Options as AutolinkOptions } from 'rehype-autolink-headings';
import type { Plugin } from 'carta-md';
export * from './default.css?inline';

export interface AnchorExtensionOptions {
	/**
	 * rehype-slug options.
	 */
	slug?: SlugOptions;
	/**
	 * rehype-autolink-headings options.
	 */
	autolink?: AutolinkOptions;
}

/**
 * Carta anchor plugin. Adds support to render anchor links in header tags.
 */
export const anchor = (options?: AnchorExtensionOptions): Plugin => {
	return {
		transformers: [
			{
				execution: 'sync',
				type: 'rehype',
				transform({ processor }) {
					processor.use(rehypeSlug, options?.slug).use(rehypeAutolinkHeadings, options?.autolink);
				}
			}
		]
	};
};
