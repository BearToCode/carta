<script lang="ts">
	import { onMount } from 'svelte';
	import { loadNestedLanguages, type Carta } from '.';

	export let carta: Carta;
	export let value: string;
	export let theme = 'default';

	let elem: HTMLDivElement;

	let rendered = carta.renderSSR(value);
	onMount(async () => {
		carta.$setRenderer(elem);

		// Load highlighting languages
		const highlighter = await carta.highlighter();
		await loadNestedLanguages(highlighter, value);

		// Render using asynchronous renderer
		rendered = await carta.render(value);
	});
</script>

<div bind:this={elem} class="carta-viewer carta-theme__{theme} markdown-body">
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html rendered}
</div>
