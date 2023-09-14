export const placeholderText = `# Carta Demo

Far out in the uncharted backwaters of the unfashionable end of the western spiral arm of the **Galaxy** lies a small unregarded yellow sun.
Orbiting this at a distance of roughly _ninety-two million miles_ is an utterly insignificant little blue green planet :earth_africa: whose ape-descended life forms are so amazingly primitive that they still think digital watches are a pretty neat idea.

\`\`\`tikz
\\usepackage{pgfplots}
\\pgfplotsset{compat=1.16}

\\pgfplotsset{width=7cm,compat=1.8}
\\begin{document}
\\begin{tikzpicture}[thick,scale=1.2, every node/.style={scale=1.2}]
  \\begin{axis}
     \\addplot3[
         surf,
         colormap/viridis,
         samples=20,
         domain=0:2*pi,
         y domain=0:2*pi,
         z buffer=sort
       ]
       ( {(2+cos(deg(x)))*cos(deg(y+pi/2))}, 
         {(2+cos(deg(x)))*sin(deg(y+pi/2))}, 
         {sin(deg(x))}
       );
  \\end{axis}
\\end{tikzpicture}
\\end{document}
\`\`\`

# Basic Markdown

You can have different types of text: **bold**, _italic_, \`code\` and ~~strikethrough~~. This is a [link](http://beartocode.github.io/carta-md/) to the page you are currently viewing.

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

| Item    | Price | Origin |
| ------- | ----- | ------ |
| :apple: | 2.1   | Italy  |
| :banana:| 42    | Brazil |
| :lemon: | 18    | Spain  |

# Official Plugins

## \`plugin-code\`

This plugin adds support for **syntax highlighting** on your code blocks:

\`\`\`rs
fn visit_mars() {
	let spaceship = get_spaceship();

	spaceship.liftoff();
	spaceship.head_to(Planet::Mars);
	thread::sleep(Time::Month(6));
	spaceship.land();
}
\`\`\`

## \`plugin-math\`


With this plugin you can write beautiful Katex expressions, both _inline_ $\\underline{v}=A-\\lambda I_d$, and as _block_ equations:

$$
{\\displaystyle {\\boldsymbol {\\sigma }}=\\zeta (\\nabla \\cdot \\mathbf {u} )\\mathbf {I} +\\mu \\left[\\nabla \\mathbf {u} +(\\nabla \\mathbf {u} )^{\\mathrm {T} }-{\\tfrac {2}{3}}(\\nabla \\cdot \\mathbf {u} )\\mathbf {I} \\right]}
$$

## \`plugin-emoji\`

Adds support for **emojis**, as well as an inline emoji search, that appears after typing a colon. :smile_cat:

Try typing an icon to see the inline search. :alien:

## \`plugin-slash\`

Use a **slash** / to use commands while writing markdown. You can add your custom commands too. Also includes a inline command search.

## \`plugin-tikz\`


\`\`\`tikz
\\usepackage{pgfplots}
\\pgfplotsset{compat=1.16}
\\pgfplotsset{width=7cm}

\\begin{document}
\\begin{tikzpicture}[thick,scale=1.2, every node/.style={scale=1.2}]
  \\begin{axis}[domain=-1:1,y domain=-1:1]
    \\addplot3[
	surf,
	colormap/viridis,
	samples = 18
	] 
    {x*y*exp(x+2*y-9*x^2-9*y^2)};
  \\end{axis}
\\end{tikzpicture}
\\end{document}
\`\`\`

Adds support for **TikZ**, thanks to [TikZJax](https://tikzjax.com/).


`;
