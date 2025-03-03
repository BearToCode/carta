<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils';
	import { fade } from 'svelte/transition';

	type Props = DialogPrimitive.OverlayProps;

	let { class: className = undefined, ...rest }: Props = $props();
</script>

<DialogPrimitive.Overlay
	class={cn('bg-background/80 fixed inset-0 z-50 backdrop-blur-sm ', className)}
	{...rest}
>
	{#snippet child({ open, props })}
		{#if open}
			<div {...props} transition:fade={{ duration: 150 }}></div>
		{/if}
	{/snippet}
</DialogPrimitive.Overlay>
