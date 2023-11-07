<script lang="ts">
	import { onMount } from 'svelte';
	import type { Carta } from '../carta';
	import { debounce } from '../utils';

	export let carta: Carta;
	export let value: string;
	export let elem: HTMLDivElement;
	export let handleScroll: (e: UIEvent) => void;

	let renderedHtml = carta.renderSSR(value);

	const debouncedRenderer = debounce(() => {
		carta.render(value).then((rendered) => (renderedHtml = rendered));
	}, carta.options?.rendererDebounce ?? 300);

	$: {
		// On value updates
		value = value;
		debouncedRenderer();
	}

	onMount(() => {
		carta.$setRenderer(elem);
	});
</script>

<div bind:this={elem} on:scroll={handleScroll} class="carta-renderer markdown-body">
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html renderedHtml}
	<slot />
</div>

<style>
	.carta-renderer {
		position: relative;
		word-wrap: break-word;
		word-break: break-word;
	}
</style>
