import{s as E,z as d,A as v,B as C,h as m,d as h,j as _,C as w,i as k,y as p,v as b,D as H,E as D,G as I,f as V,a as M,g as y,c as S,u as Z,H as j,I as q,J as x,p as A}from"./scheduler.a9223a08.js";import{S as T,i as L,b as G,d as J,m as N,a as z,t as B,e as O}from"./index.ee2268cf.js";import{g as P}from"./spread.8a54911c.js";function U(a){let e,s,o=[{width:a[1]},{height:a[1]},{viewBox:"0 0 15 15"},{fill:"none"},{xmlns:"http://www.w3.org/2000/svg"},a[2]],l={};for(let t=0;t<o.length;t+=1)l=d(l,o[t]);return{c(){e=v("svg"),s=v("path"),this.h()},l(t){e=C(t,"svg",{width:!0,height:!0,viewBox:!0,fill:!0,xmlns:!0});var n=m(e);s=C(n,"path",{"fill-rule":!0,"clip-rule":!0,d:!0,fill:!0}),m(s).forEach(h),n.forEach(h),this.h()},h(){_(s,"fill-rule","evenodd"),_(s,"clip-rule","evenodd"),_(s,"d","M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z"),_(s,"fill",a[0]),w(e,l)},m(t,n){k(t,e,n),p(e,s)},p(t,[n]){n&1&&_(s,"fill",t[0]),w(e,l=P(o,[n&2&&{width:t[1]},n&2&&{height:t[1]},{viewBox:"0 0 15 15"},{fill:"none"},{xmlns:"http://www.w3.org/2000/svg"},n&4&&t[2]]))},i:b,o:b,d(t){t&&h(e)}}}function F(a,e,s){const o=["color","size"];let l=H(e,o),{color:t="currentColor"}=e,{size:n=15}=e;return a.$$set=u=>{e=d(d({},e),D(u)),s(2,l=H(e,o)),"color"in u&&s(0,t=u.color),"size"in u&&s(1,n=u.size)},[t,n,l]}class K extends T{constructor(e){super(),L(this,e,F,U,E,{color:0,size:1})}}const Q=K;function R(a){let e,s,o,l,t,n,u;const c=a[2].default,r=I(c,a,a[1],null);return l=new Q({props:{class:"h-5 w-5"}}),{c(){e=V("div"),r&&r.c(),s=M(),o=V("button"),G(l.$$.fragment),this.h()},l(i){e=y(i,"DIV",{class:!0});var f=m(e);r&&r.l(f),s=S(f),o=y(f,"BUTTON",{title:!0,class:!0});var g=m(o);J(l.$$.fragment,g),g.forEach(h),f.forEach(h),this.h()},h(){_(o,"title","Copy"),_(o,"class","absolute right-4 top-[min(50%_,_32px)] -translate-y-1/2 transform rounded p-2 hover:bg-neutral-800 hover:text-neutral-300 active:text-sky-300 "),_(e,"class","relative")},m(i,f){k(i,e,f),r&&r.m(e,null),p(e,s),p(e,o),N(l,o,null),a[4](e),t=!0,n||(u=Z(o,"click",a[3]),n=!0)},p(i,[f]){r&&r.p&&(!t||f&2)&&j(r,c,i,i[1],t?x(c,i[1],f,null):q(i[1]),null)},i(i){t||(z(r,i),z(l.$$.fragment,i),t=!0)},o(i){B(r,i),B(l.$$.fragment,i),t=!1},d(i){i&&h(e),r&&r.d(i),O(l),a[4](null),n=!1,u()}}}function W(a,e,s){let{$$slots:o={},$$scope:l}=e,t;const n=()=>{navigator.clipboard.writeText(t.innerText)};function u(c){A[c?"unshift":"push"](()=>{t=c,s(0,t)})}return a.$$set=c=>{"$$scope"in c&&s(1,l=c.$$scope)},[t,l,o,n,u]}class ee extends T{constructor(e){super(),L(this,e,W,R,E,{})}}export{ee as C};