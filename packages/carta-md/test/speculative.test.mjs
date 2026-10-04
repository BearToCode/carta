import { test } from 'node:test';
import assert from 'node:assert/strict';
import { speculativeHighlightUpdate } from '../dist/internal/speculative.js';

// The overlay is empty until the highlighter's first pass, and a sanitizer that strips Shiki's
// `.line` spans keeps it that way — the branch this test covers. Only `document.createElement`
// and `querySelectorAll` are reached before the early return, so a minimal stub is enough here.
globalThis.document = {
	createElement: () => ({ innerHTML: '', querySelectorAll: () => [] })
};

test('the no-lines branch escapes the text instead of returning markup', () => {
	const payload = '<img src=x onerror="alert(1)">';
	const out = speculativeHighlightUpdate('', payload, '');
	assert.equal(out, '&lt;img src=x onerror="alert(1)"&gt;');
	assert.ok(!out.includes('<img'), 'markup must not survive the overlay path');
});
