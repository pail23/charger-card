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
 */;var n,l;const c={toAttribute(t,e){switch(e){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},d=(t,e)=>e!==t&&(e==e||t==t),h={attribute:!0,type:String,converter:c,reflect:!1,hasChanged:d};class g extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;null!==(e=this.l)&&void 0!==e||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const o=this._$Eh(i,e);void 0!==o&&(this._$Eu.set(o,i),t.push(o))})),t}static createProperty(t,e=h){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,o=this.getPropertyDescriptor(t,i,e);void 0!==o&&Object.defineProperty(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(o){const r=this[t];this[e]=o,this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||h}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eh(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ev=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Ep(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$Em)&&void 0!==e?e:this._$Em=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$Em)||void 0===e||e.splice(this._$Em.indexOf(t)>>>0,1)}_$Ep(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const i=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{e?t.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):i.forEach((e=>{const i=document.createElement("style"),o=window.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=e.cssText,t.appendChild(i)}))})(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$Eg(t,e,i=h){var o,r;const s=this.constructor._$Eh(t,i);if(void 0!==s&&!0===i.reflect){const a=(null!==(r=null===(o=i.converter)||void 0===o?void 0:o.toAttribute)&&void 0!==r?r:c.toAttribute)(e,i.type);this._$Ei=t,null==a?this.removeAttribute(s):this.setAttribute(s,a),this._$Ei=null}}_$AK(t,e){var i,o,r;const s=this.constructor,a=s._$Eu.get(t);if(void 0!==a&&this._$Ei!==a){const t=s.getPropertyOptions(a),n=t.converter,l=null!==(r=null!==(o=null===(i=n)||void 0===i?void 0:i.fromAttribute)&&void 0!==o?o:"function"==typeof n?n:null)&&void 0!==r?r:c.fromAttribute;this._$Ei=a,this[a]=l(e,t.type),this._$Ei=null}}requestUpdate(t,e,i){let o=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||d)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Ei!==t&&(void 0===this._$ES&&(this._$ES=new Map),this._$ES.set(t,i))):o=!1),!this.isUpdatePending&&o&&(this._$Ev=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ev}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,e)=>this[e]=t)),this._$Et=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$ET()}catch(t){throw e=!1,this._$ET(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$Em)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$ET(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ev}shouldUpdate(t){return!0}update(t){void 0!==this._$ES&&(this._$ES.forEach(((t,e)=>this._$Eg(e,this[e],t))),this._$ES=void 0),this._$ET()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var p,A;g.finalized=!0,g.elementProperties=new Map,g.elementStyles=[],g.shadowRootOptions={mode:"open"},null===(n=globalThis.reactiveElementPolyfillSupport)||void 0===n||n.call(globalThis,{ReactiveElement:g}),(null!==(l=globalThis.reactiveElementVersions)&&void 0!==l?l:globalThis.reactiveElementVersions=[]).push("1.0.0");const m=globalThis.trustedTypes,u=m?m.createPolicy("lit-html",{createHTML:t=>t}):void 0,f=`lit$${(Math.random()+"").slice(9)}$`,b="?"+f,y=`<${b}>`,w=document,v=(t="")=>w.createComment(t),x=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,C=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,z=/>/g,k=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,S=/'/g,Q=/"/g,D=/^(?:script|style|textarea)$/i,E=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),P=Symbol.for("lit-noChange"),N=Symbol.for("lit-nothing"),I=new WeakMap,U=w.createTreeWalker(w,129,null,!1),q=(t,e)=>{const i=t.length-1,o=[];let r,s=2===e?"<svg>":"",a=C;for(let e=0;e<i;e++){const i=t[e];let n,l,c=-1,d=0;for(;d<i.length&&(a.lastIndex=d,l=a.exec(i),null!==l);)d=a.lastIndex,a===C?"!--"===l[1]?a=O:void 0!==l[1]?a=z:void 0!==l[2]?(D.test(l[2])&&(r=RegExp("</"+l[2],"g")),a=k):void 0!==l[3]&&(a=k):a===k?">"===l[0]?(a=null!=r?r:C,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,n=l[1],a=void 0===l[3]?k:'"'===l[3]?Q:S):a===Q||a===S?a=k:a===O||a===z?a=C:(a=k,r=void 0);const h=a===k&&t[e+1].startsWith("/>")?" ":"";s+=a===C?i+y:c>=0?(o.push(n),i.slice(0,c)+"$lit$"+i.slice(c)+f+h):i+f+(-2===c?(o.push(void 0),e):h)}const n=s+(t[i]||"<?>")+(2===e?"</svg>":"");return[void 0!==u?u.createHTML(n):n,o]};class M{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let r=0,s=0;const a=t.length-1,n=this.parts,[l,c]=q(t,e);if(this.el=M.createElement(l,i),U.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(o=U.nextNode())&&n.length<a;){if(1===o.nodeType){if(o.hasAttributes()){const t=[];for(const e of o.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(f)){const i=c[s++];if(t.push(e),void 0!==i){const t=o.getAttribute(i.toLowerCase()+"$lit$").split(f),e=/([.?@])?(.*)/.exec(i);n.push({type:1,index:r,name:e[2],strings:t,ctor:"."===e[1]?R:"?"===e[1]?Y:"@"===e[1]?Z:F})}else n.push({type:6,index:r})}for(const e of t)o.removeAttribute(e)}if(D.test(o.tagName)){const t=o.textContent.split(f),e=t.length-1;if(e>0){o.textContent=m?m.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],v()),U.nextNode(),n.push({type:2,index:++r});o.append(t[e],v())}}}else if(8===o.nodeType)if(o.data===b)n.push({type:2,index:r});else{let t=-1;for(;-1!==(t=o.data.indexOf(f,t+1));)n.push({type:7,index:r}),t+=f.length-1}r++}}static createElement(t,e){const i=w.createElement("template");return i.innerHTML=t,i}}function K(t,e,i=t,o){var r,s,a,n;if(e===P)return e;let l=void 0!==o?null===(r=i._$Cl)||void 0===r?void 0:r[o]:i._$Cu;const c=x(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(s=null==l?void 0:l._$AO)||void 0===s||s.call(l,!1),void 0===c?l=void 0:(l=new c(t),l._$AT(t,i,o)),void 0!==o?(null!==(a=(n=i)._$Cl)&&void 0!==a?a:n._$Cl=[])[o]=l:i._$Cu=l),void 0!==l&&(e=K(t,l._$AS(t,e.values),l,o)),e}class L{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:i},parts:o}=this._$AD,r=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:w).importNode(i,!0);U.currentNode=r;let s=U.nextNode(),a=0,n=0,l=o[0];for(;void 0!==l;){if(a===l.index){let e;2===l.type?e=new H(s,s.nextSibling,this,t):1===l.type?e=new l.ctor(s,l.name,l.strings,this,t):6===l.type&&(e=new j(s,this,t)),this.v.push(e),l=o[++n]}a!==(null==l?void 0:l.index)&&(s=U.nextNode(),a++)}return r}m(t){let e=0;for(const i of this.v)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class H{constructor(t,e,i,o){var r;this.type=2,this._$AH=N,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cg=null===(r=null==o?void 0:o.isConnected)||void 0===r||r}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=K(this,t,e),x(t)?t===N||null==t||""===t?(this._$AH!==N&&this._$AR(),this._$AH=N):t!==this._$AH&&t!==P&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.S(t):(t=>{var e;return T(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])})(t)?this.M(t):this.$(t)}A(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}S(t){this._$AH!==t&&(this._$AR(),this._$AH=this.A(t))}$(t){this._$AH!==N&&x(this._$AH)?this._$AA.nextSibling.data=t:this.S(w.createTextNode(t)),this._$AH=t}T(t){var e;const{values:i,_$litType$:o}=t,r="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=M.createElement(o.h,this.options)),o);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===r)this._$AH.m(i);else{const t=new L(r,this),e=t.p(this.options);t.m(i),this.S(e),this._$AH=t}}_$AC(t){let e=I.get(t.strings);return void 0===e&&I.set(t.strings,e=new M(t)),e}M(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const r of t)o===e.length?e.push(i=new H(this.A(v()),this.A(v()),this,this.options)):i=e[o],i._$AI(r),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cg=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class F{constructor(t,e,i,o,r){this.type=1,this._$AH=N,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=N}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,o){const r=this.strings;let s=!1;if(void 0===r)t=K(this,t,e,0),s=!x(t)||t!==this._$AH&&t!==P,s&&(this._$AH=t);else{const o=t;let a,n;for(t=r[0],a=0;a<r.length-1;a++)n=K(this,o[i+a],e,a),n===P&&(n=this._$AH[a]),s||(s=!x(n)||n!==this._$AH[a]),n===N?t=N:t!==N&&(t+=(null!=n?n:"")+r[a+1]),this._$AH[a]=n}s&&!o&&this.k(t)}k(t){t===N?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class R extends F{constructor(){super(...arguments),this.type=3}k(t){this.element[this.name]=t===N?void 0:t}}class Y extends F{constructor(){super(...arguments),this.type=4}k(t){t&&t!==N?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class Z extends F{constructor(t,e,i,o,r){super(t,e,i,o,r),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=K(this,t,e,0))&&void 0!==i?i:N)===P)return;const o=this._$AH,r=t===N&&o!==N||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,s=t!==N&&(o===N||r);r&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class j{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){K(this,t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var G,X,V;null===(p=globalThis.litHtmlPolyfillSupport)||void 0===p||p.call(globalThis,M,H),(null!==(A=globalThis.litHtmlVersions)&&void 0!==A?A:globalThis.litHtmlVersions=[]).push("2.0.0");class B extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,e,i)=>{var o,r;const s=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:e;let a=s._$litPart$;if(void 0===a){const t=null!==(r=null==i?void 0:i.renderBefore)&&void 0!==r?r:null;s._$litPart$=a=new H(e.insertBefore(v(),t),t,void 0,null!=i?i:{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return P}}B.finalized=!0,B._$litElement$=!0,null===(G=globalThis.litElementHydrateSupport)||void 0===G||G.call(globalThis,{LitElement:B}),null===(X=globalThis.litElementPolyfillSupport)||void 0===X||X.call(globalThis,{LitElement:B}),(null!==(V=globalThis.litElementVersions)&&void 0!==V?V:globalThis.litElementVersions=[]).push("3.0.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const W=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:o}=e;return{kind:i,elements:o,finisher(e){window.customElements.define(t,e)}}})(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,J=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function _(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):J(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function $(t){return _({...t,state:!0})}var tt="[^\\s]+";function et(t,e){for(var i=[],o=0,r=t.length;o<r;o++)i.push(t[o].substr(0,e));return i}var it=function(t){return function(e,i){var o=i[t].map((function(t){return t.toLowerCase()})),r=o.indexOf(e.toLowerCase());return r>-1?r:null}};function ot(t){for(var e=[],i=1;i<arguments.length;i++)e[i-1]=arguments[i];for(var o=0,r=e;o<r.length;o++){var s=r[o];for(var a in s)t[a]=s[a]}return t}var rt=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],st=["January","February","March","April","May","June","July","August","September","October","November","December"],at=et(st,3),nt={dayNamesShort:et(rt,3),dayNames:rt,monthNamesShort:at,monthNames:st,amPm:["am","pm"],DoFn:function(t){return t+["th","st","nd","rd"][t%10>3?0:(t-t%10!=10?1:0)*t%10]}},lt=(ot({},nt),function(t){return+t-1}),ct=[null,"[1-9]\\d?"],dt=[null,tt],ht=["isPm",tt,function(t,e){var i=t.toLowerCase();return i===e.amPm[0]?0:i===e.amPm[1]?1:null}],gt=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(t){var e=(t+"").match(/([+-]|\d\d)/gi);if(e){var i=60*+e[1]+parseInt(e[2],10);return"+"===e[0]?i:-i}return 0}];it("monthNamesShort"),it("monthNames");var pt,At;!function(){try{(new Date).toLocaleDateString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(t){return"RangeError"===t.name}}(),function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(pt||(pt={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(At||(At={}));var mt=function(t,e,i,o){o=o||{},i=null==i?{}:i;var r=new Event(e,{bubbles:void 0===o.bubbles||o.bubbles,cancelable:Boolean(o.cancelable),composed:void 0===o.composed||o.composed});return r.detail=i,t.dispatchEvent(r),r};var ut={disconnected:"Disconnected",awaiting_start:"Paused or awaiting start",charging:"Charging",completed:"Completed or awaiting car",error:"Error",ready_to_charge:"Ready to charge"},ft={name:"Charger Card",description:"Charger card allows you to control your charging robot.",start:"Start",start_fast:"Start (fast)",start_slow:"Start (slow)",start_smart:"Start (smart)",continue:"Resume",pause:"Pause",stop:"Stop",override:"Override schedule",reboot:"Reboot charger",not_available:"Charger not available",click_for_info:"Click for Info",click_for_config:"Click for Config",click_for_limits:"Click for Limits",online:"Online",voltage:"Voltage",power:"Power",charger_current:"Changer Current",energy_per_hour:"Energy per Hour",lifetime_energy:"Lifetime Energy",circuit_current:"Circuit Energy"},bt={missing_entity:"Specifying entity is required!"},yt={entity:"Entity (Required)",smartChargingEntity:"Entity for smart charging",chargerImage:"Charger image and color",customImage:"Custom image (Optional - overrides charger image)",theme:"Color theme",compact_view:"Compact View",compact_view_aria_label_on:"Toggle compact view on",compact_view_aria_label_off:"Toggle compact view off",show_name:"Show Name",show_name_aria_label_on:"Toggle display name on",show_name_aria_label_off:"Toggle display name off",show_leds:"Show Leds",show_leds_aria_label_on:"Toggle animated leds (overlay on image) on",show_leds_aria_label_off:"Toggle animated leds (overlay on image) off",show_status:"Show Status",show_status_aria_label_on:"Toggle display status on",show_status_aria_label_off:"Toggle display status off",show_stats:"Show Data Table (stats)",show_stats_aria_label_on:"Toggle display data table on",show_stats_aria_label_off:"Toggle display data table off",show_collapsibles:"Show collapsible menu buttons",show_collapsibles_aria_label_on:"Toggle display collapsible menus on",show_collapsibles_aria_label_off:"Toggle display collapsible menus off",show_toolbar:"Show Toolbar",show_toolbar_aria_label_on:"Toggle display toolbar on",show_toolbar_aria_label_off:"Toggle display toolbar off",code_only_note:"Note: Custom actions and data table (stats) options are available exclusively using Code Editor manually."},wt={sessionEnergy:"Session Energy"},vt={not_requesting_current:"Not requesting current",ok:"Ok",pending_schedule:"Pending Schedule",none:"None",max_circuit_current_too_low:"Max circuit current too low",max_dynamic_circuit_current_too_low:"Max dynamic circuit current too low",max_dynamic_offline_fallback_circuit_current_too_low:"Max dynamic offline circuit current too low",circuit_fuse_too_low:"Circuit fuse too low",waiting_in_queue:"Waiting in queue",waiting_in_fully:"Waiting in fully",illegal_grid_type:"Illegal grid type",no_current_request:"No current request",max_charger_current_too_low:"Max charger current too low",max_dynamic_charger_current_too_low:"Max dynamic charger current too low",charger_disabled:"Charger Disabled",pending_authorization:"Pending Authorization",charger_in_error_state:"Charger in error state",undefined:"Undefined"},xt={status:ut,common:ft,error:bt,editor:yt,charger_status:wt,charger_substatus:vt},Tt={disconnected:"Getrennt",awaiting_start:"Pausiert",charging:"Laden",completed:"Fertig",error:"Fehler",ready_to_charge:"Bereit zum Laden"},Ct={name:"Charger Card",description:"Charger card ermöglicht es dir, deinen Laderoboter zu steuern.",start_fast:"Start (schnell)",start_slow:"Start (langsam)",start_smart:"Start (smart)",continue:"Weiter",pause:"Pause",stop:"Stopp",override:"Zeitplan überschreiben",reboot:"Ladegerät neu starten",not_available:"Ladegerät nicht verfügbar",click_for_info:"Klicken für Infos",click_for_config:"Klicken für Konfiguration",click_for_limits:"Klicken für Limits",online:"Online",voltage:"Spannung",power:"Leistung",charger_current:"Ladestrom",energy_per_hour:"Energie pro Stunde",lifetime_energy:"Energie gesamt",circuit_current:"Aktueller Strom"},Ot={missing_entity:"Die Angabe der Entität ist erforderlich!"},zt={entity:"Entity (Erforderlich)",smartChargingEntity:"Entity für Smart Charging",chargerImage:"Bild und Farbe des Ladegeräts",customImage:"Benutzerdefiniertes Bild (Optional - überschreibt das Bild des Ladegeräts)",theme:"Farbschema",compact_view:"Kompakte Ansicht",compact_view_aria_label_on:"Kompakte Ansicht einschalten",compact_view_aria_label_off:"Kompakte Ansicht ausschalten",show_name:"Name anzeigen",show_name_aria_label_on:"Anzeigename einschalten",show_name_aria_label_off:"Anzeigename ausschalten",show_leds:"Leds anzeigen",show_leds_aria_label_on:"Animierte Leds (Überlagerung des Bildes) einschalten",show_leds_aria_label_off:"Animierte Leds (Überlagerung des Bildes) ausschalten",show_status:"Status anzeigen",show_status_aria_label_on:"Statusanzeige einschalten",show_status_aria_label_off:"Statusanzeige ausschalten",show_stats:"Datentabelle anzeigen (Statistik)",show_stats_aria_label_on:"Datentabelle einschalten",show_stats_aria_label_off:"Datentabelle ausschalten",show_collapsibles:"Zusammenklappbare Menüschaltflächen anzeigen",show_collapsibles_aria_label_on:"Zusammenklappbare Menüschaltflächen einschalten",show_collapsibles_aria_label_off:"Zusammenklappbare Menüschaltflächen ausschalten",show_toolbar:"Symbolleiste anzeigen",show_toolbar_aria_label_on:"Symbolleiste einschalten",show_toolbar_aria_label_off:"Symbolleiste ausschalten",code_only_note:"Hinweis: Die Optionen für benutzerdefinierte Aktionen und Datentabellen (Statistiken) sind ausschließlich über den manuellen Code-Editor verfügbar."},kt={sessionEnergy:"Energieaufladung"},St={not_requesting_current:"Keine Nachfrage nach Strom",ok:"Ok",pending_schedule:"Ausstehender Zeitplan",none:"None",max_circuit_current_too_low:"Maximalstrom zu niedrig",max_dynamic_circuit_current_too_low:"Dynamischer Maximalstrom zu niedrig",max_dynamic_offline_fallback_circuit_current_too_low:"Dynamischer offline Maximalstrom zu niedrig",circuit_fuse_too_low:"Stromkreissicherung zu niedrig",waiting_in_queue:"Warten in der Warteschlange",waiting_in_fully:"Warten in vollem Umfang",illegal_grid_type:"Unzulässiger Grid Typ",no_current_request:"Keine aktuelle Anfrage",max_charger_current_too_low:"Maximaler Ladestrom zu niedrig",max_dynamic_charger_current_too_low:"Maximaler dynamischer Ladestrom zu niedrig",charger_disabled:"Ladegerät Deaktiviert",pending_authorization:"Ausstehende Autorisierung",charger_in_error_state:"Ladegerät im Fehlerzustand",undefined:"Undefiniert"},Qt={status:Tt,common:Ct,error:Ot,editor:zt,charger_status:kt,charger_substatus:St};const Dt={en:Object.freeze({__proto__:null,status:ut,common:ft,error:bt,editor:yt,charger_status:wt,charger_substatus:vt,default:xt}),de:Object.freeze({__proto__:null,status:Tt,common:Ct,error:Ot,editor:zt,charger_status:kt,charger_substatus:St,default:Qt})};function Et(t,e="",i=""){const o=(navigator.language||"en").split("-")[0];let r;try{r=t.split(".").reduce(((t,e)=>t[e]),Dt[o])}catch(e){r=t.split(".").reduce(((t,e)=>t[e]),Dt.en)}return void 0===r&&(r=t.split(".").reduce(((t,e)=>t[e]),Dt.en)),""!==e&&""!==i&&(r=r.replace(e,i)),r}var Pt="data:image/gif;base64,R0lGODlhAwBIAHAAACwAAAAAAwBIAIGAgIAAAAAAAAAAAAACDYSPqcvtD6OctNqLVQEAOw==",Nt="data:image/gif;base64,R0lGODlhAwBIAHAAACwAAAAAAwBIAIFwcHD///8AAAAAAAACGYSDqZvmwOJ6R1oKrcR60x5x4PSNimgiTgEAOw==",It="data:image/gif;base64,R0lGODlhAwBIAHAAACwAAAAAAwBIAIFwcHAAJv8AAAAAAAACGYSDqZvmwOJ6R1oKrcR60x5x4PSNimgiTgEAOw==",Ut="data:image/gif;base64,R0lGODlhAwBIAIEAAAAAAGBgYP8AAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hZDcmVhdGVkIHdpdGggUGFpbnQuTkVUACH5BAkZAAAALAAAAAADAEgAAAINjI+py+0Po5y02otVAQAh+QQJGQAAACwAAAEAAwBGAAACF5SPecCtn5qDVDJaLYYW7Nd9SigiZGkUADs=";const qt="disconnected",Mt="awaiting_start",Kt="charging",Lt="completed",Ht="error",Ft="ready_to_charge",Rt={normal:{DEFAULT:Pt,disconnected:"data:image/gif;base64,R0lGODlhAwBIAHAAACwAAAAAAwBIAIFwcHBgYGD///8AAAACHYSDqZvmwOJ6R1oKrcR60x5x4EQJ5ommJ6a2qVMAADs=",awaitingStart:Nt,charging:"data:image/gif;base64,R0lGODlhAwBIAIAAAAAAAP///yH/C05FVFNDQVBFMi4wAwEAAAAh/hZDcmVhdGVkIHdpdGggUGFpbnQuTkVUACH5BAkZAAAALAAAQQADAAYAAAIEjI95BQAh+QQJGQAAACwAADkAAwAOAAACB4yPecCtnwoAIfkECRkAAAAsAAAxAAMAFgAAAgqMj3nArZ+ag7QAACH5BAkZAAAALAAAKQADAB4AAAIMjI95wK2fmoNUMkoLACH5BAkZAAAALAAAIQADACYAAAIOjI95wK2fmoNUMlothgUAIfkECRkAAAAsAAAZAAMALgAAAhGMj3nArZ+ag1QyWi2GFuxXAAAh+QQJGQAAACwAABEAAwA2AAACE4yPecCtn5qDVDJaLYYW7Nd9SgEAIfkECRkAAAAsAAAJAAMAPgAAAhWMj3nArZ+ag1QyWi2GFuzXfUooIgUAIfkECRkAAAAsAAABAAMARgAAAheMj3nArZ+ag1QyWi2GFuzXfUooImRpFAA7",completed:Nt,error:Ut,readyToCharge:Nt},smart:{DEFAULT:Pt,disconnected:"data:image/gif;base64,R0lGODlhAwBIAHAAACwAAAAAAwBIAIFwcHBgYGAAJv8AAAACHYSDqZvmwOJ6R1oKrcR60x5x4EQJ5ommJ6a2qVMAADs=",awaitingStart:It,charging:"data:image/gif;base64,R0lGODlhAwBIAIAAAAAAAAAm/yH/C05FVFNDQVBFMi4wAwEAAAAh/hZDcmVhdGVkIHdpdGggUGFpbnQuTkVUACH5BAkZAAAALAAAQQADAAYAAAIEjI95BQAh+QQJGQAAACwAADkAAwAOAAACB4yPecCtnwoAIfkECRkAAAAsAAAxAAMAFgAAAgqMj3nArZ+ag7QAACH5BAkZAAAALAAAKQADAB4AAAIMjI95wK2fmoNUMkoLACH5BAkZAAAALAAAIQADACYAAAIOjI95wK2fmoNUMlothgUAIfkECRkAAAAsAAAZAAMALgAAAhGMj3nArZ+ag1QyWi2GFuxXAAAh+QQJGQAAACwAABEAAwA2AAACE4yPecCtn5qDVDJaLYYW7Nd9SgEAIfkECRkAAAAsAAAJAAMAPgAAAhWMj3nArZ+ag1QyWi2GFuzXfUooIgUAIfkECRkAAAAsAAABAAMARgAAAheMj3nArZ+ag1QyWi2GFuzXfUooImRpFAA7",completed:It,error:Ut,readyToCharge:It}},Yt="binary_sensor.plug",Zt="switch.cable_locked_permanently",jt="binary_sensor.charging_state",Gt="binary_sensor.basic_schedule",Xt="sensor.circuit_current",Vt="sensor.cost_per_kwh",Bt="sensor.dynamic_charger_limit",Wt="sensor.dynamic_circuit_limit",Jt="switch.enable_idle_current",_t="sensor.current",$t="switch.is_enabled",te="sensor.max_current",ee="sensor.max_circuit_limit",ie="sensor.offline_circuit_limit",oe="binary_sensor.status",re="sensor.output_limit",se="sensor.reason_for_no_current",ae="sensor.session_energy",ne="sensor.energy_per_hour",le="sensor.total_energy",ce="sensor.charging_power",de="binary_sensor.update_available",he="sensor.voltage",ge=[{name:"Generic",img:"data:image/png;base64,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"}],pe={"binary_sensor.plug":"mdi:lock","switch.cable_locked_permanently":"mdi:lock","binary_sensor.basic_schedule":"mdi:clock-check","sensor.circuit_current":"mdi:sine-wave","sensor.cost_per_kwh":"mdi:currency-usd","sensor.dynamic_charger_limit":"mdi:sine-wave","sensor.dynamic_circuit_limit":"mdi:sine-wave","switch.enable_idle_current":"mdi:current-dc","sensor.offline_circuit_limit":"mdi:sine-wave","sensor.current":"mdi:sine-wave","switch.is_enabled":"mdi:power","sensor.max_current":"mdi:sine-wave","sensor.max_circuit_limit":"mdi:sine-wave","binary_sensor.status":"mdi:wifi","sensor.output_limit":"mdi:sine-wave","sensor.reason_for_no_current":"mdi:alert-circle","sensor.session_energy":"mdi:flash","sensor.energy_per_hour":"mdi:flash","sensor.total_energy":"mdi:flash","switch.smart_charging":"mdi:auto-fix","sensor.charging_power":"mdi:flash","binary_sensor.update_available":"mdi:file-download","sensor.voltage":"mdi:sine-wave"},Ae=[{name:"theme_default",desc:"Default HA colors"},{name:"theme_custom",desc:"Use custom theme"},{name:"theme_transp_blue",desc:"Transparent Blue"},{name:"theme_transp_black",desc:"Transparent Black"},{name:"theme_transp_white",desc:"Transparent White"},{name:"theme_lightgrey_blue",desc:"LightGrey Blue"}];let me=class extends B{constructor(){super(...arguments),this._initialized=!1}setConfig(t){this._config=t,this._config.entity||(this._config.entity=this.getEntitiesByType("binary_sensor")[0]||"",this._config.smartChargingEntity=this.getEntitiesByType("input_boolean")[0]||"",mt(this,"config-changed",{config:this._config})),this.loadCardHelpers()}shouldUpdate(){return this._initialized||this._initialize(),!0}get _entity(){return this._config&&this._config.entity||""}get _smartChargingEntity(){return this._config&&this._config.smartChargingEntity||""}get _customImage(){return this._config&&this._config.customImage||""}get _chargerImage(){return this._config&&this._config.chargerImage||"Generic"}get _customCardTheme(){return this._config?this._config.customCardTheme||"":"theme_default"}get showName(){return!this._config||(void 0===this._config.show_name||this._config.show_name)}get showLeds(){return!this._config||(void 0===this._config.show_leds||this._config.show_leds)}get showStatus(){return!this._config||(void 0===this._config.show_status||this._config.show_status)}get showToolbar(){return!this._config||(void 0===this._config.show_toolbar||this._config.show_toolbar)}get showStats(){return!this._config||(void 0===this._config.show_stats||this._config.show_stats)}get showCollapsibles(){return!this._config||(void 0===this._config.show_collapsibles||this._config.show_collapsibles)}get compactView(){return!!this._config&&(void 0!==this._config.compact_view&&this._config.compact_view)}getEntitiesByType(t){return this.hass?Object.keys(this.hass.states).filter((e=>e.substr(0,e.indexOf("."))===t)):[]}render(){if(!this.hass)return E``;const t=Object.keys(this.hass.states).filter((t=>"binary_sensor"===t.substr(0,t.indexOf(".")))),e=Object.keys(this.hass.states).filter((t=>"input_boolean"===t.substr(0,t.indexOf("."))));return E`
      <div class="card-config">

        <paper-dropdown-menu label="${Et("editor.entity")}" @value-changed=${this._valueChanged} .configValue=${"entity"}>
            <paper-listbox slot="dropdown-content" .selected=${t.indexOf(this._entity)}>
              ${t.map((t=>E`
                  <paper-item>${t}</paper-item>
                `))}
            </paper-listbox>
        </paper-dropdown-menu>

        <paper-dropdown-menu label="${Et("editor.smartChargingEntity")}" @value-changed=${this._valueChanged} .configValue=${"smartChargingEntity"}>
            <paper-listbox slot="dropdown-content" .selected=${e.indexOf(this._smartChargingEntity)}>
              ${e.map((t=>E`
                  <paper-item>${t}</paper-item>
                `))}
            </paper-listbox>
        </paper-dropdown-menu>

        <paper-dropdown-menu label="${Et("editor.theme")}" @value-changed=${this._valueChanged} .configValue=${"customCardTheme"}>
            <paper-listbox slot="dropdown-content" selected="${this._customCardTheme}" attr-for-selected="value">
              ${Ae.map((t=>E`
                  <paper-item value="${t.name}">${t.name}</paper-item>
                `))}
            </paper-listbox>
        </paper-dropdown-menu>


              <paper-dropdown-menu label="${Et("editor.chargerImage")}" @value-changed=${this._valueChanged} .configValue=${"chargerImage"}>
                <paper-listbox slot="dropdown-content" selected="${this._chargerImage}" attr-for-selected="value">
                  ${ge.map((t=>E`
                      <paper-item value="${t.name}">${t.name}</paper-item>
                    `))}
                </paper-listbox>
              </paper-dropdown-menu>


              <paper-input label="${Et("editor.customImage")}" .value=${this._customImage} .configValue=${"customImage"} @value-changed=${this._valueChanged}"></paper-input>

          <p class="option">
            <ha-switch
              aria-label=${Et(this.compactView?"editor.compact_view_aria_label_off":"editor.compact_view_aria_label_on")}
              .checked=${!1!==this.compactView}
              .configValue=${"compact_view"}
              @change=${this._valueChanged}
            >
            </ha-switch>
            ${Et("editor.compact_view")}
          </p>

          <p class="option">
            <ha-switch
              aria-label=${Et(this.showName?"editor.show_name_aria_label_off":"editor.show_name_aria_label_on")}
              .checked=${this.showName}
              .configValue=${"show_name"}
              @change=${this._valueChanged}
            >
            </ha-switch>
            ${Et("editor.show_name")}
          </p>

          <p class="option">
            <ha-switch
              aria-label=${Et(this.showLeds?"editor.show_leds_aria_label_off":"editor.show_leds_aria_label_on")}
              .checked=${!1!==this.showLeds}
              .configValue=${"show_leds"}
              @change=${this._valueChanged}
            >
            </ha-switch>
            ${Et("editor.show_leds")}
          </p>


          <p class="option">
            <ha-switch
              aria-label=${Et(this.showStatus?"editor.show_status_aria_label_off":"editor.show_status_aria_label_on")}
              .checked=${!1!==this.showStatus}
              .configValue=${"show_status"}
              @change=${this._valueChanged}
            >
            </ha-switch>
            ${Et("editor.show_status")}
          </p>

          <p class="option">
          <ha-switch
            aria-label=${Et(this.showCollapsibles?"editor.show_collapsibles_aria_label_off":"editor.show_collapsibles_aria_label_on")}
            .checked=${!1!==this.showCollapsibles}
            .configValue=${"show_collapsibles"}
            @change=${this._valueChanged}
          >
          </ha-switch>
          ${Et("editor.show_collapsibles")}
        </p>

          <p class="option">
            <ha-switch
              aria-label=${Et(this.showStats?"editor.show_stats_aria_label_off":"editor.show_stats_aria_label_on")}
              .checked=${this.showStats}
              .configValue=${"show_stats"}
              @change=${this._valueChanged}
            >
            </ha-switch>
            ${Et("editor.show_stats")}
          </p>




          <p class="option">
            <ha-switch
              aria-label=${Et(this.showToolbar?"editor.show_toolbar_aria_label_off":"editor.show_toolbar_aria_label_on")}
              .checked=${!1!==this.showToolbar}
              .configValue=${"show_toolbar"}
              @change=${this._valueChanged}
            >
            </ha-switch>
            ${Et("editor.show_toolbar")}
          </p>


        </div>
      `}_initialize(){void 0!==this.hass&&void 0!==this._config&&void 0!==this._helpers&&(this._initialized=!0)}async loadCardHelpers(){this._helpers=await window.loadCardHelpers()}_valueChanged(t){if(!this._config||!this.hass)return void console.log("C: no config");const e=t.target;this[`_${e.configValue}`]!==e.value&&(e.configValue&&(""===e.value?delete this._config[e.configValue]:this._config=Object.assign(Object.assign({},this._config),{[e.configValue]:void 0!==e.checked?e.checked:e.value})),mt(this,"config-changed",{config:this._config}))}static get styles(){return s`
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
    `}};t([_({attribute:!1})],me.prototype,"hass",void 0),t([$()],me.prototype,"_config",void 0),t([$()],me.prototype,"_toggle",void 0),t([$()],me.prototype,"_helpers",void 0),me=t([W("keba-charger-card-editor")],me);var ue=s`
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
    animation: blink 2s infinite;
    width: 42px;
    height: 3px;
  }

  .keba-leds-blue {
    position: absolute;
    left: 221px;
    top: 109px;
    background: blue;
    line-height: 12px;
    margin-left: 3px;
    animation: blink 2s infinite;
    width: 42px;
    height: 3px;
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
`;console.info("%cKEBA-CHARGER-CARD 0.0.2 IS INSTALLED","color: green; font-weight: bold",""),window.customCards=window.customCards||[],window.customCards.push({type:"keba-charger-card",name:"Keba Charger Card Card",description:"A keba charger card for visualizing the status and interacting with your Keba P30"});let fe=class extends B{static get styles(){return ue}static async getConfigElement(){return document.createElement("keba-charger-card-editor")}static getStubConfig(t){const[e]=t.filter((t=>"binary_sensor"===t.substr(0,t.indexOf("."))));return{entity:e||"",image:"default"}}get entity(){return null!=this.config.entity?this.hass.states[this.config.entity]:void 0}get smartChargingEntity(){return null!=this.config.smartChargingEntity?this.hass.states[this.config.smartChargingEntity]:void 0}get scriptDomain(){return void 0===this.config.domain?"script":this.config.domain}get status(){if("off"==this.getEntityState(this.getEntity(Yt)))return qt;return"on"==this.getEntityState(this.getEntity(jt))?Kt:this.smartChargingEntity&&"on"==this.smartChargingEntity.state?Mt:Ft}get image(){const t=this.config.chargerImage||"Generic",e=ge.find((({name:e})=>e===t?e:void 0));if(void 0===this.config.customImage||""===this.config.customImage)try{return void 0===e?void 0:e.img}catch(t){return""}return this.config.customImage}get customCardTheme(){return void 0===this.config.customCardTheme?"theme_default":this.config.customCardTheme}get showLeds(){return void 0===this.config.show_leds||this.config.show_leds}get showName(){return void 0===this.config.show_name||this.config.show_name}get showStatus(){return void 0===this.config.show_status||this.config.show_status}get showStats(){return void 0===this.config.show_stats||this.config.show_stats}get showCollapsibles(){return void 0===this.config.show_collapsibles||this.config.show_collapsibles}get showToolbar(){return void 0===this.config.show_toolbar||this.config.show_toolbar}get compactView(){return void 0!==this.config.compact_view&&this.config.compact_view}get entityBasename(){return void 0===this.config.entity?"":this.config.entity.split(".")[1].replace("_status","")}getEntityId(t){try{return t.split(".")[0]+"."+this.entityBasename+"_"+t.split(".")[1]}catch(t){return}}getEntityBase(t){try{return t.split(".")[0]+"."+t.split(".")[1].replace(this.entityBasename+"_","")}catch(t){return}}getEntities(){return{cableLocked:this.getEntity(Yt),cableLockedPermanently:this.getEntity(Zt),chargingState:this.getEntity(jt),basicSchedule:this.getEntity(Gt),circuitCurrent:this.getEntity(Xt),costPerKwh:this.getEntity(Vt),dynamicChargerCurrent:this.getEntity(Bt),dynamicCircuitCurrent:this.getEntity(Wt),enableIdleCurrent:this.getEntity(Jt),offlineCircuitCurrent:this.getEntity(ie),inCurrent:this.getEntity(_t),isEnabled:this.getEntity($t),maxChargerCurrent:this.getEntity(te),maxCircuitCurrent:this.getEntity(ee),isOnline:this.getEntity(oe),outputCurrent:this.getEntity(re),reasonForNoCurrent:this.getEntity(se),sessionEnergy:this.getEntity(ae),energyPerHour:this.getEntity(ne),energyLifetime:this.getEntity(le),smartCharging:this.smartChargingEntity,totalPower:this.getEntity(ce),updateAvailable:this.getEntity(de),voltage:this.getEntity(he),status:this.entity}}getEntity(t){try{const e=this.getEntityId(t);return void 0===e?void 0:this.hass.states[e]}catch(t){return}}getEntityState(t){try{return t.state}catch(t){return}}getEntityAttribute(t,e){try{return t.attributes[e]}catch(t){return}}getStatsDefault(t){switch(t){case qt:return[{entityId:this.getEntityId(ae),unit:"kWh",subtitle:Et("charger_status.sessionEnergy")},{entityId:this.getEntityId(te),unit:"A",subtitle:"Current Limit"},{entityId:this.getEntityId(Yt),unit:"",subtitle:"Locked"}];case Mt:return[{entityId:this.getEntityId(te),unit:"A",subtitle:"Current Limit"},{entityId:this.getEntityId(ae),unit:"kWh",subtitle:Et("charger_status.sessionEnergy")},{entityId:this.smartChargingEntity?this.smartChargingEntity.entity_id:"",unit:"",subtitle:"Smart Charging"}];case Kt:return[{entityId:this.getEntityId(ae),unit:"kWh",subtitle:"Energy"},{entityId:this.getEntityId(te),unit:"A",subtitle:"Current Limit"},{entityId:this.getEntityId(Xt),unit:"A",subtitle:"Circuit"},{entityId:this.getEntityId(re),unit:"A",subtitle:"Allowed"},{entityId:this.getEntityId(_t),unit:"A",subtitle:"Actual"},{entityId:this.getEntityId(ce),unit:"kW",subtitle:"Power"},{entityId:this.smartChargingEntity?this.smartChargingEntity.entity_id:"",unit:"",subtitle:"Smart Charging"}];case Lt:case Ht:return[{entityId:this.getEntityId(ae),unit:"kWh",subtitle:Et("charger_status.sessionEnergy")},{entityId:this.getEntityId(te),unit:"A",subtitle:"Current Limit"}];case Ft:return[{entityId:this.getEntityId(ae),unit:"kWh",subtitle:Et("charger_status.sessionEnergy")},{entityId:this.getEntityId(te),unit:"A",subtitle:"Current Limit"},{entityId:this.getEntityId(Gt),unit:"",subtitle:"Schedule"}]}return[]}setConfig(t){if(!t.entity)throw new Error(Et("error.missing_entity"));this.config=t}getCardSize(){return 2}shouldUpdate(t){return function(t,e,i){if(e.has("config")||i)return!0;if(t.config.entity){var o=e.get("hass");return!o||o.states[t.config.entity]!==t.hass.states[t.config.entity]}return!1}(this,t,!0)}updated(t){this.config.entity&&t.get("hass")&&t.get("hass").states[this.config.entity].state!==this.hass.states[this.config.entity].state&&(this.requestInProgress=!1)}handleMore(t){t&&t.entity_id&&mt(this,"hass-more-info",{entityId:t.entity_id},{bubbles:!0,composed:!0})}callService(t,e=!0,i={}){this.hass.callService(this.scriptDomain,t,Object.assign({},i)),e&&this.requestUpdate()}imageLed(t,e){const i=e?"smart":"normal";return Rt[i][t]||Rt[i].DEFAULT}renderImage(t){let e="";return this.compactView&&(e="-compact"),this.image?E`
      <img
        class="charger${e}"
        src="${this.image}"
        @click="${()=>this.handleMore(this.entity)}"
        ?more-info="true"
      />${this.renderLeds(t)}
    `:E``}renderLeds(t){return console.log(t),this.showLeds?t===Kt?E`<div class="keba-leds-green"></div>`:E`<div class="keba-leds-blue"></div>`:E``}renderStats(t){if(!this.showStats)return E``;let e="";this.compactView&&(e="-compact");const i=this.getStatsDefault(t)||[];return E` <div class="stats${e}">${this.renderStatsList(i)}</div> `}renderStatsList(t){return t.map((({entityId:t,attribute:e,calcValue:i,unit:o,subtitle:r})=>{if(!(t||e||i))return E``;if(i)return this.renderStatsHtml(i,o,r,this.hass.states[t]);try{const i=e?this.hass.states[t].attributes[e]:this.hass.states[t].state;return this.renderStatsHtml(i,o,r,this.hass.states[t])}catch(t){return null}}))}renderStatsHtml(t,e,i,o){return E`
      <div class="stats-block" @click="${()=>this.handleMore(o)}" ?more-info="true">
        <span class="stats-value">${t}</span>
        ${e}
        <div class="stats-subtitle">${i}</div>
      </div>
    `}renderName(){if(!this.showName)return E``;let t="";return this.compactView&&(t="-compact"),E` <div class="charger-name${t}">Keba P30</div> `}renderStatus(){if(!this.showStatus)return E``;let t="";this.compactView&&(t="-compact");const e=Et(`status.${this.status}`)||this.status;return E`
      <div class="status${t}">
        <span class="status-text${t}" alt=${e}> ${e} </span>
        <ha-circular-progress .active=${this.requestInProgress} size="small"></ha-circular-progress>
      </div>
    `}renderCollapsibleInfo(){if(!this.showCollapsibles)return E``;const{isOnline:t,totalPower:e,sessionEnergy:i,energyLifetime:o}=this.getEntities(),r=Et("common.click_for_info");return E`
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
            ${this.renderCollapsibleItems(t,Et("common.online"))}
            ${this.renderCollapsibleItems(e,Et("common.power"))}
            ${this.renderCollapsibleItems(i,Et("charger_status.sessionEnergy"))}
            ${this.renderCollapsibleItems(o,Et("common.lifetime_energy"),!0)}
          </div>
        </div>
      </div>
    `}renderCollapsibleItems(t,e,i=!1){if(null==t)return E``;const o=i?Math.round(this.getEntityState(t)):this.getEntityState(t),r=this.renderIcon(t),s=this.getEntityAttribute(t,"unit_of_measurement");return E`
      <div class="collapsible-item" @click="${()=>this.handleMore(t)}" ?more-info="true">
        <div class="tooltip">
          <ha-icon icon="${r}"></ha-icon>
          <br />${o} ${s}
          <span class="tooltiptext">${e}</span>
        </div>
      </div>
    `}renderInfoItemsLeft(){const{isOnline:t}=this.getEntities();return E` ${this.renderInfoItem(t,Et("common.online"))} `}renderInfoItemsRight(){const{cableLocked:t,totalPower:e,voltage:i}=this.getEntities(),o=t&&"on"==t.state?"mdi:power-plug":"mdi:power-plug-off";return E`
      ${this.renderInfoItem(i,Et("common.voltage"),!0)}
      ${this.renderInfoItem(e,Et("common.power"))}
      <ha-icon icon="${o}"></ha-icon>
    `}renderInfoItemsCompact(){const{totalPower:t,voltage:e}=this.getEntities();return E`
      ${this.renderInfoItem(e,Et("common.voltage"),!0)}
      ${this.renderInfoItem(t,Et("common.power"),!0)}
    `}renderInfoItem(t,e,i=!1){if(null==t)return E``;const o=i?Math.round(this.getEntityState(t)):this.getEntityState(t),r=this.getEntityAttribute(t,"unit_of_measurement"),s=this.renderIcon(t);return E`
      <div class="infoitems-item" @click="${()=>this.handleMore(t)}" ?more-info="true">
        <div class="tooltip">
          <ha-icon icon="${s}"></ha-icon>
          ${o} ${r}
          <span class="tooltiptext">${e}</span>
        </div>
      </div>
    `}renderIcon(t){const e=t.entity_id,i=this.getEntityBase(e);return void 0!==this.getEntityAttribute(t,"icon")?this.getEntityAttribute(t,"icon"):(void 0===i?null:pe[i])||"mdi:cancel"}renderToolbar(t){if(!this.showToolbar)return E``;let e=E``;switch(t){case qt:case Ht:return E``;case Mt:e=E`
          ${this.renderToolbarButton("keba_off","hass:stop","common.stop")}
          ${this.renderToolbarButton("keba_fast","mdi:fast-forward","common.start_fast")}
          ${this.renderToolbarButton("keba_slow","mdi:play","common.start_slow")}
        `;break;case Kt:e=E`
          ${this.renderToolbarButton("keba_off","hass:stop","common.stop")}
          ${this.renderToolbarButton("keba_fast","mdi:fast-forward","common.start_fast")}
          ${this.renderToolbarButton("keba_slow","mdi:play","common.start_slow")}
          ${this.renderToolbarButton("keba_auto","mdi:play-speed","common.start_smart")}
        `;break;case Lt:case Ft:e=E`
          ${this.renderToolbarButton("keba_fast","mdi:fast-forward","common.start_fast")}
          ${this.renderToolbarButton("keba_slow","mdi:play","common.start_slow")}
          ${this.renderToolbarButton("keba_auto","mdi:play-speed","common.start_smart")}
        `}return E`
      <div class="toolbar">
        ${e}
        <div class="fill-gap"></div>
      </div>
    `}renderToolbarButton(t,e,i,o={},r=!0){let s="";try{s=Et(i)}catch(t){s=i}return E`
      <div class="tooltip">
        <ha-icon-button
          icon="${e}"
          title="${s}"
          @click="${()=>this.callService(t,r,o)}"
        ></ha-icon-button>
        <span class="tooltiptext">${s}</span>
      </div>
    `}renderCompact(){const t=this.status;return E`
      <ha-card>
        <div class="preview-compact">
          ${this.renderImage(t)}

          <div class="metadata">${this.renderName()} ${this.renderStatus()}</div>

          <div class="infoitems">${this.renderInfoItemsCompact()}</div>

          ${this.renderStats(t)}
        </div>

        ${this.renderToolbar(t)}
      </ha-card>
    `}renderFull(){const t=this.status;return E`
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
    `}renderCustomCardTheme(){switch(this.customCardTheme){case"theme_custom":break;default:this.style.setProperty("--custom-card-background-color","#03A9F4"),this.style.setProperty("--custom-text-color","#FFFFFF"),this.style.setProperty("--custom-primary-color","#03A9F4"),this.style.setProperty("--custom-icon-color","#FFFFFF");break;case"theme_transp_blue":this.style.setProperty("--custom-card-background-color","transparent"),this.style.setProperty("--custom-text-color","#03A9F4"),this.style.setProperty("--custom-primary-color","#03A9F4"),this.style.setProperty("--custom-icon-color","#03A9F4");break;case"theme_transp_black":this.style.setProperty("--custom-card-background-color","transparent"),this.style.setProperty("--custom-text-color","black"),this.style.setProperty("--custom-primary-color","black"),this.style.setProperty("--custom-icon-color","black");break;case"theme_transp_white":this.style.setProperty("--custom-card-background-color","transparent"),this.style.setProperty("--custom-text-color","white"),this.style.setProperty("--custom-primary-color","white"),this.style.setProperty("--custom-icon-color","white");break;case"theme_lightgrey_blue":this.style.setProperty("--custom-card-background-color","lightgrey"),this.style.setProperty("--custom-text-color","#03A9F4"),this.style.setProperty("--custom-primary-color","#03A9F4"),this.style.setProperty("--custom-icon-color","#03A9F4")}}render(){return this.renderCustomCardTheme(),this.entity?this.compactView?this.renderCompact():this.renderFull():E`
        <ha-card>
          <div class="preview not-available">
            <div class="metadata">
              <div class="not-available">${Et("common.not_available")}</div>
            </div>
          </div>
        </ha-card>
      `}};t([_({attribute:!1})],fe.prototype,"hass",void 0),t([$()],fe.prototype,"config",void 0),t([_({attribute:!1})],fe.prototype,"requestInProgress",void 0),fe=t([W("keba-charger-card")],fe);export{fe as ChargerCard};
