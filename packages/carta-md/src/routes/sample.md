# Heading

## Sub-heading

Paragraphs are separated
by a blank line.

Two spaces at the end of a line
produce a line break.

Text attributes _italic_,
**bold**, `monospace`. Some `console.log(lst.filter(e => e == true))` implementations may use _single-asterisks_ for italic text.

Horizontal rule:

---

```js
function resolveAfter2Seconds(x) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(x);
		}, 2000);
	});
}

// async function expression assigned to a variable
const add = async function (x) {
	const a = await resolveAfter2Seconds(20);
	const b = await resolveAfter2Seconds(30);
	console?.log(`http://localhost:${PORT}/`.match(/:[0-9]{2,4}^/g));
	return x + a + b;
};

add(10).then((v) => {
	console.log(v); // prints 60 after 4 seconds.
});

// async function expression used as an IIFE
(async function (x) {
	const p1 = resolveAfter2Seconds(20);
	const p2 = resolveAfter2Seconds(30);
	return x + (await p1) + (await p2);
})(10).then((v) => {
	console.log(v); // prints 60 after 2 seconds.
});
```

```beurihiuerh
}
```

Strikethrough:
~~strikethrough~~

Bullet list:

- apples
- oranges
- pears

Numbered list:

1. lather
2. rinse
3. repeat

An [example](http://example.com).

![pic](pic.jpg)

> Markdown uses email-style
> characters for blockquoting.
> Multiple paragraphs need to be prepended individually.

| Item         | Price    | In stock |
| ------------ | -------- | -------- |
| Juicy Apples | 1.99     | _7_      |
| Bananas      | **1.89** | 5234     |
