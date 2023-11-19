<script lang="ts">
	import { base } from '$app/paths';
	import Link from '../link/Link.svelte';
	import GitHub from './GitHub.svelte';
	import Search from './Search.svelte';
</script>

<nav
	class="fixed left-0 right-0 top-0 z-10 bg-neutral-900 bg-opacity-50 backdrop-blur-2xl backdrop-filter"
>
	<div class="container mx-auto flex items-center justify-between px-4 py-1 sm:px-6">
		<Link href="/">
			<img src="{base}/logo.png" class="h-8" alt="carta logo" />
		</Link>

		<div class="flex-grow" />

		<Search class="mx-auto" />

		<div class="hidden flex-grow md:block" />

		<GitHub class="ml-auto" />
	</div>

	<div
		class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900"
	/>
</nav>
