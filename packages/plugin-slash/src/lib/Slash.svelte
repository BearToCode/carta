<script lang="ts">
	import type { Carta } from 'carta-md';
	import type { SlashSnippet } from './snippets';
	import type { TransitionConfig } from 'svelte/transition';
	import { onDestroy, onMount } from 'svelte';

	export let carta: Carta;
	export let snippets: SlashSnippet[];
	export let inTransition: (node: Element) => TransitionConfig;
	export let outTransition: (node: Element) => TransitionConfig;

	let visible = false;
	let hoveringIndex = 0;
	let filter = '';
	let slashPosition = 0;
	let filteredSnippets = snippets;
	let groupedSnippets: [string, SlashSnippet[]][];
	let snippetsElements: HTMLButtonElement[] = Array(snippets.length);

	onMount(() => {
		carta.input?.textarea.addEventListener('keydown', handleKeyDown);
		carta.input?.textarea.addEventListener('keyup', handleKeyUp);
		carta.input?.textarea.addEventListener('click', hide);
		carta.input?.textarea.addEventListener('blur', hide);
	});

	onDestroy(() => {
		carta.input?.textarea.removeEventListener('keydown', handleKeyDown);
		carta.input?.textarea.removeEventListener('keyup', handleKeyUp);
		carta.input?.textarea.removeEventListener('click', hide);
		carta.input?.textarea.removeEventListener('blur', hide);
	});

	function hide() {
		visible = false;
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (!carta.input) return;
		if (visible) {
			if (e.key === ' ' || e.key === 'Escape' || (e.key === 'Backspace' && filter === '')) {
				// Close
				visible = false;
			} else if (e.key === 'Enter') {
				// Use snippet
				e.preventDefault();
				const selectedSnippet = filteredSnippets.at(hoveringIndex);
				if (!selectedSnippet) return;
				useSnippet(selectedSnippet);
				visible = false;
			} else {
				// Check for arrows
				if (e.key === 'ArrowUp') {
					e.preventDefault();
					hoveringIndex = (hoveringIndex - 1 + filteredSnippets.length) % filteredSnippets.length;
				} else if (e.key === 'ArrowDown') {
					e.preventDefault();
					hoveringIndex = (hoveringIndex + 1 + filteredSnippets.length) % filteredSnippets.length;
				}
			}
		} else if (e.key === '/') {
			// Open
			visible = true;
			slashPosition = carta.input.textarea.selectionStart + 1;
			filter = '';
		}
	}

	function handleKeyUp(e: KeyboardEvent) {
		if (!carta.input) return;
		if (!visible) return;
		// Has moved out of slash argument
		if (carta.input.textarea.selectionStart < slashPosition) {
			visible = false;
		} else if (e.key.length === 1 || e.key === 'Backspace') {
			filter = carta.input.textarea.value.slice(slashPosition, carta.input.textarea.selectionStart);
			filteredSnippets = snippets.filter(snippetFilter);
			hoveringIndex = 0;
		}
	}

	const snippetFilter = (snippet: SlashSnippet) => {
		if (!filter) return true;
		const lower = filter.toLowerCase();
		return (
			snippet.title.toLowerCase().includes(lower) ||
			snippet.description.toLowerCase().includes(lower)
		);
	};

	// Groups items by common key
	type ObjectKey = string | number | symbol;
	export const groupBy = <K extends ObjectKey, TItem extends Record<K, ObjectKey>>(
		items: TItem[],
		key: K
	): Record<ObjectKey, TItem[]> =>
		items.reduce(
			(result, item) => ({
				...result,
				[item[key]]: [...(result[item[key]] || []), item]
			}),
			{} as Record<ObjectKey, TItem[]>
		);

	const getSnippetIndex = (groupIndex: number, elemIndex: number) => {
		// Count of previous elements
		const prevCount = groupedSnippets
			.filter((_, i) => i < groupIndex)
			.reduce<number>((acc, [, curr]) => acc + curr.length, 0);
		return prevCount + elemIndex;
	};

	function useSnippet(snippet: SlashSnippet) {
		if (!carta.input) return;
		// Remove slash and filter
		carta.input.removeAt(slashPosition - 1, filter.length + 1);
		carta.input.textarea.selectionStart = slashPosition - 1;
		snippet.action(carta.input);
		carta.input.update();
	}

	$: groupedSnippets = Object.entries(groupBy(filteredSnippets, 'group'));

	$: {
		// Scroll to make hovering snippet always visible
		const hovering = filteredSnippets.at(hoveringIndex);
		if (hovering) {
			const snipElem = snippetsElements[hoveringIndex];
			snipElem?.scrollIntoView({
				behavior: 'smooth',
				block: 'nearest'
			});
		}
	}
</script>

{#if visible && filteredSnippets.length > 0}
	<div class="carta-slash" in:inTransition out:outTransition use:carta.bindToCaret>
		{#each groupedSnippets as [group, snippets], groupIndex}
			<span class="carta-slash-group">
				{group}
			</span>
			{#each snippets as snippet, elemIndex}
				<button
					bind:this={snippetsElements[getSnippetIndex(groupIndex, elemIndex)]}
					on:click={() => useSnippet(snippet)}
					class={getSnippetIndex(groupIndex, elemIndex) === hoveringIndex ? 'carta-active' : ''}
				>
					<span class="carta-snippet-title">
						{snippet.title}
					</span>
					<span class="carta-snippet-description">
						{snippet.description}
					</span>
				</button>
			{/each}
		{/each}
	</div>
{/if}

<style>
	.carta-slash {
		position: absolute;
	}

	.carta-slash span {
		display: block;
	}
</style>
