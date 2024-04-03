---
section: Plugins
title: Attachment
---

<script>
	import Code from '$lib/components/code/Code.svelte';
</script>

This plugin adds support for attachments.

## Installation

```
npm i @cartamd/plugin-attachment
```

## Setup

### Styles

Import the default theme, or create you own:

<Code>

```ts
import '@cartamd/plugin-attachment/default.css';
```

</Code>

### Extension

<Code>

```svelte
<script>
	import { Carta, MarkdownEditor } from 'carta-md';
	import { attachment } from '@cartamd/plugin-attachment';

	const carta = new Carta({
		extensions: [
			attachment({
				upload(file) {
					/* ... */
				}
			})
		]
	});
</script>

<MarkdownEditor {carta} />
```

</Code>

## Options

Here are the options you can pass to `attachment()`:

```ts
export interface AttachmentExtensionOptions {
	/**
	 * Upload a file to the server. Return the url of the uploaded file.
	 * If an error occurs, return null. This function does **not** handle errors.
	 * @param file The file to upload
	 * @returns The uploaded file url, or null if it failed
	 */
	upload: (file: File) => Promise<string | null>;
	/**
	 * Supported mime types.
	 *
	 * @default ['image/png', 'image/jpeg', 'image/gif', 'image/svg+xml'].
	 */
	supportedMimeTypes?: string[];
	/**
	 * Whether to disable the attach icon.
	 *
	 * @default false
	 */
	disableIcon?: boolean;
	/**
	 * Custom drop overlay component. Use `false` to disable the overlay.
	 */
	dropOverlay?: false | typeof SvelteComponent;
	/**
	 * Custom loading overlay component. Use `false` to disable the overlay.
	 */
	loadingOverlay?: false | typeof SvelteComponent<{ uploadingFiles: Writable<File[]> }>;
}
```
