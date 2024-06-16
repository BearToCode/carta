<!-- 
	@component
	This component is used to render Markdown once after being parsed twice
	by Carta. The first parsing is done in the server-side rendering (SSR) and the
	second (async) parsing is done in the client-side rendering.
-->

<script lang="ts">
	import { onMount } from 'svelte';
	import type { Carta } from '.';

	/**
	 * The Carta instance to use.
	 */
	export let carta: Carta;
	/**
	 * Content to render.
	 */
	export let value: string;
	/**
	 * The theme to use, which translates to the CSS class `carta-theme__{theme}`.
	 */
	export let theme = 'default';

	let elem: HTMLDivElement;

	let rendered = carta.renderSSR(value);
	onMount(async () => {
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
