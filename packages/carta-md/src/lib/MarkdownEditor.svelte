<!--
	@component
	This is the main editor component that combines the input and renderer
	components. It also handles the scroll synchronization between the input and renderer
	components (if set to sync), and the window mode management (tabs or split).
-->

<script lang="ts">
	import type { Carta } from './internal/carta';
	import type { TextAreaProps } from './internal/textarea-props';
	import { onMount } from 'svelte';
	import { debounce } from './internal/utils';
	import { defaultLabels, type Labels } from './internal/labels';
	import Renderer from './internal/components/Renderer.svelte';
	import Input from './internal/components/Input.svelte';
	import Toolbar from './internal/components/Toolbar.svelte';

	interface Props {
		/**
		 * The Carta instance to use.
		 */
		carta: Carta;
		/**
		 * The theme to use, which translates to the CSS class `carta-theme__{theme}`.
		 */
		theme?: string;
		/**
		 * The editor content.
		 */
		value?: string;
		/**
		 * The mode to use. Can be 'tabs', 'split', or 'auto'
		 * - 'tabs': The input and renderer are displayed in tabs.
		 * - 'split': The input and renderer are displayed side by side.
		 * - 'auto': The mode is automatically selected based on the window width.
		 */
		mode?: 'tabs' | 'split' | 'auto';
		/**
		 * The scroll synchronization mode. Can be 'sync' or 'async'.
		 * - 'sync': The scroll is synchronized between the input and renderer.
		 * - 'async': The scroll is not synchronized between the input and renderer.
		 */
		scroll?: 'sync' | 'async';
		/**
		 * Whether to disable the toolbar.
		 */
		disableToolbar?: boolean;
		/**
		 * The placeholder text for the textarea.
		 */
		placeholder?: string;
		/**
		 * Additional textarea properties.
		 */
		textarea?: TextAreaProps;
		/**
		 * The selected tab. Can be 'write' or 'preview'.
		 */
		selectedTab?: 'write' | 'preview';
		/**
		 * The labels to use for the editor.
		 */
		userLabels?: Partial<Labels>;
		/**
		 * Highlight delay in milliseconds.
		 * @default 250
		 */
		highlightDelay?: number;
	}

	let {
		carta,
		theme = 'default',
		value = $bindable(''),
		mode = 'auto',
		scroll = 'sync',
		disableToolbar = false,
		placeholder = '',
		textarea = {},
		selectedTab = 'write',
		userLabels = {},
		highlightDelay = 250
	}: Props = $props();

	const labels = $derived({
		...defaultLabels,
		...userLabels
	});

	let width = $state(0);
	let mounted = $state(false);

	let editorElem: HTMLDivElement;
	let inputElem: HTMLDivElement | undefined = $state();
	let rendererElem: HTMLDivElement | undefined = $state();
	let currentlyScrolling: HTMLDivElement | null;
	let currentScrollPercentage = 0;
	let input: Input | undefined = $state();

	// Change the window mode based on the width
	const windowMode: 'tabs' | 'split' = $derived(
		mode === 'auto' ? (width && width > 768 ? 'split' : 'tabs') : mode
	);

	$effect(() => {
		windowMode; // Resize when changing from tabs to split
		input && input.resize();
	});

	$effect(() => {
		inputElem;
		rendererElem;
		loadScrollPosition(selectedTab);
	});

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

		if (scrolled && target) {
			synchronizeScroll(scrolled, target);
		}
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

		target.scrollTo({ top: percentage * targetAvbSpace, behavior: 'auto' });
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
			<Input
				{carta}
				{placeholder}
				{highlightDelay}
				props={textarea}
				hidden={!(windowMode == 'split' || selectedTab == 'write')}
				bind:value
				bind:this={input}
				bind:elem={inputElem}
				onscroll={handleScroll}
			>
				<!-- Input extensions components -->
				{#if mounted}
					{#each carta.components.filter(({ parent }) => [parent]
							.flat()
							.includes('input')) as { component: DynamicComponent, props }}
						<DynamicComponent {carta} {...props}></DynamicComponent>
					{/each}
				{/if}
			</Input>
			<Renderer
				{carta}
				{value}
				hidden={!(windowMode == 'split' || selectedTab == 'preview')}
				bind:elem={rendererElem}
				onscroll={handleScroll}
				onrender={() => {
					if (windowMode != 'split') return;
					if (scroll != 'sync') return;
					if (!inputElem) return;
					if (!rendererElem) return;
					synchronizeScroll(inputElem, rendererElem);
				}}
			>
				<!-- Renderer extensions components -->
				{#if mounted}
					{#each carta.components.filter(({ parent }) => [parent]
							.flat()
							.includes('renderer')) as { component: DynamicComponent, props }}
						<DynamicComponent {carta} {...props}></DynamicComponent>
					{/each}
				{/if}
			</Renderer>
		</div>
	</div>

	<!-- Editor extensions components -->
	<!-- prevent loading components on ssr renderings -->
	{#if mounted}
		{#each carta.components.filter(({ parent }) => [parent]
				.flat()
				.includes('editor')) as { component: DynamicComponent, props }}
			<DynamicComponent {carta} {...props}></DynamicComponent>
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
