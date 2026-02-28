import{r as g}from"./index.yBjzXJbu.js";var f={exports:{}},n={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var x;function c(){if(x)return n;x=1;var e=g(),b=Symbol.for("react.element"),l=Symbol.for("react.fragment"),_=Object.prototype.hasOwnProperty,p=e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,R={key:!0,ref:!0,__self:!0,__source:!0};function a(i,r,d){var t,o={},u=null,m=null;d!==void 0&&(u=""+d),r.key!==void 0&&(u=""+r.key),r.ref!==void 0&&(m=r.ref);for(t in r)_.call(r,t)&&!R.hasOwnProperty(t)&&(o[t]=r[t]);if(i&&i.defaultProps)for(t in r=i.defaultProps,r)o[t]===void 0&&(o[t]=r[t]);return{$$typeof:b,type:i,key:u,ref:m,props:o,_owner:p.current}}return n.Fragment=l,n.jsx=a,n.jsxs=a,n}var s;function v(){return s||(s=1,f.exports=c()),f.exports}var h=v();function E(e){return e>=9?{text:"text-emerald-400",bg:"bg-emerald-500/10",border:"border-emerald-500/30",hex:"#34d399",ring:"ring-emerald-500/40"}:e>=7?{text:"text-amber-400",bg:"bg-amber-500/10",border:"border-amber-500/30",hex:"#fbbf24",ring:"ring-amber-500/40"}:{text:"text-red-400",bg:"bg-red-500/10",border:"border-red-500/30",hex:"#f87171",ring:"ring-red-500/40"}}function O(e){return e===10?"Native":e>=9?"Excellent":e>=7?"Good":e>=5?"Partial":"Limited"}export{O as a,E as g,h as j};
