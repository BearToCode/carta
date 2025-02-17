<!-- 
	component
	This component is used to render Markdown once after being parsed twice
	by Carta. The first parsing is done in the server-side rendering (SSR) and the
	second (async) parsing is done in the client-side rendering.

	This component is not reactive. It is only rendered once. If you want to make it
	reactive, you need to destroy and recreate it using Svelte #key block.
-->

<script lang="ts">
	import { onMount } from 'svelte';
	import type { Carta } from './internal/carta';

	interface Props {
		/**
		 * The Carta instance to use.
		 */
		carta: Carta;
		/**
		 * Content to render.
		 */
		value: string;
		/**
		 * The theme to use, which translates to the CSS class `carta-theme__{theme}`.
		 */
		theme?: string;
	}

	let { carta, value, theme = 'default' }: Props = $props();

	let elem: HTMLDivElement | undefined = $state();

	let rendered = $state(carta.renderSSR(value));
	onMount(async () => {
		if (!elem) {
			throw new Error('No element found.');
		}
		// Register the renderer element
		carta.$setRenderer(elem);

		// Render using asynchronous renderer
		rendered = await carta.render(value);
	});
</script>

<div bind:this={elem} class="carta-viewer carta-theme__{theme} markdown-body">
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html rendered}
</div>
