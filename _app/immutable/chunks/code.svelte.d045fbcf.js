import{s as Cs,f as i,a as u,Z as j,g as c,K as h,c as r,h as S,_ as R,d as a,j as d,i as e,v as os}from"./scheduler.78c20ad2.js";import{S as ys,i as Ts,b as X,d as ss,m as ts,a as ns,t as as,e as es}from"./index.e4e0a9e0.js";import{C as ps}from"./Code.9bf6eb00.js";function xs(f){let n,o,k='<code class="language-undefined">npm i @cartamd/plugin-code</code>';return{c(){n=i("pre"),o=new j(!1),this.h()},l(p){n=c(p,"PRE",{class:!0});var l=S(n);o=R(l,!1),l.forEach(a),this.h()},h(){o.a=null,d(n,"class","language-undefined")},m(p,l){e(p,n,l),o.m(k,n)},p:os,d(p){p&&a(n)}}}function bs(f){let n,o,k=`<code class="language-ts"><span class="token keyword">import</span> <span class="token string">'@cartamd/plugin-code/default.css'</span><span class="token punctuation">;</span></code>`;return{c(){n=i("pre"),o=new j(!1),this.h()},l(p){n=c(p,"PRE",{class:!0});var l=S(n);o=R(l,!1),l.forEach(a),this.h()},h(){o.a=null,d(n,"class","language-ts")},m(p,l){e(p,n,l),o.m(k,n)},p:os,d(p){p&&a(n)}}}function Ls(f){let n,o,k=`<code class="language-ts"><span class="token function">code</span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
	customHighlight<span class="token operator">:</span> <span class="token punctuation">&#123;</span>
		<span class="token function-variable function">highlighter</span><span class="token operator">:</span> <span class="token punctuation">(</span>code<span class="token punctuation">,</span> lang<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">myCustomHighlighter</span><span class="token punctuation">(</span>code<span class="token punctuation">,</span> lang<span class="token punctuation">)</span><span class="token punctuation">,</span>
		langPrefix<span class="token operator">:</span> <span class="token string">'my-highlighter-'</span>
	<span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`;return{c(){n=i("pre"),o=new j(!1),this.h()},l(p){n=c(p,"PRE",{class:!0});var l=S(n);o=R(l,!1),l.forEach(a),this.h()},h(){o.a=null,d(n,"class","language-ts")},m(p,l){e(p,n,l),o.m(k,n)},p:os,d(p){p&&a(n)}}}function Ms(f){let n,o,k=`<code class="language-svelte"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
	<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Carta<span class="token punctuation">,</span> CartaEditor <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'carta-md'</span><span class="token punctuation">;</span>
	<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> code <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@cartamd/plugin-code'</span><span class="token punctuation">;</span>

	<span class="token keyword">const</span> carta <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Carta</span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
		<span class="token literal-property property">extensions</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">code</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
	<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>CartaEditor</span> <span class="token language-javascript"><span class="token punctuation">&#123;</span>carta<span class="token punctuation">&#125;</span></span> <span class="token punctuation">/></span></span></code>`;return{c(){n=i("pre"),o=new j(!1),this.h()},l(p){n=c(p,"PRE",{class:!0});var l=S(n);o=R(l,!1),l.forEach(a),this.h()},h(){o.a=null,d(n,"class","language-svelte")},m(p,l){e(p,n,l),o.m(k,n)},p:os,d(p){p&&a(n)}}}function Ps(f){let n,o="This plugin adds support for code blocks <strong>syntax highlighting</strong>.",k,p,l='<a href="#installation">Installation</a>',O,g,q,x,ls='This is done using <a href="https://github.com/speed-highlight/core" rel="nofollow">Speed-highlight JS</a>, which supports dynamic imports. This way, languages definitions are only imported at the moment of need.',D,m,is='<a href="#setup">Setup</a>',I,_,cs='<a href="#styles">Styles</a>',U,b,us="Import the default styles:",z,$,B,v,rs='<a href="#using-the-default-highlighter">Using the default highlighter</a>',J,L,hs=`Carta comes with a default highlighter that matches the one used to highlight Markdown in the editor and is used by default.
The theme is the same as the one used in the main Carta package (<code>carta-md/light.css</code> or <code>carta-md/dark.css</code>).
<a href="https://github.com/speed-highlight/core/tree/main/src/themes" rel="nofollow">Here</a> you can find other themes.`,K,w,ks='<a href="#using-a-custom-highlighter">Using a custom highlighter</a>',N,M,ds="You can also provide a custom highlighter, that can be either sync or async.",W,H,Y,C,fs='<a href="#extension">Extension</a>',Z,y,A,T,gs='<a href="#options">Options</a>',F,P,ms="Here are the options you can pass to <code>code()</code>:",G,E,Q,Hs=`<code class="language-ts"><span class="token keyword">interface</span> <span class="token class-name">CodeExtensionOptions</span> <span class="token punctuation">&#123;</span>
	<span class="token comment">/**
	 * Default language when none is provided.
	 */</span>
	defaultLanguage<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
	<span class="token comment">/**
	 * Whether to autodetect a language when none is provided.
	 * Overwritten by &#96;defaultLanguage&#96;.
	 */</span>
	autoDetect<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
	<span class="token comment">/**
	 * Line numbering.
	 * @defaults false.
	 */</span>
	lineNumbering<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>

	<span class="token comment">/**
	 * Options for custom syntax highlighting.
	 */</span>
	customHighlight<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
		<span class="token comment">/**
		 * Custom highlight function. Beware that you'll have to provide your own styles.
		 * This function needs to convert a string of code into html.
		 */</span>
		<span class="token function-variable function">highlighter</span><span class="token operator">:</span> <span class="token punctuation">(</span>code<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> lang<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">></span><span class="token punctuation">;</span>
		<span class="token comment">/**
		 * The language tag found immediately after the code block opening marker is
		 * appended to this to form the class attribute added to the &#96;&lt;code>&#96; element.
		 */</span>
		langPrefix<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
	<span class="token punctuation">&#125;</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`,V;return g=new ps({props:{$$slots:{default:[xs]},$$scope:{ctx:f}}}),$=new ps({props:{$$slots:{default:[bs]},$$scope:{ctx:f}}}),H=new ps({props:{$$slots:{default:[Ls]},$$scope:{ctx:f}}}),y=new ps({props:{$$slots:{default:[Ms]},$$scope:{ctx:f}}}),{c(){n=i("p"),n.innerHTML=o,k=u(),p=i("h2"),p.innerHTML=l,O=u(),X(g.$$.fragment),q=u(),x=i("p"),x.innerHTML=ls,D=u(),m=i("h2"),m.innerHTML=is,I=u(),_=i("h3"),_.innerHTML=cs,U=u(),b=i("p"),b.textContent=us,z=u(),X($.$$.fragment),B=u(),v=i("h3"),v.innerHTML=rs,J=u(),L=i("p"),L.innerHTML=hs,K=u(),w=i("h3"),w.innerHTML=ks,N=u(),M=i("p"),M.textContent=ds,W=u(),X(H.$$.fragment),Y=u(),C=i("h3"),C.innerHTML=fs,Z=u(),X(y.$$.fragment),A=u(),T=i("h2"),T.innerHTML=gs,F=u(),P=i("p"),P.innerHTML=ms,G=u(),E=i("pre"),Q=new j(!1),this.h()},l(s){n=c(s,"P",{"data-svelte-h":!0}),h(n)!=="svelte-vkj6c2"&&(n.innerHTML=o),k=r(s),p=c(s,"H2",{id:!0,"data-svelte-h":!0}),h(p)!=="svelte-18vig38"&&(p.innerHTML=l),O=r(s),ss(g.$$.fragment,s),q=r(s),x=c(s,"P",{"data-svelte-h":!0}),h(x)!=="svelte-1yc8vwb"&&(x.innerHTML=ls),D=r(s),m=c(s,"H2",{id:!0,"data-svelte-h":!0}),h(m)!=="svelte-1uj9ei1"&&(m.innerHTML=is),I=r(s),_=c(s,"H3",{id:!0,"data-svelte-h":!0}),h(_)!=="svelte-1obsuhg"&&(_.innerHTML=cs),U=r(s),b=c(s,"P",{"data-svelte-h":!0}),h(b)!=="svelte-1pnhsd1"&&(b.textContent=us),z=r(s),ss($.$$.fragment,s),B=r(s),v=c(s,"H3",{id:!0,"data-svelte-h":!0}),h(v)!=="svelte-1vws7dn"&&(v.innerHTML=rs),J=r(s),L=c(s,"P",{"data-svelte-h":!0}),h(L)!=="svelte-dodwsv"&&(L.innerHTML=hs),K=r(s),w=c(s,"H3",{id:!0,"data-svelte-h":!0}),h(w)!=="svelte-ybuzo7"&&(w.innerHTML=ks),N=r(s),M=c(s,"P",{"data-svelte-h":!0}),h(M)!=="svelte-1n9kcjl"&&(M.textContent=ds),W=r(s),ss(H.$$.fragment,s),Y=r(s),C=c(s,"H3",{id:!0,"data-svelte-h":!0}),h(C)!=="svelte-1h1d05d"&&(C.innerHTML=fs),Z=r(s),ss(y.$$.fragment,s),A=r(s),T=c(s,"H2",{id:!0,"data-svelte-h":!0}),h(T)!=="svelte-qvxcr2"&&(T.innerHTML=gs),F=r(s),P=c(s,"P",{"data-svelte-h":!0}),h(P)!=="svelte-1g9dmnl"&&(P.innerHTML=ms),G=r(s),E=c(s,"PRE",{class:!0});var t=S(E);Q=R(t,!1),t.forEach(a),this.h()},h(){d(p,"id","installation"),d(m,"id","setup"),d(_,"id","styles"),d(v,"id","using-the-default-highlighter"),d(w,"id","using-a-custom-highlighter"),d(C,"id","extension"),d(T,"id","options"),Q.a=null,d(E,"class","language-ts")},m(s,t){e(s,n,t),e(s,k,t),e(s,p,t),e(s,O,t),ts(g,s,t),e(s,q,t),e(s,x,t),e(s,D,t),e(s,m,t),e(s,I,t),e(s,_,t),e(s,U,t),e(s,b,t),e(s,z,t),ts($,s,t),e(s,B,t),e(s,v,t),e(s,J,t),e(s,L,t),e(s,K,t),e(s,w,t),e(s,N,t),e(s,M,t),e(s,W,t),ts(H,s,t),e(s,Y,t),e(s,C,t),e(s,Z,t),ts(y,s,t),e(s,A,t),e(s,T,t),e(s,F,t),e(s,P,t),e(s,G,t),e(s,E,t),Q.m(Hs,E),V=!0},p(s,[t]){const _s={};t&1&&(_s.$$scope={dirty:t,ctx:s}),g.$set(_s);const $s={};t&1&&($s.$$scope={dirty:t,ctx:s}),$.$set($s);const vs={};t&1&&(vs.$$scope={dirty:t,ctx:s}),H.$set(vs);const ws={};t&1&&(ws.$$scope={dirty:t,ctx:s}),y.$set(ws)},i(s){V||(ns(g.$$.fragment,s),ns($.$$.fragment,s),ns(H.$$.fragment,s),ns(y.$$.fragment,s),V=!0)},o(s){as(g.$$.fragment,s),as($.$$.fragment,s),as(H.$$.fragment,s),as(y.$$.fragment,s),V=!1},d(s){s&&(a(n),a(k),a(p),a(O),a(q),a(x),a(D),a(m),a(I),a(_),a(U),a(b),a(z),a(B),a(v),a(J),a(L),a(K),a(w),a(N),a(M),a(W),a(Y),a(C),a(Z),a(A),a(T),a(F),a(P),a(G),a(E)),es(g,s),es($,s),es(H,s),es(y,s)}}}const Rs={section:"Plugins",title:"Code"};class Os extends ys{constructor(n){super(),Ts(this,n,null,Ps,Cs,{})}}export{Os as default,Rs as metadata};