<script lang="ts">
	import Slot from '$lib/Slot.svelte';

	type Props = {
		href: string;
		target?: string;
		rel?: string;
	};

	let { href, target, rel }: Props = $props();
</script>

<a {href} {target} {rel}> The link is: <Slot /></a>
