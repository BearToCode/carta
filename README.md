<div align="right">
	<a href="https://www.npmjs.com/package/carta-md">
		<img src="https://img.shields.io/npm/v/carta-md?color=ff7cc6&labelColor=171d27&logo=npm&logoColor=white" alt="npm">
	</a>
	<a href="https://bundlephobia.com/package/carta-md">
		<img src="https://img.shields.io/bundlephobia/min/carta-md?color=4dacfa&labelColor=171d27&logo=javascript&logoColor=white" alt="bundle">
	</a>
	<a href="https://github.com/BearToCode/carta/blob/master/LICENSE">
		<img src="https://img.shields.io/npm/l/carta-md?color=71d58a&labelColor=171d27&logo=git&logoColor=white" alt="license">
	</a>
	<a href="http://beartocode.github.io/carta/">
		<img src="https://img.shields.io/readthedocs/carta?logo=svelte&color=b581fd&logoColor=ffffff&labelColor=171d27" alt="docs">
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

## Packages

| Package                                                                       | Status                                                                        | Docs                                                                         |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [carta-md](https://www.npmjs.com/package/carta-md)                            | ![carta-md](https://img.shields.io/npm/v/carta-md)                            | [/](https://beartocode.github.io/carta/introduction)                         |
| [plugin-math](https://www.npmjs.com/package/@cartamd/plugin-math)             | ![plugin-math](https://img.shields.io/npm/v/@cartamd/plugin-math)             | [/plugins/math](https://beartocode.github.io/carta/plugins/math)             |
| [plugin-code](https://www.npmjs.com/package/@cartamd/plugin-code)             | ![plugin-code](https://img.shields.io/npm/v/@cartamd/plugin-code)             | [/plugins/code](https://beartocode.github.io/carta/plugins/code)             |
| [plugin-emoji](https://www.npmjs.com/package/@cartamd/plugin-emoji)           | ![plugin-emoji](https://img.shields.io/npm/v/@cartamd/plugin-emoji)           | [/plugins/emoji](https://beartocode.github.io/carta/plugins/emoji)           |
| [plugin-slash](https://www.npmjs.com/package/@cartamd/plugin-slash)           | ![plugin-slash](https://img.shields.io/npm/v/@cartamd/plugin-slash)           | [/plugins/slash](https://beartocode.github.io/carta/plugins/slash)           |
| [plugin-tikz](https://www.npmjs.com/package/@cartamd/plugin-tikz)             | ![plugin-tikz](https://img.shields.io/npm/v/@cartamd/plugin-tikz)             | [/plugins/tikz](https://beartocode.github.io/carta/plugins/tikz)             |
| [plugin-attachment](https://www.npmjs.com/package/@cartamd/plugin-attachment) | ![plugin-attachment](https://img.shields.io/npm/v/@cartamd/plugin-attachment) | [/plugins/attachment](https://beartocode.github.io/carta/plugins/attachment) |
| [plugin-anchor](https://www.npmjs.com/package/@cartamd/plugin-anchor)         | ![plugin-anchor](https://img.shields.io/npm/v/@cartamd/plugin-anchor)         | [/plugins/anchor](https://beartocode.github.io/carta/plugins/anchor)         |

## Community plugins

| Plugin                                                                        | Description                        |
| ----------------------------------------------------------------------------- | ---------------------------------- |
| [carta-plugin-video](https://github.com/maisonsmd/carta-plugin-video)         | Render online videos               |
| [carta-plugin-imsize](https://github.com/maisonsmd/carta-plugin-imsize)       | Render images in specific sizes    |
| [carta-plugin-subscript](https://github.com/maisonsmd/carta-plugin-subscript) | Render subscripts and superscripts |
| [carta-plugin-ins-del](https://github.com/maisonsmd/carta-plugin-ins-del)     | `<ins>` and `<del>` tags support   |

# Getting started

> [!WARNING]
> Sanitization is not dealt with by Carta. You need to provide a `sanitizer` in the options.
> Common sanitizers are [isomorphic-dompurify](https://www.npmjs.com/package/isomorphic-dompurify) (suggested) and [sanitize-html](https://www.npmjs.com/package/sanitize-html).

## Installation

Core package:

```
npm i carta-md
```

Plugins:

```
npm i @cartamd/plugin-name
```

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
  - [Anchor](https://beartocode.github.io/carta/plugins/anchor)
- API:
  - [Utilities](https://beartocode.github.io/carta/api/utilities)
  - [Core](https://beartocode.github.io/carta/api/core)
  - [Extension](https://beartocode.github.io/carta/api/extension)

# Contributing & Development

Every contribution is well accepted. If you have a feature request you can open a new issue.

This package uses a [pnpm workspace](https://pnpm.io/workspaces), so pnpm is required to download and put everything together properly.

### Committing

This repository is [commitizen](https://github.com/commitizen/cz-cli) friendly. To commit use:

```
npm run commit
# or, if you have commitizen installed globally
git cz
```

### Running docs

If you want to preview the docs:

```
cd docs
npm run dev
```
