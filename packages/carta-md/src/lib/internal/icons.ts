import type { ComponentType } from 'svelte';
import type { CartaInput } from './input';
import HeadingIcon from './components/icons/HeadingIcon.svelte';
import ItalicIcon from './components/icons/ItalicIcon.svelte';
import BoldIcon from './components/icons/BoldIcon.svelte';
import QuoteIcon from './components/icons/QuoteIcon.svelte';
import LinkIcon from './components/icons/LinkIcon.svelte';
import ListBulletedIcon from './components/icons/ListBulletedIcon.svelte';
import ListNumberedIcon from './components/icons/ListNumberedIcon.svelte';
import ListTaskIcon from './components/icons/ListTaskIcon.svelte';
import CodeIcon from './components/icons/CodeIcon.svelte';

/**
 * Editor toolbar icon information.
 */
export interface CartaIcon {
	id: string;
	action: (input: CartaInput) => void;
	component: ComponentType;
}

export const defaultIcons = [
	{
		id: 'heading',
		action: (input) => input.toggleLinePrefix('###'),
		component: HeadingIcon
	},
	{
		id: 'bold',
		action: (input) => input.toggleSelectionSurrounding('**'),
		component: BoldIcon
	},
	{
		id: 'italic',
		action: (input) => input.toggleSelectionSurrounding('_'),
		component: ItalicIcon
	},
	{
		id: 'quote',
		action: (input) => input.toggleLinePrefix('>'),
		component: QuoteIcon
	},
	{
		id: 'code',
		action: (input) => input.toggleSelectionSurrounding('`'),
		component: CodeIcon
	},
	{
		id: 'link',
		action: (input) => {
			input.toggleSelectionSurrounding(['[', ']']);
			const position = input.getSelection().end + 1;
			input.insertAt(position, '(url)');
			input.textarea.setSelectionRange(position + 1, position + 4);
		},
		component: LinkIcon
	},
	{
		id: 'bulletedList',
		action: (input) => input.toggleLinePrefix('- ', 'detach'),
		component: ListBulletedIcon
	},
	{
		id: 'numberedList',
		action: (input) => input.toggleLinePrefix('1. ', 'detach'),
		component: ListNumberedIcon
	},
	{
		id: 'taskList',
		action: (input) => input.toggleLinePrefix('- [ ] ', 'detach'),
		component: ListTaskIcon
	}
] as const satisfies readonly CartaIcon[];

export type DefaultIconId = (typeof defaultIcons)[number]['id'];
