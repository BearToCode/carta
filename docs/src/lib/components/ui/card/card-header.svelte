<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	type Props = {
		children?: import('svelte').Snippet;
	} & HTMLAttributes<HTMLElement>;

	let { class: className = undefined, children, ...rest }: Props = $props();
</script>

<div class={cn('flex flex-col space-y-1.5 p-6', className)} {...rest}>
	{@render children?.()}
</div>
