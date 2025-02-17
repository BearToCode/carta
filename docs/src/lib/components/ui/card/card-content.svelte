<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	type $$Props = HTMLAttributes<HTMLDivElement>;

	interface Props {
		class?: $$Props['class'];
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let { class: className = undefined, children, ...rest }: Props = $props();
</script>

<div class={cn('p-6 pt-0', className)} {...rest}>
	{@render children?.()}
</div>
