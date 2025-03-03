<script lang="ts">
	import { toSlug, track } from '../header-tracker/headers.svelte';

	interface Props {
		name: string;
		npmLink: string;
		githubLink: string;
	}

	let { npmLink, githubLink, name }: Props = $props();
</script>

<div class="mb-2 mt-6 flex items-end space-x-3">
	<h3 class="text-2xl font-medium text-neutral-200" use:track id={toSlug(name)}>
		<code>
			{name}
		</code>
	</h3>

	<a href={githubLink} aria-label="Github Link" class="flex aspect-square">
		<iconify-icon icon="mdi:github" class="text-3xl text-white hover:text-sky-300"></iconify-icon>
	</a>
	<a href={npmLink} aria-label="NPM Link" class="flex aspect-square">
		<iconify-icon icon="gg:npm" class="text-3xl text-white hover:text-sky-300"></iconify-icon>
	</a>
</div>
