---
title: Using Svelte Components
section: Overview
---

<script>
  import Code from '$lib/components/code/Code.svelte';
</script>

Svelte components can be embedded into the rendered HTML to make certain elements interactive. However, they require a bit more work, as Remark is configured to only render static HTML. To get around this, the idea is to do the following:

1. Create a Unified plugin to isolate the targeted element;
2. Replace all the elements with the component, after every render.

## Example

Let's say we want to replace all hashtags, such as `#something`, with a custom component. Here is as example of how that could be achieved.

### Parsing the hashtags

First things first: we need to tell the parser that we want to parse hashtags as custom elements. To do this, we it's useful to first install the following packages:

<Code>

```shell
npm i unist-util-visit
# Types
npm i -D unified hast
```

</Code>

Let's create a Unified plugin. The basic structure of a plugin is the following:

<Code>

```ts
import type { Plugin as UnifiedPlugin } from 'unified'
import { SKIP, visit } from 'unist-util-visit'

const unifiedPlugin: UnifiedPlugin<[], hast.Root> = () => {
	return function (tree) {
    // Visit every node in the syntax tree
    visit(tree, (node, index, parent) => {
      // Do something with the node
    }
  }
}
```

</Code>

We now want to parse text nodes, so that words such as `#pizza` and `#123` are separated from the rest. This is a possible implementation:

<Code>

```ts
const unifiedPlugin: UnifiedPlugin<[], hast.Root> = () => {
	return function (tree) {
		visit(tree, (node, index, parent) => {
			// Skip code blocks and their children
			if (node.type === 'element' && node.tagName === 'pre') return [SKIP];
			// Skip non-text nodes
			if (node.type !== 'text') return;
			const text = node as hast.Text;

			// Parse the text node and replace hashtags with spans
			const regex = /#(\w+)/g;
			const children: (hast.Element | hast.Text)[] = [];
			let lastIndex = 0;
			let match;
			while ((match = regex.exec(text.value))) {
				const before = text.value.slice(lastIndex, match.index);
				if (before) {
					children.push({ type: 'text', value: before });
				}
				children.push({
					type: 'element',
					tagName: 'span',
					properties: { type: 'hashtag', value: match[1] },
					children: [{ type: 'text', value: match[0] }]
				});
				lastIndex = regex.lastIndex;
			}
			if (lastIndex < text.value.length) {
				children.push({ type: 'text', value: text.value.slice(lastIndex) });
			}

			// Replace the text node with all the children
			parent!.children.splice(index!, 1, ...children);

			// Skip the children
			return [SKIP, index! + children.length];
		});
	};
};
```

</Code>

If you want a more in-depth guide on writing Unified plugins, you can check out the official [documentation](https://unifiedjs.com/learn/guide/create-a-plugin/).

Notice that hashtags are now replaced with the following:

```html
<span type="hashtags" value="pizza"> #pizza </span>
```

### Configuring the transformer

Unified plugins need to be wrapped inside a `UnifiedTransformer` type, to be able to be used in Carta.

<Code>

```ts
import type { UnifiedTransformer } from 'carta-md';

const hashtagTransformer: UnifiedTransformer<'sync'> = {
	execution: 'sync', // Sync, since the plugin is synchronous
	type: 'rehype', // Rehype, since it operates on HTML
	transform({ processor }) {
		processor.use(unifiedPlugin);
	}
};
```

</Code>

### Mounting the components

We now want to replace the generated hashtag placeholders with the following element:

<Code>

```svelte
<!-- Hashtag.svelte -->
<script>
	export let value;
</script>

<button
	on:click={() => {
		console.log('Hashtag clicked!');
	}}
>
	#{value}
</button>
```

</Code>

To do that, we create a listener that:

1. Finds all the previous placeholders;
2. Mounts the component next to them;
3. Removes the placeholders.

<Code>

```ts
import type { Listener } from 'carta-md';
import Hashtag from './Hashtag.svelte';

const convertHashtags: Listener<'carta-render'> = [
	'carta-render',
	function onRender({ detail: { carta } }) {
		const rendererContainer = carta.renderer?.container;
		if (!rendererContainer) return;

		// Find all hashtag spans and replace them with Svelte components
		const hashtagSpans = rendererContainer.querySelectorAll('span[type="hashtag"]');
		for (const span of hashtagSpans) {
			const hashtag = span.getAttribute('value') ?? '';

			new Hashtag({
				target: span.parentElement!,
				anchor: span,
				props: { value: hashtag }
			});

			span.remove();
		}
	}
];
```

</Code>

### Using the plugin

Let's now create a Plugin with the transformer and the listener:

<Code>

```ts
import type { Plugin } from 'carta-md';

export const hashtag = (): Plugin => ({
	transformers: [hashtagTransformer],
	listeners: [convertHashtags]
});
```

</Code>

We can now use the plugin with the following:

```ts
import { Carta } from 'carta-md';

const carta = new Carta({
	// ...
	extensions: [hashtag()]
});
```

You can find the example source code [here](https://github.com/BearToCode/svelte-in-carta-example).
