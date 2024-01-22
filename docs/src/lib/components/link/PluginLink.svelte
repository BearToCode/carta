<script lang="ts">
	import { Archive, GithubLogo } from 'radix-icons-svelte';

	export let npmLink: string;
	export let githubLink: string;
</script>

<div class="plugin-link mb-2 mt-6 inline-flex items-center space-x-3">
	<slot />

	<a href={githubLink}>
		<GithubLogo class="h-6 w-6 text-white hover:text-sky-300" />
	</a>
	<a href={npmLink}>
		<Archive class="h-6 w-6 text-white hover:text-sky-300" />
	</a>
</div>

<style>
	:global(.plugin-link h1, .plugin-link h2, .plugin-link h3) {
		margin-top: 0;
		margin-bottom: 0;
	}
</style>
