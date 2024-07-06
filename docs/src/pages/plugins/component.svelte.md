---
section: Plugins
title: Component
---

<script>
	import Code from '$lib/components/code/Code.svelte';
</script>

This plugin adds support for mapping certain elements to **components** inside the editor.

## Installation

<Code>

```
npm i @cartamd/plugin-component
```

</Code>

## Usage

### Mapping components

The first thing to do is to map certain elements(nodes) to their corresponding components.
For example, if you want to use a custom renderer for images:

<Code>

```svelte
<!-- Image.svelte -->
<script>
	export let src;
	export let alt;
</script>

<!-- Your custom component... -->
<img {src} {alt} />
```

</Code>

<Code>

```ts
import { Carta } from 'carta-md';
import { attachment } from '@cartamd/plugin-attachment';
import { svelte, initializeComponents } from '@cartamd/plugin-attachment/svelte';
import Image from './Image.svelte';

const mapped = [svelte('img', Image) /* other components ... */];

const carta = new Carta({
	extensions: [attachment(mapped, initializeComponents)]
	// ...
});
```

</Code>

You can use custom logic when selecting which nodes to map:

<Code>

```ts
import { svelteCustom } from '@cartamd/plugin-attachment/svelte';
import MyComponent from '...';

const mapped = [
	svelteCustom(
		'my-component-id',
		(node) => {
			// Do something with the node to determine whether to replace it
		},
		MyComponent
	) /* other components ... */
];
```

</Code>

### Using `<slot />`

To render children, you need to use a custom `<Slot />` component:

<Code>

```svelte
<!-- Heading.svelte -->
<script>
	import { Slot } from '@cartamd/plugin-component/svelte';
</script>

<h1>
	<Slot />
</h1>
```

</Code>

### Usage with pre-rendering

When pre-rendering content on the server (using the `<PreRendered>` component), the components will not be mounted by default. You need to use the `initializeComponents` function yourself.

<Code>

```svelte
<script>
	import { initializeComponents } from '@cartamd/plugin-attachment/svelte';
	import { onMount } from 'svelte';
	// ...

	export let data;

  let container;

  // Needs access to the mapped components
  const mapped = /* ... */;

  onMount(() => {
    initializeComponents(mapped, container);
  })
</script>

<div bind:this={container}>
	<PreRendered html={data.html} />
</div>
```

</Code>

### Limitations

- During server-side rendering, embedded styles for the mapped components are not added to the bundle. Use a dedicated stylesheet instead.
- `<svelte:head>` is not available during server-side rendering.
