<script lang="ts">
	import type { Carta } from 'carta-md';
	import type { SlashSnippet } from './index';
	import { onMount } from 'svelte';

	export let carta: Carta;
	export let snippets: SlashSnippet[];

	onMount(() => {
		console.log(carta, snippets);
	});
</script>
