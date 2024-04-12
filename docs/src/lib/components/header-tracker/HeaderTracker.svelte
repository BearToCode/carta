<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { debounce, throttle } from '$lib/utils';
	import { onMount } from 'svelte';

	const PADDING = 80;

	export { className as class };

	let className = '';
	let headers: HTMLElement[] = [];
	let selectedHeaderIndex = 0;

	function retrieveHeaders() {
		headers = Array.from(
			document.querySelectorAll('.markdown > h1, .markdown > h2, .markdown > h3')
		) as HTMLElement[];
	}

	const highlightHeader = () => {
		for (let index = headers.length - 1; index >= 0; index--) {
			const header = headers[index];
			const rect = header.getBoundingClientRect();
			if (rect.top < PADDING) {
				selectedHeaderIndex = index;
				return;
			}
		}
		selectedHeaderIndex = 0;
	};

	const [throttledHighlightHeader] = throttle(highlightHeader, 100);
	const debouncedHighlightHeader = debounce(highlightHeader, 100);

	onNavigate(() => {
		setTimeout(() => {
			retrieveHeaders();
			highlightHeader();
		}, 300);
	});
	onMount(retrieveHeaders);
</script>

<svelte:window
	on:scroll={() => {
		throttledHighlightHeader();
		debouncedHighlightHeader(); // So it is called at the end of the scroll event
	}}
/>

<div class="h-full space-y-3 {className}">
	{#each headers as header, i}
		{@const margin = Number(header.tagName.split('')[1]) - 1}
		{#key selectedHeaderIndex}
			{#if header.children[0] instanceof HTMLAnchorElement && header.children[0].href}
				<a
					style="margin-left: {margin * 0.75}rem;"
					class="block text-sm {selectedHeaderIndex === i
						? 'font-medium text-sky-300'
						: 'text-neutral-400'}"
					href={header.children[0].href}>{header.innerText}</a
				>
			{/if}
		{/key}
	{/each}
</div>
