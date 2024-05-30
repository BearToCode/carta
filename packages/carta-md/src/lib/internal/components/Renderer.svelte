<!--
	@component
	This component wraps the Carta renderer and provides a debounced rendering
	for the editor.
-->

<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import type { Carta } from '../carta';
	import { debounce } from '../utils';

	/**
	 * The Carta instance to use.
	 */
	export let carta: Carta;
	/**
	 * The markdown content to render.
	 */
	export let value: string;
	/**
	 * The element that wraps the rendered HTML.
	 */
	export let elem: HTMLDivElement;

	let mounted = false;
	let renderedHtml = carta.renderSSR(value);

	// Debounce the rendering
	const debouncedRenderer = debounce(() => {
		carta
			.render(value)
			.then((rendered) => (renderedHtml = rendered))
			.then(() => events('render', void 0));
	}, carta.rendererDebounce ?? 300);

	$: {
		// On value updates
		value = value;
		debouncedRenderer();
	}

	onMount(() => carta.$setRenderer(elem));
	onMount(() => (mounted = true));

	const events = createEventDispatcher<{ render: void }>();
</script>

<div bind:this={elem} on:scroll class="carta-renderer markdown-body">
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html renderedHtml}
	{#if mounted}
		<slot />
	{/if}
</div>

<style>
	.carta-renderer {
		position: relative;
		word-wrap: break-word;
		word-break: break-word;
	}
</style>
