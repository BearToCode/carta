<script lang="ts">
	import PluginLink from '$lib/components/link/PluginLink.svelte';
	import Code from '$lib/components/code/Code.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Community Plugins - Carta</title>
	<meta
		name="description"
		content="Discover plugins developed by the community to extend the functionality of Carta."
	/>
</svelte:head>

<span class="section">Overview</span>

<h1 class="title">Community Plugins</h1>

Here are is a list of several plugins developed by the community:

{#each data.plugins as plugin}
	<PluginLink npmLink={plugin.npm} githubLink={plugin.github} name={plugin.name} />

	{plugin.description}

	<Code code={plugin.code.installation} />
{/each}
