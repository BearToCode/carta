import type { DefaultTag, MappedComponent } from '$lib';
import type { SvelteComponent } from 'svelte';
import type * as hast from 'hast';
import { BROWSER } from 'esm-env';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import { EXIT, visit } from 'unist-util-visit';

/**
 * Export the Slot component
 */
export { default as Slot } from './Slot.svelte';

/**
 * Map a Svelte component to a tag
 * @param tag The tag to match
 * @param component The Svelte component to replace the tag with
 * @returns The mapped component
 */
export const svelte = <T extends Record<string, unknown>>(
	tag: DefaultTag,
	component: typeof SvelteComponent<T>
): MappedComponent<typeof SvelteComponent> => {
	return svelteCustom(tag, (node) => node.tagName === tag, component);
};

/**
 * Register a custom Svelte component
 * @param id The id of the component
 * @param match A function to match the component
 * @param component The Svelte component to replace the tag with
 * @returns The mapped component
 */
export const svelteCustom = <T extends Record<string, unknown>>(
	id: string,
	match: (node: hast.Element) => boolean,
	component: typeof SvelteComponent<T>
): MappedComponent<typeof SvelteComponent> => {
	return {
		id,
		match,
		component: component as typeof SvelteComponent,
		render(node) {
			if (BROWSER) {
				const placeholder: hast.Element = {
					tagName: 'div',
					type: 'element',
					children: node.children,
					properties: {
						'data-component': id,
						...node.properties
					}
				};
				return [placeholder];
			} else {
				// @ts-expect-error The .render component is not picked up by the svelte intellisense
				// docs here: https://svelte.dev/docs/server-side-component-api
				const html: string = component.render(node.properties).html;

				const root = unified().use(rehypeParse).parse(html);
				const htmlElem = root.children[0] as hast.Element;
				const bodyElem = htmlElem.children[1] as hast.Element;

				// Find the `slot` component and add children to it
				let slot: { elem: hast.Element; index: number; parent: hast.Element } | undefined;

				visit(bodyElem, (node, index, parent) => {
					if (
						node.type === 'element' &&
						node.tagName === 'div' &&
						node.properties['dataSlot'] === ''
					) {
						slot = {
							elem: node as hast.Element,
							index: index as number,
							parent: parent as hast.Element
						};
						return [EXIT];
					}
				});

				if (slot) {
					slot.parent.children.splice(slot.index, 1, ...node.children);
				}

				return bodyElem.children as hast.Element[];
			}
		}
	};
};

export const initializeComponents = (
	components: MappedComponent<typeof SvelteComponent>[],
	renderer = document.body
) => {
	// Remove previously mounted components
	const mountedComponents = renderer.querySelectorAll(
		'[data-mounted-component]'
	) as NodeListOf<HTMLElement>;
	for (const component of mountedComponents) {
		component.remove();
	}

	const placeholders = renderer.querySelectorAll('[data-component]') as NodeListOf<HTMLElement>;
	for (const placeholder of placeholders) {
		const id = placeholder.dataset.component;

		if (!id) {
			console.error('Component placeholder does not have a data-component attribute');
			continue;
		}

		const component = components.find((c) => c.id === id);
		if (!component) {
			console.error(`Component with id ${id} not found`);
			continue;
		}

		const props = Array.from(placeholder.attributes)
			.filter((attr) => attr.name !== 'data-component')
			.map((attr) => ({
				[attr.name]: attr.value
			}))
			.reduce((acc, curr) => ({ ...acc, ...curr }), {});

		const wrapper = document.createElement('div');
		wrapper.setAttribute('data-mounted-component', id);
		wrapper.style.display = 'contents';
		placeholder.replaceWith(wrapper);

		new component.component({
			target: wrapper,
			props
		});

		// Add children to the slot
		const slot = wrapper.querySelector('[data-slot]') as HTMLElement | undefined;
		if (!slot) continue;

		slot.replaceWith(...placeholder.childNodes);
	}
};
