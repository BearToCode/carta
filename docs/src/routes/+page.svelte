<script lang="ts">
	import { track } from '$lib/components/header-tracker/headers.svelte';
	import * as Card from '$lib/components/ui/card';
</script>

<svelte:head>
	<title>Carta</title>
	<meta name="description" content="Modern, lightweight, powerful Markdown Editor." />
</svelte:head>

<span class="section">Overview</span>

<h1 class="title">Carta</h1>

<blockquote>Modern, lightweight, powerful Markdown Editor.</blockquote>

<p>
	Carta is a lightweight, fast and extensible Svelte Markdown editor and viewer, designed for
	flexibility. It works natively in SvelteKit, and supports Server Side Rendering.
</p>

<h2 use:track id="features">Features</h2>

<ul>
	<li>
		🌈 Markdown syntax <strong>highlighting</strong> (<a href="https://shiki.style/" target="_blank"
			>Shiki</a
		>);
	</li>
	<li>🛠️ <strong>Toolbar</strong> (extensible);</li>
	<li>⌨️ Keyboard <strong>shortcuts</strong> (extensible);</li>
	<li>
		📦 Supports <a
			href="https://github.com/remarkjs/remark/blob/main/doc/plugins.md#list-of-plugins"
			target="_blank">150+ plugins</a
		> thanks to remark;
	</li>
	<li>🔀 <strong>Scroll</strong> sync;</li>
	<li>✅ <strong>Accessibility</strong> friendly;</li>
	<li>🖥️ <strong>SSR</strong> compatible;</li>
	<li>⚗️ KaTeX support (plugin);</li>
	<li>🔨 Slash commands (plugin);</li>
	<li>😄 Emojis, with included search (plugin);</li>
	<li>✏️ TikZ support (plugin);</li>
	<li>📂 Attachment support (plugin);</li>
	<li>⚓ Anchor links in headings (plugin);</li>
	<li>🌈 Code blocks syntax highlighting (plugin);</li>
	<li>⚙️ Embed Components (plugin).</li>
</ul>

<h2 use:track id="official-plugins">Official Plugins</h2>

<p>Carta comes with a set of official plugins for the most common use cases.</p>

<br />

<div class="grid w-full gap-4 sm:grid-cols-2">
	<Card.Root href="/plugins/math">
		<Card.Header>
			<iconify-icon icon="tabler:math" class="text-3xl text-sky-300"></iconify-icon>
			<Card.Title>Math</Card.Title>
			<Card.Description>Support for KaTex expressions.</Card.Description>
		</Card.Header>
	</Card.Root>

	<Card.Root href="/plugins/code">
		<Card.Header>
			<iconify-icon icon="fluent:code-16-filled" class="text-3xl text-sky-300"></iconify-icon>
			<Card.Title>Code</Card.Title>
			<Card.Description>Code blocks syntax highlighting.</Card.Description>
		</Card.Header>
	</Card.Root>

	<Card.Root href="/plugins/emoji">
		<Card.Header>
			<iconify-icon icon="mingcute:emoji-line" class="text-3xl text-sky-300"></iconify-icon>
			<Card.Title>Emoji</Card.Title>
			<Card.Description>Embed emojis in Markdown.</Card.Description>
		</Card.Header>
	</Card.Root>

	<Card.Root href="/plugins/slash">
		<Card.Header>
			<iconify-icon icon="tabler:slash" class="text-3xl text-sky-300"></iconify-icon>
			<Card.Title>Slash</Card.Title>
			<Card.Description>Support for slash commands.</Card.Description>
		</Card.Header>
	</Card.Root>

	<Card.Root href="/plugins/tikz">
		<Card.Header>
			<iconify-icon icon="mdi:draw-pen" class="text-3xl text-sky-300"></iconify-icon>
			<Card.Title>TikZ</Card.Title>
			<Card.Description>Support for TikZ/PgfPlots diagrams.</Card.Description>
		</Card.Header>
	</Card.Root>

	<Card.Root href="/plugins/attachment">
		<Card.Header>
			<iconify-icon icon="tdesign:attach" class="text-3xl text-sky-300"></iconify-icon>
			<Card.Title>Attachment</Card.Title>
			<Card.Description>Handle text attachments.</Card.Description>
		</Card.Header>
	</Card.Root>

	<Card.Root href="/plugins/anchor">
		<Card.Header>
			<iconify-icon icon="mingcute:link-fill" class="text-3xl text-sky-300"></iconify-icon>
			<Card.Title>Anchor</Card.Title>
			<Card.Description>Add anchor links to headings.</Card.Description>
		</Card.Header>
	</Card.Root>

	<Card.Root href="/plugins/component">
		<Card.Header>
			<iconify-icon icon="ri:svelte-fill" class="text-3xl text-sky-300"></iconify-icon>
			<Card.Title>Component</Card.Title>
			<Card.Description>Map elements to components.</Card.Description>
		</Card.Header>
	</Card.Root>

	<Card.Root href="/community-plugins">
		<Card.Header>
			<iconify-icon icon="ph:stack-fill" class="text-3xl text-sky-300"></iconify-icon>
			<Card.Title>Community Plugins</Card.Title>
			<Card.Description>Explore plugins from the community.</Card.Description>
		</Card.Header>
	</Card.Root>
</div>

<h2 use:track id="examples">Examples</h2>

<p>A list of examples inspired by popular platforms.</p>

<br />

<div class="grid w-full gap-4 sm:grid-cols-2">
	<Card.Root href="/examples#github">
		<Card.Header>
			<iconify-icon icon="mdi:github" class="text-3xl text-sky-300"></iconify-icon>
			<Card.Title>GitHub</Card.Title>
			<Card.Description>Inspired by GitHub.</Card.Description>
		</Card.Header>
	</Card.Root>

	<Card.Root href="/examples#discord">
		<Card.Header>
			<iconify-icon icon="ic:baseline-discord" class="text-3xl text-sky-300"></iconify-icon>
			<Card.Title>Discord</Card.Title>
			<Card.Description>Inspired by Discord.</Card.Description>
		</Card.Header>
	</Card.Root>

	<Card.Root href="/examples#math-stack-exchange">
		<Card.Header>
			<iconify-icon icon="fluent:math-formula-16-filled" class="text-3xl text-sky-300"
			></iconify-icon>
			<Card.Title>Math Stack Exchange</Card.Title>
			<Card.Description>Inspired by Math Stack Exchange.</Card.Description>
		</Card.Header>
	</Card.Root>
</div>
