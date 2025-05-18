<!--
	@component
	This component wraps the Carta renderer and provides a debounced rendering
	for the editor.
-->

<script lang="ts">
	import type { Carta } from '../carta';
	import type { UIEventHandler } from 'svelte/elements';
	import { onMount, type Snippet } from 'svelte';
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
		elem: HTMLDivElement | undefined;
		/**
		 * Whether this component is hidden (display: none).
		 */
		hidden?: boolean;
		children?: Snippet;
		onscroll: UIEventHandler<HTMLDivElement>;
		onrender: () => void;
	}

	let {
		carta,
		value,
		elem = $bindable(),
		hidden = false,
		children,
		onscroll,
		onrender
	}: Props = $props();

	let mounted = $state(false);
	let htmlContainer = $state<HTMLDivElement>();

	// Debounce the rendering
	const debouncedRenderer = debounce((value: string) => {
		carta
			.render(value)
			.then((rendered) => {
				htmlContainer!.innerHTML = rendered;
			})
			.then(() => onrender());
	}, carta.rendererDebounce ?? 300);

	const onValueChange = (value: string) => {
		debouncedRenderer(value);
	};

	$effect(() => {
		if (mounted) onValueChange(value);
	});

	onMount(() => {
		if (elem) carta.$setRenderer(elem);
		mounted = true;
	});
</script>

<div
	class="carta-renderer markdown-body"
	style="display: {hidden ? 'none' : 'unset'};"
	bind:this={elem}
	{onscroll}
>
	<div bind:this={htmlContainer} style="display: contents;">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html carta.renderSSR(value)}
	</div>
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
