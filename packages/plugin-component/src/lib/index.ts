import type { Listener, Plugin } from 'carta-md';
import { BROWSER } from 'esm-env';
import type * as hast from 'hast';
import { SKIP, visit } from 'unist-util-visit';

/**
 * A mapped component
 */
export type MappedComponent<T> = {
	/**
	 * A unique id for the component
	 */
	id: string;
	/**
	 * A function to match the component
	 */
	match: (node: hast.Element) => boolean;
	/**
	 * A function that renders the component (to an abstract syntax tree)
	 * @param node The node be replaced
	 * @returns The new nodes to replace the old node
	 */
	render: (node: hast.Element) => hast.Element[];
	/**
	 * A reference to the underlying component
	 */
	component: T;
};

/**
 * An initializer function that replaces placeholders with components
 */
export type Initializer<T> = (components: MappedComponent<T>[], renderer?: HTMLElement) => void;

/**
 * Standard HTML tags
 */
export const defaultTags = [
	'h1',
	'h2',
	'h3',
	'h4',
	'h5',
	'h6',
	'p',
	'blockquote',
	'ul',
	'ol',
	'li',
	'hr',
	'table',
	'thead',
	'tbody',
	'tr',
	'th',
	'td',
	'pre',
	'code',
	'em',
	'strong',
	'del',
	'a',
	'img'
] as const;

export type DefaultTag = (typeof defaultTags)[number];

/**
 * Carta component plugin. This plugin allows you to map custom components to HTML tags.
 * @param components A list of mapped components
 * @param callback Callback function to initialize components
 * @returns The plugin
 */
export const component = <T>(
	components: MappedComponent<T>[],
	callback: Initializer<T>
): Plugin => {
	return {
		transformers: [
			{
				execution: 'sync',
				type: 'rehype',
				transform: ({ processor }) => {
					processor.use(() => {
						return (tree: hast.Root) => {
							visit(tree, (node, index, parent) => {
								if (node.type !== 'element') return;

								const element = node as hast.Element;
								for (const component of components) {
									if (component.match(element)) {
										const nodes = component.render(element);

										parent!.children.splice(index!, 1, ...nodes);

										return [SKIP, index! + nodes.length];
									}
								}
							});
						};
					});
				}
			}
		],
		listeners: [
			[
				'carta-render',
				({ detail: { carta } }) => {
					if (!BROWSER) return;
					const renderer = carta.renderer;
					if (!renderer) return;
					// wait for DOM to be ready
					requestAnimationFrame(() => {
						callback(components, renderer.container);
					});
				}
			] satisfies Listener<'carta-render'>
		]
	};
};
