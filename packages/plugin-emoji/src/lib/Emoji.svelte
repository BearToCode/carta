<script lang="ts">
	import type { Carta } from 'carta-md';
	import { onDestroy, onMount } from 'svelte';
	import * as nodeEmoji from 'node-emoji';
	import type { TransitionConfig } from 'svelte/transition';

	const cols = 8;
	const maxRows = 12;

	export let carta: Carta;
	export let inTransition: (node: Element) => TransitionConfig;
	export let outTransition: (node: Element) => TransitionConfig;

	let visible = false;
	let filter = '';
	let colonPosition = 0;
	let hoveringIndex = 0;
	let emojis: nodeEmoji.Emoji[] = [];
	let emojisElements: HTMLButtonElement[] = Array(cols * maxRows);

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
				if (filter.length > 0) {
					// Complete emoji
					const emoji = emojis.at(hoveringIndex);
					if (emoji) {
						e.preventDefault();
						selectEmoji(emoji);
					}
				}
				visible = false;
			} else {
				// Check for arrows
				if (e.key === 'ArrowUp') {
					e.preventDefault();
					hoveringIndex =
						(emojis.length + hoveringIndex - Math.min(cols, emojis.length)) % emojis.length;
				} else if (e.key === 'ArrowDown') {
					e.preventDefault();
					hoveringIndex =
						(emojis.length + hoveringIndex + Math.min(cols, emojis.length)) % emojis.length;
				} else if (e.key === 'ArrowLeft') {
					e.preventDefault();
					hoveringIndex = (emojis.length + hoveringIndex - 1) % emojis.length;
				} else if (e.key === 'ArrowRight') {
					e.preventDefault();
					hoveringIndex = (emojis.length + hoveringIndex + 1) % emojis.length;
				}
			}
		} else if (e.key === ':') {
			// Open
			visible = true;
			colonPosition = carta.input.textarea.selectionStart;
			filter = '';
		}
	}

	function handleKeyUp(e: KeyboardEvent) {
		if (!carta.input) return;
		if (!visible) return;
		// Has moved out of slash argument
		if (carta.input.textarea.selectionStart < colonPosition) {
			visible = false;
		} else if (e.key.length === 1 || e.key === 'Backspace') {
			filter = carta.input.textarea.value.slice(
				colonPosition + 1,
				carta.input.textarea.selectionStart
			);
			emojis = nodeEmoji.search(filter).slice(0, cols * maxRows);
			hoveringIndex = 0;
		}
	}

	function selectEmoji(emoji: nodeEmoji.Emoji) {
		if (!carta.input) return;
		// Remove slash and filter
		carta.input.removeAt(colonPosition, filter.length + 1);
		carta.input.insertAt(colonPosition, ':' + emoji.name + ':');
		const newPosition = colonPosition + 2 + emoji.name.length;
		carta.input.textarea.setSelectionRange(newPosition, newPosition);
		carta.input.update();
	}

	$: {
		// Scroll to make hovering emoji always visible
		const hovering = emojisElements.at(hoveringIndex);
		if (hovering) {
			const snipElem = emojisElements[hoveringIndex];
			snipElem?.scrollIntoView({
				behavior: 'smooth',
				block: 'nearest'
			});
		}
	}
</script>

{#if visible && filter.length > 0 && emojis.length > 0}
	<div
		style="--cols: {cols};"
		class="carta-emoji"
		in:inTransition
		out:outTransition
		use:carta.bindToCaret
	>
		{#each emojis as emoji, i}
			<button
				class={i === hoveringIndex ? 'carta-active' : ''}
				title={emoji.name}
				on:click={() => selectEmoji(emoji)}
				bind:this={emojisElements[i]}
			>
				{emoji.emoji}
			</button>
		{/each}
	</div>
{/if}

<style>
	.carta-emoji {
		position: absolute;

		display: grid;
		grid-template-columns: repeat(var(--cols), 1fr);
	}
</style>
