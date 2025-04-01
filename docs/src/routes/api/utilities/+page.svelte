<script lang="ts">
	import { track } from '$lib/components/header-tracker/headers.svelte';
	import Code from '$lib/components/code/Code.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Utilities - Carta</title>
	<meta name="description" content="Utilities function provided by Carta." />
</svelte:head>

<span class="section">API</span>

<h1 class="title">Utilities</h1>

<h2 use:track id="carta-render">
	<code>Carta.render</code>
</h2>

<p>Allows you to render Markdown asynchronously.</p>

<Code code={data.codeBlocks.carta_render} />

<h2 use:track id="carta-render-ssr">
	<code>Carta.renderSSR</code>
</h2>

<p>
	Allows you to render Markdown synchronously, suitable for Server Side Rendering. Note that
	particular extensions that add content asynchronously will not work in this configuration.
</p>

<Code code={data.codeBlocks.carta_renderSSR} />

<h2 use:track id="carta-bind-to-caret"><code>Carta.bindToCaret</code></h2>

<p>
	Svelte action that allows you to bind a specific element to the caret position. Used, for example,
	in <code>plugin-emoji</code> and <code>plugin-slash</code>.
</p>

<Code code={data.codeBlocks.carta_bindToCaret} />

<h2 use:track id="carta-highlighter">
	<code>Carta.highlighter</code>
</h2>

<p>Get the highlighter used by Carta.</p>

<Code code={data.codeBlocks.carta_highlighter} />

<p>Here are some other highlight related utilities:</p>

<h3 use:track id="is-bundle-language">
	<code>isBundleLanguage</code>
</h3>

<p>Checks if a language is a bundled language.</p>

<Code code={data.codeBlocks.isBundleLanguage} />

<h3 use:track id="is-bundle-theme">
	<code>isBundleTheme</code>
</h3>

<p>Checks if a theme is a bundled theme.</p>

<Code code={data.codeBlocks.isBundleTheme} />

<h3 use:track id="is-dual-theme">
	<code>isDualTheme</code>
</h3>

<p>Checks if a theme is a dual theme.</p>

<Code code={data.codeBlocks.isDualTheme} />

<h3 use:track id="is-single-theme">
	<code>isSingleTheme</code>
</h3>

<p>Checks if a theme is a single theme.</p>

<Code code={data.codeBlocks.isSingleTheme} />

<h3 use:track id="is-theme-registration">
	<code>isThemeRegistration</code>
</h3>

<p>Checks if a theme is a theme registration.</p>

<Code code={data.codeBlocks.isThemeRegistration} />
