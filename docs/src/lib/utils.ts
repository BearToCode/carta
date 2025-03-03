import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};

export const throttle = <R, A extends unknown[]>(
	fn: (...args: A) => R,
	delay: number
): [(...args: A) => R | undefined, () => void] => {
	let wait = false;
	let timeout: undefined | number;
	let cancelled = false;

	return [
		(...args: A) => {
			if (cancelled) return undefined;
			if (wait) return undefined;

			const val = fn(...args);

			wait = true;

			timeout = window.setTimeout(() => {
				wait = false;
			}, delay);

			return val;
		},
		() => {
			cancelled = true;
			clearTimeout(timeout);
		}
	];
};

export function debounce<T extends unknown[]>(cb: (...args: T) => unknown, wait = 1000) {
	let timeout: NodeJS.Timeout;
	return (...args: T) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => cb(...args), wait);
	};
}

/**
 * Remove common indentation from a string
 * @param str The string to deindent
 * @param tabSize The size of the tab
 * @returns The de-indented string
 */
export function deindent(strings: TemplateStringsArray, { tabSize = 2 } = {}) {
	let str = strings.join('');
	str = str.replace(/\t/g, ' '.repeat(tabSize));

	const lines = str.split('\n');
	// Remove first line if it's empty
	if (lines[0].trim() === '') lines.shift();

	const countWhitespace = (line: string) => line.match(/^ */)![0].length;

	const maxCommonIndent = lines
		.filter((line) => line.trim() !== '')
		.map(countWhitespace)
		.reduce((max, indent) => Math.min(max, indent), Infinity);

	return lines.map((line) => line.slice(maxCommonIndent)).join('\n');
}
