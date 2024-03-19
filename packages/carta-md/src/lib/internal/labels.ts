import type { DefaultIconId } from './icons';
import type { Intellisense } from './utils';

type IconId = Intellisense<DefaultIconId>;

/**
 * Labels that may appear in the editor.
 */
export interface CartaLabels {
	writeTab: string;
	previewTab: string;
	iconsLabels: Partial<Record<IconId, string>>;
}

export const DefaultCartaLabels: CartaLabels = {
	writeTab: 'Write',
	previewTab: 'Preview',
	iconsLabels: {}
};
