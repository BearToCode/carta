<script lang="ts">
	import { Carta, MarkdownEditor } from 'carta-md';
	import { emoji } from '@cartamd/plugin-emoji';
	import { code } from '@cartamd/plugin-code';
	import { PlusCircled } from 'radix-icons-svelte';

	import '$lib/styles/discord.scss';

	const carta = new Carta({
		disableIcons: true,
		extensions: [
			emoji(),
			code(),
			{
				components: [
					{
						component: PlusCircled,
						props: { class: 'discord-plus-icon' },
						parent: 'input'
					}
				]
			}
		]
	});
</script>

<MarkdownEditor placeholder="Send a message to @someone" mode="tabs" theme="discord" {carta} />
