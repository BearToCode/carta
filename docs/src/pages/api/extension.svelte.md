---
section: API
title: Extension
---

<script>
  import Code from '$lib/components/code/Code.svelte';
</script>

# `Plugin` properties

You can easily extend Carta by creating custom plugins.

<Code>

```ts
const ext: Plugin = {
	// ...
};

const carta = new Carta({
	extensions: [ext]
});
```

</Code>

Here are all the `Plugin` properties:

### `markedExtensions`

List of marked extensions. For more information check out [Marked docs](https://marked.js.org/using_pro).

### `shortcuts`

Type: `KeyboardShortcut[]`

Additional keyboards shortcut. For example:

<Code>

```ts
const shortcut: KeyboardShortcut = {
	id: 'bold',
	combination: new Set(['control', 'b']),
	action: (input) => input.toggleSelectionSurrounding('**')
};
```

</Code>

#### `KeyboardShortcut.id`

Type: `string`

Id of the shortcut.

#### `KeyboardShortcut.combination`

Type: `Set<string>`

Set of keys, corresponding to the `e.key` of `KeyboardEvent`s, but lowercase.

#### `KeyboardShortcut.action`

Type: `(input: InputEnhancer) => void`

Shortcut callback.

#### `KeyboardShortcut.preventSave`

Prevent saving the current state in history.

### `icons`

Type: `Icon[]`

Additional toolbar icons. For example:

<Code>

```ts
const icon: Icon = {
	id: 'heading',
	action: (input) => input.toggleLinePrefix('###'),
	component: HeadingIcon
};
```

</Code>

#### `Icon.id`

Type: `string`

Id of the icon.

#### `Icon.action`

Type: `(input: InputEnhancer) => void`

Click callback.

#### `Icon.component`

Type: `ComponentType` (SvelteComponent)

The Icon as a Svelte component.

### `prefixes`

Type: `Prefix[]`

Text prefixes, default ones include the `- ` for bulleted lists, `1. ` for numbered lists, `- [ ]` for task lists.

<Code>

```ts
const prefix: Prefix = {
	id: 'bulletedList',
	match: (line) => {
		const prefix = line.slice(0, 2);
		if (prefix === '- ') return prefix;
	},
	maker: () => '- '
};
```

</Code>

#### `Prefix.id`

Type: `string`

Id of the prefix.

#### `Prefix.match`

Type: `(line: string) => string | undefined`

Function that returns the prefix, if it is present.

#### `Prefix.maker`

Type: `(previousMatch: string, previousLine: string) => string`

Function that returns the prefix for the new line.

Example:

<Code>

```ts
const prefix: Prefix = {
	id: 'numberedList',
	match: (line) => line.match(/^\d+\./)?.at(0),
	maker: (prev) => `${Number(prev.slice(0, -1)) + 1}. `
};
```

</Code>

### `listeners`

Type: `Listener[]`

Textarea event listeners. Has an additional `carta-render` and `carta-render-ssr` events keys.

<Code>

```ts
const click: Listener = ['click', () => console.log('I was clicked!')];
const render: Listener = [
	'carta-render',
	(e) => {
		const carta = e.detail.carta;
		// ...
	},
	{
		once: true
	}
];
```

</Code>

### `components`

Type: `ExtensionComponent[]`

Additional components to be added to the editor or viewer.

#### `ExtensionComponent<T>.component`

Type: `typeof SvelteComponentTyped<T & { carta: Carta }>`

Svelte components that exports `carta: Carta` and all the other properties specified as the generic parameter and in `props`.

#### `ExtensionComponent<T>.props`

Type: `T`

Properties that will be handed to the component.

#### `ExtensionComponent<T>.parent`

Type: `MaybeArray<'editor' | 'input' | 'renderer' | 'preview'>`

Where the element will be placed.

### `highlightRules`

Type: `ShjLanguageDefinition`

Custom markdown highlighting rules. See [Speed-Highlight Wiki](https://github.com/speed-highlight/core/wiki/Create-or-suggest-new-languages) for more info.

### `onLoad`

Type: `(data: { carta: Carta; highlight: HighlightFunctions }) => void`

Use this callback to execute code when one Carta instance loads the extension.
