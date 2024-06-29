<script lang="ts">
	import type { Carta } from 'carta-md';
	import { onDestroy, onMount } from 'svelte';
	import * as nodeEmoji from 'node-emoji';
	import type { TransitionConfig } from 'svelte/transition';

	export let carta: Carta;
	export let inTransition: (node: Element) => TransitionConfig;
	export let outTransition: (node: Element) => TransitionConfig;
	export let maxResults: number;

	let visible = false;
	let filter = '';
	let colonPosition = 0;
	let hoveringIndex = 0;
	let emojis: nodeEmoji.Emoji[] = [];
	let emojisElements: HTMLButtonElement[] = Array(maxResults);

	onMount(() => {
		carta.input?.textarea.addEventListener('keydown', handleKeyDown);
		carta.input?.textarea.addEventListener('keyup', handleKeyUp);
		carta.input?.textarea.addEventListener('click', hide);
		carta.input?.textarea.addEventListener('blur', hide_after_delay);
	});

	onDestroy(() => {
		carta.input?.textarea.removeEventListener('keydown', handleKeyDown);
		carta.input?.textarea.removeEventListener('keyup', handleKeyUp);
		carta.input?.textarea.removeEventListener('click', hide);
		carta.input?.textarea.removeEventListener('blur', hide_after_delay);
	});

	function hide_after_delay() {
		setTimeout(hide, 100);
	}

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
					hoveringIndex = getIndexOfEmojiElementInPrevRow();
				} else if (e.key === 'ArrowDown') {
					e.preventDefault();
					hoveringIndex = getIndexOfEmojiElementInNextRow();
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
			emojis = nodeEmoji.search(filter).slice(0, maxResults);
			hoveringIndex = 0;
		}
	}

	function getIndexOfEmojiElementInPrevRow() {
		if (emojisElements.at(hoveringIndex)) {
			let index = hoveringIndex;
			let el = emojisElements[index];
			const startPos = {
				top:	 el.offsetTop,
				left:	 el.offsetLeft,
				right: el.offsetLeft + el.offsetWidth
			};
			let prevIndex, prevPos;
			while(true) {
				prevIndex = index - 1;
				if ((prevIndex < 0) || !emojisElements.at(prevIndex)) return index;
				index = prevIndex;

				el = emojisElements[index];
				prevPos = {
					top:	 el.offsetTop,
					left:	 el.offsetLeft,
					right: el.offsetLeft + el.offsetWidth
				};

				if (prevPos.top === startPos.top) continue;
				if (prevPos.left > startPos.right) continue;
				return index;
			}
		}
		return hoveringIndex;
	}

	function getIndexOfEmojiElementInNextRow() {
		if (emojisElements.at(hoveringIndex)) {
			let index = hoveringIndex;
			let el = emojisElements[index];
			const startPos = {
				top:	 el.offsetTop,
				left:	 el.offsetLeft,
				right: el.offsetLeft + el.offsetWidth
			};
			let nextIndex, nextPos;
			while(true) {
				nextIndex = index + 1;
				if ((nextIndex >= emojisElements.length) || !emojisElements.at(nextIndex)) return index;
				index = nextIndex;

				el = emojisElements[index];
				nextPos = {
					top:	 el.offsetTop,
					left:	 el.offsetLeft,
					right: el.offsetLeft + el.offsetWidth
				};

				if (nextPos.top === startPos.top) continue;
				if (nextPos.right < startPos.left) continue;
				return index;
			}
		}
		return hoveringIndex;
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
		class="carta-emoji"
		in:inTransition
		out:outTransition
		use:carta.bindToCaret
	>
		{#each emojis as emoji, i}
			<button
				class={i === hoveringIndex ? 'carta-active' : ''}
				title={emoji.name}
				on:click={selectEmoji.bind(null, emoji)}
				bind:this={emojisElements[i]}
			>
				{emoji.emoji}
			</button>
		{/each}
	</div>
{/if}
