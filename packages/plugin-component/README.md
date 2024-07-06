# Carta Component Plugin

This plugin adds support for mapping certain elements to **components** inside the editor.

## Installation

```
npm i @cartamd/plugin-component
```

## Usage

### Mapping components

The first thing to do is to map certain elements(nodes) to their corresponding components.
For example, if you want to use a custom renderer for images:

```svelte
<!-- Image.svelte -->
<script>
	export let src;
	export let alt;
</script>

<!-- Your custom component... -->
<img {src} {alt} />
```

```ts
import { Carta } from 'carta-md';
import { component } from '@cartamd/plugin-component';
import { svelte, initializeComponents } from '@cartamd/plugin-component/svelte';
import Image from './Image.svelte';

const mapped = [svelte('img', Image) /* other components ... */];

const carta = new Carta({
	extensions: [component(mapped, initializeComponents)]
	// ...
});
```

You can use custom logic when selecting which nodes to map:

```ts
import { svelteCustom } from '@cartamd/plugin-component/svelte';
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

### Using `<slot />`

To render children, you need to use a custom `<Slot />` component:

```svelte
<!-- Heading.svelte -->
<script>
	import { Slot } from '@cartamd/plugin-component/svelte';
</script>

<h1>
	<Slot />
</h1>
```

### Usage with pre-rendering

When pre-rendering content on the server (using the `<PreRendered>` component), the components will not be mounted by default. You need to use the `initializeComponents` function yourself.

```svelte
<script>
	import { initializeComponents } from '@cartamd/plugin-component/svelte';
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

### Limitations

- During server-side rendering, embedded styles for the mapped components are not added to the bundle. Use a dedicated stylesheet instead.
- `<svelte:head>` is not available during server-side rendering.
