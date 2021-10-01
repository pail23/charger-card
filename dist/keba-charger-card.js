/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function t(t,e,i,o){var r,s=arguments.length,a=s<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var n=t.length-1;n>=0;n--)(r=t[n])&&(a=(s<3?r(a):s>3?r(e,i,a):r(e,i))||a);return s>3&&a&&Object.defineProperty(e,i,a),a
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}const e=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),o=new Map;class r{constructor(t,e){if(this._$cssResult$=!0,e!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let t=o.get(this.cssText);return e&&void 0===t&&(o.set(this.cssText,t=new CSSStyleSheet),t.replaceSync(this.cssText)),t}toString(){return this.cssText}}const s=(t,...e)=>{const o=1===t.length?t[0]:e.reduce(((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1]),t[0]);return new r(o,i)},a=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",i))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var n,l;const c={toAttribute(t,e){switch(e){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},h=(t,e)=>e!==t&&(e==e||t==t),d={attribute:!0,type:String,converter:c,reflect:!1,hasChanged:h};class g extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;null!==(e=this.l)&&void 0!==e||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const o=this._$Eh(i,e);void 0!==o&&(this._$Eu.set(o,i),t.push(o))})),t}static createProperty(t,e=d){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,o=this.getPropertyDescriptor(t,i,e);void 0!==o&&Object.defineProperty(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(o){const r=this[t];this[e]=o,this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||d}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eh(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ev=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Ep(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$Em)&&void 0!==e?e:this._$Em=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$Em)||void 0===e||e.splice(this._$Em.indexOf(t)>>>0,1)}_$Ep(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const i=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{e?t.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):i.forEach((e=>{const i=document.createElement("style"),o=window.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=e.cssText,t.appendChild(i)}))})(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$Eg(t,e,i=d){var o,r;const s=this.constructor._$Eh(t,i);if(void 0!==s&&!0===i.reflect){const a=(null!==(r=null===(o=i.converter)||void 0===o?void 0:o.toAttribute)&&void 0!==r?r:c.toAttribute)(e,i.type);this._$Ei=t,null==a?this.removeAttribute(s):this.setAttribute(s,a),this._$Ei=null}}_$AK(t,e){var i,o,r;const s=this.constructor,a=s._$Eu.get(t);if(void 0!==a&&this._$Ei!==a){const t=s.getPropertyOptions(a),n=t.converter,l=null!==(r=null!==(o=null===(i=n)||void 0===i?void 0:i.fromAttribute)&&void 0!==o?o:"function"==typeof n?n:null)&&void 0!==r?r:c.fromAttribute;this._$Ei=a,this[a]=l(e,t.type),this._$Ei=null}}requestUpdate(t,e,i){let o=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||h)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Ei!==t&&(void 0===this._$ES&&(this._$ES=new Map),this._$ES.set(t,i))):o=!1),!this.isUpdatePending&&o&&(this._$Ev=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ev}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,e)=>this[e]=t)),this._$Et=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$ET()}catch(t){throw e=!1,this._$ET(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$Em)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$ET(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ev}shouldUpdate(t){return!0}update(t){void 0!==this._$ES&&(this._$ES.forEach(((t,e)=>this._$Eg(e,this[e],t))),this._$ES=void 0),this._$ET()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var A,u;g.finalized=!0,g.elementProperties=new Map,g.elementStyles=[],g.shadowRootOptions={mode:"open"},null===(n=globalThis.reactiveElementPolyfillSupport)||void 0===n||n.call(globalThis,{ReactiveElement:g}),(null!==(l=globalThis.reactiveElementVersions)&&void 0!==l?l:globalThis.reactiveElementVersions=[]).push("1.0.0");const p=globalThis.trustedTypes,m=p?p.createPolicy("lit-html",{createHTML:t=>t}):void 0,f=`lit$${(Math.random()+"").slice(9)}$`,w="?"+f,b=`<${w}>`,v=document,y=(t="")=>v.createComment(t),x=t=>null===t||"object"!=typeof t&&"function"!=typeof t,B=Array.isArray,C=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,I=/-->/g,H=/>/g,E=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,D=/'/g,O=/"/g,M=/^(?:script|style|textarea)$/i,G=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),L=Symbol.for("lit-noChange"),j=Symbol.for("lit-nothing"),N=new WeakMap,z=v.createTreeWalker(v,129,null,!1),S=(t,e)=>{const i=t.length-1,o=[];let r,s=2===e?"<svg>":"",a=C;for(let e=0;e<i;e++){const i=t[e];let n,l,c=-1,h=0;for(;h<i.length&&(a.lastIndex=h,l=a.exec(i),null!==l);)h=a.lastIndex,a===C?"!--"===l[1]?a=I:void 0!==l[1]?a=H:void 0!==l[2]?(M.test(l[2])&&(r=RegExp("</"+l[2],"g")),a=E):void 0!==l[3]&&(a=E):a===E?">"===l[0]?(a=null!=r?r:C,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,n=l[1],a=void 0===l[3]?E:'"'===l[3]?O:D):a===O||a===D?a=E:a===I||a===H?a=C:(a=E,r=void 0);const d=a===E&&t[e+1].startsWith("/>")?" ":"";s+=a===C?i+b:c>=0?(o.push(n),i.slice(0,c)+"$lit$"+i.slice(c)+f+d):i+f+(-2===c?(o.push(void 0),e):d)}const n=s+(t[i]||"<?>")+(2===e?"</svg>":"");return[void 0!==m?m.createHTML(n):n,o]};class k{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let r=0,s=0;const a=t.length-1,n=this.parts,[l,c]=S(t,e);if(this.el=k.createElement(l,i),z.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(o=z.nextNode())&&n.length<a;){if(1===o.nodeType){if(o.hasAttributes()){const t=[];for(const e of o.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(f)){const i=c[s++];if(t.push(e),void 0!==i){const t=o.getAttribute(i.toLowerCase()+"$lit$").split(f),e=/([.?@])?(.*)/.exec(i);n.push({type:1,index:r,name:e[2],strings:t,ctor:"."===e[1]?P:"?"===e[1]?K:"@"===e[1]?V:F})}else n.push({type:6,index:r})}for(const e of t)o.removeAttribute(e)}if(M.test(o.tagName)){const t=o.textContent.split(f),e=t.length-1;if(e>0){o.textContent=p?p.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],y()),z.nextNode(),n.push({type:2,index:++r});o.append(t[e],y())}}}else if(8===o.nodeType)if(o.data===w)n.push({type:2,index:r});else{let t=-1;for(;-1!==(t=o.data.indexOf(f,t+1));)n.push({type:7,index:r}),t+=f.length-1}r++}}static createElement(t,e){const i=v.createElement("template");return i.innerHTML=t,i}}function U(t,e,i=t,o){var r,s,a,n;if(e===L)return e;let l=void 0!==o?null===(r=i._$Cl)||void 0===r?void 0:r[o]:i._$Cu;const c=x(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(s=null==l?void 0:l._$AO)||void 0===s||s.call(l,!1),void 0===c?l=void 0:(l=new c(t),l._$AT(t,i,o)),void 0!==o?(null!==(a=(n=i)._$Cl)&&void 0!==a?a:n._$Cl=[])[o]=l:i._$Cu=l),void 0!==l&&(e=U(t,l._$AS(t,e.values),l,o)),e}class Y{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:i},parts:o}=this._$AD,r=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:v).importNode(i,!0);z.currentNode=r;let s=z.nextNode(),a=0,n=0,l=o[0];for(;void 0!==l;){if(a===l.index){let e;2===l.type?e=new Q(s,s.nextSibling,this,t):1===l.type?e=new l.ctor(s,l.name,l.strings,this,t):6===l.type&&(e=new R(s,this,t)),this.v.push(e),l=o[++n]}a!==(null==l?void 0:l.index)&&(s=z.nextNode(),a++)}return r}m(t){let e=0;for(const i of this.v)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{constructor(t,e,i,o){var r;this.type=2,this._$AH=j,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cg=null===(r=null==o?void 0:o.isConnected)||void 0===r||r}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=U(this,t,e),x(t)?t===j||null==t||""===t?(this._$AH!==j&&this._$AR(),this._$AH=j):t!==this._$AH&&t!==L&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.S(t):(t=>{var e;return B(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])})(t)?this.M(t):this.$(t)}A(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}S(t){this._$AH!==t&&(this._$AR(),this._$AH=this.A(t))}$(t){this._$AH!==j&&x(this._$AH)?this._$AA.nextSibling.data=t:this.S(v.createTextNode(t)),this._$AH=t}T(t){var e;const{values:i,_$litType$:o}=t,r="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=k.createElement(o.h,this.options)),o);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===r)this._$AH.m(i);else{const t=new Y(r,this),e=t.p(this.options);t.m(i),this.S(e),this._$AH=t}}_$AC(t){let e=N.get(t.strings);return void 0===e&&N.set(t.strings,e=new k(t)),e}M(t){B(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const r of t)o===e.length?e.push(i=new Q(this.A(y()),this.A(y()),this,this.options)):i=e[o],i._$AI(r),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cg=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class F{constructor(t,e,i,o,r){this.type=1,this._$AH=j,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=j}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,o){const r=this.strings;let s=!1;if(void 0===r)t=U(this,t,e,0),s=!x(t)||t!==this._$AH&&t!==L,s&&(this._$AH=t);else{const o=t;let a,n;for(t=r[0],a=0;a<r.length-1;a++)n=U(this,o[i+a],e,a),n===L&&(n=this._$AH[a]),s||(s=!x(n)||n!==this._$AH[a]),n===j?t=j:t!==j&&(t+=(null!=n?n:"")+r[a+1]),this._$AH[a]=n}s&&!o&&this.k(t)}k(t){t===j?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class P extends F{constructor(){super(...arguments),this.type=3}k(t){this.element[this.name]=t===j?void 0:t}}class K extends F{constructor(){super(...arguments),this.type=4}k(t){t&&t!==j?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class V extends F{constructor(t,e,i,o,r){super(t,e,i,o,r),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=U(this,t,e,0))&&void 0!==i?i:j)===L)return;const o=this._$AH,r=t===j&&o!==j||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,s=t!==j&&(o===j||r);r&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class R{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){U(this,t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var T,X,q;null===(A=globalThis.litHtmlPolyfillSupport)||void 0===A||A.call(globalThis,k,Q),(null!==(u=globalThis.litHtmlVersions)&&void 0!==u?u:globalThis.litHtmlVersions=[]).push("2.0.0");class W extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,e,i)=>{var o,r;const s=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:e;let a=s._$litPart$;if(void 0===a){const t=null!==(r=null==i?void 0:i.renderBefore)&&void 0!==r?r:null;s._$litPart$=a=new Q(e.insertBefore(y(),t),t,void 0,null!=i?i:{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return L}}W.finalized=!0,W._$litElement$=!0,null===(T=globalThis.litElementHydrateSupport)||void 0===T||T.call(globalThis,{LitElement:W}),null===(X=globalThis.litElementPolyfillSupport)||void 0===X||X.call(globalThis,{LitElement:W}),(null!==(q=globalThis.litElementVersions)&&void 0!==q?q:globalThis.litElementVersions=[]).push("3.0.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Z=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:o}=e;return{kind:i,elements:o,finisher(e){window.customElements.define(t,e)}}})(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,J=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function _(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):J(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function $(t){return _({...t,state:!0})}var tt="[^\\s]+";function et(t,e){for(var i=[],o=0,r=t.length;o<r;o++)i.push(t[o].substr(0,e));return i}var it=function(t){return function(e,i){var o=i[t].map((function(t){return t.toLowerCase()})),r=o.indexOf(e.toLowerCase());return r>-1?r:null}};function ot(t){for(var e=[],i=1;i<arguments.length;i++)e[i-1]=arguments[i];for(var o=0,r=e;o<r.length;o++){var s=r[o];for(var a in s)t[a]=s[a]}return t}var rt=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],st=["January","February","March","April","May","June","July","August","September","October","November","December"],at=et(st,3),nt={dayNamesShort:et(rt,3),dayNames:rt,monthNamesShort:at,monthNames:st,amPm:["am","pm"],DoFn:function(t){return t+["th","st","nd","rd"][t%10>3?0:(t-t%10!=10?1:0)*t%10]}},lt=(ot({},nt),function(t){return+t-1}),ct=[null,"[1-9]\\d?"],ht=[null,tt],dt=["isPm",tt,function(t,e){var i=t.toLowerCase();return i===e.amPm[0]?0:i===e.amPm[1]?1:null}],gt=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(t){var e=(t+"").match(/([+-]|\d\d)/gi);if(e){var i=60*+e[1]+parseInt(e[2],10);return"+"===e[0]?i:-i}return 0}];it("monthNamesShort"),it("monthNames");var At,ut;!function(){try{(new Date).toLocaleDateString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(t){return"RangeError"===t.name}}(),function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(At||(At={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(ut||(ut={}));var pt=function(t,e,i,o){o=o||{},i=null==i?{}:i;var r=new Event(e,{bubbles:void 0===o.bubbles||o.bubbles,cancelable:Boolean(o.cancelable),composed:void 0===o.composed||o.composed});return r.detail=i,t.dispatchEvent(r),r};var mt={disconnected:"Disconnected",awaiting_start:"Paused or awaiting start",charging:"Charging",completed:"Completed or awaiting car",error:"Error",ready_to_charge:"Ready to charge"},ft={name:"Charger Card",description:"Charger card allows you to control your charging robot.",start:"Start",start_fast:"Start (fast)",start_slow:"Start (slow)",start_smart:"Start (smart)",continue:"Resume",pause:"Pause",stop:"Stop",override:"Override schedule",reboot:"Reboot charger",not_available:"Charger not available",click_for_info:"Click for Info",click_for_config:"Click for Config",click_for_limits:"Click for Limits",online:"Online",voltage:"Voltage",power:"Power",charger_current:"Changer Current",energy_per_hour:"Energy per Hour",lifetime_energy:"Lifetime Energy",circuit_current:"Circuit Energy"},wt={missing_entity:"Specifying entity is required!"},bt={entity:"Entity (Required)",smartChargingEntity:"Entity for smart charging",chargerImage:"Charger image and color",customImage:"Custom image (Optional - overrides charger image)",theme:"Color theme",compact_view:"Compact View",compact_view_aria_label_on:"Toggle compact view on",compact_view_aria_label_off:"Toggle compact view off",show_name:"Show Name",show_name_aria_label_on:"Toggle display name on",show_name_aria_label_off:"Toggle display name off",show_leds:"Show Leds",show_leds_aria_label_on:"Toggle animated leds (overlay on image) on",show_leds_aria_label_off:"Toggle animated leds (overlay on image) off",show_status:"Show Status",show_status_aria_label_on:"Toggle display status on",show_status_aria_label_off:"Toggle display status off",show_stats:"Show Data Table (stats)",show_stats_aria_label_on:"Toggle display data table on",show_stats_aria_label_off:"Toggle display data table off",show_collapsibles:"Show collapsible menu buttons",show_collapsibles_aria_label_on:"Toggle display collapsible menus on",show_collapsibles_aria_label_off:"Toggle display collapsible menus off",show_toolbar:"Show Toolbar",show_toolbar_aria_label_on:"Toggle display toolbar on",show_toolbar_aria_label_off:"Toggle display toolbar off",code_only_note:"Note: Custom actions and data table (stats) options are available exclusively using Code Editor manually."},vt={sessionEnergy:"Session Energy"},yt={not_requesting_current:"Not requesting current",ok:"Ok",pending_schedule:"Pending Schedule",none:"None",max_circuit_current_too_low:"Max circuit current too low",max_dynamic_circuit_current_too_low:"Max dynamic circuit current too low",max_dynamic_offline_fallback_circuit_current_too_low:"Max dynamic offline circuit current too low",circuit_fuse_too_low:"Circuit fuse too low",waiting_in_queue:"Waiting in queue",waiting_in_fully:"Waiting in fully",illegal_grid_type:"Illegal grid type",no_current_request:"No current request",max_charger_current_too_low:"Max charger current too low",max_dynamic_charger_current_too_low:"Max dynamic charger current too low",charger_disabled:"Charger Disabled",pending_authorization:"Pending Authorization",charger_in_error_state:"Charger in error state",undefined:"Undefined"},xt={status:mt,common:ft,error:wt,editor:bt,charger_status:vt,charger_substatus:yt},Bt={disconnected:"Getrennt",awaiting_start:"Pausiert",charging:"Laden",completed:"Fertig",error:"Fehler",ready_to_charge:"Bereit zum Laden"},Ct={name:"Charger Card",description:"Charger card ermöglicht es dir, deinen Laderoboter zu steuern.",start_fast:"Start (schnell)",start_slow:"Start (langsam)",start_smart:"Start (smart)",continue:"Weiter",pause:"Pause",stop:"Stopp",override:"Zeitplan überschreiben",reboot:"Ladegerät neu starten",not_available:"Ladegerät nicht verfügbar",click_for_info:"Klicken für Infos",click_for_config:"Klicken für Konfiguration",click_for_limits:"Klicken für Limits",online:"Online",voltage:"Spannung",power:"Leistung",charger_current:"Ladestrom",energy_per_hour:"Energie pro Stunde",lifetime_energy:"Energie gesamt",circuit_current:"Aktueller Strom"},It={missing_entity:"Die Angabe der Entität ist erforderlich!"},Ht={entity:"Entity (Erforderlich)",smartChargingEntity:"Entity für Smart Charging",chargerImage:"Bild und Farbe des Ladegeräts",customImage:"Benutzerdefiniertes Bild (Optional - überschreibt das Bild des Ladegeräts)",theme:"Farbschema",compact_view:"Kompakte Ansicht",compact_view_aria_label_on:"Kompakte Ansicht einschalten",compact_view_aria_label_off:"Kompakte Ansicht ausschalten",show_name:"Name anzeigen",show_name_aria_label_on:"Anzeigename einschalten",show_name_aria_label_off:"Anzeigename ausschalten",show_leds:"Leds anzeigen",show_leds_aria_label_on:"Animierte Leds (Überlagerung des Bildes) einschalten",show_leds_aria_label_off:"Animierte Leds (Überlagerung des Bildes) ausschalten",show_status:"Status anzeigen",show_status_aria_label_on:"Statusanzeige einschalten",show_status_aria_label_off:"Statusanzeige ausschalten",show_stats:"Datentabelle anzeigen (Statistik)",show_stats_aria_label_on:"Datentabelle einschalten",show_stats_aria_label_off:"Datentabelle ausschalten",show_collapsibles:"Zusammenklappbare Menüschaltflächen anzeigen",show_collapsibles_aria_label_on:"Zusammenklappbare Menüschaltflächen einschalten",show_collapsibles_aria_label_off:"Zusammenklappbare Menüschaltflächen ausschalten",show_toolbar:"Symbolleiste anzeigen",show_toolbar_aria_label_on:"Symbolleiste einschalten",show_toolbar_aria_label_off:"Symbolleiste ausschalten",code_only_note:"Hinweis: Die Optionen für benutzerdefinierte Aktionen und Datentabellen (Statistiken) sind ausschließlich über den manuellen Code-Editor verfügbar."},Et={sessionEnergy:"Energieaufladung"},Dt={not_requesting_current:"Keine Nachfrage nach Strom",ok:"Ok",pending_schedule:"Ausstehender Zeitplan",none:"None",max_circuit_current_too_low:"Maximalstrom zu niedrig",max_dynamic_circuit_current_too_low:"Dynamischer Maximalstrom zu niedrig",max_dynamic_offline_fallback_circuit_current_too_low:"Dynamischer offline Maximalstrom zu niedrig",circuit_fuse_too_low:"Stromkreissicherung zu niedrig",waiting_in_queue:"Warten in der Warteschlange",waiting_in_fully:"Warten in vollem Umfang",illegal_grid_type:"Unzulässiger Grid Typ",no_current_request:"Keine aktuelle Anfrage",max_charger_current_too_low:"Maximaler Ladestrom zu niedrig",max_dynamic_charger_current_too_low:"Maximaler dynamischer Ladestrom zu niedrig",charger_disabled:"Ladegerät Deaktiviert",pending_authorization:"Ausstehende Autorisierung",charger_in_error_state:"Ladegerät im Fehlerzustand",undefined:"Undefiniert"},Ot={status:Bt,common:Ct,error:It,editor:Ht,charger_status:Et,charger_substatus:Dt};const Mt={en:Object.freeze({__proto__:null,status:mt,common:ft,error:wt,editor:bt,charger_status:vt,charger_substatus:yt,default:xt}),de:Object.freeze({__proto__:null,status:Bt,common:Ct,error:It,editor:Ht,charger_status:Et,charger_substatus:Dt,default:Ot})};function Gt(t,e="",i=""){const o=(navigator.language||"en").split("-")[0];let r;try{r=t.split(".").reduce(((t,e)=>t[e]),Mt[o])}catch(e){r=t.split(".").reduce(((t,e)=>t[e]),Mt.en)}return void 0===r&&(r=t.split(".").reduce(((t,e)=>t[e]),Mt.en)),""!==e&&""!==i&&(r=r.replace(e,i)),r}var Lt="data:image/gif;base64,R0lGODlhAwBIAHAAACwAAAAAAwBIAIGAgIAAAAAAAAAAAAACDYSPqcvtD6OctNqLVQEAOw==",jt="data:image/gif;base64,R0lGODlhAwBIAHAAACwAAAAAAwBIAIFwcHD///8AAAAAAAACGYSDqZvmwOJ6R1oKrcR60x5x4PSNimgiTgEAOw==",Nt="data:image/gif;base64,R0lGODlhAwBIAHAAACwAAAAAAwBIAIFwcHAAJv8AAAAAAAACGYSDqZvmwOJ6R1oKrcR60x5x4PSNimgiTgEAOw==",zt="data:image/gif;base64,R0lGODlhAwBIAIEAAAAAAGBgYP8AAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hZDcmVhdGVkIHdpdGggUGFpbnQuTkVUACH5BAkZAAAALAAAAAADAEgAAAINjI+py+0Po5y02otVAQAh+QQJGQAAACwAAAEAAwBGAAACF5SPecCtn5qDVDJaLYYW7Nd9SigiZGkUADs=";const St="disconnected",kt="awaiting_start",Ut="charging",Yt="completed",Qt="error",Ft="ready_to_charge",Pt={normal:{DEFAULT:Lt,disconnected:"data:image/gif;base64,R0lGODlhAwBIAHAAACwAAAAAAwBIAIFwcHBgYGD///8AAAACHYSDqZvmwOJ6R1oKrcR60x5x4EQJ5ommJ6a2qVMAADs=",awaitingStart:jt,charging:"data:image/gif;base64,R0lGODlhAwBIAIAAAAAAAP///yH/C05FVFNDQVBFMi4wAwEAAAAh/hZDcmVhdGVkIHdpdGggUGFpbnQuTkVUACH5BAkZAAAALAAAQQADAAYAAAIEjI95BQAh+QQJGQAAACwAADkAAwAOAAACB4yPecCtnwoAIfkECRkAAAAsAAAxAAMAFgAAAgqMj3nArZ+ag7QAACH5BAkZAAAALAAAKQADAB4AAAIMjI95wK2fmoNUMkoLACH5BAkZAAAALAAAIQADACYAAAIOjI95wK2fmoNUMlothgUAIfkECRkAAAAsAAAZAAMALgAAAhGMj3nArZ+ag1QyWi2GFuxXAAAh+QQJGQAAACwAABEAAwA2AAACE4yPecCtn5qDVDJaLYYW7Nd9SgEAIfkECRkAAAAsAAAJAAMAPgAAAhWMj3nArZ+ag1QyWi2GFuzXfUooIgUAIfkECRkAAAAsAAABAAMARgAAAheMj3nArZ+ag1QyWi2GFuzXfUooImRpFAA7",completed:jt,error:zt,readyToCharge:jt},smart:{DEFAULT:Lt,disconnected:"data:image/gif;base64,R0lGODlhAwBIAHAAACwAAAAAAwBIAIFwcHBgYGAAJv8AAAACHYSDqZvmwOJ6R1oKrcR60x5x4EQJ5ommJ6a2qVMAADs=",awaitingStart:Nt,charging:"data:image/gif;base64,R0lGODlhAwBIAIAAAAAAAAAm/yH/C05FVFNDQVBFMi4wAwEAAAAh/hZDcmVhdGVkIHdpdGggUGFpbnQuTkVUACH5BAkZAAAALAAAQQADAAYAAAIEjI95BQAh+QQJGQAAACwAADkAAwAOAAACB4yPecCtnwoAIfkECRkAAAAsAAAxAAMAFgAAAgqMj3nArZ+ag7QAACH5BAkZAAAALAAAKQADAB4AAAIMjI95wK2fmoNUMkoLACH5BAkZAAAALAAAIQADACYAAAIOjI95wK2fmoNUMlothgUAIfkECRkAAAAsAAAZAAMALgAAAhGMj3nArZ+ag1QyWi2GFuxXAAAh+QQJGQAAACwAABEAAwA2AAACE4yPecCtn5qDVDJaLYYW7Nd9SgEAIfkECRkAAAAsAAAJAAMAPgAAAhWMj3nArZ+ag1QyWi2GFuzXfUooIgUAIfkECRkAAAAsAAABAAMARgAAAheMj3nArZ+ag1QyWi2GFuzXfUooImRpFAA7",completed:Nt,error:zt,readyToCharge:Nt}},Kt="binary_sensor.plug",Vt="switch.cable_locked_permanently",Rt="binary_sensor.charging_state",Tt="binary_sensor.basic_schedule",Xt="sensor.circuit_current",qt="sensor.cost_per_kwh",Wt="sensor.dynamic_charger_limit",Zt="sensor.dynamic_circuit_limit",Jt="switch.enable_idle_current",_t="sensor.current",$t="switch.is_enabled",te="sensor.max_current",ee="sensor.max_circuit_limit",ie="sensor.offline_circuit_limit",oe="binary_sensor.status",re="sensor.output_limit",se="sensor.reason_for_no_current",ae="sensor.session_energy",ne="sensor.energy_per_hour",le="sensor.total_energy",ce="sensor.charging_power",he="binary_sensor.update_available",de="sensor.voltage",ge=[{name:"Generic",img:"data:image/png;base64,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"}],Ae={"binary_sensor.plug":"mdi:lock","switch.cable_locked_permanently":"mdi:lock","binary_sensor.basic_schedule":"mdi:clock-check","sensor.circuit_current":"mdi:sine-wave","sensor.cost_per_kwh":"mdi:currency-usd","sensor.dynamic_charger_limit":"mdi:sine-wave","sensor.dynamic_circuit_limit":"mdi:sine-wave","switch.enable_idle_current":"mdi:current-dc","sensor.offline_circuit_limit":"mdi:sine-wave","sensor.current":"mdi:sine-wave","switch.is_enabled":"mdi:power","sensor.max_current":"mdi:sine-wave","sensor.max_circuit_limit":"mdi:sine-wave","binary_sensor.status":"mdi:wifi","sensor.output_limit":"mdi:sine-wave","sensor.reason_for_no_current":"mdi:alert-circle","sensor.session_energy":"mdi:flash","sensor.energy_per_hour":"mdi:flash","sensor.total_energy":"mdi:flash","switch.smart_charging":"mdi:auto-fix","sensor.charging_power":"mdi:flash","binary_sensor.update_available":"mdi:file-download","sensor.voltage":"mdi:sine-wave"},ue=[{name:"theme_default",desc:"Default HA colors"},{name:"theme_custom",desc:"Use custom theme"},{name:"theme_transp_blue",desc:"Transparent Blue"},{name:"theme_transp_black",desc:"Transparent Black"},{name:"theme_transp_white",desc:"Transparent White"},{name:"theme_lightgrey_blue",desc:"LightGrey Blue"}];let pe=class extends W{constructor(){super(...arguments),this._initialized=!1}setConfig(t){this._config=t,this._config.entity||(this._config.entity=this.getEntitiesByType("binary_sensor")[0]||"",this._config.smartChargingEntity=this.getEntitiesByType("input_boolean")[0]||"",pt(this,"config-changed",{config:this._config})),this.loadCardHelpers()}shouldUpdate(){return this._initialized||this._initialize(),!0}get _entity(){return this._config&&this._config.entity||""}get _smartChargingEntity(){return this._config&&this._config.smartChargingEntity||""}get _customImage(){return this._config&&this._config.customImage||""}get _chargerImage(){return this._config&&this._config.chargerImage||"Generic"}get _customCardTheme(){return this._config?this._config.customCardTheme||"":"theme_default"}get showName(){return!this._config||(void 0===this._config.show_name||this._config.show_name)}get showLeds(){return!this._config||(void 0===this._config.show_leds||this._config.show_leds)}get showStatus(){return!this._config||(void 0===this._config.show_status||this._config.show_status)}get showToolbar(){return!this._config||(void 0===this._config.show_toolbar||this._config.show_toolbar)}get showStats(){return!this._config||(void 0===this._config.show_stats||this._config.show_stats)}get showCollapsibles(){return!this._config||(void 0===this._config.show_collapsibles||this._config.show_collapsibles)}get compactView(){return!!this._config&&(void 0!==this._config.compact_view&&this._config.compact_view)}getEntitiesByType(t){return this.hass?Object.keys(this.hass.states).filter((e=>e.substr(0,e.indexOf("."))===t)):[]}render(){if(!this.hass)return G``;const t=Object.keys(this.hass.states).filter((t=>"binary_sensor"===t.substr(0,t.indexOf(".")))),e=Object.keys(this.hass.states).filter((t=>"input_boolean"===t.substr(0,t.indexOf("."))));return G`
      <div class="card-config">

        <paper-dropdown-menu label="${Gt("editor.entity")}" @value-changed=${this._valueChanged} .configValue=${"entity"}>
            <paper-listbox slot="dropdown-content" .selected=${t.indexOf(this._entity)}>
              ${t.map((t=>G`
                  <paper-item>${t}</paper-item>
                `))}
            </paper-listbox>
        </paper-dropdown-menu>

        <paper-dropdown-menu label="${Gt("editor.smartChargingEntity")}" @value-changed=${this._valueChanged} .configValue=${"smartChargingEntity"}>
            <paper-listbox slot="dropdown-content" .selected=${e.indexOf(this._smartChargingEntity)}>
              ${e.map((t=>G`
                  <paper-item>${t}</paper-item>
                `))}
            </paper-listbox>
        </paper-dropdown-menu>

        <paper-dropdown-menu label="${Gt("editor.theme")}" @value-changed=${this._valueChanged} .configValue=${"customCardTheme"}>
            <paper-listbox slot="dropdown-content" selected="${this._customCardTheme}" attr-for-selected="value">
              ${ue.map((t=>G`
                  <paper-item value="${t.name}">${t.name}</paper-item>
                `))}
            </paper-listbox>
        </paper-dropdown-menu>


              <paper-dropdown-menu label="${Gt("editor.chargerImage")}" @value-changed=${this._valueChanged} .configValue=${"chargerImage"}>
                <paper-listbox slot="dropdown-content" selected="${this._chargerImage}" attr-for-selected="value">
                  ${ge.map((t=>G`
                      <paper-item value="${t.name}">${t.name}</paper-item>
                    `))}
                </paper-listbox>
              </paper-dropdown-menu>


              <paper-input label="${Gt("editor.customImage")}" .value=${this._customImage} .configValue=${"customImage"} @value-changed=${this._valueChanged}"></paper-input>

          <p class="option">
            <ha-switch
              aria-label=${Gt(this.compactView?"editor.compact_view_aria_label_off":"editor.compact_view_aria_label_on")}
              .checked=${!1!==this.compactView}
              .configValue=${"compact_view"}
              @change=${this._valueChanged}
            >
            </ha-switch>
            ${Gt("editor.compact_view")}
          </p>

          <p class="option">
            <ha-switch
              aria-label=${Gt(this.showName?"editor.show_name_aria_label_off":"editor.show_name_aria_label_on")}
              .checked=${this.showName}
              .configValue=${"show_name"}
              @change=${this._valueChanged}
            >
            </ha-switch>
            ${Gt("editor.show_name")}
          </p>

          <p class="option">
            <ha-switch
              aria-label=${Gt(this.showLeds?"editor.show_leds_aria_label_off":"editor.show_leds_aria_label_on")}
              .checked=${!1!==this.showLeds}
              .configValue=${"show_leds"}
              @change=${this._valueChanged}
            >
            </ha-switch>
            ${Gt("editor.show_leds")}
          </p>


          <p class="option">
            <ha-switch
              aria-label=${Gt(this.showStatus?"editor.show_status_aria_label_off":"editor.show_status_aria_label_on")}
              .checked=${!1!==this.showStatus}
              .configValue=${"show_status"}
              @change=${this._valueChanged}
            >
            </ha-switch>
            ${Gt("editor.show_status")}
          </p>

          <p class="option">
          <ha-switch
            aria-label=${Gt(this.showCollapsibles?"editor.show_collapsibles_aria_label_off":"editor.show_collapsibles_aria_label_on")}
            .checked=${!1!==this.showCollapsibles}
            .configValue=${"show_collapsibles"}
            @change=${this._valueChanged}
          >
          </ha-switch>
          ${Gt("editor.show_collapsibles")}
        </p>

          <p class="option">
            <ha-switch
              aria-label=${Gt(this.showStats?"editor.show_stats_aria_label_off":"editor.show_stats_aria_label_on")}
              .checked=${this.showStats}
              .configValue=${"show_stats"}
              @change=${this._valueChanged}
            >
            </ha-switch>
            ${Gt("editor.show_stats")}
          </p>




          <p class="option">
            <ha-switch
              aria-label=${Gt(this.showToolbar?"editor.show_toolbar_aria_label_off":"editor.show_toolbar_aria_label_on")}
              .checked=${!1!==this.showToolbar}
              .configValue=${"show_toolbar"}
              @change=${this._valueChanged}
            >
            </ha-switch>
            ${Gt("editor.show_toolbar")}
          </p>


        </div>
      `}_initialize(){void 0!==this.hass&&void 0!==this._config&&void 0!==this._helpers&&(this._initialized=!0)}async loadCardHelpers(){this._helpers=await window.loadCardHelpers()}_valueChanged(t){if(!this._config||!this.hass)return void console.log("C: no config");const e=t.target;this[`_${e.configValue}`]!==e.value&&(e.configValue&&(""===e.value?delete this._config[e.configValue]:this._config=Object.assign(Object.assign({},this._config),{[e.configValue]:void 0!==e.checked?e.checked:e.value})),pt(this,"config-changed",{config:this._config}))}static get styles(){return s`
      .card-config paper-dropdown-menu {
        width: 100%;
      }

      .option {
        display: flex;
        align-items: center;
      }

      .option ha-switch {
        margin-right: 10px;
      }
    `}};t([_({attribute:!1})],pe.prototype,"hass",void 0),t([$()],pe.prototype,"_config",void 0),t([$()],pe.prototype,"_toggle",void 0),t([$()],pe.prototype,"_helpers",void 0),pe=t([Z("keba-charger-card-editor")],pe);var me=s`
  :host {
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  ha-card {
    flex-direction: column;
    flex: 1;
    position: relative;
    padding: 0px;
    // border-radius: 4px;
    // overflow: hidden;    // Removed to show tooltips outside of card

    // border-color: coral;
    // border-style: solid;
  }

  .preview {
    background: var(--custom-card-background-color); //var(--custom-primary-color);
    cursor: pointer;
    overflow: hidden;
    position: relative;

    // border-color: yellow;
    // border-style: solid;
  }

  .preview-compact {
    background: var(--custom-card-background-color); //var(--custom-primary-color);
    cursor: pointer;
    overflow: hidden;
    position: relative;
    height: 220px;

    // border-color: yellow;
    // border-style: solid;
  }

  .preview.not-available {
    filter: grayscale(1);
  }

  @keyframes cleaning {
    0% {
      transform: rotate(0) translate(0);
    }
    5% {
      transform: rotate(0) translate(0, -10px);
    }
    10% {
      transform: rotate(0) translate(0, 5px);
    }
    15% {
      transform: rotate(0) translate(0);
    }
    /* Turn left */
    20% {
      transform: rotate(30deg) translate(0);
    }
    25% {
      transform: rotate(30deg) translate(0, -10px);
    }
    30% {
      transform: rotate(30deg) translate(0, 5px);
    }
    35% {
      transform: rotate(30deg) translate(0);
    }
    40% {
      transform: rotate(0) translate(0);
    }
    /* Turn right */
    45% {
      transform: rotate(-30deg) translate(0);
    }
    50% {
      transform: rotate(-30deg) translate(0, -10px);
    }
    55% {
      transform: rotate(-30deg) translate(0, 5px);
    }
    60% {
      transform: rotate(-30deg) translate(0);
    }
    70% {
      transform: rotate(0deg) translate(0);
    }
    /* Staying still */
    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes returning {
    0% {
      transform: rotate(0);
    }
    25% {
      transform: rotate(10deg);
    }
    50% {
      transform: rotate(0);
    }
    75% {
      transform: rotate(-10deg);
    }
    100% {
      transform: rotate(0);
    }
  }

  .charger {
    display: block;
    max-width: 90%;
    max-height: 300px;
    image-rendering: crisp-edges;
    margin: 30px auto 20px auto;

    // border-color: red;
    // border-style: dashed;
  }

  .charger-compact {
    display: block;
    // max-width: 50%;
    // width: 130px;
    max-width: 400px;
    max-height: 130px;
    image-rendering: crisp-edges;
    margin: 20px auto 10px 20px;
    position: absolute;
    // left: -150px;
    // top: -20px;
    left: 10px;
    top: 0px;

    // border-color: red;
    // border-style: dashed;
  }

  .keba-leds-green {
    position: absolute;
    left: 221px;
    top: 109px;
    background: lime;
    line-height: 12px;
    margin-left: 3px;
    animation: blink 3s infinite;
    width: 42px;
    height: 3px;
    border-radius: 2px;
  }

  .keba-leds-blue {
    position: absolute;
    left: 221px;
    top: 109px;
    background: blue;
    line-height: 12px;
    margin-left: 3px;
    animation: blink 3s infinite;
    width: 42px;
    height: 3px;
    border-radius: 2px;
  }

  @keyframes blink {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  .charger.led {
    position: relative;
    top: -167px;
    // position: absolute;
    // top: 95px;
    // left: 245px;
    width: 2px;
    transform: rotate(90deg);

    // border-color: red;
    // border-style: dashed;
  }

  .charger.led-compact {
    // position: relative;
    position: absolute;
    top: 20px;
    // position: absolute;
    // top: 95px;
    // left: -170px;
    left: 77px;
    top: 22px;
    width: 1.4px;
    transform: rotate(90deg);

    // border-color: red;
    // border-style: dashed;
  }

  .charger.charging,
  .charger.on {
    animation: cleaning 5s linear infinite;
  }

  .charger.returning {
    animation: returning 2s linear infinite;
  }

  .charger.paused {
    opacity: 100%;
  }

  .charger.standby {
    opacity: 50%;
  }

  .fill-gap {
    flex-grow: 1;
  }

  .header {
    height: 0px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: var(--custom-text-color);

    // border-color: green;
    // border-style: dashed;
  }

  .infoitems {
    // display: flex;
    height: 250px;
    text-align: right;
    // font-weight: bold;
    // transform: translate(-10px, 50%);
    color: var(--custom-text-color);
    top: 30px;
    right: 20px;
    position: absolute;

    // border-color: darkblue;
    // border-style: dashed;
  }

  .infoitems-left {
    text-align: center;
    color: var(--custom-text-color);

    height: 250px;
    text-align: right;
    // transform: translate(10px, 50%);
    top: 30px;
    left: 20px;
    position: absolute;

    // border-color: darkgreen;
    // border-style: dashed;
  }

  .infoitems-item {
    // display: flex;
    // spacing: 0px 0 40
    // text-align: right;
    padding: 5px;
    font-weight: normal;
    color: var(--custom-text-color);

    // border: 1px;
    // border-style: dotted;
  }

  .status {
    display: block;
    align-items: center;
    justify-content: center;
    text-align: center;

    // border-color: pink;
    // border-style: dashed;
  }

  .status-compact {
    // display: block;
    // align-items: center;
    // justify-content: center;
    // text-align: center;
    // position: relative;
    // top: -250px;
    // // left: 200px;
    // // padding-left: 200px;

    display: block;
    // align-items: center;
    // justify-content: center;
    // text-align: center;
    // font-weight: bold;
    color: var(--custom-text-color);
    position: absolute;
    left: 160px;
    top: 65px;

    // border-color: pink;
    // border-style: dashed;
  }

  .status-text {
    color: var(--custom-text-color);
    white-space: nowrap;
    font-weight: normal;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-left: calc(20px + 9px); /* size + margin of spinner */
    text-transform: uppercase;
    font-size: 22px;
  }
  .status-text-compact {
    color: var(--custom-text-color);
    white-space: nowrap;
    font-weight: normal;
    text-overflow: ellipsis;
    overflow: hidden;
    // margin-left: calc(20px + 9px); /* size + margin of spinner */
    text-transform: uppercase;
    font-size: 16px;
  }

  .status-detail-text {
    color: var(--custom-text-color);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    text-transform: uppercase;
    font-size: 9px;
  }

  .status-detail-text-compact {
    // margin-left: calc(20px + 9px); /* size + margin of spinner */
    color: var(--custom-text-color);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    text-transform: uppercase;
    font-size: 9px;
  }

  .status ha-circular-progress {
    --mdc-theme-primary: var(--custom-card-background-color); /* hack to override the color */
    min-width: 24px;
    width: 24px;
    height: 24px;
    margin-left: 9px;
  }

  .charger-name {
    text-align: center;
    // font-weight: bold;
    color: var(--custom-text-color);
    font-size: 16px;

    // border-color: grey;
    // border-style: dashed;
  }

  .charger-name-compact {
    // display: block;
    // align-items: center;
    // justify-content: center;
    // text-align: center;
    // font-weight: bold;
    color: var(--custom-text-color);
    font-size: 16px;
    // position: relative;
    position: absolute;
    left: 160px;
    top: 55px;
    // border-color: grey;
    // border-style: dashed;
  }

  .not-available {
    text-align: center;
    color: var(--custom-text-color);
    font-size: 16px;
  }

  .metadata {
    display: block;
    margin: 20px auto;
    position: relative;
    top: -10px;

    border-color: pink;
    // border-style: dashed;
  }

  .stats {
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    color: var(--custom-text-color);

    // border-color: black;
    // border-style: dashed;
  }

  .stats-compact {
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    color: var(--custom-text-color);

    width: 100%;
    position: absolute;
    left: 0px;
    top: 160px;

    // border-color: black;
    // border-style: dashed;
  }

  .stats-block {
    margin: 10px 0px;
    text-align: center;
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    flex-grow: 1;
    // border-color: black;
    // border-style: dashed;
  }

  .stats-block:last-child {
    border: 0px;
  }

  .stats-value {
    font-size: 20px;
    font-weight: normal;
  }

  ha-icon {
    // color: #fff;
    color: var(--custom-icon-color);
  }

  .toolbar {
    // background: var(--lovelace-background, var(--primary-background-color));
    min-height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

    // border-color: black;
    // border-style: dashed;
  }

  .toolbar ha-icon-button {
    color: var(--custom-primary-color);
    flex-direction: column;
    width: 44px;
    height: 44px;
    --mdc-icon-button-size: 44px;
    margin: 5px 0;

    // border-color: red;
    // border-style: dashed;
  }

  .toolbar ha-icon-button:first-child {
    margin-left: 5px;
  }

  .toolbar ha-icon-button:last-child {
    margin-right: 5px;
  }

  .toolbar paper-button {
    color: var(--custom-primary-color);
    flex-direction: column;
    margin-right: 10px;
    padding: 10px;
    cursor: pointer;

    // border-color: blue;
    // border-style: dashed;
  }

  .toolbar ha-icon-button:active,
  .toolbar paper-button:active {
    opacity: 0.4;
    background: rgba(0, 0, 0, 0.1);
  }

  .toolbar paper-button {
    color: var(--custom-primary-color);
    flex-direction: row;
  }

  .toolbar ha-icon {
    color: var(--custom-primary-color);
    padding-right: 15px;
  }

  /* Tooltip container */

  .tooltip {
    position: relative;
    display: inline-block;
    // border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
  }

  /* Tooltip text */
  .tooltip {
    position: relative;
    display: inline-block;
  }

  .tooltip .tooltiptext {
    visibility: hidden;
    width: 160px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 1px 0;
    position: absolute;
    z-index: 1;
    top: 110%;
    left: 50%;
    margin-left: -80px;
  }

  .tooltip .tooltiptext::after {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent black transparent;
  }

  .tooltip-right .tooltiptext-right {
    visibility: hidden;
    width: 160px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 1px 0;
    position: absolute;
    z-index: 1;
    margin-left: -80px;
    top: 5px;
    right: 105%;
  }

  .tooltip-right .tooltiptext-right::after {
    content: ' ';
    position: absolute;
    top: 50%;
    left: 100%; /* To the right of the tooltip */
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent transparent black;
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
  }

  .tooltip-right:hover .tooltiptext-right {
    visibility: visible;
  }

  /* CSS COLLAPSIBLE */

  input[type='checkbox'] {
    display: none;
  }

  .lbl-toggle {
    display: block;
    // text-align: right;
    // padding: 1rem;
    padding: 5px;
    // margin: auto;
    color: var(--custom-text-color);
    background: transparent;
    // transition: all 0.25s ease-out;
    position: absolute;
    // bottom: 70px;
    top: 330px;
    right: 0px;
    // left: 40%;

    width: 30px;
    height: 30px;
    // align: right;
    // float: right;
    z-index: 1;
    // margin-left: auto;
    // margin-right: auto;

    // border-style: dotted;
    // border-color: red;
  }

  .collapsible-content {
    max-height: 0px;
    overflow: hidden;

    // transition: max-height .25s ease-in-out;
  }

  .toggle:checked + .lbl-toggle + .collapsible-content {
    max-height: 200px;
    // height: 200px;
    position: relative;
    top: 0px;
    // margin-left: auto;
    // margin-right: auto;
    // width: 100%;
    margin: auto;

    text-align: center;
    vertical-align: middle;
    background: transparent;

    display: block;
    flex-direction: row;
    justify-content: space-evenly;
    color: var(--custom-text-color);

    // border-style: solid;
    // border-color: red;
  }

  .collapsible-content .content-inner {
    color: var(--custom-text-color);
    background: transparent;
    text-align: center;
    max-height: 200px;
    height: 70px;
    // vertical-align: middle;
    // width: 100%;
    // z-index: 3;
    content: '';
    clear: both;
    display: table;

    margin-left: auto;
    margin-right: auto;

    // border-style: dashed;
    // border-color: white;
  }

  .collapsible-item {
    display: inline;
    text-align: center;
    align-items: center;
    padding: 5px;
    // font-weight: normal;
    // border: 1px;
    // border-style: dotted;
    justify-content: center;
    vertical-align: middle;
  }

  /* collapsible info */

  .lbl-toggle-info {
    display: block;
    padding: 5px;
    color: var(--custom-text-color);
    background: transparent;
    // transition: all 0.25s ease-out;
    position: absolute;
    // bottom: 100px;
    top: 300px;
    right: 0px;
    width: 30px;
    height: 30px;
    z-index: 1;

    // border-style: dotted;
    // border-color: darkblue;
  }

  .toggle-info:checked + .lbl-toggle-info + .collapsible-content-info {
    max-height: 200px;
    // height: 200px;
    position: relative;
    top: 0px;
    // margin-left: auto;
    // margin-right: auto;
    // width: 100%;
    margin: auto;

    text-align: center;
    vertical-align: middle;
    background: transparent;

    display: block;
    flex-direction: row;
    justify-content: space-evenly;
    color: var(--custom-text-color);

    // border-style: solid;
    // border-color: red;
  }

  .collapsible-content-info .content-inner-info {
    color: var(--custom-text-color);
    background: transparent;
    text-align: center;
    max-height: 200px;
    height: 70px;
    // vertical-align: middle;
    // width: 100%;
    // z-index: 3;
    content: '';
    clear: both;
    display: table;

    margin-left: auto;
    margin-right: auto;

    // border-style: dashed;
    // border-color: white;
  }

  // .wrap-collabsible-info {
  //   // display: flex;
  //   // margin-bottom: 1.2rem 0;
  //   // border-style: solid;
  //   // min-height:0px;
  //   // max-height:300px;
  //   height: 50px;

  //   // border-top: 1px solid rgba(255, 255, 255, 0.2);
  //   // display: flex;
  //   // flex-direction: row;
  //   // justify-content: space-evenly;
  //   // color: var(--custom-text-color);

  //   text-align: left;
  //   vertical-align: top;

  //   display: block;
  //   // flex-direction: row;
  //   // justify-content: space-evenly;
  //   // color: var(--custom-text-color);
  //   margin: auto;

  //   border-color: black;
  //   border-style: solid;

  // }

  // .wrap-collabsible {
  //   // display: flex;
  //   // margin-bottom: 1.2rem 0;
  //   // border-style: solid;
  //   // min-height:0px;
  //   // max-height:300px;
  //   height: 50px;

  //   // border-top: 1px solid rgba(255, 255, 255, 0.2);
  //   // display: flex;
  //   // flex-direction: row;
  //   // justify-content: space-evenly;
  //   // color: var(--custom-text-color);

  //   text-align: left;
  //   vertical-align: top;

  //   display: block;
  //   // flex-direction: row;
  //   // justify-content: space-evenly;
  //   // color: var(--custom-text-color);
  //   margin: auto;

  //   border-color: red;
  //   border-style: solid;

  // }

  .collapsible-content-info {
    max-height: 0px;
    overflow: hidden;

    // transition: max-height .25s ease-in-out;
  }

  /* collapsible limits */

  .lbl-toggle-lim {
    display: block;
    padding: 5px;
    color: var(--custom-text-color);
    background: transparent;
    // transition: all 0.25s ease-out;
    position: absolute;
    // bottom: 100px;
    top: 270px;
    right: 0px;
    width: 30px;
    height: 30px;
    z-index: 1;

    // border-style: dotted;
    // border-color: darkblue;
  }

  .toggle-lim:checked + .lbl-toggle-lim + .collapsible-content-lim {
    max-height: 200px;
    // height: 200px;
    position: relative;
    top: 0px;
    // margin-left: auto;
    // margin-right: auto;
    // width: 100%;
    margin: auto;

    text-align: center;
    vertical-align: middle;
    background: transparent;

    display: block;
    flex-direction: row;
    justify-content: space-evenly;
    color: var(--custom-text-color);

    // border-style: solid;
    // border-color: red;
  }

  .collapsible-content-lim .content-inner-lim {
    color: var(--custom-text-color);
    background: transparent;
    text-align: center;
    max-height: 200px;
    height: 70px;
    // vertical-align: middle;
    // width: 100%;
    // z-index: 3;
    content: '';
    clear: both;
    display: table;

    margin-left: auto;
    margin-right: auto;
    padding-bottom: 15px;

    // border-style: dashed;
    // border-color: white;
  }

  // .wrap-collabsible-lim {
  //   // display: flex;
  //   // margin-bottom: 1.2rem 0;
  //   // border-style: solid;
  //   // min-height:0px;
  //   // max-height:300px;
  //   height: 50px;

  //   // border-top: 1px solid rgba(255, 255, 255, 0.2);
  //   // display: flex;
  //   // flex-direction: row;
  //   // justify-content: space-evenly;
  //   // color: var(--custom-text-color);

  //   text-align: left;
  //   vertical-align: top;

  //   display: block;
  //   // flex-direction: row;
  //   // justify-content: space-evenly;
  //   // color: var(--custom-text-color);
  //   margin: auto;

  //   border-color: black;
  //   border-style: solid;

  // }

  .collapsible-content-lim {
    max-height: 0px;
    overflow: hidden;

    // transition: max-height .25s ease-in-out;
  }
`;console.info("%cKEBA-CHARGER-CARD 0.0.2 IS INSTALLED","color: green; font-weight: bold",""),window.customCards=window.customCards||[],window.customCards.push({type:"keba-charger-card",name:"Keba Charger Card Card",description:"A keba charger card for visualizing the status and interacting with your Keba P30"});let fe=class extends W{static get styles(){return me}static async getConfigElement(){return document.createElement("keba-charger-card-editor")}static getStubConfig(t){const[e]=t.filter((t=>"binary_sensor"===t.substr(0,t.indexOf("."))));return{entity:e||"",image:"default"}}get entity(){return null!=this.config.entity?this.hass.states[this.config.entity]:void 0}get smartChargingEntity(){return null!=this.config.smartChargingEntity?this.hass.states[this.config.smartChargingEntity]:void 0}get scriptDomain(){return void 0===this.config.domain?"script":this.config.domain}get status(){if("off"==this.getEntityState(this.getEntity(Kt)))return St;return"on"==this.getEntityState(this.getEntity(Rt))?Ut:this.smartChargingEntity&&"on"==this.smartChargingEntity.state?kt:Ft}get image(){const t=this.config.chargerImage||"Generic",e=ge.find((({name:e})=>e===t?e:void 0));if(void 0===this.config.customImage||""===this.config.customImage)try{return void 0===e?void 0:e.img}catch(t){return""}return this.config.customImage}get customCardTheme(){return void 0===this.config.customCardTheme?"theme_default":this.config.customCardTheme}get showLeds(){return void 0===this.config.show_leds||this.config.show_leds}get showName(){return void 0===this.config.show_name||this.config.show_name}get showStatus(){return void 0===this.config.show_status||this.config.show_status}get showStats(){return void 0===this.config.show_stats||this.config.show_stats}get showCollapsibles(){return void 0===this.config.show_collapsibles||this.config.show_collapsibles}get showToolbar(){return void 0===this.config.show_toolbar||this.config.show_toolbar}get compactView(){return void 0!==this.config.compact_view&&this.config.compact_view}get entityBasename(){return void 0===this.config.entity?"":this.config.entity.split(".")[1].replace("_status","")}getEntityId(t){try{return t.split(".")[0]+"."+this.entityBasename+"_"+t.split(".")[1]}catch(t){return}}getEntityBase(t){try{return t.split(".")[0]+"."+t.split(".")[1].replace(this.entityBasename+"_","")}catch(t){return}}getEntities(){return{cableLocked:this.getEntity(Kt),cableLockedPermanently:this.getEntity(Vt),chargingState:this.getEntity(Rt),basicSchedule:this.getEntity(Tt),circuitCurrent:this.getEntity(Xt),costPerKwh:this.getEntity(qt),dynamicChargerCurrent:this.getEntity(Wt),dynamicCircuitCurrent:this.getEntity(Zt),enableIdleCurrent:this.getEntity(Jt),offlineCircuitCurrent:this.getEntity(ie),inCurrent:this.getEntity(_t),isEnabled:this.getEntity($t),maxChargerCurrent:this.getEntity(te),maxCircuitCurrent:this.getEntity(ee),isOnline:this.getEntity(oe),outputCurrent:this.getEntity(re),reasonForNoCurrent:this.getEntity(se),sessionEnergy:this.getEntity(ae),energyPerHour:this.getEntity(ne),energyLifetime:this.getEntity(le),smartCharging:this.smartChargingEntity,totalPower:this.getEntity(ce),updateAvailable:this.getEntity(he),voltage:this.getEntity(de),status:this.entity}}getEntity(t){try{const e=this.getEntityId(t);return void 0===e?void 0:this.hass.states[e]}catch(t){return}}getEntityState(t){try{return t.state}catch(t){return}}getEntityAttribute(t,e){try{return t.attributes[e]}catch(t){return}}getStatsDefault(t){switch(t){case St:return[{entityId:this.getEntityId(ae),unit:"kWh",subtitle:Gt("charger_status.sessionEnergy")},{entityId:this.getEntityId(te),unit:"A",subtitle:"Current Limit"},{entityId:this.getEntityId(Kt),unit:"",subtitle:"Locked"}];case kt:return[{entityId:this.getEntityId(te),unit:"A",subtitle:"Current Limit"},{entityId:this.getEntityId(ae),unit:"kWh",subtitle:Gt("charger_status.sessionEnergy")},{entityId:this.smartChargingEntity?this.smartChargingEntity.entity_id:"",unit:"",subtitle:"Smart Charging"}];case Ut:return[{entityId:this.getEntityId(ae),unit:"kWh",subtitle:"Energy"},{entityId:this.getEntityId(te),unit:"A",subtitle:"Current Limit"},{entityId:this.getEntityId(Xt),unit:"A",subtitle:"Circuit"},{entityId:this.getEntityId(re),unit:"A",subtitle:"Allowed"},{entityId:this.getEntityId(_t),unit:"A",subtitle:"Actual"},{entityId:this.getEntityId(ce),unit:"kW",subtitle:"Power"},{entityId:this.smartChargingEntity?this.smartChargingEntity.entity_id:"",unit:"",subtitle:"Smart Charging"}];case Yt:case Qt:return[{entityId:this.getEntityId(ae),unit:"kWh",subtitle:Gt("charger_status.sessionEnergy")},{entityId:this.getEntityId(te),unit:"A",subtitle:"Current Limit"}];case Ft:return[{entityId:this.getEntityId(ae),unit:"kWh",subtitle:Gt("charger_status.sessionEnergy")},{entityId:this.getEntityId(te),unit:"A",subtitle:"Current Limit"},{entityId:this.getEntityId(Tt),unit:"",subtitle:"Schedule"}]}return[]}setConfig(t){if(!t.entity)throw new Error(Gt("error.missing_entity"));this.config=t}getCardSize(){return 2}shouldUpdate(t){return function(t,e,i){if(e.has("config")||i)return!0;if(t.config.entity){var o=e.get("hass");return!o||o.states[t.config.entity]!==t.hass.states[t.config.entity]}return!1}(this,t,!0)}updated(t){this.config.entity&&t.get("hass")&&t.get("hass").states[this.config.entity].state!==this.hass.states[this.config.entity].state&&(this.requestInProgress=!1)}handleMore(t){t&&t.entity_id&&pt(this,"hass-more-info",{entityId:t.entity_id},{bubbles:!0,composed:!0})}callService(t,e=!0,i={}){this.hass.callService(this.scriptDomain,t,Object.assign({},i)),e&&this.requestUpdate()}imageLed(t,e){const i=e?"smart":"normal";return Pt[i][t]||Pt[i].DEFAULT}renderImage(t){let e="";return this.compactView&&(e="-compact"),this.image?G`
      <img
        class="charger${e}"
        src="${this.image}"
        @click="${()=>this.handleMore(this.entity)}"
        ?more-info="true"
      />${this.renderLeds(t)}
    `:G``}renderLeds(t){return console.log(t),this.showLeds?t===Ut?G`<div class="keba-leds-green"></div>`:G`<div class="keba-leds-blue"></div>`:G``}renderStats(t){if(!this.showStats)return G``;let e="";this.compactView&&(e="-compact");const i=this.getStatsDefault(t)||[];return G` <div class="stats${e}">${this.renderStatsList(i)}</div> `}renderStatsList(t){return t.map((({entityId:t,attribute:e,calcValue:i,unit:o,subtitle:r})=>{if(!(t||e||i))return G``;if(i)return this.renderStatsHtml(i,o,r,this.hass.states[t]);try{const i=e?this.hass.states[t].attributes[e]:this.hass.states[t].state;return this.renderStatsHtml(i,o,r,this.hass.states[t])}catch(t){return null}}))}renderStatsHtml(t,e,i,o){return G`
      <div class="stats-block" @click="${()=>this.handleMore(o)}" ?more-info="true">
        <span class="stats-value">${t}</span>
        ${e}
        <div class="stats-subtitle">${i}</div>
      </div>
    `}renderName(){if(!this.showName)return G``;let t="";return this.compactView&&(t="-compact"),G` <div class="charger-name${t}">Keba P30</div> `}renderStatus(){if(!this.showStatus)return G``;let t="";this.compactView&&(t="-compact");const e=Gt(`status.${this.status}`)||this.status;return G`
      <div class="status${t}">
        <span class="status-text${t}" alt=${e}> ${e} </span>
        <ha-circular-progress .active=${this.requestInProgress} size="small"></ha-circular-progress>
      </div>
    `}renderCollapsibleInfo(){if(!this.showCollapsibles)return G``;const{isOnline:t,totalPower:e,sessionEnergy:i,energyLifetime:o}=this.getEntities(),r=Gt("common.click_for_info");return G`
      <div>
        <input id="collapsible-info" class="toggle-info" type="checkbox" />
        <label for="collapsible-info" class="lbl-toggle-info">
          <div class="tooltip-right">
            <ha-icon icon="mdi:information"></ha-icon>
            <span class="tooltiptext-right">${r}</span>
          </div>
        </label>
        <div class="collapsible-content-info">
          <div class="content-inner-info">
            ${this.renderCollapsibleItems(t,Gt("common.online"))}
            ${this.renderCollapsibleItems(e,Gt("common.power"))}
            ${this.renderCollapsibleItems(i,Gt("charger_status.sessionEnergy"))}
            ${this.renderCollapsibleItems(o,Gt("common.lifetime_energy"),!0)}
          </div>
        </div>
      </div>
    `}renderCollapsibleItems(t,e,i=!1){if(null==t)return G``;const o=i?Math.round(this.getEntityState(t)):this.getEntityState(t),r=this.renderIcon(t),s=this.getEntityAttribute(t,"unit_of_measurement");return G`
      <div class="collapsible-item" @click="${()=>this.handleMore(t)}" ?more-info="true">
        <div class="tooltip">
          <ha-icon icon="${r}"></ha-icon>
          <br />${o} ${s}
          <span class="tooltiptext">${e}</span>
        </div>
      </div>
    `}renderInfoItemsLeft(){const{isOnline:t}=this.getEntities();return G` ${this.renderInfoItem(t,Gt("common.online"))} `}renderInfoItemsRight(){const{cableLocked:t,totalPower:e,voltage:i}=this.getEntities(),o=t&&"on"==t.state?"mdi:power-plug":"mdi:power-plug-off";return G`
      ${this.renderInfoItem(i,Gt("common.voltage"),!0)}
      ${this.renderInfoItem(e,Gt("common.power"))}
      <ha-icon icon="${o}"></ha-icon>
    `}renderInfoItemsCompact(){const{totalPower:t,voltage:e}=this.getEntities();return G`
      ${this.renderInfoItem(e,Gt("common.voltage"),!0)}
      ${this.renderInfoItem(t,Gt("common.power"),!0)}
    `}renderInfoItem(t,e,i=!1){if(null==t)return G``;const o=i?Math.round(this.getEntityState(t)):this.getEntityState(t),r=this.getEntityAttribute(t,"unit_of_measurement"),s=this.renderIcon(t);return G`
      <div class="infoitems-item" @click="${()=>this.handleMore(t)}" ?more-info="true">
        <div class="tooltip">
          <ha-icon icon="${s}"></ha-icon>
          ${o} ${r}
          <span class="tooltiptext">${e}</span>
        </div>
      </div>
    `}renderIcon(t){const e=t.entity_id,i=this.getEntityBase(e);return void 0!==this.getEntityAttribute(t,"icon")?this.getEntityAttribute(t,"icon"):(void 0===i?null:Ae[i])||"mdi:cancel"}renderToolbar(t){if(!this.showToolbar)return G``;let e=G``;switch(t){case St:case Qt:return G``;case kt:e=G`
          ${this.renderToolbarButton("keba_off","hass:stop","common.stop")}
          ${this.renderToolbarButton("keba_fast","mdi:fast-forward","common.start_fast")}
          ${this.renderToolbarButton("keba_slow","mdi:play","common.start_slow")}
        `;break;case Ut:e=G`
          ${this.renderToolbarButton("keba_off","hass:stop","common.stop")}
          ${this.renderToolbarButton("keba_fast","mdi:fast-forward","common.start_fast")}
          ${this.renderToolbarButton("keba_slow","mdi:play","common.start_slow")}
          ${this.renderToolbarButton("keba_auto","mdi:play-speed","common.start_smart")}
        `;break;case Yt:case Ft:e=G`
          ${this.renderToolbarButton("keba_fast","mdi:fast-forward","common.start_fast")}
          ${this.renderToolbarButton("keba_slow","mdi:play","common.start_slow")}
          ${this.renderToolbarButton("keba_auto","mdi:play-speed","common.start_smart")}
        `}return G`
      <div class="toolbar">
        ${e}
        <div class="fill-gap"></div>
      </div>
    `}renderToolbarButton(t,e,i,o={},r=!0){let s="";try{s=Gt(i)}catch(t){s=i}return G`
      <div class="tooltip">
        <ha-icon-button
          icon="${e}"
          title="${s}"
          @click="${()=>this.callService(t,r,o)}"
        ></ha-icon-button>
        <span class="tooltiptext">${s}</span>
      </div>
    `}renderCompact(){const t=this.status;return G`
      <ha-card>
        <div class="preview-compact">
          ${this.renderImage(t)}

          <div class="metadata">${this.renderName()} ${this.renderStatus()}</div>

          <div class="infoitems">${this.renderInfoItemsCompact()}</div>

          ${this.renderStats(t)}
        </div>

        ${this.renderToolbar(t)}
      </ha-card>
    `}renderFull(){const t=this.status;return G`
      <ha-card>
        <div class="preview">
          <div class="header">
            <div class="infoitems-left">${this.renderInfoItemsLeft()}</div>

            <div class="infoitems">${this.renderInfoItemsRight()}</div>
          </div>

          ${this.renderImage(t)}

          <div class="metadata">${this.renderStatus()}</div>

          ${this.renderCollapsibleInfo()} ${this.renderStats(t)}
        </div>

        ${this.renderToolbar(t)}
      </ha-card>
    `}renderCustomCardTheme(){switch(this.customCardTheme){case"theme_custom":break;default:this.style.setProperty("--custom-card-background-color","#03A9F4"),this.style.setProperty("--custom-text-color","#FFFFFF"),this.style.setProperty("--custom-primary-color","#03A9F4"),this.style.setProperty("--custom-icon-color","#FFFFFF");break;case"theme_transp_blue":this.style.setProperty("--custom-card-background-color","transparent"),this.style.setProperty("--custom-text-color","#03A9F4"),this.style.setProperty("--custom-primary-color","#03A9F4"),this.style.setProperty("--custom-icon-color","#03A9F4");break;case"theme_transp_black":this.style.setProperty("--custom-card-background-color","transparent"),this.style.setProperty("--custom-text-color","black"),this.style.setProperty("--custom-primary-color","black"),this.style.setProperty("--custom-icon-color","black");break;case"theme_transp_white":this.style.setProperty("--custom-card-background-color","transparent"),this.style.setProperty("--custom-text-color","white"),this.style.setProperty("--custom-primary-color","white"),this.style.setProperty("--custom-icon-color","white");break;case"theme_lightgrey_blue":this.style.setProperty("--custom-card-background-color","lightgrey"),this.style.setProperty("--custom-text-color","#03A9F4"),this.style.setProperty("--custom-primary-color","#03A9F4"),this.style.setProperty("--custom-icon-color","#03A9F4")}}render(){return this.renderCustomCardTheme(),this.entity?this.compactView?this.renderCompact():this.renderFull():G`
        <ha-card>
          <div class="preview not-available">
            <div class="metadata">
              <div class="not-available">${Gt("common.not_available")}</div>
            </div>
          </div>
        </ha-card>
      `}};t([_({attribute:!1})],fe.prototype,"hass",void 0),t([$()],fe.prototype,"config",void 0),t([_({attribute:!1})],fe.prototype,"requestInProgress",void 0),fe=t([Z("keba-charger-card")],fe);export{fe as ChargerCard};
