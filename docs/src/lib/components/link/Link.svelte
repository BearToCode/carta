<script lang="ts">
	import { base } from '$app/paths';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = {
		href?: string;
		onclick?: (event: MouseEvent) => void;
		onfocusin?: (event: FocusEvent) => void;
		onfocusout?: (event: FocusEvent) => void;
		onmouseenter?: (event: MouseEvent) => void;
		onmouseleave?: (event: MouseEvent) => void;
		children?: import('svelte').Snippet;
	} & HTMLAttributes<HTMLAnchorElement>;

	let { href = '', children, ...rest }: Props = $props();
</script>

<a href={href.startsWith('/') ? `${base}${href}` : href} {...rest}>
	{@render children?.()}
</a>
