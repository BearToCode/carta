<script lang="ts">
	import { base } from '$app/paths';
	import Code from '$lib/components/code/Code.svelte';
	import { track } from '$lib/components/header-tracker/headers.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>TikZ Plugin - Carta</title>
	<meta
		name="description"
		content="TikZ Plugin for Carta. This plugin adds support for TikZ diagrams."
	/>
</svelte:head>

<span class="section">Plugins</span>

<h1 class="title">TikZ</h1>

<p>
	This plugin adds support for <strong>PGF/TikZ</strong> illustrations thanks to
	<a href="https://tikzjax.com/" target="_blank">TikZJax</a>. It uses the code generated for the
	<a href="https://github.com/artisticat1/obsidian-tikzjax" target="_blank">Obsidian-TikZ plugin</a
	>.
</p>

<h2 use:track id="important-notes">Important Notes</h2>

<ul>
	<li>
		This plugin requires the import of a <strong>heavy</strong> library (~7Mb), which is dynamically
		imported at runtime. This can be avoided by
		<a href="{base}/getting-started#pre-rendering">pre-rendering</a> content on the server;
	</li>
	<li>
		You need to update your sanitizer to allow the specific tag: <code>
			&lt;div type="text/tikz"&gt;
		</code>
	</li>
</ul>

<h2 use:track id="installation">Installation</h2>

<Code code={data.codeBlocks.installation} />

<h2 use:track id="setup">Setup</h2>

<Code code={data.codeBlocks.extension} />

<h2 use:track id="options">Options</h2>

<p>
	Here are the options you can pass to <code>tikz()</code>:
</p>

<Code code={data.codeBlocks.options} />
