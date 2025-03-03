<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	type Props = {
		tag: string;
		children?: import('svelte').Snippet;
	} & HTMLAttributes<HTMLElement>;

	let { class: className = undefined, tag = 'h3', children, ...rest }: Props = $props();
</script>

<svelte:element
	this={tag}
	class={cn('font-semibold leading-none tracking-tight', className)}
	{...rest}
>
	{@render children?.()}
</svelte:element>
