<script lang="ts">
	import Code from '$lib/components/code/Code.svelte';
	import { track } from '$lib/components/header-tracker/headers.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Getting Started - Carta</title>
	<meta
		name="description"
		content="Getting started guide to use Carta, a Markdown editor and renderer for SvelteKit."
	/>
</svelte:head>

<span class="section">Overview</span>

<h1 class="title">Getting Started</h1>

<h2 use:track id="installation">Installation</h2>

<p>Installing the core package:</p>

<Code code={data.codeBlocks.installation}></Code>

<p>Installing plugins:</p>

<Code code={data.codeBlocks.installingPlugins}></Code>

<h2 use:track id="setup">Setup</h2>

<p>Setup a basic editor:</p>

<Code code={data.codeBlocks.basicEditor}></Code>

<p>Or, if you just want to render content:</p>

<Code code={data.codeBlocks.contentOnly}></Code>

<h2 use:track id="reactivity">Reactivity</h2>

<p>
	The <code>&lt;Markdown&gt;</code> component is not reactive. If you want to make it reactive, you
	can either create your own component using the <code>render</code> function provided by the
	<code>Carta</code>
	class, or use Svelte <code>#key</code> block:
</p>

<Code code={data.codeBlocks.reactive}></Code>

<h2 use:track id="sanitization">Sanitization</h2>

<p>
	Beware that rendering Markdown can become quite resources-expensive, especially if you are using
	different plugins.
</p>

<p>
	By default Carta does <strong>NOT</strong> sanitize user input, which can include malicious code
	that could lead to
	<a href="https://en.wikipedia.org/wiki/Cross-site_scripting" target="_blank">XSS attacks</a>. For
	this reason it is <i>strongly recommended</i> to install a package that handles that for you.
	Since Carta operates both on the server and the client, you’d need a sanitizer able to work in
	both environments, for example
	<a href="https://www.npmjs.com/package/isomorphic-dompurify" target="_blank"
		>isomorphic-dompurify</a
	>
	or <a href="https://www.npmjs.com/package/sanitize-html">sanitize-html</a>. Here is an example
	using the former, which requires minimum configuration.
</p>

<Code code={data.codeBlocks.purify}></Code>

<h2 use:track id="pre-rendering">Pre-Rendering</h2>

<p>
	While the <code> &lt;Markdown&gt; </code> component is SSR compatible and allows you to pre-render
	some content on the server, it has some limitations and drawbacks:
</p>

<ul>
	<li>
		It cannot render content requiring asynchronous code execution(for example <code
			>plugin-code</code
		>);
	</li>
	<li>
		For the previous reason, it also needs to render the same markdown on the client. This requires
		the client to import this library and then render the new HTML, which can slow down the page,
		especially if you are using different plugins.
	</li>
</ul>

<p>
	This can be avoided by pre-rendering the whole content on the server, which can also be improved
	further by storing/caching the rendered HTML(this implementation is up to you). <br /> For example,
	in SvelteKit:
</p>

<Code code={data.codeBlocks.preRenderingServer}></Code>

<Code code={data.codeBlocks.preRenderingClient}></Code>
