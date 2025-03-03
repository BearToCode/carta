<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	type Props = {
		children?: import('svelte').Snippet;
	} & HTMLAttributes<HTMLElement>;

	let { class: className = undefined, children, ...rest }: Props = $props();
</script>

<div class={cn('flex items-center p-6 pt-0', className)} {...rest}>
	{@render children?.()}
</div>
