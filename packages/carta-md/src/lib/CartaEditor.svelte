<script lang="ts">
	import CartaRenderer from './internal/components/CartaRenderer.svelte';
	import MarkdownInput from './internal/components/MarkdownInput.svelte';
	import type { Carta } from './internal/carta';

	export let carta: Carta;
	export let theme = 'default';
	export let value = '';
</script>

<div class="carta-editor__{theme}">
	<div class="carta-wrapper__{theme}">
		<MarkdownInput {carta} bind:value {theme} />
		<CartaRenderer {carta} bind:value {theme} />
	</div>
</div>

<style>
	div {
		display: flex;
		flex-grow: 1;
		flex-shrink: 0;
	}
</style>
