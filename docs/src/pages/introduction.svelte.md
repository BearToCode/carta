---
title: Carta
section: Overview
---

<script>
	import * as Card from "$lib/components/ui/card";
	import * as Icon from "radix-icons-svelte"; 
</script>

> Swiftly edit and render Markdown, with no overhead.

Carta is a lightweight, fast and extensible Svelte Markdown editor and viewer, designed for flexibility. It works natively in SvelteKit, and supports Server Side Rendering.

## Features

- **Lightweight**: no code editor is included, just a textarea with syntax highlighting, with Markdown related utilities.
- **SSR compatible**: works great with SvelteKit.
- **Keyboard shortcuts**: extensible and configurable.
- **Toolbar**: add or remove buttons according to your needs.
- **Plugins friendly**: easily create your own extension.
- **Accessibility**: includes ARIA roles, arrow keys navigation and labels.

## Official Plugins

Carta comes with a set of official plugins for the most common use cases.

<br />

<div class="w-full grid sm:grid-cols-2 gap-4">

<Card.Root href="/plugins/math">
<Card.Header>
<Icon.FontFamily class="w-8 h-8 text-sky-300" />
<Card.Title>Math</Card.Title>
<Card.Description>Support for KaTex expressions.</Card.Description>
</Card.Header>
</Card.Root>

<Card.Root href="/plugins/code">
<Card.Header>
<Icon.Code class="w-8 h-8 text-sky-300" />
<Card.Title>Code</Card.Title>
<Card.Description>Code blocks syntax highlighting.</Card.Description>
</Card.Header>
</Card.Root>

<Card.Root href="/plugins/emoji">
<Card.Header>
<Icon.Face class="w-8 h-8 text-sky-300" />
<Card.Title>Emoji</Card.Title>
<Card.Description>Embed emojis in Markdown.</Card.Description>
</Card.Header>
</Card.Root>

<Card.Root href="/plugins/slash">
<Card.Header>
<Icon.Slash class="w-8 h-8 text-sky-300" />
<Card.Title>Slash</Card.Title>
<Card.Description>Support for slash commands.</Card.Description>
</Card.Header>
</Card.Root>

<Card.Root href="/plugins/tikz">
<Card.Header>
<Icon.Cube class="w-8 h-8 text-sky-300" />
<Card.Title>TikZ</Card.Title>
<Card.Description>Support for TikZ/PgfPlots diagrams.</Card.Description>
</Card.Header>
</Card.Root>

<Card.Root href="/plugins/attachment">
<Card.Header>
<Icon.File class="w-8 h-8 text-sky-300" />
<Card.Title>Attachment</Card.Title>
<Card.Description>Handle text attachments.</Card.Description>
</Card.Header>
</Card.Root>

<Card.Root href="/plugins/anchor">
<Card.Header>
<Icon.Link2 class="w-8 h-8 text-sky-300" />
<Card.Title>Anchor</Card.Title>
<Card.Description>Add anchor links to headings.</Card.Description>
</Card.Header>
</Card.Root>

</div>

## Examples

A list of examples inspired by popular platforms.

<br>

<div class="w-full grid sm:grid-cols-2 gap-4">

<Card.Root href="/examples#github">
<Card.Header>
<Icon.GithubLogo class="w-8 h-8 text-sky-300" />
<Card.Title>GitHub</Card.Title>
<Card.Description>Inspired by GitHub.</Card.Description>
</Card.Header>
</Card.Root>

<Card.Root href="/examples#discord">
<Card.Header>
<Icon.DiscordLogo class="w-8 h-8 text-sky-300" />
<Card.Title>Discord</Card.Title>
<Card.Description>Inspired by Discord.</Card.Description>
</Card.Header>
</Card.Root>

<Card.Root href="/examples#math-stack-exchange">
<Card.Header>
<Icon.Cube class="w-8 h-8 text-sky-300" />
<Card.Title>Math Stack Exchange</Card.Title>
<Card.Description>Inspired by Math Stack Exchange.</Card.Description>
</Card.Header>
</Card.Root>

</div>
