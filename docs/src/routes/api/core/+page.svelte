<script lang="ts">
	import { track } from '$lib/components/header-tracker/headers.svelte';
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>Core - Carta</title>
	<meta name="description" content="Core API for Carta." />
</svelte:head>

<span class="section">API</span>

<h1 class="title">Core</h1>

<h2 use:track id="carta-options">
	<code>Carta</code> options
</h2>

<p>
	List of options that can be used when creating <code>Carta</code>:
</p>

<h3 use:track id="gfm-options">
	<code>gfmOptions</code>
</h3>

<p>
	Type: <code>GfmOptions</code>
</p>

<p>GitHub Flavored Markdown options.</p>

<h3 use:track id="extensions">
	<code>extensions</code>
</h3>

<p>
	Type: <code>Extension[]</code>
</p>

<p>List of extensions(plugins) to use.</p>

<h3 use:track id="renderer-debounce">
	<code>rendererDebounce</code>
</h3>

<p>Type: <code>number</code></p>

<p>Rendering debouncing timeout, in milliseconds. Defaults to 300ms.</p>

<h3 use:track id="disable-shortcuts">
	<code>disableShortcuts</code>
</h3>

<p>
	Type: <code>DefaultShortcutId[] | true</code>
</p>

<p>
	Remove default shortcuts by id. You can use <code>true</code> to disable all of them.
</p>

<h3 use:track id="disable-icons">
	<code>disableIcons</code>
</h3>

<p>
	Type: <code>DefaultIconId[] | true</code>
</p>

<p>
	Remove default icons by id. You can use <code>true</code> to disable all of them.
</p>

<h3 use:track id="disable-prefixes">
	<code>disablePrefixes</code>
</h3>

<p>
	Type: <code>DefaultPrefixId[] | true</code>
</p>

<p>Remove default prefixes by id. You can use <code>true</code> to disable all of them.</p>

<h3 use:track id="disable-tab-outs">
	<code>disableTabOuts</code>
</h3>

<p>
	Type: <code>DefaultTabOutId[] | true</code>
</p>

<p>
	Remove default tab-outs by id. You can use <code>true</code> to disable all of them.
</p>

<h3 use:track id="history-options">
	<code>historyOptions</code>
</h3>

<p>History management options.</p>

<h4>
	<code> historyOptions.minInterval </code>
</h4>

<p>
	Type: <code>number</code>
</p>

<p>Minimum interval between save states in milliseconds. Defaults to 300ms.</p>

<h4>
	<code>historyOptions.maxSize</code>
</h4>

<p>
	Type: <code>number</code>
</p>

Maximum history size in bytes. Defaults to 1MB.

<h3 use:track id="sanitizer">
	<code>sanitizer</code>
</h3>

<p>Type: <code>(html: string) => void</code></p>

<p>HTML sanitizer. See here for <a href="{base}/getting-started#sanitization">more</a> details.</p>

<h3 use:track id="shiki-options">
	<code> shikiOptions </code>
</h3>

<p>Type: <code>ShikiOptions</code></p>

<p>Highlighter(Shiki) options.</p>

<h3 use:track id="theme">
	<code>theme</code>
</h3>

<p>Type: <code>Theme | DualTheme</code></p>

<p>Shiki theme to use to highlight Markdown.</p>

<h2 use:track id="markdown-editor-options">
	<code>MarkdownEditor</code>
	options
</h2>

<p>
	List of options that can be used in the <code>&lt;MarkdownEditor&gt;</code> component.
</p>

<h3 use:track id="editor-carta">
	<code>carta</code>
</h3>

<p>
	Type: <code>Carta</code>
</p>

<p>Carta instance to use for this editor.</p>

<h3 use:track id="editor-theme">
	<code>theme</code>
</h3>

<p>
	Type: <code>string</code>
</p>

<p>
	The theme of this editor. The editor and related elements will have <code
		>carta-theme_&lt;theme&gt;</code
	> as a class.
</p>

<h3 use:track id="editor-value">
	<code>value</code>
</h3>

<p>
	Type: <code>string</code>
</p>

<p>Current Markdown input value.</p>

<h3 use:track id="mode">
	<code>mode</code>
</h3>

<p>
	Type: <code>'tabs' | 'split' | 'auto'</code>
</p>

<p>
	Editor windows mode. With <code>auto</code> it will split when the window size is greater than 768px.
</p>

<h3 use:track id="scroll">
	<code>scroll</code>
</h3>

<p>
	Type: <code>'sync' | 'async'</code>
</p>

<p>Scroll synchronization.</p>

<h3 use:track id="disable-toolbar">
	<code>disableToolbar</code>
</h3>

<p>
	Type: <code>boolean</code>
</p>

<p>Option to disable the toolbar.</p>

<h3 use:track id="placeholder">
	<code>placeholder</code>
</h3>

<p>
	Type: <code>string</code>
</p>

<p>Set the textarea placeholder.</p>

<h3 use:track id="textarea">
	<code>textarea</code>
</h3>

<p>
	Type: <code>TextAreaProps</code> (extends <code>Record&lt;string, unknown&gt;</code>)
</p>

<p>
	Additional properties that will be used in the textarea used under the hood in the editor. <code
		>class</code
	>,
	<code>placeholder</code> and <code>value</code> are not allowed. Use the corresponding editor properties
	instead.
</p>

<h3 use:track id="labels">
	<code>labels</code>
</h3>

<p>
	Type: <code>Partial&lt;Labels&gt;</code>
</p>

<p>Can be used to provide custom text for labels in the editor.</p>

<h3 use:track id="highlight-delay">
	<code>highlightDelay</code>
</h3>

<p>
	Type: <code>number</code>
</p>

<p>Highlight delay in milliseconds. Defaults to 250ms.</p>

<h2 use:track id="markdown-options">
	<code>Markdown</code> options
</h2>

<p>
	List of options that can be used in the <code>&lt;Markdown&gt;</code> component.
</p>

<h3 use:track id="markdown-carta">
	<code>carta</code>
</h3>

<p>
	Type: <code>Carta</code>
</p>

<p>Carta instance to use for this editor.</p>

<h3 use:track id="markdown-theme">
	<code>theme</code>
</h3>

<p>
	Type: <code>string</code>
</p>

<p>
	The theme to use. The element will have <code>carta-theme_&lt;theme&gt;</code> as a class.
</p>

<h3 use:track id="markdown-value">
	<code>value</code>
</h3>

<p>
	Type: <code>string</code>
</p>

<p>Current Markdown input value.</p>

<h3 use:track id="selected-tab">
	<p>selectedTab</p>
</h3>

<p>
	Type: <code>'write' | 'preview'</code>
</p>

<p>The selected editor tab.</p>

<h3 use:track id="pre-rendered-options">
	<code>PreRendered</code> options
</h3>

<p>
	List of options that can be used in the <code>&lt;PreRendered&gt;</code> component.
</p>

<h3 use:track id="html">
	<code>html</code>
</h3>

<p>
	Type: <code>string</code>
</p>

<p>
	The HTML to render. It is <code>NOT</code> sanitized.
</p>

<h3 use:track id="pre-rendered-theme">
	<code>theme</code>
</h3>

<p>
	Type: <code>string</code>
</p>

<p>
	The theme to use. The element will have <code>carta-theme_&lt;theme&gt;</code> as a class.
</p>
