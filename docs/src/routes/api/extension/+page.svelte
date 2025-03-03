<script lang="ts">
	import { track } from '$lib/components/header-tracker/headers.svelte';
	import Code from '$lib/components/code/Code.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Extension - Carta</title>
	<meta name="description" content="Extension API for Carta." />
</svelte:head>

<span class="section">API</span>

<h1 class="title">Extension</h1>

<h2 use:track id="plugin-properties">
	<code>Plugin</code> properties
</h2>

<p>You can easily extend Carta by creating custom plugins.</p>

<Code code={data.codeBlocks.extension} />

<p>
	Here are all the <code>Plugin</code> properties:
</p>

<h3 use:track id="transformers">
	<code>transformers</code>
</h3>

<p>
	Type: <code>UnifiedTransformer</code>
</p>

<p>Remark or Rehype transformers.</p>

<Code code={data.codeBlocks.transformer} />

<h4 use:track id="transformer-execution">
	<code>UnifiedTransformer.execution</code>
</h4>

Type:<code>'sync' | 'async'</code>

<p>If you specify async, this transformer won’t be available for SSR.</p>

<h4 use:track id="transformer-type">
	<code>UnifiedTransformer.type</code>
</h4>

Type:<code>'remark' | 'rehype'</code>

<p>
	This determines at which step the transformer will operate, whether on Remark, on a Markdown-based
	syntax tree, or Rehype, on a HTML-based one.
</p>

<h4 use:track id="transformer-transform">
	<code>UnifiedTransformer.transform</code>
</h4>

