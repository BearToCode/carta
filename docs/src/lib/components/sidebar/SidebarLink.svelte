<script lang="ts">
	import { page } from '$app/stores';

	export let href: string;

	let currentHref: string;
	$: currentHref = $page.url.pathname;
</script>

<a
	{href}
	class="
		{currentHref === href
		? 'bg-sky-400 bg-opacity-10 font-medium text-sky-300'
		: 'text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300'}
		inline-flex w-full items-center space-x-2 rounded-lg px-4 py-1.5"><slot /></a
>
