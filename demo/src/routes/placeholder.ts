export const placeholderText = `# :notebook_with_decorative_cover: Carta Demo

## :page_with_curl: Markdown

You can have different types of text: **bold**, _italic_, \`code\` and ~~strikethrough~~. This is a [link](http://beartocode.me/carta-md/) to the page you are currently viewing.

Here is a quote:

> Time is an illusion. Lunchtime doubly so.

And then some lists:

- This is a bulleted list
- Which does not have an order
- but only some dots

1. And then that's one with numbers
2. That just keep going
3. and going
 
- [ ] And finally this is a task list
- [ ] Where you can keep track of to-dos
- [x] by putting an _x_ inside the brackets
 
You can also create tables, like so:

| Name  | Age | Occupation |
| ----  | --- | ---------- |
| Emily | 28  | Programmer |
| Jack  | 42  | Lawyer     |
| Sarah | 35  | Doctor     |
| Alex  | 19  | Student    |

With the \`plugin-code\`, you can also use the **slash** (/) to have a list of commands. Try it!

## :computer: Code

Using the \`plugin-code\`, you can have syntax highlighting on your code blocks.

\`\`\`rs
fn visit_mars() {
	let spaceship = get_spaceship();

	spaceship.liftoff(Planet::Mars);
	spaceship.head_to(mars);
	thread::sleep(some_time);
	spaceship.land();

	let humans = spaceship.unload();
}
\`\`\`

## :mortar_board: Math

You can use \`plugin-math\` to write beautiful Katex expressions, both _inline_ $\\underline{v}=A-\\lambda I_d$, and as _block_:

$$
{\\displaystyle {\\boldsymbol {\\sigma }}=\\zeta (\\nabla \\cdot \\mathbf {u} )\\mathbf {I} +\\mu \\left[\\nabla \\mathbf {u} +(\\nabla \\mathbf {u} )^{\\mathrm {T} }-{\\tfrac {2}{3}}(\\nabla \\cdot \\mathbf {u} )\\mathbf {I} \\right]}
$$

## :smile_cat: Emojis

And with \`plugin-emoji\` you can also use emojis:exclamation:

Try and type a colon (:), you can also search them! :alien:
`;
