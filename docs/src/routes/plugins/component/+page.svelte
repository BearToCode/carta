<script lang="ts">
	import Code from '$lib/components/code/Code.svelte';
	import { track } from '$lib/components/header-tracker/headers.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Component Plugin - Carta</title>
	<meta name="description" content="Embed Svelte components in your Markdown content." />
</svelte:head>

<span class="section">Plugins</span>

<h1 class="title">Component</h1>

<p>
	This plugin adds support for mapping certain elements to <strong>components</strong> inside the editor.
</p>

<h2 use:track id="installation">Installation</h2>

<Code code={data.codeBlocks.installation} />

<h2 use:track id="usage">Usage</h2>

<h3>Mapping components</h3>

<p>
	The first thing to do is to map certain elements(nodes) to their corresponding components. For
	example, if you want to use a custom renderer for images:
</p>

<Code code={data.codeBlocks.sampleComponent} />

<Code code={data.codeBlocks.extension} />

<h3>Custom logic</h3>

<p>You can use custom logic when selecting which nodes to map:</p>

<Code code={data.codeBlocks.customLogic} />

<h3>Using <code>&lt;slot /&gt;</code></h3>

<p>
	To render children, you need to use a custom <code>&lt;Slot /&gt;</code> component:
</p>

<Code code={data.codeBlocks.slot} />

<h2 use:track id="pre-rendering">Usage with pre-rendering</h2>

<p>
	When pre-rendering content on the server (using the <code>&lt;PreRendered&gt;</code> component),
	the components will not be mounted by default. You need to use the
	<code>initializeComponents</code> function yourself.
</p>

<Code code={data.codeBlocks.preRendered} />

<h2 use:track id="limitations">Limitations</h2>

<ul>
	<li>
		During server-side rendering, embedded styles for the mapped components are not added to the
		bundle. Use a dedicated stylesheet instead.
	</li>
	<li>
		<code>&lt;svelte:head&gt;</code> is not available during server-side rendering.
	</li>
</ul>
