import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import rawLoader from 'vite-raw-plugin';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'plugin-tikz',
			fileName: 'index'
		},
		rollupOptions: {
			external: [
				'node-tikzjax',
				'unified',
				'unist-util-visit',
				'hast-util-from-dom',
				'md5',
				'rehype-parse'
			],
			output: {
				globals: {
					'node-tikzjax': 'nodeTikzjax',
					unified: 'unified',
					'unist-util-visit': 'unistUtilVisit',
					'hast-util-from-dom': 'hastUtilFromDom',
					md5: 'md5',
					'rehype-parse': 'rehypeParse'
				}
			}
		}
	},
	plugins: [
		dts(),
		rawLoader({
			fileRegex: /tikzjax\.js/i
		})
	]
});
