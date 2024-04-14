import{c as y}from"./index.CvmYViMX.js";import{q as u}from"./scheduler.WCevfC9S.js";function g(t,{delay:o=0,duration:s=400,easing:c=u}={}){const n=+getComputedStyle(t).opacity;return{delay:o,duration:s,easing:c,css:r=>`opacity: ${r*n}`}}function C(t,{delay:o=0,duration:s=400,easing:c=y,start:n=0,opacity:r=0}={}){const a=getComputedStyle(t),e=+a.opacity,f=a.transform==="none"?"":a.transform,m=1-n,p=e*(1-r);return{delay:o,duration:s,easing:c,css:(d,i)=>`
			transform: ${f} scale(${1-m*i});
			opacity: ${e-p*i}
		`}}export{g as f,C as s};
