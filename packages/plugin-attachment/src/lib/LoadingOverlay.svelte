<script lang="ts">
	import type { Carta } from 'carta-md';
	import SpinnerIcon from './icons/SpinnerIcon.svelte';
	import type { Writable } from 'svelte/store';
	import type { SvelteComponent } from 'svelte';

	interface Props {
		carta: Carta;
		uploadingFiles: Writable<File[]>;
		loadingOverlay: typeof SvelteComponent | false | undefined;
	}

	let { carta, uploadingFiles, loadingOverlay }: Props = $props();

	// Prevent unused property warning
	carta;
</script>

{#if loadingOverlay !== false}
	{#if loadingOverlay}
		{@const SvelteComponent_1 = loadingOverlay}
		<SvelteComponent_1 uploadingFiles={$uploadingFiles} />
	{:else if $uploadingFiles.length > 0}
		<div class="carta-loading-overlay">
			<SpinnerIcon />
			<span>
				Loading {$uploadingFiles.length} file{$uploadingFiles.length > 1 ? 's' : ''}
			</span>
		</div>
	{/if}
{/if}
