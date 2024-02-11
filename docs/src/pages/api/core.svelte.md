---
section: API
title: Core
---

<script>
	import { base } from '$app/paths';
</script>

# `Carta` options

List of options that can be used when creating `Carta`:

```ts
new Carta({
	/* ... */
});
```

### `extensions`

Type: `CartaExtension[]`

List of extensions(plugins) to use.

### `rendererDebounce`

Type: `number`

Rendering debouncing timeout, in milliseconds.
Defaults to 300ms.

### `disableShortcuts`

Type: `DefaultShortcutId[] | true`

Remove default shortcuts by id. You can use `true` to disable all of them.

### `disableIcons`

Type: `DefaultIconId[] | true`

Remove default icons by id. You can use `true` to disable all of them.

### `disablePrefixes`

Type: `DefaultPrefixId[] | true`

Remove default prefixes by id. You can use `true` to disable all of them.

### `historyOptions`

History management options.

#### `historyOptions.minInterval`

Type: `number`

Minimum interval between save states in milliseconds.
Defaults to 300ms.

#### `historyOptions.maxSize`

Type: `number`

Maximum history size in bytes.
Defaults to 1MB.

### `sanitizer`

Type: `(html: string) => void`

HTML sanitizer. See [here]({base}/getting-started#sanitization) for more details.

### `labels`

Type: `Partial<CartaLabels>`

Can be used to provide custom text for labels in the editor.

# `CartaEditor` options

List of options that can be used in the `<CartaEditor>` component.

### `carta`

Type: `Carta`

Carta manager to use for this editor.

### `theme`

Type: `string`

The theme of this editor. The editor and related elements will have the `carta-theme__<theme>` as a class.

### `value`

Type: `string`

Current Markdown input value.

### `mode`

Type: `'tabs' | 'split' | 'auto'`

Editor windows mode. With `auto` it will split when the window size is greater than 768px.

### `scroll`

Type: `'sync' | 'async'`

Scroll synchronization.

### `disableToolbar`

Type: `boolean`

Option to disable the toolbar.

### `placeholder`

Type: `string`

Set the textarea placeholder.

### `textarea`

Type: `TextAreaProps` (extends `Record<string, unknown>`)

Additional properties that will be used in the textarea used under the hood in the editor.
`class`, `placeholder` and `value` are not allowed. Use the corresponding editor properties
instead.

# `CartaViewer` options

List of options that can be used in the `<CartaViewer>` component.

### `carta`

Type: `Carta`

Carta manager to use for this editor.

### `theme`

Type: `string`

The theme of this editor. The viewer and related elements will have the `carta-theme__<theme>` as a class.

### `value`

Type: `string`

Current Markdown input value.
