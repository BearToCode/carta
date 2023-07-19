<div align="center">
	<h1>Carta</h1>
	<a href="https://www.npmjs.com/package/carta-md"><img src="https://img.shields.io/npm/v/carta-md?color=%234f7ce3" alt="npm"></a>
	<a href="https://bundlephobia.com/package/carta-md"><img src="https://img.shields.io/bundlephobia/min/carta-md?color=%235db8fc" alt="bundle"></a>
	<a href="https://github.com/BearToCode/carta-md/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/carta-md?color=%232cd1de" alt="license"></a>
</div>

![Demo](https://github.com/BearToCode/carta-md/blob/master/images/demo.png?raw=true)

A **lightweight**, **fast** and **extensible** Svelte Markdown editor and viewer. Check out the [demo](http://beartocode.me/carta-md/) to see it in action.

Differently from most editors, Carta includes neither ProseMirror nor CodeMirror, allowing for an extremely small bundle size and fast loading time.

## Features

- Keyboard **shortcuts** (extensible);
- Toolbar (extensible);
- Markdown syntax highlighting;
- Scroll sync;
- **SSR** compatible;
- **Katex** support (plugin);
- **Slash** commands (plugin);
- **Emojis**, with included search (plugin);
- **Tikz** support(plugin).
- Code blocks **syntax highlighting** (plugin).

## Getting started

> :exclamation:Warning: **sanitization** is **not** dealt with by Carta. You need to provide a `sanitizer` in the options.

### Installation

Core package:

```
npm i carta-md
```

Plugins:

```
npm i @cartamd/plugin-name
```

### Basic configuration

```svelte
<script lang="ts">
	import { Carta, CartaEditor } from 'carta-md';
	// Component default theme
	import 'carta-md/default-theme.css';
	// Markdown input theme (Speed Highlight)
	import 'carta-md/light.css';

	const carta = new Carta({
		// Remember to use a sanitizer to prevent XSS attacks
		// sanitizer: mySanitizer
	});
</script>

<CartaEditor {carta} />

<style>
	/* Or in global stylesheet */
	/* Set your custom monospace font */
	:global(.carta-font-code) {
		font-family: '...', monospace;
	}
</style>
```

Editor component exported properties:

| Name             | Type                      | Description                               |
| ---------------- | ------------------------- | ----------------------------------------- |
| `carta`          | `Carta`                   | Carta Editor                              |
| `theme`          | `string`                  | For custom css themes, see below for more |
| `value`          | `string`                  | Markdown input                            |
| `mode`           | `'tabs', 'split', 'auto'` | Tabs settings                             |
| `disableToolbar` | `boolean`                 | Option to disable the toolbar             |

### Plugins

Each plugin's _readme_ includes a guide on its use.

| Name                                                                                     | Description                             |
| ---------------------------------------------------------------------------------------- | --------------------------------------- |
| [plugin-math](https://github.com/BearToCode/carta-md/tree/master/packages/plugin-math)   | Katex support                           |
| [plugin-slash](https://github.com/BearToCode/carta-md/tree/master/packages/plugin-slash) | Slash commands support                  |
| [plugin-emoji](https://github.com/BearToCode/carta-md/tree/master/packages/plugin-emoji) | Emojis support, including inline search |
| [plugin-code](https://github.com/BearToCode/carta-md/tree/master/packages/plugin-code)   | Code blocks syntax highlighting         |
| [plugin-tikz](https://github.com/BearToCode/carta-md/tree/master/packages/plugin-tikz)   | TikZ support using TikZJax              |

## Themes customization

By using the `theme` property in `CartaEditor` and `CartaPreview` you can change their classes to `carta-editor__{theme}` and `carta-viewer__{theme}`.

Check out the [default theme](https://github.com/BearToCode/carta-md/blob/master/packages/carta-md/src/lib/default-theme.css) to customize it.

If you are using a plugin, look at its _readme_ for its customization.

Markdown highlighting is done using **Speed Highlight JS**, [here](https://github.com/speed-highlight/core/tree/main/src/themes) you can find more themes.

You can find complete Markdown stylesheet online. For example [github-markdown-css](https://github.com/sindresorhus/github-markdown-css)(used in the demo), or [tailwind-typography](https://tailwindcss.com/docs/typography-plugin).

## Extensibility

### Options

Carta options:

| Name               | Type                           | Description                                     |
| ------------------ | ------------------------------ | ----------------------------------------------- |
| `extensions`       | `CartaExtension[]`             | Editor/viewer extensions                        |
| `rendererDebounce` | `number`                       | Renderer debouncing timeout, in ms (def. 300ms) |
| `disableShortcuts` | `DefaultShortcutId[] \| true`  | Remove default shortcuts by ids                 |
| `disableIcons`     | `DefaultIconId[] \| true`      | Remove default icons by ids                     |
| `disablePrefixes`  | `DefaultPrefixId[] \| true`    | Remove default prefixes by ids                  |
| `historyOptions`   | `Partial<CartaHistoryOptions>` | History (Undo/Redo) options                     |
| `sanitizer`        | `(html: string) => string`     | HTML sanitizer                                  |

You can easily extend Carta by creating custom plugins. Here are all the `CartaExtension` properties:

| Name               | Type                           | Description                                                                                                                                                                             |
| ------------------ | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `markedExtensions` | `marked.MarkedExtension[]`     | Marked extensions, more on that [here](https://marked.js.org/using_advanced)                                                                                                            |
| `shortcuts`        | `KeyboardShortcut[]`           | Additional keyboard shortcuts                                                                                                                                                           |
| `icons`            | `CartaIcon[]`                  | Additional icons                                                                                                                                                                        |
| `prefixes`         | `Prefix[]`                     | Additional prefixes                                                                                                                                                                     |
| `listeners`        | `CartaListener[]`              | Textarea event listeners                                                                                                                                                                |
| `components`       | `CartaExtensionComponentArray` | Additional components, that will be put after the editor. All components are given a `carta: Carta`. prop The editor has a `relative` position, so you can position elements absolutely |
| `highlightRules`   | `HighlightRule[]`              | Custom markdown highlight rules. See [Speed-Highlight Wiki](https://github.com/speed-highlight/core/wiki/Create-or-suggest-new-languages).                                              |

If you created a plugin and want to share it, you can open an _issue_ and we will consider sponsoring it on this guide.

## Contributions

Every contribution is well accepted. If you have a feature request you can open a new issue.

This package uses a [pnpm workspace](https://pnpm.io/workspaces), so pnpm is required to download and put everything together properly.
