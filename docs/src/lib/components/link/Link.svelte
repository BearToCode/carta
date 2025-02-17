<script lang="ts">
	import { createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();
	import { base } from '$app/paths';

	interface Props {
		href?: string;
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let { href = '', children, ...rest }: Props = $props();
</script>

<a
	{...rest}
	href={href.startsWith('/') ? `${base}${href}` : href}
	onclick={bubble('click')}
	onfocusin={bubble('focusin')}
	onfocusout={bubble('focusout')}
	onmouseenter={bubble('mouseenter')}
	onmouseleave={bubble('mouseleave')}
>
	{@render children?.()}
</a>
