import{c as g}from"./index.Bn5nfv3t.js";import{y as $}from"./scheduler.MTTyNl1s.js";function S(n){return(n==null?void 0:n.length)!==void 0?n:Array.from(n)}function b(n,{delay:t=0,duration:s=400,easing:c=$}={}){const o=+getComputedStyle(n).opacity;return{delay:t,duration:s,easing:c,css:f=>`opacity: ${f*o}`}}function h(n,{delay:t=0,duration:s=400,easing:c=g,start:o=0,opacity:f=0}={}){const e=getComputedStyle(n),m=+e.opacity,p=e.transform==="none"?"":e.transform,d=1-o,y=m*(1-f);return{delay:t,duration:s,easing:c,css:(a,u)=>`
			transform: ${p} scale(${1-d*u});
			opacity: ${m-y*u}
		`}}export{S as e,b as f,h as s};
