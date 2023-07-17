import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import rawLoader from 'vite-raw-plugin';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		rollupOptions: {
			external: ['carta-md']
		},
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'plugin-tikz',
			fileName: 'index'
		}
	},
	plugins: [
		dts(),
		rawLoader({
			fileRegex: /tikzjax\.js/i
		})
	]
});
