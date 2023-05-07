import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import dynamicImport from 'vite-plugin-dynamic-import';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'plugin-code',
			fileName: 'index'
		}
	},
	plugins: [
		dts(),
		dynamicImport({
			filter(id) {
				if (id.includes('@speed-highlight/core')) return true;
			}
		})
	]
});
