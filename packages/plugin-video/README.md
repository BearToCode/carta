# Carta Video Plugin

This plugin adds ability to render online video from Youtube or Vimeo.

```
npm i @cartamd/plugin-video
```

## Setup

### Styles

Import the default theme, or create you own:

```ts
import '@cartamd/plugin-video/default.css';
```

Note that the `align` function needs the default css to work properly.

### Extension

```svelte
<script>
	import { Carta, CartaEditor } from 'carta-md';
	import { video } from '@cartamd/plugin-video';

	const carta = new Carta({
		extensions: [video()]
	});
</script>

<CartaEditor {carta} />
```

## Documentation

Checkout the [docs](https://beartocode.github.io/carta/plugins/video) for examples, options and more.
