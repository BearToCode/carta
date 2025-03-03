<script lang="ts">
	import Code from '$lib/components/code/Code.svelte';
	import { track } from '$lib/components/header-tracker/headers.svelte';
	import { math } from '@cartamd/plugin-math';
	import { Carta, Markdown } from 'carta-md';

	import 'katex/dist/katex.min.css';

	let { data } = $props();

	const carta = new Carta({
		sanitizer: false,
		extensions: [math()]
	});
</script>

<svelte:head>
	<title>Math Plugin - Carta</title>
	<meta
		name="description"
		content="Math plugin for Carta. Write equations in LaTeX and render them in the editor."
	/>
</svelte:head>

<span class="section">Plugins</span>

<h1 class="title">Math</h1>

<p>
	This plugins adds support for <a href="https://katex.org/" target="_blank">KaTeX</a> expressions.
</p>

<h2 use:track id="installation">Installation</h2>

<Code code={data.codeBlocks.installation} />

<h2 use:track id="setup">Installation</h2>

<h3>Styles</h3>

<p>You need to get access to the katex stylesheet, to do so, you can either install katex using:</p>

<Code code={data.codeBlocks.katexInstall} />

<p>and then adding this import to your app:</p>

<Code code={data.codeBlocks.katexImport} />

<p>or by using a content delivery network:</p>

<Code code={data.codeBlocks.katexLink} />

<h3>Extension</h3>

<Code code={data.codeBlocks.extension} />

<h2 use:track id="usage">Usage</h2>

Inline mode:

<Code code={data.codeBlocks.usageInline} />

<div class="my-4 rounded-lg bg-neutral-800 bg-opacity-20 px-4 py-2">
	<Markdown {carta} value={data.codeBlocks.usageInline.code} />
</div>

Block mode:

<Code code={data.codeBlocks.usageBlock} />

<div class="my-4 rounded-lg bg-neutral-800 bg-opacity-20 px-4 py-2">
	<Markdown {carta} value={data.codeBlocks.usageBlock.code} />
</div>

<h2 use:track id="options">Installation</h2>

<p>
	You can pass options to the plugin by passing an object to the <code>math</code> function.
</p>

<Code code={data.codeBlocks.options} />
