<script lang="ts">
	import { debounce, throttle } from '$lib/utils';
	import { trackedHeaders } from './headers.svelte';

	const Padding = 80;

	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();
	let selectedHeaderIndex = $state(0);

	const highlightHeader = () => {
		for (let index = trackedHeaders.length - 1; index >= 0; index--) {
			const header = trackedHeaders[index];
			const rect = header.element.getBoundingClientRect();
			if (rect.top < Padding) {
				selectedHeaderIndex = index;
				return;
			}
		}
		selectedHeaderIndex = 0;
	};

	const [throttledHighlightHeader] = throttle(highlightHeader, 100);
	const debouncedHighlightHeader = debounce(highlightHeader, 100);

	const getHeaderLevel = (header: HTMLElement) => {
		const tagName = header.tagName;
		return Number(tagName.split('')[1]);
	};

	const headerIsVisibleAmongSiblings = (header: HTMLElement) => {
		const level = getHeaderLevel(header);
		const sameLevelHeaders = trackedHeaders.filter((h) => getHeaderLevel(h.element) === level);
		const index = sameLevelHeaders.findIndex((h) => h.element === header);

		let selectedSameLevelHeaderIndex = 0;
		for (let i = sameLevelHeaders.length - 1; i >= 0; i--) {
			const rect = sameLevelHeaders[i].element.getBoundingClientRect();
			if (rect.top < Padding) {
				selectedSameLevelHeaderIndex = i;
				break;
			}
		}

		return selectedSameLevelHeaderIndex === index;
	};
</script>

<svelte:window
	onscroll={() => {
		throttledHighlightHeader();
		debouncedHighlightHeader(); // So it is called at the end of the scroll event
	}}
/>

<div class="h-full space-y-3 {className}">
	{#each trackedHeaders as header, i}
		{@const headerLevel = getHeaderLevel(header.element)}
		{@const margin = headerLevel - 1}
		{@const parentHeader = trackedHeaders
			.filter((_, j) => j < i)
			.findLast((h) => {
				const parentHeaderLevel = getHeaderLevel(h.element);
				return parentHeaderLevel === headerLevel - 1;
			})}
		{#key selectedHeaderIndex}
			{#if headerLevel <= 2 || (parentHeader && headerIsVisibleAmongSiblings(parentHeader.element))}
				{#if header.element.children[0] instanceof HTMLAnchorElement && header.element.children[0].href}
					<a
						style="margin-left: {margin * 0.75}rem;"
						class="block text-sm transition {selectedHeaderIndex === i
							? 'font-medium text-sky-300'
							: 'text-neutral-400'}"
						href={header.element.children[0].href}
						>{header.element.innerText}
					</a>
				{/if}
			{/if}
		{/key}
	{/each}
</div>
