import type { Action } from 'svelte/action';

type TrackableHeader = {
	id: string;
	element: HTMLElement;
};

/**
 * The headers that are currently being tracked
 */
export const trackedHeaders: TrackableHeader[] = $state([]);

function toSlug(text: string) {
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
	const id = toSlug(text ?? '');
	const element = node as HTMLElement;
	element.id = id;

	// Wrap the inner content in a Anchor tag
	const anchor = document.createElement('a');
	anchor.href = `#${id}`;
	anchor.textContent = text;
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
