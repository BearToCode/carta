import slugify from 'slugify';

function generateSlug(raw: string) {
	const base = slugify(raw, {
		lower: true,
		remove: /[^a-zA-Z0-9_\- ]/g
	});
	return base;
}

export function generateUniqueSlug(raw: string, slugs: string[]) {
	const base = generateSlug(raw);
	let slug = base;

	let i = 1;
	// Add unique suffix to slug if it already exists
	while (slugs.includes(slug)) {
		slug = `${base}-${i}`;
		i++;
	}
	slugs.push(slug);
	return slug;
}
