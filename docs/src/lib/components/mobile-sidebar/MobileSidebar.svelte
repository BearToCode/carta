<script lang="ts">
	import { run } from 'svelte/legacy';

	import Sidebar from '../sidebar/Sidebar.svelte';
	import { page } from '$app/stores';

	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();
	let enabled = $state(false);

	run(() => {
		$page.url;
		enabled = false;
	});
</script>

<div class="container mb-4 w-full border-b border-neutral-800 px-4 pb-1 sm:px-6 {className}">
	<button onclick={() => (enabled = !enabled)} class="text-neutral-500 hover:text-neutral-200">
		<iconify-icon icon="ci:hamburger-lg" class="text-3xl"></iconify-icon>
	</button>
</div>

{#if enabled}
	<div class="fixed bottom-0 left-0 right-0 top-0 z-10 bg-neutral-950 bg-opacity-50"></div>

	<div class="fixed bottom-0 left-0 top-0 z-10 rounded-r-xl bg-neutral-900">
		<Sidebar class="w-[20rem] px-4 py-4" />
		<button
			onclick={() => (enabled = false)}
			class="absolute right-4 top-4 text-neutral-500 hover:text-neutral-200"
		>
			<iconify-icon icon="charm:cross" class="text-2xl"></iconify-icon>
		</button>
	</div>
{/if}
