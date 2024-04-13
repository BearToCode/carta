---
title: Carta
section: Overview
---

<script>
	import * as Card from "$lib/components/ui/card";
</script>

> Modern, lightweight, powerful Markdown Editor.

Carta is a lightweight, fast and extensible Svelte Markdown editor and viewer, designed for flexibility. It works natively in SvelteKit, and supports Server Side Rendering.

## Features

- 🌈 Markdown syntax highlighting ([Shiki](https://shiki.style/));
- 🛠️ Toolbar (extensible);
- ⌨️ Keyboard **shortcuts** (extensible);
- 📦 Supports **[+150 plugins](https://github.com/remarkjs/remark/blob/main/doc/plugins.md#list-of-plugins)** thanks to remark.
- 🔀 Scroll sync;
- ✅ Accessibility friendly;
- 🖥️ **SSR** compatible;

## Official Plugins

Carta comes with a set of official plugins for the most common use cases.

<br />

<div class="w-full grid sm:grid-cols-2 gap-4">

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

<Card.Root href="/community-plugins">
<Card.Header>
<iconify-icon icon="ph:stack-fill" class="text-3xl text-sky-300"></iconify-icon>
<Card.Title>Community Plugins</Card.Title>
<Card.Description>Explore plugins from the community.</Card.Description>
</Card.Header>
</Card.Root>

</div>

## Examples

A list of examples inspired by popular platforms.

<br>

<div class="w-full grid sm:grid-cols-2 gap-4">

<Card.Root href="/examples#github">
<Card.Header>
<iconify-icon icon="mdi:github" class="text-3xl text-sky-300" ></iconify-icon>
<Card.Title>GitHub</Card.Title>
<Card.Description>Inspired by GitHub.</Card.Description>
</Card.Header>
</Card.Root>

<Card.Root href="/examples#discord">
<Card.Header>
<iconify-icon icon="ic:baseline-discord" class="text-3xl text-sky-300" ></iconify-icon>
<Card.Title>Discord</Card.Title>
<Card.Description>Inspired by Discord.</Card.Description>
</Card.Header>
</Card.Root>

<Card.Root href="/examples#math-stack-exchange">
<Card.Header>
<iconify-icon icon="fluent:math-formula-16-filled" class="text-3xl text-sky-300" ></iconify-icon>
<Card.Title>Math Stack Exchange</Card.Title>
<Card.Description>Inspired by Math Stack Exchange.</Card.Description>
</Card.Header>
</Card.Root>

</div>
