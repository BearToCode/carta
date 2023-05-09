<script lang="ts">
	import CartaRenderer from './internal/components/CartaRenderer.svelte';
	import MarkdownInput from './internal/components/MarkdownInput.svelte';
	import type { Carta } from './internal/carta';
	import { onMount } from 'svelte';

	export let carta: Carta;
	export let theme = 'default';
	export let value = '';
	export let mode: 'tabs' | 'split' | 'auto' = 'auto';
	export let disableToolbar = false;

	let width: number;
	let selectedTab: 'write' | 'preview' = 'write';
	let windowMode: 'tabs' | 'split';
	let mounted = false;
	onMount(() => (mounted = true));

	$: {
		windowMode = mode === 'auto' ? (width > 768 ? 'split' : 'tabs') : mode;
	}
</script>

<div bind:clientWidth={width} class="carta-editor carta-theme__{theme}">
	{#if !disableToolbar}
		<div class="carta-toolbar">
			<div class="carta-toolbar-left">
				{#if windowMode == 'tabs'}
					<button
						on:click={() => (selectedTab = 'write')}
						class={selectedTab === 'write' ? 'carta-active' : ''}
					>
						Write
					</button>
					<button
						on:click={() => (selectedTab = 'preview')}
						class={selectedTab === 'preview' ? 'carta-active' : ''}
					>
						Preview
					</button>
				{/if}
			</div>
			<div class="carta-toolbar-right">
				{#each carta.icons as icon}
					<button
						on:click|preventDefault|stopPropagation={(e) => {
							carta.input && icon.action(carta.input);
							carta.input?.update();
							carta.input?.textarea.focus();
						}}
						class="carta-icon"
					>
						<svelte:component this={icon.component} />
					</button>
				{/each}
			</div>
		</div>
	{/if}

	<div class="carta-wrapper">
		<div class="carta-container mode-{windowMode}">
			{#if windowMode == 'split' || selectedTab == 'write'}
				<MarkdownInput {carta} bind:value>
					<!-- Input extensions components -->
					{#if mounted}
						{#each carta.components.filter(({ parent }) => parent === 'input') as { component, props }}
							<svelte:component this={component} {carta} {...props} />
						{/each}
					{/if}
				</MarkdownInput>
			{/if}
			{#if windowMode == 'split' || selectedTab == 'preview'}
				<CartaRenderer {carta} bind:value>
					<!-- Renderer extensions components -->
					{#if mounted}
						{#each carta.components.filter(({ parent }) => parent === 'renderer') as { component, props }}
							<svelte:component this={component} {carta} {...props} />
						{/each}
					{/if}
				</CartaRenderer>
			{/if}
		</div>
	</div>

	<!-- Editor extensions components -->
	<!-- prevent loading components on ssr renderings -->
	{#if mounted}
		{#each carta.components.filter(({ parent }) => parent === 'editor') as { component, props }}
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

	.carta-toolbar {
		height: 2rem;
		display: flex;
		flex-shrink: 0;
	}

	:global(.mode-split > *) {
		width: 50%;
	}

	:global(.mode-tabs > *) {
		width: 100%;
	}

	.carta-container {
		display: flex;
		min-height: 100%;
	}

	.carta-toolbar-left {
		height: 100%;
	}

	.carta-toolbar-right {
		height: 100%;
		flex-grow: 1;
		display: flex;
		align-items: center;
		justify-content: end;
	}

	.carta-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 3px;
		cursor: pointer;
		margin-left: 4px;
	}
</style>
