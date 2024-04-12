// Workaround to add intellisense
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Nothing {}
type Union<T, U> = T | (U & Nothing);

export type Intellisense<T> = Union<T, string>;
export type MaybeArray<T> = T | Array<T>;
export type NonNullable<T> = Exclude<T, null | undefined>;

/**
 * Debounce the provided function.
 * @param cb Callback function.
 * @param wait The time to wait in milliseconds.
 */
export function debounce<T extends unknown[]>(cb: (...args: T) => unknown, wait = 1000) {
	let timeout: NodeJS.Timeout;
	return (...args: T) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => cb(...args), wait);
	};
}

/**
 * Check if two sets have the same values.
 * @param a First set.
 * @param b Second set.
 * @returns Whether the two sets contain the same values.
 */
export function areEqualSets<T>(a: Set<T>, b: Set<T>) {
	if (a.size !== b.size) return false;

	const aClone = new Set(a);
	const bClone = new Set(b);

	for (const elem of aClone) {
		bClone.add(elem);
		if (bClone.size !== b.size) return false;
	}

	for (const elem of bClone) {
		aClone.add(elem);
		if (aClone.size !== a.size) return false;
	}

	return true;
}

/**
 * Merge a partial interface with the provided one.
 * @param partial The partial interface.
 * @param def Default interface values.
 * @returns The merged interface.
 */
export function mergeDefaultInterface<T extends object>(
	partial: Partial<T> | undefined,
	def: T
): T {
	if (!partial) return def;
	const final = { ...def };
	Object.entries(partial).forEach(([key, value]) => {
		final[key as keyof T] = value as T[keyof T];
	});
	return final;
}

// Node does not implement CustomEvent until v19, so we
// "declare" it ourself for backward compatibility.
export class CustomEvent<T> extends Event {
	detail: T;
	constructor(message: string, data: EventInit & { detail: T }) {
		super(message, data);
		this.detail = data.detail;
	}
}
