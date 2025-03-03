import type { Action } from 'svelte/action';

type TrackableHeader = {
	id: string;
	element: HTMLElement;
};

/**
 * The headers that are currently being tracked
 */
export const trackedHeaders: TrackableHeader[] = $state([]);

/**
 * Converts a string to a slug
 * @param text The string to convert
 */
export function toSlug(text: string) {
	return text
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^a-z0-9-]/g, '');
}

/**
 * Svelte action to track a header element
 * @param node The header element to track
 */
export const track: Action = (node) => {
	const text = node.textContent;
	const id = node.id;
	if (!id) {
		console.warn(`Header element with text "${text}" does not have an id`);
		return;
	}

	const element = node as HTMLElement;
	element.id = id;

	// Wrap the inner content in a Anchor tag
	const anchor = document.createElement('a');
	anchor.href = `#${id}`;
	anchor.innerHTML = element.innerHTML;
	element.innerHTML = '';
	element.appendChild(anchor);

	trackedHeaders.push({ id, element });
	return {
		destroy() {
			const index = trackedHeaders.findIndex((header) => header.element === element);
			trackedHeaders.splice(index, 1);
		}
	};
};
