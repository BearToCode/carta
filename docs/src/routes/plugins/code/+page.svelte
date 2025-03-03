<script lang="ts">
	import Code from '$lib/components/code/Code.svelte';
	import { track } from '$lib/components/header-tracker/headers.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Code Plugin - Carta</title>
	<meta
		name="description"
		content="Code Plugin for Carta. Enables syntax highlighting in code blocks"
	/>
</svelte:head>

<span class="section">Plugins</span>

<h1 class="title">Code</h1>

<p>
	This plugin adds support for code blocks <strong>syntax highlighting</strong>. It uses the same
	highlighter from the core package(Shiki).
</p>

<h2 use:track id="installation">Installation</h2>

<Code code={data.codeBlocks.installation} />

<h2 use:track id="setup">Setup</h2>

<h3>Styles</h3>

<p>Import the default styles:</p>

<Code code={data.codeBlocks.styles} />

<h3>Using the default highlighter</h3>

<p>
	Carta comes with a default highlighter that matches the one used to highlight markdown in the
	editor and is used by default (Shiki). If you want to use a theme different from the one used to
	highlight Markdown, you can specify it in the options.
</p>

<Code code={data.codeBlocks.defaultHighlighter} />

<h3>Using a custom highlighter</h3>

<p>
	It is no longer possible to specify a custom highlighter in this plugin. However, there are many
	different <a href="https://github.com/remarkjs/remark/blob/main/doc/plugins.md#list-of-plugins"
		>Remark plugins</a
	> that provide syntax highlighting.
</p>

<h2 use:track id="extensions">Extension</h2>

<Code code={data.codeBlocks.extension} />

<h2 use:track id="options">Options</h2>

<p>
	The options you can pass to code() extend the ones provided by <a
		href="https://shiki.matsu.io/guide/transformers">Shiki</a
	>.
</p>
