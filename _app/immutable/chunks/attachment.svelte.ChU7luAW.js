import{s as oa,e as c,a as u,H as q,c as i,l as $,g as r,b as W,m as z,f as n,p as k,i as e,n as ta}from"./scheduler.MTTyNl1s.js";import{S as la,i as ca,c as V,a as X,m as Y,t as Z,b as aa,d as sa}from"./index.DrAlApqI.js";import{C as na}from"./Code.BLkHPVHm.js";function ia(H){let t,o,m=`<code class="language-ts"><span class="token keyword">import</span> <span class="token string">'@cartamd/plugin-attachment/default.css'</span><span class="token punctuation">;</span></code>`;return{c(){t=c("pre"),o=new q(!1),this.h()},l(p){t=i(p,"PRE",{class:!0});var l=W(t);o=z(l,!1),l.forEach(n),this.h()},h(){o.a=null,k(t,"class","language-ts")},m(p,l){e(p,t,l),o.m(m,t)},p:ta,d(p){p&&n(t)}}}function ua(H){let t,o,m=`<code class="language-svelte"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
	<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Carta<span class="token punctuation">,</span> MarkdownEditor <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'carta-md'</span><span class="token punctuation">;</span>
	<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> attachment <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@cartamd/plugin-attachment'</span><span class="token punctuation">;</span>

	<span class="token keyword">const</span> carta <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Carta</span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
		<span class="token literal-property property">extensions</span><span class="token operator">:</span> <span class="token punctuation">[</span>
			<span class="token function">attachment</span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
				<span class="token function">upload</span><span class="token punctuation">(</span><span class="token parameter">file</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
					<span class="token comment">/* ... */</span>
				<span class="token punctuation">&#125;</span>
			<span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
		<span class="token punctuation">]</span>
	<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>MarkdownEditor</span> <span class="token language-javascript"><span class="token punctuation">&#123;</span>carta<span class="token punctuation">&#125;</span></span> <span class="token punctuation">/></span></span></code>`;return{c(){t=c("pre"),o=new q(!1),this.h()},l(p){t=i(p,"PRE",{class:!0});var l=W(t);o=z(l,!1),l.forEach(n),this.h()},h(){o.a=null,k(t,"class","language-svelte")},m(p,l){e(p,t,l),o.m(m,t)},p:ta,d(p){p&&n(t)}}}function ra(H){let t,o="This plugin adds support for attachments.",m,p,l='<a href="#installation">Installation</a>',b,y,M,ea='<code class="language-undefined">npm i @cartamd/plugin-attachment</code>',E,f,B='<a href="#setup">Setup</a>',L,d,D='<a href="#styles">Styles</a>',P,w,G="Import the default theme, or create you own:",S,h,j,g,J='<a href="#extension">Extension</a>',R,v,I,_,K='<a href="#options">Options</a>',O,x,N="Here are the options you can pass to <code>attachment()</code>:",A,C,F,pa=`<code class="language-ts"><span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">AttachmentExtensionOptions</span> <span class="token punctuation">&#123;</span>
	<span class="token comment">/**
	 * Upload a file to the server. Return the url of the uploaded file.
	 * If an error occurs, return null. This function does **not** handle errors.
	 * @param file The file to upload
	 * @returns The uploaded file url, or null if it failed
	 */</span>
	<span class="token function-variable function">upload</span><span class="token operator">:</span> <span class="token punctuation">(</span>file<span class="token operator">:</span> File<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token operator">></span><span class="token punctuation">;</span>
	<span class="token comment">/**
	 * Supported mime types.
	 *
	 * @default ['image/png', 'image/jpeg', 'image/gif', 'image/svg+xml'].
	 */</span>
	supportedMimeTypes<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
	<span class="token comment">/**
	 * Whether to disable the attach icon.
	 *
	 * @default false
	 */</span>
	disableIcon<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
	<span class="token comment">/**
	 * Custom drop overlay component. Use &#96;false&#96; to disable the overlay.
	 */</span>
	dropOverlay<span class="token operator">?</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token operator">|</span> <span class="token keyword">typeof</span> SvelteComponent<span class="token punctuation">;</span>
	<span class="token comment">/**
	 * Custom loading overlay component. Use &#96;false&#96; to disable the overlay.
	 */</span>
	loadingOverlay<span class="token operator">?</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token operator">|</span> <span class="token keyword">typeof</span> SvelteComponent<span class="token operator">&lt;</span><span class="token punctuation">&#123;</span> uploadingFiles<span class="token operator">:</span> Writable<span class="token operator">&lt;</span>File<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">></span> <span class="token punctuation">&#125;</span><span class="token operator">></span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`,U;return h=new na({props:{$$slots:{default:[ia]},$$scope:{ctx:H}}}),v=new na({props:{$$slots:{default:[ua]},$$scope:{ctx:H}}}),{c(){t=c("p"),t.textContent=o,m=u(),p=c("h2"),p.innerHTML=l,b=u(),y=c("pre"),M=new q(!1),E=u(),f=c("h2"),f.innerHTML=B,L=u(),d=c("h3"),d.innerHTML=D,P=u(),w=c("p"),w.textContent=G,S=u(),V(h.$$.fragment),j=u(),g=c("h3"),g.innerHTML=J,R=u(),V(v.$$.fragment),I=u(),_=c("h2"),_.innerHTML=K,O=u(),x=c("p"),x.innerHTML=N,A=u(),C=c("pre"),F=new q(!1),this.h()},l(a){t=i(a,"P",{"data-svelte-h":!0}),$(t)!=="svelte-epoik3"&&(t.textContent=o),m=r(a),p=i(a,"H2",{id:!0,"data-svelte-h":!0}),$(p)!=="svelte-18vig38"&&(p.innerHTML=l),b=r(a),y=i(a,"PRE",{class:!0});var s=W(y);M=z(s,!1),s.forEach(n),E=r(a),f=i(a,"H2",{id:!0,"data-svelte-h":!0}),$(f)!=="svelte-1uj9ei1"&&(f.innerHTML=B),L=r(a),d=i(a,"H3",{id:!0,"data-svelte-h":!0}),$(d)!=="svelte-1obsuhg"&&(d.innerHTML=D),P=r(a),w=i(a,"P",{"data-svelte-h":!0}),$(w)!=="svelte-udn1pg"&&(w.textContent=G),S=r(a),X(h.$$.fragment,a),j=r(a),g=i(a,"H3",{id:!0,"data-svelte-h":!0}),$(g)!=="svelte-1h1d05d"&&(g.innerHTML=J),R=r(a),X(v.$$.fragment,a),I=r(a),_=i(a,"H2",{id:!0,"data-svelte-h":!0}),$(_)!=="svelte-qvxcr2"&&(_.innerHTML=K),O=r(a),x=i(a,"P",{"data-svelte-h":!0}),$(x)!=="svelte-j0z1h5"&&(x.innerHTML=N),A=r(a),C=i(a,"PRE",{class:!0});var T=W(C);F=z(T,!1),T.forEach(n),this.h()},h(){k(p,"id","installation"),M.a=null,k(y,"class","language-undefined"),k(f,"id","setup"),k(d,"id","styles"),k(g,"id","extension"),k(_,"id","options"),F.a=null,k(C,"class","language-ts")},m(a,s){e(a,t,s),e(a,m,s),e(a,p,s),e(a,b,s),e(a,y,s),M.m(ea,y),e(a,E,s),e(a,f,s),e(a,L,s),e(a,d,s),e(a,P,s),e(a,w,s),e(a,S,s),Y(h,a,s),e(a,j,s),e(a,g,s),e(a,R,s),Y(v,a,s),e(a,I,s),e(a,_,s),e(a,O,s),e(a,x,s),e(a,A,s),e(a,C,s),F.m(pa,C),U=!0},p(a,[s]){const T={};s&1&&(T.$$scope={dirty:s,ctx:a}),h.$set(T);const Q={};s&1&&(Q.$$scope={dirty:s,ctx:a}),v.$set(Q)},i(a){U||(Z(h.$$.fragment,a),Z(v.$$.fragment,a),U=!0)},o(a){aa(h.$$.fragment,a),aa(v.$$.fragment,a),U=!1},d(a){a&&(n(t),n(m),n(p),n(b),n(y),n(E),n(f),n(L),n(d),n(P),n(w),n(S),n(j),n(g),n(R),n(I),n(_),n(O),n(x),n(A),n(C)),sa(h,a),sa(v,a)}}}const da={section:"Plugins",title:"Attachment"};class ha extends la{constructor(t){super(),ca(this,t,null,ra,oa,{})}}export{ha as default,da as metadata};