<script lang="ts">
	import { Carta, MarkdownEditor } from 'carta-md';
	import { emoji } from '@cartamd/plugin-emoji';
	import { code } from '@cartamd/plugin-code';
	import PlusCircled from './assets/PlusIcon.svelte';

	import '$lib/styles/discord.scss';

	const carta = new Carta({
		sanitizer: false,
		disableIcons: true,
		extensions: [
			emoji(),
			code(),
			{
				components: [
					{
						component: PlusCircled,
						parent: 'input',
						props: {}
					}
				]
			}
		]
	});
</script>

<MarkdownEditor placeholder="Send a message to @someone" mode="tabs" theme="discord" {carta} />
