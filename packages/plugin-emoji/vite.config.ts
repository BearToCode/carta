import { PluginOption, defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, 'src/lib/index.ts'),
			name: 'plugin-emoji',
			fileName: 'index'
		},
		rollupOptions: {
			external: []
		}
	},
	plugins: [svelte(), dts(), hmr()]
});

// Public css hot reload
function hmr(): PluginOption {
	return {
		name: 'custom-hmr',
		enforce: 'post' as const,
		// HMR
		handleHotUpdate({ file, server }) {
			if (file.endsWith('.css')) {
				server.ws.send({
					type: 'full-reload',
					path: '*'
				});
			}
		}
	};
}
