import{c as p}from"./index.CvmYViMX.js";import{y as u}from"./scheduler.6UPEPLTI.js";function b(t,{delay:o=0,duration:e=400,easing:n=u}={}){const s=+getComputedStyle(t).opacity;return{delay:o,duration:e,easing:n,css:a=>`opacity: ${a*s}`}}function w(t,{delay:o=0,duration:e=400,easing:n=p,start:s=0,opacity:a=0}={}){const r=getComputedStyle(t),c=+r.opacity,l=r.transform==="none"?"":r.transform,i=1-s,d=c*(1-a);return{delay:o,duration:e,easing:n,css:(y,f)=>`
			transform: ${l} scale(${1-i*f});
			opacity: ${c-d*f}
		`}}var _=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function $(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}export{_ as c,b as f,$ as g,w as s};
