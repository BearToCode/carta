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
	let hovering = 0;
	let filter = '';
	let slashPosition = 0;
	let filteredSnippets = snippets;
	let elemWidth: number, elemHeight: number;
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
				const selectedSnippet = filteredSnippets.at(hovering);
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
					hovering = (hovering - 1 + snippets.length) % snippets.length;
				} else if (e.key === 'ArrowDown') {
					e.preventDefault();
					hovering = (hovering + 1 + snippets.length) % snippets.length;
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
			hovering = 0;
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

	$: {
		// Make statement reactive
		elemWidth;
		elemHeight;
		caretPosition;
		style = getSlashStyle();
	}
</script>

{#if visible}
	<div
		{style}
		class="carta-slash"
		bind:clientWidth={elemWidth}
		bind:clientHeight={elemHeight}
		in:inTransition
		out:outTransition
	>
		{#each filteredSnippets as snippet, i}
			<button id="snippet-{snippet.id}" class={i === hovering ? 'carta-active' : ''}>
				<span class="carta-snippet-title">
					{snippet.title}
				</span>
				<span class="carta-snippet-description">
					{snippet.description}
				</span>
			</button>
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
