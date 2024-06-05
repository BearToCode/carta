import type { Event, Carta } from 'carta-md';
import { SKIP } from 'unist-util-visit';
import { fromDom } from 'hast-util-from-dom';
import { visit } from 'unist-util-visit';
import type { TikzExtensionOptions } from '.';
import md5 from 'md5';
import type * as hast from 'hast';
import { tidyTikzSource } from './utils';

// Keeps track of tikz generation to remove previous items
let currentGeneration = 0;

export const browserTikzTransform = (
	root: hast.Root,
	carta: Carta,
	options: TikzExtensionOptions | undefined
) =>
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

declare global {
	interface Window {
		tikzjax: boolean | undefined;
	}
}

export function processTikzScripts(e: Event, options?: TikzExtensionOptions) {
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
