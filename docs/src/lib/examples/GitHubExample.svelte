<script lang="ts">
	import { Carta, MarkdownEditor } from 'carta-md';
	import { attachment } from '@cartamd/plugin-attachment';
	import { emoji } from '@cartamd/plugin-emoji';
	import { slash } from '@cartamd/plugin-slash';
	import { code } from '@cartamd/plugin-code';

	import '$lib/styles/github.scss';

	const carta = new Carta({
		sanitizer: false,
		extensions: [
			attachment({
				async upload() {
					return 'some-url-from-server.xyz';
				}
			}),
			emoji(),
			slash(),
			code()
		]
	});

	let {
		value = $bindable<string>(`This is an example inspired by [GitHub](https://github.com)
\`\`\`js
console.log('Hello, World!');
\`\`\``)
	} = $props();
</script>

<MarkdownEditor bind:value mode="tabs" theme="github" {carta} />
