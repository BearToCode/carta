import{v as b,s as S,$ as I,T as O,a0 as U}from"./scheduler.a9223a08.js";const f=[];function L(e,t){return{subscribe:p(e,t).subscribe}}function p(e,t=b){let n;const r=new Set;function o(s){if(S(e,s)&&(e=s,n)){const l=!f.length;for(const i of r)i[1](),f.push(i,e);if(l){for(let i=0;i<f.length;i+=2)f[i][0](f[i+1]);f.length=0}}}function c(s){o(s(e))}function a(s,l=b){const i=[s,l];return r.add(i),r.size===1&&(n=t(o,c)||b),s(e),()=>{r.delete(i),r.size===0&&n&&(n(),n=null)}}return{set:o,update:c,subscribe:a}}function q(e,t,n){const r=!Array.isArray(e),o=r?[e]:e;if(!o.every(Boolean))throw new Error("derived() expects stores as input, got a falsy value");const c=t.length<2;return L(n,(a,s)=>{let l=!1;const i=[];let _=0,g=b;const v=()=>{if(_)return;g();const u=t(r?i[0]:i,a,s);c?a(u):g=U(u)?u:b},x=o.map((u,h)=>I(u,R=>{i[h]=R,_&=~(1<<h),l&&v()},()=>{_|=1<<h}));return l=!0,v(),function(){O(x),g(),l=!1}})}function K(e){return{subscribe:e.subscribe.bind(e)}}var w;const N=((w=globalThis.__sveltekit_x9n3km)==null?void 0:w.base)??"/carta";var A;const P=((A=globalThis.__sveltekit_x9n3km)==null?void 0:A.assets)??N,V="1705945656904",z="sveltekit:snapshot",B="sveltekit:scroll",C="sveltekit:index",k={tap:1,hover:2,viewport:3,eager:4,off:-1};function D(e){let t=e.baseURI;if(!t){const n=e.getElementsByTagName("base");t=n.length?n[0].href:e.URL}return t}function G(){return{x:pageXOffset,y:pageYOffset}}function d(e,t){return e.getAttribute(`data-sveltekit-${t}`)}const y={...k,"":k.hover};function E(e){let t=e.assignedSlot??e.parentNode;return(t==null?void 0:t.nodeType)===11&&(t=t.host),t}function X(e,t){for(;e&&e!==t;){if(e.nodeName.toUpperCase()==="A"&&e.hasAttribute("href"))return e;e=E(e)}}function H(e,t){let n;try{n=new URL(e instanceof SVGAElement?e.href.baseVal:e.href,document.baseURI)}catch{}const r=e instanceof SVGAElement?e.target.baseVal:e.target,o=!n||!!r||$(n,t)||(e.getAttribute("rel")||"").split(/\s+/).includes("external"),c=(n==null?void 0:n.origin)===location.origin&&e.hasAttribute("download");return{url:n,external:o,target:r,download:c}}function W(e){let t=null,n=null,r=null,o=null,c=null,a=null,s=e;for(;s&&s!==document.documentElement;)r===null&&(r=d(s,"preload-code")),o===null&&(o=d(s,"preload-data")),t===null&&(t=d(s,"keepfocus")),n===null&&(n=d(s,"noscroll")),c===null&&(c=d(s,"reload")),a===null&&(a=d(s,"replacestate")),s=E(s);function l(i){switch(i){case"":case"true":return!0;case"off":case"false":return!1;default:return null}}return{preload_code:y[r??"off"],preload_data:y[o??"off"],keep_focus:l(t),noscroll:l(n),reload:l(c),replace_state:l(a)}}function m(e){const t=p(e);let n=!0;function r(){n=!0,t.update(a=>a)}function o(a){n=!1,t.set(a)}function c(a){let s;return t.subscribe(l=>{(s===void 0||n&&l!==s)&&a(s=l)})}return{notify:r,set:o,subscribe:c}}function Y(){const{set:e,subscribe:t}=p(!1);let n;async function r(){clearTimeout(n);try{const o=await fetch(`${P}/_app/version.json`,{headers:{pragma:"no-cache","cache-control":"no-cache"}});if(!o.ok)return!1;const a=(await o.json()).version!==V;return a&&(e(!0),clearTimeout(n)),a}catch{return!1}}return{subscribe:t,check:r}}function $(e,t){return e.origin!==location.origin||!e.pathname.startsWith(t)}let T;function F(e){T=e.client}function J(e){return(...t)=>T[e](...t)}const M={url:m({}),page:m({}),navigating:p(null),updated:Y()};export{C as I,k as P,B as S,z as a,H as b,W as c,M as d,N as e,X as f,D as g,F as h,$ as i,q as j,K as k,J as l,L as r,G as s,p as w};