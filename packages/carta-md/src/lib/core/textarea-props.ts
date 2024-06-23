/**
 * Base props for HTML textarea element.
 */
interface BaseTextAreaProps {
	id?: string;
	name?: string;
	spellCheck?: boolean;
	autoCapitalize?: string;
	autoComplete?: string;
	autoFocus?: boolean;
	dirname?: string;
	disabled?: boolean;
	form?: string;
	maxLength?: number;
	minLength?: number;
	required?: boolean;
	spellcheck?: boolean;

	// Props handled by Carta

	/**
	 * Bind the value to the Editor instead.
	 */
	value?: never;
	/**
	 * Use the placeholder property of the Editor instead.
	 */
	placeholder?: never;
	class?: never;
}

/**
 * Props for HTML textarea element.
 */
export type TextAreaProps<T extends Record<string, unknown> = Record<string, unknown>> =
	BaseTextAreaProps & T;
