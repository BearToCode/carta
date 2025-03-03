<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = {
		children?: import('svelte').Snippet;
	} & HTMLAttributes<HTMLDivElement>;

	let { class: className = undefined, children, ...rest }: Props = $props();
</script>

<div
	class={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
	{...rest}
>
	{@render children?.()}
</div>
