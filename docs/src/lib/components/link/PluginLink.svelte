<script lang="ts">
	export let npmLink: string;
	export let githubLink: string;
</script>

<div class="plugin-link mb-2 mt-6 flex items-end space-x-3">
	<slot />

	<a href={githubLink} class="flex aspect-square">
		<iconify-icon icon="mdi:github" class="text-3xl text-white hover:text-sky-300"></iconify-icon>
	</a>
	<a href={npmLink} class="flex aspect-square">
		<iconify-icon icon="gg:npm" class="text-3xl text-white hover:text-sky-300"></iconify-icon>
	</a>
</div>

<style>
	:global(.markdown .plugin-link > h1, .markdown .plugin-link > h2, .markdown .plugin-link > h3) {
		margin-top: 0;
		margin-bottom: 0;
	}
</style>
