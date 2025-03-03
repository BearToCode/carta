<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = {
		class?: string | undefined | null;
		children?: import('svelte').Snippet;
	} & HTMLAttributes<HTMLSpanElement>;

	let { class: className = undefined, children, ...rest }: Props = $props();
</script>

<span class={cn('text-muted-foreground ml-auto text-xs tracking-widest', className)} {...rest}>
	{@render children?.()}
</span>
