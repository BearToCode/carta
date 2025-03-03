import { highlightCodeBlocks } from '$lib/components/code';

type CommunityPlugin = {
	name: string;
	npm: string;
	github: string;
	description: string;
};

const communityPlugins = [
	{
		name: 'carta-plugin-video',
		npm: 'https://www.npmjs.com/package/carta-plugin-video',
		github: 'https://github.com/maisonsmd/carta-plugin-video',
		description: 'Adds ability to render online video from Youtube or Vimeo.'
	},
	{
		name: 'carta-plugin-imsize',
		npm: 'https://www.npmjs.com/package/carta-plugin-imsize',
		github: 'https://github.com/maisonsmd/carta-plugin-imsize',
		description: 'Adds ability to render images in specific sizes.'
	},
	{
		name: 'carta-plugin-ins-del',
		npm: 'https://www.npmjs.com/package/carta-plugin-ins-del',
		github: 'https://github.com/maisonsmd/carta-plugin-ins-del',
		description: '`<ins>` and `<del>` tags support'
	},
	{
		name: 'carta-plugin-subscript',
		npm: 'https://www.npmjs.com/package/carta-plugin-subscript',
		github: 'https://github.com/maisonsmd/carta-plugin-subscript',
		description: 'Adds ability to render subscripts and superscripts.'
	}
] as const satisfies CommunityPlugin[];

export const load = async () => {
	return {
		plugins: await Promise.all(
			communityPlugins.map(async (plugin) => {
				return {
					...plugin,
					code: await highlightCodeBlocks({
						installation: {
							code: `npm install ${plugin.name}`,
							lang: 'bash'
						}
					})
				};
			})
		)
	};
};
