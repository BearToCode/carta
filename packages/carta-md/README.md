<div align="right">
	<a href="https://www.npmjs.com/package/carta-md">
		<img src="https://img.shields.io/npm/v/carta-md?color=0384fc&labelColor=171d27&logo=npm&logoColor=white" alt="npm">
	</a>
	<a href="https://bundlephobia.com/package/carta-md">
		<img src="https://img.shields.io/bundlephobia/min/carta-md?color=0384fc&labelColor=171d27&logo=javascript&logoColor=white" alt="bundle">
	</a>
	<a href="https://github.com/BearToCode/carta/blob/master/LICENSE">
		<img src="https://img.shields.io/npm/l/carta-md?color=0384fc&labelColor=171d27&logo=git&logoColor=white" alt="license">
	</a>
	<a href="http://beartocode.github.io/carta/">
		<img src="https://img.shields.io/readthedocs/carta?logo=svelte&color=0384fc&logoColor=ffffff&labelColor=171d27" alt="docs">
	</a>
</div>

[![Carta.png](https://i.postimg.cc/nV6DMXKM/Carta.png)](https://beartocode.github.io/carta/)

<h1 align="center"><strong>Carta</strong></h1>
<div align="center">Modern, lightweight, powerful Markdown Editor.</div>
<br />
<div align="center">
<a href="https://beartocode.github.io/carta/">Documentation</a> 
<span> · </span>
<a href="https://github.com/BearToCode/carta">GitHub</a> 
</div>

<br>

# Introduction

Carta is a **lightweight**, **fast** and **extensible** Svelte Markdown editor and viewer, based on [Marked](https://github.com/markedjs/marked). Check out the [examples](http://beartocode.github.io/carta/examples) to see it in action.
Differently from most editors, Carta includes neither ProseMirror nor CodeMirror, allowing for an extremely small bundle size and fast loading time.

## Features

- ⌨️ Keyboard **shortcuts** (extensible);
- 🛠️ Toolbar (extensible);
- 🌈 Markdown syntax highlighting;
- 🔀 Scroll sync;
- ✅ Accessibility friendly;
- 💻 **SSR** compatible;
- ⚗️ **KaTeX** support (plugin);
- 🔨 **Slash** commands (plugin);
- 😄 **Emojis**, with included search (plugin);
- ✏️ **TikZ** support (plugin);
- 📂 **Attachment** support (plugin);
- ⚓ **Anchor** links in headings;
- 🌈 Code blocks **syntax highlighting** (plugin).

# Getting started

> **Warning**
> Sanitization is not dealt with by Carta. You need to provide a `sanitizer` in the options.
> Common sanitizers are [isomorphic-dompurify](https://www.npmjs.com/package/isomorphic-dompurify) (suggested) and [sanitize-html](https://www.npmjs.com/package/sanitize-html).

## Basic configuration

```svelte
<script lang="ts">
	import { Carta, MarkdownEditor } from 'carta-md';
	// Component default theme
	import 'carta-md/default.css';
	// Markdown input theme (Speed Highlight)
	import 'carta-md/light.css';

	const carta = new Carta({
		// Remember to use a sanitizer to prevent XSS attacks
		// sanitizer: mySanitizer
	});
</script>

<MarkdownEditor {carta} />

<style>
	/* Or in global stylesheet */
	/* Set your custom monospace font */
	:global(.carta-font-code) {
		font-family: '...', monospace;
	}
</style>
```

# Documentation

For the full documentation, examples, guides and more checkout the [website](https://beartocode.github.io/carta/).

- [Introduction](https://beartocode.github.io/carta/introduction)
- [Examples](https://beartocode.github.io/carta/examples)
- [Getting Started](https://beartocode.github.io/carta/getting-started)
- [Editing Styles](https://beartocode.github.io/carta/editing-styles)
- Plugins:
  - [Math](https://beartocode.github.io/carta/plugins/math)
  - [Code](https://beartocode.github.io/carta/plugins/code)
  - [Emoji](https://beartocode.github.io/carta/plugins/emoji)
  - [Slash](https://beartocode.github.io/carta/plugins/slash)
  - [TikZ](https://beartocode.github.io/carta/plugins/tikz)
  - [Attachment](https://beartocode.github.io/carta/plugins/attachment)
- API:
  - [Utilities](https://beartocode.github.io/carta/api/utilities)
  - [Core](https://beartocode.github.io/carta/api/core)
  - [Extension](https://beartocode.github.io/carta/api/extension)