<p>
	Type: <code>(&#123;(processor, carta)&#125;) => void</code>
</p>

<p>The actual processor, can be async if the execution is specified as such.</p>

<h3 use:track id="shortcuts"><code>shortcuts</code></h3>

Type:<code>KeyboardShortcut[]</code>

<p>Additional keyboards shortcut. For example:</p>

<Code code={data.codeBlocks.shortcut} />

<h4 use:track id="shortcut-id">
	<code>KeyboardShortcut.id</code>
</h4>

<p>
	Type: <code>string</code>
</p>

<p>Id of the shortcut.</p>

<h4 use:track id="shortcut-combination">
	<code>KeyboardShortcut.combination</code>
</h4>

<p>
	Type: <code>Set&lt;string&gt;</code>
</p>

<p>
	Set of keys, corresponding to the <code>e.key</code> of <code>KeyboardEvents</code>, but
	lowercase.
</p>

<h4 use:track id="shortcut-action">
	<code>KeyboardShortcut.action</code>
</h4>

<p>
	Type: <code>(input: InputEnhancer) => void</code>
</p>

<p>Shortcut callback function.</p>

<h4 use:track id="shortcut-prevent-save"><code>KeyboardShortcut.preventSave</code></h4>

<p>Prevent saving the current state in history.</p>

<h3 use:track id="icons">
	<code>icons</code>
</h3>

<p>
	Type: <code>Icon[]</code>
</p>

<p>Additional toolbar icons. For example:</p>

<Code code={data.codeBlocks.icon} />

<h4 use:track id="icon-id">
	<code>Icon.id</code>
</h4>

<p>
	Type: <code>string</code>
</p>

<p>Id of the icon.</p>

<h4 use:track id="icon-action">
	<code>Icon.action</code>
</h4>

<p>
	Type: <code>(input: InputEnhancer) => void</code>
</p>

<p>Click callback.</p>

<h4 use:track id="icon-component">
	<code>Icon.component</code>
</h4>

<p>Type: <code>ComponentType</code> (SvelteComponent)</p>

<p>The Icon as a Svelte component.</p>

<h3 use:track id="prefixes">
	<code>prefixes</code>
</h3>

<p>
	Type: <code>Prefix[]</code>
</p>

<p>
	Text prefixes, default ones include the <code>-</code> for bulleted lists, <code>1.</code> for
	numbered lists, <code>- [ ]</code> for task lists.
</p>

<Code code={data.codeBlocks.prefix} />

<h4 use:track id="prefix-id">
	<code>Prefix.id</code>
</h4>

<p>
	Type: <code>string</code>
</p>

<p>Id of the prefix.</p>

<h4 use:track id="prefix-match">
	<code>Prefix.match</code>
</h4>

<p>Type: <code>(line: string) => string | undefined</code></p>

<p>Function that returns the prefix, if it is present.</p>

<h4 use:track id="prefix-maker">
	<code>Prefix.maker</code>
</h4>

<p>
	Type: <code>(previousMatch: string, previousLine: string) => string</code>
</p>

<p>Function that returns the prefix for the new line. <br /> Example:</p>

<Code code={data.codeBlocks.prefixMaker} />

<h3 use:track id="tabOuts">
	<code>tabOuts</code>
</h3>

<p>
	“Tab-outs” allow users to use the <code>tab</code> key to skip certain pieces of text. For
	example, after using the bold shortcut and having typed the text, you can press <code>tab</code>
	to skip the ending <code>**</code>.
</p>

<Code code={data.codeBlocks.tabOut} />

<h4 use:track id="tabOut-id">
	<code>TabOut.id</code>
</h4>

<p>
	Type: <code>string</code>
</p>

<p>Id of the tab-out.</p>

<h4 use:track id="tabOut-delimiter">
	<code>TabOut.delimiter</code>
</h4>

<p>
	Type: <code>string | readonly string[]</code>
</p>

<p>
	Text(s) to check for. If one of them is found after the textarea <code>selectionEnd</code>,
	pressing tab will place the cursor after that.
</p>

<h3 use:track id="listeners">
	<code>listeners</code>
</h3>

<p>
	Type: <code>Listener[]</code>
</p>

<p>
	Textarea event listeners. Has an additional <code>carta-render</code> and
	<code>carta-render-ssr</code> events keys.
</p>

<Code code={data.codeBlocks.listener} />

<h3 use:track id="components">
	<code>components</code>
</h3>

<p>
	Type: <code>ExtensionComponent[]</code>
</p>

<p>Additional components to be added to the editor or viewer.</p>

<h3 use:track id="extension-component">
	<code> ExtensionComponent&lt;T&gt;.component </code>
</h3>

<p>
	Type: <code>typeof SvelteComponentTyped&lt;T & &#123; carta: Carta &#125;&gt;</code>
</p>

<p>
	Svelte components that exports <code>carta: Carta</code> and all the other properties specified as
	the generic parameter and in <code>props</code>.
</p>

<h3 use:track id="extension-props">
	<code> ExtensionComponent&lt;T&gt;.props </code>
</h3>

<p>
	Type: <code>T</code>
</p>

<p>Properties that will be handed to the component.</p>

<h3 use:track id="extension-parent">
	<code>ExtensionComponent&lt;T&gt;.parent</code>
</h3>

<p>Type: <code>MaybeArray&lt;'editor' | 'input' | 'renderer' | 'preview'&gt;</code></p>

<p>Where the element will be placed.</p>

<h3 use:track id="grammar-rules">
	<code>grammarRules</code>
</h3>

<p>
	Type: <code>GrammarRule[]</code>
</p>

<p>Custom Markdown TextMate grammar rules for Shiki. They will be injected into the language.</p>

<h3 use:track id="highlight-rules">
	<code>highlightRules</code>
</h3>

<p>
	Type: <code>HighlightingRule[]</code>
</p>

<p>Custom highlighting rules for ShiKi. They will be injected into the selected theme.</p>

<h3 use:track id="on-load">
	<code> onLoad </code>
</h3>

<p>
	Type: <code>(data: &#123; carta: Carta; highlight: HighlightFunctions &#125;) => void</code>
</p>

<p>Use this callback to execute code when one Carta instance loads the extension.</p>
