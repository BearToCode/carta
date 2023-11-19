<script lang="ts">
	import { base } from '$app/paths';

	export let href = '';
</script>

<a
	{...$$restProps}
	href={href.startsWith('/') ? `${base}${href}` : href}
	on:click
	on:focusin
	on:focusout
	on:mouseenter
	on:mouseleave
>
	<slot />
</a>
