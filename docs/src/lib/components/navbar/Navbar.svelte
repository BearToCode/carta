<script lang="ts">
	import GitHub from './GitHub.svelte';
	import Search from './Search.svelte';
</script>

<nav
	class="fixed left-0 right-0 top-0 z-10 bg-neutral-900 bg-opacity-50 backdrop-blur-2xl backdrop-filter"
>
	<div class="container mx-auto grid grid-cols-3 items-center py-1">
		<a href="/">
			<img src="/logo.png" class="h-8" alt="carta logo" />
		</a>

		<Search class="mx-auto" />

		<GitHub class="ml-auto" />
	</div>

	<div
		class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900"
	/>
</nav>
