<script lang="ts">
	import Code from '$lib/components/code/Code.svelte';
	import { track } from '$lib/components/header-tracker/headers.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Editing Styles - Carta</title>
	<meta
		name="description"
		content="Learn how to customize the editor styles, including syntax highlighting and markdown stylesheets."
	/>
</svelte:head>

<span class="section">Overview</span>

<h1 class="title">Editing Styles</h1>

<h2 use:track id="editor-styles">Customizing editor styles</h2>

<p>
	While the core styles are embedded in the Svelte components, the others can be set in a custom
	stylesheet. Here is what the final rendered HTML looks like.
</p>

<Code code={data.codeBlocks.structure} />

<h3 use:track id="multiple-themes">Using multiple themes</h3>

<p>
	By using the <code>theme</code> property in <code> &lt;MarkdownEditor&gt; </code> you can differentiate
	the themes of multiple editors.
</p>

<h2 use:track id="dark-mode">Dark mode</h2>

<p>
	When using dark mode, there are two different themes that have to be changed: the editor theme and
	the one used for syntax highlighting:
</p>

<Code code={data.codeBlocks.darkMode} />

<h2 use:track id="highlighting-theme">Highlighting theme</h2>

<p>
	Carta uses <a href="https://shiki.matsu.io/" target="_blank">Shiki</a> for syntax highlighting.
	Two default themes are included in the core package, which are set as a
	<a href="https://shiki.matsu.io/guide/dual-themes" target="_blank">dual theme</a> to support light
	and dark mode. If you plan to use a custom one with light/dark modes, make sure to use a dual theme
	as well.
</p>

<p>You can change theme in the options:</p>

<Code code={data.codeBlocks.highlightTheme} />

<p>
	If you use a <a href="https://shiki.matsu.io/guide/load-theme" target="_blank">custom theme</a>(or
	a custom language), you need to provide it inside the options, so that it gets loaded into the
	highlighter:
</p>

<Code code={data.codeBlocks.shikiOptions} />

<h2 use:track id="markdown-stylesheets">Markdown stylesheets</h2>

<p>
	Markdown is converted into standard HTML, so you can edit the final styles by using standard CSS
	rules. If you do not wish to create one from the ground up, you can use some already complete
	stylesheets, like <a href="https://github.com/sindresorhus/github-markdown-css"
		>github-markdown-css</a
	>
	or <a href="https://tailwindcss.com/docs/typography-plugin">Tailwind Typography</a>.
</p>
