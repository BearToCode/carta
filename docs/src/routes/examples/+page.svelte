<script lang="ts">
	import { track } from '$lib/components/header-tracker/headers.svelte';
	import GitHubExample from '$lib/examples/GitHubExample.svelte';
	import DiscordExample from '$lib/examples/DiscordExample.svelte';
	import MathStackExchangeExample from '$lib/examples/MathStackExchangeExample.svelte';
</script>

<svelte:head>
	<title>Examples - Carta</title>
	<meta name="description" content="Examples made using Carta and some of its plugins." />
</svelte:head>

<span class="section">Overview</span>

<h1 class="title">Examples</h1>

Here is a list of examples made using Carta and some of its plugins.

<h2 use:track id="github">GitHub</h2>

<GitHubExample />
<br />

Plugins used: code, slash, emoji, attachment. View source on
<a
	href="https://github.com/BearToCode/carta/blob/master/docs/src/lib/examples/GitHubExample.svelte"
	target="_black">GitHub</a
>.

<h2 use:track id="discord">Discord</h2>

<DiscordExample />
<br />

Plugins used: code, emoji. View source on
<a
	href="https://github.com/BearToCode/carta/blob/master/docs/src/lib/examples/DiscordExample.svelte"
	target="_black">GitHub</a
>.

<h2 use:track id="math-stack-exchange">Math Stack Exchange</h2>

<MathStackExchangeExample />
<br />

Plugins used: math, tikz. View source on
<a
	href="https://github.com/BearToCode/carta/blob/master/docs/src/lib/examples/MathStackExchangeExample.svelte"
	target="_black">GitHub</a
>.
