import{s as Wn,e as c,a as u,H as P,c as i,l as m,g as r,b as T,m as L,f as t,p as d,i as p,n as N}from"./scheduler.MTTyNl1s.js";import{S as Yn,i as An,c as G,a as X,m as K,t as W,b as Y,d as A}from"./index.DrAlApqI.js";import{C as J}from"./Code.BLkHPVHm.js";function Jn(f){let s,o,k='<code class="language-undefined">npm i carta-md</code>';return{c(){s=c("pre"),o=new P(!1),this.h()},l(e){s=i(e,"PRE",{class:!0});var l=T(s);o=L(l,!1),l.forEach(t),this.h()},h(){o.a=null,d(s,"class","language-undefined")},m(e,l){p(e,s,l),o.m(k,s)},p:N,d(e){e&&t(s)}}}function Nn(f){let s,o,k='<code class="language-undefined">npm i @cartamd/plugin-name</code>';return{c(){s=c("pre"),o=new P(!1),this.h()},l(e){s=i(e,"PRE",{class:!0});var l=T(s);o=L(l,!1),l.forEach(t),this.h()},h(){o.a=null,d(s,"class","language-undefined")},m(e,l){p(e,s,l),o.m(k,s)},p:N,d(e){e&&t(s)}}}function Qn(f){let s,o,k=`<code class="language-svelte"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
	<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Carta<span class="token punctuation">,</span> MarkdownEditor <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'carta-md'</span><span class="token punctuation">;</span>
	<span class="token keyword">import</span> <span class="token string">'carta-md/default.css'</span><span class="token punctuation">;</span> <span class="token comment">/* Default theme */</span>

	<span class="token keyword">const</span> carta <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Carta</span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
		<span class="token comment">// Remember to use a sanitizer to prevent XSS attacks!</span>
		<span class="token comment">// More on that below</span>
		<span class="token comment">// sanitizer: ...</span>
	<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token keyword">let</span> value <span class="token operator">=</span> <span class="token string">''</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>MarkdownEditor</span> <span class="token language-javascript"><span class="token punctuation">&#123;</span>carta<span class="token punctuation">&#125;</span></span> <span class="token attr-name"><span class="token namespace">bind:</span>value</span> <span class="token punctuation">/></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
	<span class="token comment">/* Set your monospace font (Required to have the editor working correctly!) */</span>
	<span class="token selector">:global(.carta-font-code)</span> <span class="token punctuation">&#123;</span>
		<span class="token property">font-family</span><span class="token punctuation">:</span> <span class="token string">'...'</span><span class="token punctuation">,</span> monospace<span class="token punctuation">;</span>
		<span class="token property">font-size</span><span class="token punctuation">:</span> 1.1rem<span class="token punctuation">;</span>
	<span class="token punctuation">&#125;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span></code>`;return{c(){s=c("pre"),o=new P(!1),this.h()},l(e){s=i(e,"PRE",{class:!0});var l=T(s);o=L(l,!1),l.forEach(t),this.h()},h(){o.a=null,d(s,"class","language-svelte")},m(e,l){p(e,s,l),o.m(k,s)},p:N,d(e){e&&t(s)}}}function Un(f){let s,o,k=`<code class="language-svelte"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
	<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Carta<span class="token punctuation">,</span> Markdown <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'carta-md'</span><span class="token punctuation">;</span>

	<span class="token keyword">const</span> carta <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Carta</span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
		<span class="token comment">/* ... */</span>
	<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token keyword">let</span> value <span class="token operator">=</span> <span class="token string">'...'</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Markdown</span> <span class="token language-javascript"><span class="token punctuation">&#123;</span>carta<span class="token punctuation">&#125;</span></span> <span class="token language-javascript"><span class="token punctuation">&#123;</span>value<span class="token punctuation">&#125;</span></span> <span class="token punctuation">/></span></span></code>`;return{c(){s=c("pre"),o=new P(!1),this.h()},l(e){s=i(e,"PRE",{class:!0});var l=T(s);o=L(l,!1),l.forEach(t),this.h()},h(){o.a=null,d(s,"class","language-svelte")},m(e,l){p(e,s,l),o.m(k,s)},p:N,d(e){e&&t(s)}}}function Vn(f){let s,o,k=`<code class="language-svelte"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
	<span class="token comment">// Your other stuff...</span>
	<span class="token keyword">import</span> DOMPurify <span class="token keyword">from</span> <span class="token string">'isomorphic-dompurify'</span><span class="token punctuation">;</span>

	<span class="token keyword">const</span> carta <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Carta</span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
		<span class="token literal-property property">sanitizer</span><span class="token operator">:</span> DOMPurify<span class="token punctuation">.</span>sanitize
	<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token keyword">let</span> value <span class="token operator">=</span> <span class="token string">''</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>MarkdownEditor</span> <span class="token language-javascript"><span class="token punctuation">&#123;</span>carta<span class="token punctuation">&#125;</span></span> <span class="token attr-name"><span class="token namespace">bind:</span>value</span> <span class="token punctuation">/></span></span></code>`;return{c(){s=c("pre"),o=new P(!1),this.h()},l(e){s=i(e,"PRE",{class:!0});var l=T(s);o=L(l,!1),l.forEach(t),this.h()},h(){o.a=null,d(s,"class","language-svelte")},m(e,l){p(e,s,l),o.m(k,s)},p:N,d(e){e&&t(s)}}}function Zn(f){let s,o,k=`<code class="language-ts"><span class="token comment">// +page.server.ts</span>

<span class="token comment">// Path to an server-side static Carta instance</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> carta <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'$lib/path/to/carta'</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> load<span class="token operator">:</span> <span class="token function-variable function">PageServerLoad</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
	<span class="token keyword">const</span> markdown <span class="token operator">=</span> <span class="token comment">/* ... */</span><span class="token punctuation">;</span>

	<span class="token keyword">const</span> html <span class="token operator">=</span> <span class="token keyword">await</span> carta<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>markdown<span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token keyword">return</span> <span class="token punctuation">&#123;</span>
		html
	<span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`;return{c(){s=c("pre"),o=new P(!1),this.h()},l(e){s=i(e,"PRE",{class:!0});var l=T(s);o=L(l,!1),l.forEach(t),this.h()},h(){o.a=null,d(s,"class","language-ts")},m(e,l){p(e,s,l),o.m(k,s)},p:N,d(e){e&&t(s)}}}function na(f){let s,o,k=`<code class="language-svelte"><span class="token comment">&lt;!-- +page.svelte --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
	<span class="token keyword">import</span> PreRendered <span class="token keyword">from</span> <span class="token string">'carta-md'</span><span class="token punctuation">;</span>

	<span class="token keyword">export</span> <span class="token keyword">let</span> data<span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>PreRendered</span> <span class="token attr-name">html=</span><span class="token language-javascript"><span class="token punctuation">&#123;</span>data<span class="token punctuation">.</span>html<span class="token punctuation">&#125;</span></span> <span class="token punctuation">/></span></span></code>`;return{c(){s=c("pre"),o=new P(!1),this.h()},l(e){s=i(e,"PRE",{class:!0});var l=T(s);o=L(l,!1),l.forEach(t),this.h()},h(){o.a=null,d(s,"class","language-svelte")},m(e,l){p(e,s,l),o.m(k,s)},p:N,d(e){e&&t(s)}}}function aa(f){let s,o='<a href="#installation">Installation</a>',k,e,l="Installing the core package:",Q,g,U,b,yn="Installing plugins:",V,h,Z,v,Cn='<a href="#setup">Setup</a>',nn,E,xn="Setup a basic editor:",an,$,sn,j,Mn="Or, if you just want to render content:",tn,w,en,_,Hn='<a href="#reactivity">Reactivity</a>',pn,S,Pn="The <code>&lt;Markdown&gt;</code> component is not reactive. If you want to make it reactive, you can either create your own component using the <code>render</code> function provided by the <code>Carta</code> class, or use Svelte <code>#key</code> block:",on,z,ln,Kn=`<code class="language-svelte"><span class="token language-javascript"><span class="token punctuation">&#123;</span>#key value<span class="token punctuation">&#125;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Markdown</span> <span class="token language-javascript"><span class="token punctuation">&#123;</span>carta<span class="token punctuation">&#125;</span></span> <span class="token language-javascript"><span class="token punctuation">&#123;</span>value<span class="token punctuation">&#125;</span></span> <span class="token punctuation">/></span></span>
<span class="token language-javascript"><span class="token punctuation">&#123;</span><span class="token operator">/</span>key<span class="token punctuation">&#125;</span></span></code>`,cn,R,Tn="Beware that rendering Markdown can become quite resources-expensive, especially if you are using different plugins.",un,y,Ln='<a href="#sanitization">Sanitization</a>',rn,q,bn='By default Carta does <strong>not</strong> sanitize user input, which can include malicious code that could lead to <a href="https://en.wikipedia.org/wiki/Cross-site_scripting" rel="nofollow">XSS attacks</a>. For this reason it is <em>strongly recommended</em> to install a package that handles that for you.',kn,I,En='Since Carta operates both on the server and the client, you’d need a sanitizer able to work in both environments, for example <a href="https://www.npmjs.com/package/isomorphic-dompurify" rel="nofollow">isomorphic-dompurify</a> or <a href="https://www.npmjs.com/package/sanitize-html" rel="nofollow">sanitize-html</a>. Here is an example using the former, which requires minimum configuration.',mn,C,fn,x,jn='<a href="#pre-rendering">Pre-rendering</a>',dn,O,Sn="While the <code>&lt;Markdown&gt;</code> component is SSR compatible and allows you to pre-render some content on the server, it has some limitations and drawbacks:",gn,D,zn="<li>It cannot render content requiring asynchronous code execution(for example <code>plugin-code</code>);</li> <li>For the previous reason, it also needs to render the same markdown on the client. This requires the client to import this library and then render the new HTML, which can slow down the page, especially if you are using different plugins.</li>",hn,F,Rn="This can be avoided by pre-rendering the whole content on the server, which can also be improved further by storing/caching the rendered HTML(this implementation is up to you).",vn,B,qn="For example, in SvelteKit:",$n,M,wn,H,_n;return g=new J({props:{$$slots:{default:[Jn]},$$scope:{ctx:f}}}),h=new J({props:{$$slots:{default:[Nn]},$$scope:{ctx:f}}}),$=new J({props:{$$slots:{default:[Qn]},$$scope:{ctx:f}}}),w=new J({props:{$$slots:{default:[Un]},$$scope:{ctx:f}}}),C=new J({props:{$$slots:{default:[Vn]},$$scope:{ctx:f}}}),M=new J({props:{$$slots:{default:[Zn]},$$scope:{ctx:f}}}),H=new J({props:{$$slots:{default:[na]},$$scope:{ctx:f}}}),{c(){s=c("h2"),s.innerHTML=o,k=u(),e=c("p"),e.textContent=l,Q=u(),G(g.$$.fragment),U=u(),b=c("p"),b.textContent=yn,V=u(),G(h.$$.fragment),Z=u(),v=c("h2"),v.innerHTML=Cn,nn=u(),E=c("p"),E.textContent=xn,an=u(),G($.$$.fragment),sn=u(),j=c("p"),j.textContent=Mn,tn=u(),G(w.$$.fragment),en=u(),_=c("h3"),_.innerHTML=Hn,pn=u(),S=c("p"),S.innerHTML=Pn,on=u(),z=c("pre"),ln=new P(!1),cn=u(),R=c("p"),R.textContent=Tn,un=u(),y=c("h2"),y.innerHTML=Ln,rn=u(),q=c("p"),q.innerHTML=bn,kn=u(),I=c("p"),I.innerHTML=En,mn=u(),G(C.$$.fragment),fn=u(),x=c("h2"),x.innerHTML=jn,dn=u(),O=c("p"),O.innerHTML=Sn,gn=u(),D=c("ol"),D.innerHTML=zn,hn=u(),F=c("p"),F.textContent=Rn,vn=u(),B=c("p"),B.textContent=qn,$n=u(),G(M.$$.fragment),wn=u(),G(H.$$.fragment),this.h()},l(n){s=i(n,"H2",{id:!0,"data-svelte-h":!0}),m(s)!=="svelte-18vig38"&&(s.innerHTML=o),k=r(n),e=i(n,"P",{"data-svelte-h":!0}),m(e)!=="svelte-1utr4t3"&&(e.textContent=l),Q=r(n),X(g.$$.fragment,n),U=r(n),b=i(n,"P",{"data-svelte-h":!0}),m(b)!=="svelte-15kmill"&&(b.textContent=yn),V=r(n),X(h.$$.fragment,n),Z=r(n),v=i(n,"H2",{id:!0,"data-svelte-h":!0}),m(v)!=="svelte-1uj9ei1"&&(v.innerHTML=Cn),nn=r(n),E=i(n,"P",{"data-svelte-h":!0}),m(E)!=="svelte-17a7tcx"&&(E.textContent=xn),an=r(n),X($.$$.fragment,n),sn=r(n),j=i(n,"P",{"data-svelte-h":!0}),m(j)!=="svelte-19ezkc3"&&(j.textContent=Mn),tn=r(n),X(w.$$.fragment,n),en=r(n),_=i(n,"H3",{id:!0,"data-svelte-h":!0}),m(_)!=="svelte-3lqvue"&&(_.innerHTML=Hn),pn=r(n),S=i(n,"P",{"data-svelte-h":!0}),m(S)!=="svelte-uqewoa"&&(S.innerHTML=Pn),on=r(n),z=i(n,"PRE",{class:!0});var a=T(z);ln=L(a,!1),a.forEach(t),cn=r(n),R=i(n,"P",{"data-svelte-h":!0}),m(R)!=="svelte-l8zcw4"&&(R.textContent=Tn),un=r(n),y=i(n,"H2",{id:!0,"data-svelte-h":!0}),m(y)!=="svelte-u7hsf9"&&(y.innerHTML=Ln),rn=r(n),q=i(n,"P",{"data-svelte-h":!0}),m(q)!=="svelte-1t1ldau"&&(q.innerHTML=bn),kn=r(n),I=i(n,"P",{"data-svelte-h":!0}),m(I)!=="svelte-qj9me5"&&(I.innerHTML=En),mn=r(n),X(C.$$.fragment,n),fn=r(n),x=i(n,"H2",{id:!0,"data-svelte-h":!0}),m(x)!=="svelte-e0u7s8"&&(x.innerHTML=jn),dn=r(n),O=i(n,"P",{"data-svelte-h":!0}),m(O)!=="svelte-1e0x7cs"&&(O.innerHTML=Sn),gn=r(n),D=i(n,"OL",{"data-svelte-h":!0}),m(D)!=="svelte-imttyo"&&(D.innerHTML=zn),hn=r(n),F=i(n,"P",{"data-svelte-h":!0}),m(F)!=="svelte-1u8en29"&&(F.textContent=Rn),vn=r(n),B=i(n,"P",{"data-svelte-h":!0}),m(B)!=="svelte-71rpmp"&&(B.textContent=qn),$n=r(n),X(M.$$.fragment,n),wn=r(n),X(H.$$.fragment,n),this.h()},h(){d(s,"id","installation"),d(v,"id","setup"),d(_,"id","reactivity"),ln.a=null,d(z,"class","language-svelte"),d(y,"id","sanitization"),d(x,"id","pre-rendering")},m(n,a){p(n,s,a),p(n,k,a),p(n,e,a),p(n,Q,a),K(g,n,a),p(n,U,a),p(n,b,a),p(n,V,a),K(h,n,a),p(n,Z,a),p(n,v,a),p(n,nn,a),p(n,E,a),p(n,an,a),K($,n,a),p(n,sn,a),p(n,j,a),p(n,tn,a),K(w,n,a),p(n,en,a),p(n,_,a),p(n,pn,a),p(n,S,a),p(n,on,a),p(n,z,a),ln.m(Kn,z),p(n,cn,a),p(n,R,a),p(n,un,a),p(n,y,a),p(n,rn,a),p(n,q,a),p(n,kn,a),p(n,I,a),p(n,mn,a),K(C,n,a),p(n,fn,a),p(n,x,a),p(n,dn,a),p(n,O,a),p(n,gn,a),p(n,D,a),p(n,hn,a),p(n,F,a),p(n,vn,a),p(n,B,a),p(n,$n,a),K(M,n,a),p(n,wn,a),K(H,n,a),_n=!0},p(n,[a]){const In={};a&1&&(In.$$scope={dirty:a,ctx:n}),g.$set(In);const On={};a&1&&(On.$$scope={dirty:a,ctx:n}),h.$set(On);const Dn={};a&1&&(Dn.$$scope={dirty:a,ctx:n}),$.$set(Dn);const Fn={};a&1&&(Fn.$$scope={dirty:a,ctx:n}),w.$set(Fn);const Bn={};a&1&&(Bn.$$scope={dirty:a,ctx:n}),C.$set(Bn);const Gn={};a&1&&(Gn.$$scope={dirty:a,ctx:n}),M.$set(Gn);const Xn={};a&1&&(Xn.$$scope={dirty:a,ctx:n}),H.$set(Xn)},i(n){_n||(W(g.$$.fragment,n),W(h.$$.fragment,n),W($.$$.fragment,n),W(w.$$.fragment,n),W(C.$$.fragment,n),W(M.$$.fragment,n),W(H.$$.fragment,n),_n=!0)},o(n){Y(g.$$.fragment,n),Y(h.$$.fragment,n),Y($.$$.fragment,n),Y(w.$$.fragment,n),Y(C.$$.fragment,n),Y(M.$$.fragment,n),Y(H.$$.fragment,n),_n=!1},d(n){n&&(t(s),t(k),t(e),t(Q),t(U),t(b),t(V),t(Z),t(v),t(nn),t(E),t(an),t(sn),t(j),t(tn),t(en),t(_),t(pn),t(S),t(on),t(z),t(cn),t(R),t(un),t(y),t(rn),t(q),t(kn),t(I),t(mn),t(fn),t(x),t(dn),t(O),t(gn),t(D),t(hn),t(F),t(vn),t(B),t($n),t(wn)),A(g,n),A(h,n),A($,n),A(w,n),A(C,n),A(M,n),A(H,n)}}}const pa={title:"Getting Started",section:"Overview"};class oa extends Yn{constructor(s){super(),An(this,s,null,aa,Wn,{})}}export{oa as default,pa as metadata};