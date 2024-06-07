import { load, tex, dvi2svg } from 'node-tikzjax';
import type { Carta } from 'carta-md';
import { EXIT, SKIP, visit } from 'unist-util-visit';
import type { TikzExtensionOptions } from '.';
import * as hast from 'hast';
import { tidyTikzSource } from './utils';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';

export const nodeTikzTransform = async (
	root: hast.Root,
	carta: Carta,
	options: TikzExtensionOptions | undefined
) => {
	const tasks: Promise<void>[] = [];

	await load();

	visit(root, (pre, index, parent) => {
		if (pre.type !== 'element') return;
		const preElement = pre as hast.Element;
		if (preElement.tagName !== 'pre') return;
		const element = pre.children.at(0) as hast.Element | undefined;
		if (!element) return;

		if (element.tagName !== 'code') return;
		if (!element.properties['className']) return;
		if (!(element.properties['className'] as string[]).includes('language-tikz')) return;

		// Element is a TikZ code block
		const source = tidyTikzSource((element.children[0] as hast.Text).value as string);

		const task = tex(source, {
			showConsole: options?.debug
		})
			.then((dvi) => dvi2svg(dvi))
			.then((svg) => {
				if (options?.postProcessing) {
					svg = options.postProcessing(svg);
				}

				const hastNode = unified().use(rehypeParse).parse(svg);
				let svgNode: hast.Element | undefined;
				visit(hastNode, (node) => {
					if (node.type === 'element' && node.tagName === 'svg') {
						svgNode = node as hast.Element;
						return [EXIT];
					}
				});

				if (svgNode) {
					const container: hast.Element = {
						type: 'element',
						tagName: 'div',
						properties: {
							className: ['tikz-generated', ...(options?.class ?? '').split(' ')],
							align: options?.center ? 'center' : undefined
						},
						children: [svgNode]
					};
					parent?.children.splice(index!, 1, container);
				} else {
					console.error('plugin-tikz: could not find SVG node in TikZ output');
				}
			})
			.catch((error) => {
				if (options?.debug) {
					console.error('plugin-tikz: error processing TikZ code block:', error);
				}
			});

		tasks.push(task);

		return [SKIP];
	});

	await Promise.all(tasks);
};
