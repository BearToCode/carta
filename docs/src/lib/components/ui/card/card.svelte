<script lang="ts">
	import Link from '$lib/components/link/Link.svelte';
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = {
		class?: string;
		href: string;
		onclick?: (event: MouseEvent) => void;
		onfocusin?: (event: FocusEvent) => void;
		onfocusout?: (event: FocusEvent) => void;
		onmouseenter?: (event: MouseEvent) => void;
		onmouseleave?: (event: MouseEvent) => void;
		children?: import('svelte').Snippet;
	} & HTMLAttributes<HTMLAnchorElement>;

	let { class: className = '', href, children, ...rest }: Props = $props();
</script>

<Link
	{href}
	class={cn(
		'bg-card text-card-foreground block rounded-xl border bg-opacity-30 shadow hover:border-sky-300',
		className
	)}
	{...rest}
>
	{@render children?.()}
</Link>
