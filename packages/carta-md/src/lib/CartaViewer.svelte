<script lang="ts">
	import { onMount } from 'svelte';
	import type { Carta } from './';

	export let carta: Carta;
	export let value: string;
	export let theme = 'default';

	let elem: HTMLDivElement;

	let rendered = carta.renderSSR(value);
	onMount(async () => {
		carta.$setRenderer(elem);
		// Add code syntax highlighting (if plugin is present) once loaded on the client.
		rendered = await carta.render(value);
	});
</script>

<div bind:this={elem} class="carta-viewer__{theme} markdown-body">
	{@html rendered}
</div>
