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
	/**
	 * Whether this component is hidden (display: none).
	 */
	export let hidden = false;

	let mounted = false;
	let renderedHtml = carta.renderSSR(value);

	// Debounce the rendering
	const debouncedRenderer = debounce((value: string) => {
		carta
			.render(value)
			.then((rendered) => (renderedHtml = rendered))
			.then(() => events('render', void 0));
	}, carta.rendererDebounce ?? 300);

	const onValueChange = (value: string) => {
		debouncedRenderer(value);
	};

	$: if (mounted) onValueChange(value);

	onMount(() => carta.$setRenderer(elem));
	onMount(() => (mounted = true));

	const events = createEventDispatcher<{ render: void }>();
</script>

<div
	class="carta-renderer markdown-body"
	style="display: {hidden ? 'none' : 'unset'};"
	bind:this={elem}
	on:scroll
>
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
