<script lang="ts">
	import type { Carta } from 'carta-md';
	import { onDestroy, onMount } from 'svelte';
	import nodeEmoji from 'node-emoji';
	import type { TransitionConfig } from 'svelte/transition';

	const cols = 8;
	const maxRows = 12;

	export let carta: Carta;
	export let inTransition: (node: Element) => TransitionConfig;
	export let outTransition: (node: Element) => TransitionConfig;

	let visible = false;
	let caretPosition = { left: 0, right: 0, top: 0, bottom: 0 };
	let elemWidth: number, elemHeight: number;
	let style = '';
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
			caretPosition = carta.input.getCursorXY();
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

	function getComponentStyle() {
		if (!carta.input) return ``;
		// Left/Right
		let left: number | undefined = caretPosition.left;
		let right: number | undefined;

		if (left + elemWidth >= carta.input.textarea.clientWidth) {
			right = carta.input.textarea.clientWidth - left;
			left = undefined;
		}
		// Top/Bottom
		let top: number | undefined = caretPosition.top;
		let bottom: number | undefined;

		if (top + elemHeight >= carta.input.textarea.clientHeight) {
			bottom = carta.input.textarea.clientHeight - top;
			top = undefined;
		}

		return `
			--left: ${left !== undefined ? left + 'px' : 'unset'};
			--right: ${right !== undefined ? right + 'px' : 'unset'};
			--top: ${top !== undefined ? top + 'px' : 'unset'};
			--bottom: ${bottom !== undefined ? bottom + 'px' : 'unset'};
			--font-size: ${window.getComputedStyle(carta.input.textarea).fontSize}
      --cols: ${cols};
		`;
	}

	function selectEmoji(emoji: nodeEmoji.Emoji) {
		if (!carta.input) return;
		// Remove slash and filter
		carta.input.removeAt(colonPosition, filter.length + 1);
		carta.input.insertAt(colonPosition, ':' + emoji.key + ':');
		const newPosition = colonPosition + 2 + emoji.key.length;
		carta.input.textarea.setSelectionRange(newPosition, newPosition);
		carta.input.update();
	}

	$: {
		// Make statement reactive
		elemWidth;
		elemHeight;
		caretPosition;
		style = getComponentStyle();
	}

	$: {
		// Scroll to make hovering snippet always visible
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

{#if visible && filter.length > 0}
	<div
		{style}
		class="carta-emoji"
		bind:clientWidth={elemWidth}
		bind:clientHeight={elemHeight}
		in:inTransition
		out:outTransition
	>
		{#each emojis as emoji, i}
			<button
				class={i === hoveringIndex ? 'carta-active' : ''}
				title={emoji.key}
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
		left: var(--left);
		right: var(--right);
		top: calc(var(--top) + var(--font-size) + 4px);
		bottom: calc(var(--bottom) + var(--font-size) * 2 + 4px);

		display: grid;
		grid-template-columns: repeat(var(--cols), 1fr);
	}
</style>
