<script lang="ts">
	import type { Carta } from 'carta-md';
	import SpinnerIcon from './icons/SpinnerIcon.svelte';
	import type { Writable } from 'svelte/store';
	import type { SvelteComponent } from 'svelte';

	export let carta: Carta;
	export let uploadingFiles: Writable<File[]>;
	export let loadingOverlay: typeof SvelteComponent | false | undefined;

	// Prevent unused property warning
	carta;
</script>

{#if loadingOverlay !== false}
	{#if loadingOverlay}
		<svelte:component this={loadingOverlay} uploadingFiles={$uploadingFiles} />
	{:else if $uploadingFiles.length > 0}
		<div class="carta-loading-overlay">
			<SpinnerIcon />
			<span>
				Loading {$uploadingFiles.length} file{$uploadingFiles.length > 1 ? 's' : ''}
			</span>
		</div>
	{/if}
{/if}
