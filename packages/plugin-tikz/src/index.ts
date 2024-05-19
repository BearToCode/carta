import type { Carta, Event, Plugin } from 'carta-md';
import type { Plugin as UnifiedPlugin } from 'unified';
import { visit, SKIP } from 'unist-util-visit';
import { fromDom } from 'hast-util-from-dom';
import type * as hast from 'hast';
import md5 from 'md5';

interface TikzExtensionOptions {
	/**
	 * Enables Tikzjax console output.
	 */
	debug?: boolean;
	/**
	 * Class for generated svg div container.
	 */
	class?: string;
	/**
	 * Whether to center the generated expression.
	 * @default true
	 */
	center?: boolean;
	/**
	 * Post processing function for html.
	 * This also runs on stored html.
	 */
	postProcessing?: (html: string) => string;
}

/**
 * TikzJax extension for Carta.
 * @param options Tikz options.
 */
export const tikz = (options?: TikzExtensionOptions): Plugin => {
	let carta: Carta;
	return {
		onLoad: async ({ carta: c }) => {
			carta = c;

			const highlighter = await carta.highlighter();
			await highlighter.loadLanguage('tex');
			carta.input?.update();
		},
		transformers: [
			{
				execution: 'async',
				type: 'rehype',
				transform({ carta, processor }) {
					processor.use(tikzTransformer, { carta, options });
				}
			}
		],
		listeners: [['carta-render', (e) => generateTikzImages(e, options)]],
		grammarRules: [
			{
				name: 'tikz',
				type: 'block',
				definition: {
					begin: '(^|\\G)(\\s*)(`{3,}|~{3,})\\s*(?i:(tikz)((\\s+|:|,|\\{|\\?)[^`]*)?$)',
					beginCaptures: {
						'3': { name: 'punctuation.definition.markdown' },
						'4': { name: 'fenced_code.block.language.markdown' },
						'5': { name: 'fenced_code.block.language.attributes.markdown' }
					},
					end: '(^|\\G)(\\2|\\s{0,3})(\\3)\\s*$',
					endCaptures: { '3': { name: 'punctuation.definition.markdown' } },
					name: 'markup.fenced_code.block.markdown',
					patterns: [
						{
							begin: '(^|\\G)(\\s*)(.*)',
							contentName: 'meta.embedded.block.latex',
							patterns: [{ include: 'text.tex' }],
							while: '(^|\\G)(?!\\s*([`~]{3,})\\s*$)'
						}
					]
				}
			}
		]
	};
};

// Keeps track of tikz generation to remove previous items
let currentGeneration = 0;

const tikzTransformer: UnifiedPlugin<
	[{ carta: Carta; options: TikzExtensionOptions | undefined }],
	hast.Root
> = ({ carta, options }) => {
	return async function (tree) {
		visit(tree, (pre, index, parent) => {
			if (typeof document === 'undefined') {
				// Cannot run outside the browser
				return;
			}

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

			const container = document.createElement('div');
			const template = document.createElement('div');
			const text = document.createTextNode(source);

			container.classList.add('tikz-generated');
			container.setAttribute('tikz-generation', currentGeneration.toString());
			if (options?.center ?? true) container.setAttribute('align', 'center');
			if (options?.class) container.classList.add(...options.class.split(' '));

			template.setAttribute('type', 'tikzjax');
			if (options?.debug) template.setAttribute('data-show-console', 'true');

			template.appendChild(text);

			const hash = md5(JSON.stringify(template.dataset) + text.nodeValue);
			let savedSvg = window.localStorage.getItem(hash);

			if (savedSvg) {
				if (options?.postProcessing) savedSvg = options.postProcessing(savedSvg);
				container.innerHTML = savedSvg;
			} else {
				container.appendChild(template);
			}

			if (carta.sanitizer) {
				container.innerHTML = carta.sanitizer(container.innerHTML);
			}

			const hastNode = fromDom(container) as hast.Element;

			parent?.children.splice(index!, 1, hastNode);

			return [SKIP, index!];
		});
	};
};

declare global {
	interface Window {
		tikzjax: boolean | undefined;
	}
}

function generateTikzImages(e: Event, options?: TikzExtensionOptions) {
	const carta = e.detail.carta;
	const container = carta.renderer?.container;
	if (!container) {
		console.error(`Failed to process tikz code: cannot find renderer container element.`);
		return;
	}

	currentGeneration++;
	removePreviousImages(container);
	loadTikz(options);
}

function removePreviousImages(container: HTMLDivElement) {
	Array.from(container.querySelectorAll('.tikz-generated[tikz-generation]'))
		.filter((elem) => Number(elem.getAttribute('tikz-generation') ?? -1) < currentGeneration)
		.forEach((elem) => elem.remove());
}

async function loadTikz(options?: TikzExtensionOptions) {
	if (window.tikzjax != null) return;
	window.tikzjax = true;

	// eslint-disable-next-line
	// @ts-ignore
	const tikzjax = (await import('./assets/tikzjax.js')).default;

	const script = /* html */ `<script type="text/javascript" id="tikzjax">${tikzjax}</script>`;

	// Simply appending the element does not work as the script is not executed
	// By doing the following we ensure that it is run.
	const range = document.createRange();
	range.selectNode(document.getElementsByTagName('body')[0]);
	const documentFragment = range.createContextualFragment(script);
	document.body.appendChild(documentFragment);

	document.addEventListener('tikzjax-load-finished', (e) => {
		const elem = e.target as SVGElement;
		if (options?.postProcessing) elem.outerHTML = options.postProcessing(elem.outerHTML);
	});
}

function tidyTikzSource(tikzSource: string) {
	// From: Obsidian-TikZ plugin, credit to them
	// Remove non-breaking space characters, otherwise we get errors
	const remove = '&nbsp;';
	tikzSource = tikzSource.replaceAll(remove, '');

	let lines = tikzSource.split('\n');

	// Trim whitespace that is inserted when pasting in code, otherwise TikZJax complains
	lines = lines.map((line) => line.trim());

	// Remove empty lines
	lines = lines.filter((line) => line);

	return lines.join('\n');
}
