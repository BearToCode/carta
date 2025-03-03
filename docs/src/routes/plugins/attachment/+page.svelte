<script lang="ts">
	import Code from '$lib/components/code/Code.svelte';
	import { track } from '$lib/components/header-tracker/headers.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Attachment Plugin - Carta</title>
	<meta name="description" content="Attachment plugin for Carta" />
</svelte:head>

<span class="section">Plugins</span>

<h1 class="title">Attachment</h1>

<p>This plugin adds support for <strong>attachments</strong>.</p>

<h2 use:track id="installation">Installation</h2>

<Code code={data.codeBlocks.installation} />

<h2 use:track id="setup">Setup</h2>

<h3>Styles</h3>

<p>Import the default theme, or create you own:</p>

<Code code={data.codeBlocks.styles} />

<h3>Extension</h3>

<Code code={data.codeBlocks.extension} />

<h2 use:track id="options">Options</h2>

<p>
	Here are the options you can pass to <code>attachment()</code>:
</p>

<Code code={data.codeBlocks.options} />
