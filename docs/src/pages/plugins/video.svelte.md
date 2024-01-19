---
section: Plugins
title: Video
---

<script>
	import Code from '$lib/components/code/Code.svelte';
	import { Carta, CartaViewer } from 'carta-md';
	import { video } from '@cartamd/plugin-video';
	import '@cartamd/plugin-video/default.css';

	const carta = new Carta({
		extensions: [
			video()
		]
	});

	const youtube = `@[youtube](dQw4w9WgXcQ)`;
	const vimeo = `@[vimeo](https://vimeo.com/347119375)`;
</script>

This plugin adds ability to render online video from Youtube or Vimeo.

## Installation

<Code>

```
npm i @cartamd/plugin-video
```

</Code>

## Setup

### Styles

Import the default theme, or create you own:

<Code>

```ts
import '@cartamd/plugin-video/default.css';
```

Note that the `align` function needs the default css to work properly.

</Code>

### Extension

<Code>

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

</Code>

## Usage

You can use either video ID (e.g: `dQw4w9WgXcQ`) or video URL (e.g: `https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley`)

For Youtube:

<Code>

```markdown
@[youtube](dQw4w9WgXcQ)
```

</Code>

<CartaViewer {carta} value={youtube} />

For Vimeo:

<Code>

```markdown
@[vimeo](https://vimeo.com/347119375)
```

</Code>

<CartaViewer {carta} value={vimeo} />

## Options

Here are the options you can pass to `video()`:

```ts
export interface VideoExtensionOptions {
	/**
	 * Width of the video (in pixels or percentage string), defaults to 640.
	 */
	width?: number | string;
	/**
	 * Height of the video (in pixel or percentage string), defaults to 360.
	 */
	height?: number | string;
	/**
	 * Horizontal alignment of the video, defaults to 'center'.
	 */
	align?: 'left' | 'center' | 'right';
	/**
	 * Allow fullscreen, defaults to true.
	 */
	allowFullscreen?: boolean;
	/**
	 * Use youtube-nocookie.com domain, defaults to false.
	 */
	noCookie?: boolean;
}
```
