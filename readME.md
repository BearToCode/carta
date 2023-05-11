# Carta

[![npm](https://img.shields.io/npm/v/carta-md?color=red)](https://www.npmjs.com/package/carta-md)
[![bundle](https://img.shields.io/bundlephobia/min/carta-md)](https://bundlephobia.com/package/carta-md)

A **lightweight**, **fast** and **extensible** Svelte Markdown editor and viewer. Check out the [demo](http://beartocode.me/carta-md/) to see it in action.

Differently from most editors, Carta includes neither ProseMirror nor CodeMirror, allowing for an extremely small bundle size and fast loading time.

## Features

- Keyboard **shortcuts** (extensible);
- Toolbar (extensible);
- Markdown syntax highlighting;
- **SSR** compatible;
- **Katex** support (plugin);
- **Slash** commands (plugin);
- **Emojis**, with included search (plugin);
- Code blocks **syntax highlighting** (plugin).

## Getting started

> :exclamation:Warning: **sanitization** is **not** dealt with by Carta. You need to provided a `sanitizer` function when you create your own Carta.

### Installation

Core package:

```
npm i carta-md
```

Plugins:

```
npm i @carta/plugin-name
```

### Basic configuration

```svelte
<script lang="ts">
	import { Carta, CartaEditor } from 'carta-md';
	// Component default theme
	import 'carta-md/default-theme.css';
	// Markdown input theme (PrismJS)
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

## Themes customization

By using the `theme` property in `CartaEditor` and `CartaPreview` you can change their classes to `carta-editor__{theme}` and `carta-viewer__{theme}`.

Check out the [default theme](https://github.com/BearToCode/carta-md/blob/master/packages/carta-md/src/lib/default-theme.css) to customize it.

If you are using a plugin, look at its _readme_ for its customization.

Markdown highlighting is done using **PrismJS**, [here](https://github.com/PrismJS/prism-themes) you can find some themes, but you can find more by searching online.

You can find Markdown stylesheet. For example [github-markdown-css](https://github.com/sindresorhus/github-markdown-css)(used in the demo), or [tailwind-typography](https://tailwindcss.com/docs/typography-plugin).

## Extensibility

### Options

Carta options:

| Name               | Type                           | Description                                                         |
| ------------------ | ------------------------------ | ------------------------------------------------------------------- |
| `extensions`       | `CartaExtension[]`             | Editor/viewer extensions                                            |
| `rendererDebounce` | `number`                       | Renderer debouncing timeout, in ms (def. 300ms)                     |
| `disableShortcuts` | `DefaultShortcutId[]`          | Remove default shortcuts by ids                                     |
| `disableIcons`     | `DefaultIconId[]`              | Remove default icons by ids                                         |
| `disablePrefixes`  | `DefaultPrefixId[]`            | Remove default prefixes by ids                                      |
| `historyOptions`   | `Partial<CartaHistoryOptions>` | History (Undo/Redo) options                                         |
| `sanitizer`        | `(html: string) => string`     | HTML sanitizer                                                      |
| `sanitizerSSR`     | `(html: string) => string`     | Custom SSR sanitizer. If none is provided, the default one is used. |

You can easily extend Carta by creating custom plugins. Here are all the `CartaExtension` properties:

| Name               | Type                           | Description                                                                                                                                                                             |
| ------------------ | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `markedExtensions` | `marked.MarkedExtension[]`     | Marked extensions, more on that [here](https://marked.js.org/using_advanced)                                                                                                            |
| `shortcuts`        | `KeyboardShortcut[]`           | Additional keyboard shortcuts                                                                                                                                                           |
| `icons`            | `CartaIcon[]`                  | Additional icons                                                                                                                                                                        |
| `prefixes`         | `Prefix[]`                     | Additional prefixes                                                                                                                                                                     |
| `listeners`        | `CartaListener[]`              | Textarea event listeners                                                                                                                                                                |
| `components`       | `CartaExtensionComponentArray` | Additional components, that will be put after the editor. All components are given a `carta: Carta`. prop The editor has a `relative` position, so you can position elements absolutely |

If you created a plugin and want to share it, you can open an _issue_ and we will consider sponsoring it on this guide.

## Contributions

Every contribution is well accepted. If you have a feature request you can open a new issue.

This package uses a [pnpm workspace](https://pnpm.io/workspaces), so pnpm is required to download and put everything together properly.
