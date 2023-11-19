import mdsvexConfig from './mdsvex.config.js';
import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],

	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex(mdsvexConfig)],

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build'
		}),
		paths: {
			base: process.env.NODE_ENV === 'production' ? '/carta' : ''
		}
	}
};

export default config;
