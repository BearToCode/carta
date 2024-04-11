<script lang="ts">
	import * as Command from '$lib/components/ui/command';
	import type { Document } from 'flexsearch';
	import {
		enrichResult,
		initializeSearch,
		type EnrichedSearchResult,
		type SearchResult
	} from '$lib/search';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';

	export { className as class };

	let open = false;
	let value = '';
	let className = '';
	let index: Document<SearchResult, true>;
	let results: EnrichedSearchResult[] = [];

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			open = !open;
		}
	}

	function search(query: string) {
		if (!index || !query) {
			results = [];
			return;
		}

		const pages = new Map<string, SearchResult>();
		const searchResult = index
			.search(query, 5, { enrich: true })
			.map((res) => res.result)
			.flat();
		for (const res of searchResult) {
			pages.set(res.doc.path, enrichResult(res.doc, value));
		}

		results = Array.from(pages.values()).slice(0, 5);
	}

	onMount(async () => {
		index = await initializeSearch();
	});

	$: search(value);
</script>

<svelte:window on:keydown={handleKeydown} />

<button on:click={() => (open = !open)} class="mr-2 block aspect-square md:hidden">
	<iconify-icon icon="ion:search" class="text-2xl text-neutral-200"></iconify-icon>
</button>

<button
	class="hidden w-[360px] items-center justify-between rounded-lg border border-neutral-700 bg-neutral-900 px-2 py-1.5 text-sm md:flex {className}"
	on:click={() => (open = !open)}
>
	<div class="inline-flex items-center space-x-2">
		<iconify-icon icon="ion:search" class="text-xl text-neutral-500"></iconify-icon>
		<span class="text-neutral-500">Search...</span>
	</div>
	<kbd
		class="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100"
	>
		<span class="text-xs">⌘</span>K
	</kbd>
</button>

<Command.Dialog shouldFilter={false} bind:open>
	<Command.Input bind:value placeholder="Search anything..." />
	<Command.List>
		{#if value}
			<Command.Empty>No results found.</Command.Empty>
			<Command.Group>
				{#each results as result}
					<Command.Item
						onSelect={() => {
							if (result.match?.heading) goto(`${base}/${result.path}#${result.match.heading.id}`);
							else goto(`${base}/${result.path}`);
							open = false;
						}}
						class="group"
						value={result.title}
					>
						<h2 class="text-base font-medium">
							{result.title}

							{#if result.match?.heading}
								<span class="text-neutral-400"> - {result.match.heading.text}</span>
							{/if}
						</h2>

						{#if result.match}
							<p class="line-clamp-1 pr-8 text-sm text-neutral-400">{result.match.text}</p>
						{/if}

						<div class="absolute right-2 top-1/2 hidden -translate-y-1/2 group-aria-selected:block">
							<iconify-icon icon="mi:enter" class="text-xl text-neutral-400"></iconify-icon>
						</div>
					</Command.Item>
				{/each}
			</Command.Group>
		{/if}
	</Command.List>
</Command.Dialog>
