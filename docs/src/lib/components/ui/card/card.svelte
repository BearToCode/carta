<script lang="ts">
	import Link from '$lib/components/link/Link.svelte';
	import { cn } from '$lib/utils';

	interface Props {
		class?: string;
		href: string;
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let { class: className = '', href, children, ...rest }: Props = $props();
</script>

<Link
	{href}
	class={cn(
		'bg-card text-card-foreground block rounded-xl border bg-opacity-30 shadow hover:border-sky-300',
		className
	)}
	{...rest}
	on:click
	on:focusin
	on:focusout
	on:mouseenter
	on:mouseleave
>
	{@render children?.()}
</Link>
