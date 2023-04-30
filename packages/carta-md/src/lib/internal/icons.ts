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

export interface CartaIcon {
	id: string;
	action: (input: CartaInput) => void;
	component: ComponentType;
}

export const defaultIcons: CartaIcon[] = [
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
		component: ItalicIcon
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
		action: (input) => {
			throw new Error('Unimplemented');
		},
		component: ListBulletedIcon
	},
	{
		id: 'numberedList',
		action: (input) => {
			throw new Error('Unimplemented');
		},
		component: ListNumberedIcon
	},
	{
		id: 'taskList',
		action: (input) => {
			throw new Error('Unimplemented');
		},
		component: ListTaskIcon
	}
];
