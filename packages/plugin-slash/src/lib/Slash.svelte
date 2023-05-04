<script lang="ts">
	import type { Carta } from 'carta-md';
	import type { SlashSnippet } from './snippets';
	import type { TransitionConfig } from 'svelte/transition';
	import { onMount } from 'svelte';

	export let carta: Carta;
	export let snippets: SlashSnippet[];
	export let inTransition: (node: Element) => TransitionConfig;
	export let outTransition: (node: Element) => TransitionConfig;

	let visible = false;
	let caretPosition = { x: 0, y: 0 };
	let hoveringIndex = 0;
	let filter = '';
	let slashPosition = 0;
	let filteredSnippets = snippets;
	let groupedSnippets: [string, SlashSnippet[]][];
	let elemWidth: number, elemHeight: number;
	let elem: HTMLDivElement;
	let snippetsElements: HTMLButtonElement[] = Array(snippets.length);
	let style = '';

	onMount(() => {
		carta.input?.textarea.addEventListener('keydown', handleKeyDown);
		// Close on lost focus
		carta.input?.textarea.addEventListener('blur', () => (visible = false));
		carta.input?.textarea.addEventListener('keyup', handleKeyUp);
	});

	function handleKeyDown(e: KeyboardEvent) {
		if (!carta.input) return;
		if (visible) {
			if (e.key === ' ' || (e.key === 'Backspace' && filter === '')) {
				// Close
				visible = false;
			} else if (e.key === 'Enter') {
				// Use snippet
				e.preventDefault();
				const selectedSnippet = filteredSnippets.at(hoveringIndex);
				if (!selectedSnippet) return;

				// Remove slash and filter
				carta.input.removeAt(slashPosition - 1, filter.length + 1);
				carta.input.textarea.selectionStart = slashPosition - 1;
				selectedSnippet.action(carta.input);
				carta.input.update();
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
			caretPosition = carta.input.getCursorXY();
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

	function getSlashStyle() {
		if (!carta.input) return ``;
		// Left/Right
		let left: number | undefined = caretPosition.x;
		let right: number | undefined;

		if (left + elemWidth >= carta.input.textarea.clientWidth) {
			right = carta.input.textarea.clientWidth - left;
			left = undefined;
		}
		// Top/Bottom
		let top: number | undefined = caretPosition.y;
		let bottom: number | undefined;

		if (top + elemHeight >= carta.input.textarea.clientHeight) {
			bottom = carta.input.textarea.clientHeight - top;
			top = undefined;
		}

		return `
			--left: ${left ? left + 'px' : 'unset'};
			--right: ${right ? right + 'px' : 'unset'};
			--top: ${top ? top + 'px' : 'unset'};
			--bottom: ${bottom ? bottom + 'px' : 'unset'};
			--margin: ${window.getComputedStyle(carta.input.textarea).fontSize}
		`;
	}

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
			.reduce<number>((acc, [_, curr]) => acc + curr.length, 0);
		return prevCount + elemIndex;
	};

	$: {
		// Make statement reactive
		elemWidth;
		elemHeight;
		caretPosition;
		style = getSlashStyle();
	}

	$: {
		groupedSnippets = Object.entries(groupBy(filteredSnippets, 'group'));
	}

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

{#if true}
	<div
		{style}
		class="carta-slash"
		bind:clientWidth={elemWidth}
		bind:clientHeight={elemHeight}
		bind:this={elem}
		in:inTransition
		out:outTransition
	>
		{#each groupedSnippets as [group, snippets], groupIndex}
			<span class="carta-slash-group">
				{group}
			</span>
			{#each snippets as snippet, elemIndex}
				<button
					bind:this={snippetsElements[getSnippetIndex(groupIndex, elemIndex)]}
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
		left: var(--left);
		right: var(--right);
		top: calc(var(--top) + var(--margin) + 4px);
		bottom: calc(var(--bottom) + var(--margin) * 2 + 4px);
	}

	.carta-slash span {
		display: block;
	}
</style>
