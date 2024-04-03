<script lang="ts">
	import { Carta, MarkdownEditor } from 'carta-md';
	import { attachment } from '@cartamd/plugin-attachment';
	import { emoji } from '@cartamd/plugin-emoji';
	import { slash } from '@cartamd/plugin-slash';
	import { code } from '@cartamd/plugin-code';
	import 'carta-md/dark.css';
	import '$lib/styles/github.scss';

	const carta = new Carta({
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

	export let value = 'This is an example inspired by [GitHub](https://github.com)';
</script>

<MarkdownEditor bind:value mode="tabs" theme="github" {carta} />
