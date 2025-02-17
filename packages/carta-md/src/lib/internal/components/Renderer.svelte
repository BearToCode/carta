<!--
	@component
	This component wraps the Carta renderer and provides a debounced rendering
	for the editor.
-->

<script lang="ts">
	import { run, createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();
	import { createEventDispatcher, onMount, type Snippet } from 'svelte';
	import type { Carta } from '../carta';
	import { debounce } from '../utils';

	interface Props {
		/**
		 * The Carta instance to use.
		 */
		carta: Carta;
		/**
		 * The markdown content to render.
		 */
		value: string;
		/**
		 * The element that wraps the rendered HTML.
		 */
		elem: HTMLDivElement;
		/**
		 * Whether this component is hidden (display: none).
		 */
		hidden?: boolean;
		children?: Snippet;
	}

	let { carta, value, elem = $bindable(), hidden = false, children }: Props = $props();

	let mounted = $state(false);
	let renderedHtml = $state(carta.renderSSR(value));

	// Debounce the rendering
	const debouncedRenderer = debounce((value: string) => {
		carta
			.render(value)
			.then((rendered) => {
				renderedHtml = ''; // Force @html to re-render everything
				renderedHtml = rendered;
			})
			.then(() => events('render', void 0));
	}, carta.rendererDebounce ?? 300);

	const onValueChange = (value: string) => {
		debouncedRenderer(value);
	};

	run(() => {
		if (mounted) onValueChange(value);
	});

	onMount(() => carta.$setRenderer(elem));
	onMount(() => (mounted = true));

	const events = createEventDispatcher<{ render: void }>();
</script>

<div
	class="carta-renderer markdown-body"
	style="display: {hidden ? 'none' : 'unset'};"
	bind:this={elem}
	onscroll={bubble('scroll')}
>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html renderedHtml}
	{#if mounted}
		{@render children?.()}
	{/if}
</div>

<style>
	.carta-renderer {
		position: relative;
		word-wrap: break-word;
		word-break: break-word;
	}
</style>
