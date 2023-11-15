<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	const PADDING = 80;

	export { className as class };

	let className = '';
	let headers: HTMLElement[] = [];
	let scrollY = 0;

	function retrieveHeaders() {
		const markdownContainer = document.querySelector('.markdown');
		if (!markdownContainer) return;
		headers = Array.from(markdownContainer.querySelectorAll('h1, h2, h3')) as HTMLElement[];
	}

	function highlightHeader(header: HTMLElement, nextHeader: HTMLElement | null, index: number) {
		const headerHasReachedTop = header.getBoundingClientRect().top <= PADDING || index == 0;
		const nextHeaderReachedTop = nextHeader && nextHeader.getBoundingClientRect().top <= PADDING;
		return !nextHeaderReachedTop && headerHasReachedTop;
	}

	let observer: MutationObserver;

	onMount(() => {
		observer = new MutationObserver(retrieveHeaders);
		observer.observe(document.body, { childList: true, subtree: true });
		retrieveHeaders();
	});

	onDestroy(() => {
		observer?.disconnect();
	});
</script>

<svelte:window bind:scrollY />

<div class="h-full space-y-3 {className}">
	{#each headers as header, i}
		{@const nextHeader = headers[i + 1]}
		{#if header.children[0] instanceof HTMLAnchorElement && header.children[0].href}
			{#key scrollY}
				<a
					class="block text-sm {highlightHeader(header, nextHeader, i)
						? 'font-medium text-sky-300'
						: 'text-neutral-400'}"
					href={header.children[0].href}>{header.innerText}</a
				>
			{/key}
		{/if}
	{/each}
</div>
