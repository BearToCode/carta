<!--
	@component
	This is the main editor component that combines the input and renderer
	components. It also handles the scroll synchronization between the input and renderer
	components (if set to sync), and the window mode management (tabs or split).
-->

<script lang="ts">
	import type { Carta } from './internal/carta';
	import { onMount } from 'svelte';
	import Renderer from './internal/components/Renderer.svelte';
	import Input from './internal/components/Input.svelte';
	import { debounce } from './internal/utils';
	import type { TextAreaProps } from './internal/textarea-props';
	import { defaultLabels, type Labels } from './internal/labels';
	import Toolbar from './internal/components/Toolbar.svelte';

	/**
	 * The Carta instance to use.
	 */
	export let carta: Carta;
	/**
	 * The theme to use, which translates to the CSS class `carta-theme__{theme}`.
	 */
	export let theme = 'default';
	/**
	 * The editor content.
	 */
	export let value = '';
	/**
	 * The mode to use. Can be 'tabs', 'split', or 'auto'
	 * - 'tabs': The input and renderer are displayed in tabs.
	 * - 'split': The input and renderer are displayed side by side.
	 * - 'auto': The mode is automatically selected based on the window width.
	 */
	export let mode: 'tabs' | 'split' | 'auto' = 'auto';
	/**
	 * The scroll synchronization mode. Can be 'sync' or 'async'.
	 * - 'sync': The scroll is synchronized between the input and renderer.
	 * - 'async': The scroll is not synchronized between the input and renderer.
	 */
	export let scroll: 'sync' | 'async' = 'sync';
	/**
	 * Whether to disable the toolbar.
	 */
	export let disableToolbar = false;
	/**
	 * The placeholder text for the textarea.
	 */
	export let placeholder = '';
	/**
	 * Additional textarea properties.
	 */
	export let textarea: TextAreaProps = {};
	/**
	 * The selected tab. Can be 'write' or 'preview'.
	 */
	export let selectedTab: 'write' | 'preview' = 'write';

	/**
	 * The labels to use for the editor.
	 */
	let userLabels: Partial<Labels> = {};
	export { userLabels as labels };
	const labels: Labels = {
		...defaultLabels,
		...userLabels
	};

	let width: number;
	let windowMode: 'tabs' | 'split';
	let mounted = false;
	let resizeInput: () => void;

	let editorElem: HTMLDivElement;
	let inputElem: HTMLDivElement;
	let rendererElem: HTMLDivElement;
	let currentlyScrolling: HTMLDivElement | null;
	let currentScrollPercentage = 0;

	$: {
		// Change the window mode based on the width
		windowMode = mode === 'auto' ? (width > 768 ? 'split' : 'tabs') : mode;
	}

	$: {
		windowMode; // Resize when changing from tabs to split
		resizeInput && resizeInput();
	}

	$: {
		inputElem, rendererElem;
		loadScrollPosition(selectedTab);
	}

	/**
	 * Calculate the scroll percentage of an element.
	 * @param elem The element to calculate the scroll percentage.
	 */
	function calculateScrollPercentage(elem: HTMLDivElement) {
		const scrolledAvbSpace = elem.scrollHeight - elem.clientHeight;
		const scrolledAmount = elem.scrollTop * (1 + elem.clientHeight / scrolledAvbSpace);
		return scrolledAmount / elem.scrollHeight;
	}

	/**
	 * Start a debounce to clear the currently scrolling element, so that it executed
	 * only once after the last scroll event.
	 */
	const clearCurrentlyScrolling = debounce(() => {
		currentlyScrolling = null;
	}, 1000);

	/**
	 * Handle the scroll event to synchronize the scroll between the input and renderer.
	 * @param e The scroll event.
	 */
	function handleScroll(e: Event) {
		const [scrolled, target] =
			e.target == inputElem ? [inputElem, rendererElem] : [rendererElem, inputElem];

		if (windowMode != 'split') return;
		if (scroll != 'sync') return;

		synchronizeScroll(scrolled, target);
	}

	/**
	 * Synchronize the scroll between the input and renderer.
	 * @param scrolled The element that is scrolled.
	 * @param target The target element to scroll.
	 */
	function synchronizeScroll(scrolled: HTMLDivElement, target: HTMLDivElement) {
		const percentage = calculateScrollPercentage(scrolled);
		currentScrollPercentage = percentage;
		// Return if the scrolled is caused by a previous scrollTo
		if (currentlyScrolling && currentlyScrolling != scrolled) return;

		currentlyScrolling = scrolled;
		const targetAvbSpace = target.scrollHeight - target.clientHeight;

		target.scrollTo({ top: percentage * targetAvbSpace, behavior: 'smooth' });
		clearCurrentlyScrolling();
	}

	/**
	 * Load the scroll position of the selected tab.
	 * @param tab The tab to load the scroll position.
	 */
	function loadScrollPosition(tab: 'write' | 'preview') {
		if (windowMode !== 'tabs') return;
		const elem = tab === 'write' ? inputElem : rendererElem;
		if (!elem) return;

		const avbSpace = elem.scrollHeight - elem.clientHeight;
		elem.scroll({ top: avbSpace * currentScrollPercentage, behavior: 'instant' });
	}

	onMount(() => carta.$setElement(editorElem));
	onMount(() => (mounted = true));
</script>

<div bind:this={editorElem} bind:clientWidth={width} class="carta-editor carta-theme__{theme}">
	{#if !disableToolbar}
		<Toolbar {carta} {labels} mode={windowMode} bind:tab={selectedTab} />
	{/if}

	<div class="carta-wrapper">
		<div class="carta-container mode-{windowMode}">
			{#if windowMode == 'split' || selectedTab == 'write'}
				<Input
					{carta}
					{placeholder}
					props={textarea}
					bind:value
					bind:resize={resizeInput}
					bind:elem={inputElem}
					on:scroll={handleScroll}
				>
					<!-- Input extensions components -->
					{#if mounted}
						{#each carta.components.filter(({ parent }) => [parent]
								.flat()
								.includes('input')) as { component, props }}
							<svelte:component this={component} {carta} {...props} />
						{/each}
					{/if}
				</Input>
			{/if}
			{#if windowMode == 'split' || selectedTab == 'preview'}
				<Renderer
					{carta}
					{value}
					bind:elem={rendererElem}
					on:scroll={handleScroll}
					on:render={() => {
						if (windowMode != 'split') return;
						if (scroll != 'sync') return;
						synchronizeScroll(inputElem, rendererElem);
					}}
				>
					<!-- Renderer extensions components -->
					{#if mounted}
						{#each carta.components.filter(({ parent }) => [parent]
								.flat()
								.includes('renderer')) as { component, props }}
							<svelte:component this={component} {carta} {...props} />
						{/each}
					{/if}
				</Renderer>
			{/if}
		</div>
	</div>

	<!-- Editor extensions components -->
	<!-- prevent loading components on ssr renderings -->
	{#if mounted}
		{#each carta.components.filter(({ parent }) => [parent]
				.flat()
				.includes('editor')) as { component, props }}
			<svelte:component this={component} {carta} {...props} />
		{/each}
	{/if}
</div>

<style>
	.carta-editor {
		position: relative;
		display: flex;
		flex-direction: column;
	}

	:global(.carta-container.mode-split > *) {
		width: 50%;
	}

	:global(.carta-container.mode-tabs > *) {
		width: 100%;
	}

	.carta-container {
		display: flex;
		position: relative;
	}
</style>
