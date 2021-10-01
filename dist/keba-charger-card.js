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
function t(t,e,i,o){var s,r=arguments.length,n=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(n=(r<3?s(n):r>3?s(e,i,n):s(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}const e=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),o=new Map;class s{constructor(t,e){if(this._$cssResult$=!0,e!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let t=o.get(this.cssText);return e&&void 0===t&&(o.set(this.cssText,t=new CSSStyleSheet),t.replaceSync(this.cssText)),t}toString(){return this.cssText}}const r=(t,...e)=>{const o=1===t.length?t[0]:e.reduce(((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1]),t[0]);return new s(o,i)},n=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new s("string"==typeof t?t:t+"",i))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var a,l;const c={toAttribute(t,e){switch(e){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},h=(t,e)=>e!==t&&(e==e||t==t),d={attribute:!0,type:String,converter:c,reflect:!1,hasChanged:h};class g extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;null!==(e=this.l)&&void 0!==e||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const o=this._$Eh(i,e);void 0!==o&&(this._$Eu.set(o,i),t.push(o))})),t}static createProperty(t,e=d){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,o=this.getPropertyDescriptor(t,i,e);void 0!==o&&Object.defineProperty(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(o){const s=this[t];this[e]=o,this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||d}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eh(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ev=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Ep(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$Em)&&void 0!==e?e:this._$Em=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$Em)||void 0===e||e.splice(this._$Em.indexOf(t)>>>0,1)}_$Ep(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const i=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{e?t.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):i.forEach((e=>{const i=document.createElement("style"),o=window.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=e.cssText,t.appendChild(i)}))})(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$Eg(t,e,i=d){var o,s;const r=this.constructor._$Eh(t,i);if(void 0!==r&&!0===i.reflect){const n=(null!==(s=null===(o=i.converter)||void 0===o?void 0:o.toAttribute)&&void 0!==s?s:c.toAttribute)(e,i.type);this._$Ei=t,null==n?this.removeAttribute(r):this.setAttribute(r,n),this._$Ei=null}}_$AK(t,e){var i,o,s;const r=this.constructor,n=r._$Eu.get(t);if(void 0!==n&&this._$Ei!==n){const t=r.getPropertyOptions(n),a=t.converter,l=null!==(s=null!==(o=null===(i=a)||void 0===i?void 0:i.fromAttribute)&&void 0!==o?o:"function"==typeof a?a:null)&&void 0!==s?s:c.fromAttribute;this._$Ei=n,this[n]=l(e,t.type),this._$Ei=null}}requestUpdate(t,e,i){let o=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||h)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Ei!==t&&(void 0===this._$ES&&(this._$ES=new Map),this._$ES.set(t,i))):o=!1),!this.isUpdatePending&&o&&(this._$Ev=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ev}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,e)=>this[e]=t)),this._$Et=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$ET()}catch(t){throw e=!1,this._$ET(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$Em)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$ET(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ev}shouldUpdate(t){return!0}update(t){void 0!==this._$ES&&(this._$ES.forEach(((t,e)=>this._$Eg(e,this[e],t))),this._$ES=void 0),this._$ET()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var u,A;g.finalized=!0,g.elementProperties=new Map,g.elementStyles=[],g.shadowRootOptions={mode:"open"},null===(a=globalThis.reactiveElementPolyfillSupport)||void 0===a||a.call(globalThis,{ReactiveElement:g}),(null!==(l=globalThis.reactiveElementVersions)&&void 0!==l?l:globalThis.reactiveElementVersions=[]).push("1.0.0");const p=globalThis.trustedTypes,m=p?p.createPolicy("lit-html",{createHTML:t=>t}):void 0,w=`lit$${(Math.random()+"").slice(9)}$`,f="?"+w,b=`<${f}>`,v=document,y=(t="")=>v.createComment(t),x=t=>null===t||"object"!=typeof t&&"function"!=typeof t,C=Array.isArray,E=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,B=/-->/g,O=/>/g,M=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,I=/'/g,D=/"/g,z=/^(?:script|style|textarea)$/i,H=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),Q=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),k=new WeakMap,P=v.createTreeWalker(v,129,null,!1),N=(t,e)=>{const i=t.length-1,o=[];let s,r=2===e?"<svg>":"",n=E;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,h=0;for(;h<i.length&&(n.lastIndex=h,l=n.exec(i),null!==l);)h=n.lastIndex,n===E?"!--"===l[1]?n=B:void 0!==l[1]?n=O:void 0!==l[2]?(z.test(l[2])&&(s=RegExp("</"+l[2],"g")),n=M):void 0!==l[3]&&(n=M):n===M?">"===l[0]?(n=null!=s?s:E,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?M:'"'===l[3]?D:I):n===D||n===I?n=M:n===B||n===O?n=E:(n=M,s=void 0);const d=n===M&&t[e+1].startsWith("/>")?" ":"";r+=n===E?i+b:c>=0?(o.push(a),i.slice(0,c)+"$lit$"+i.slice(c)+w+d):i+w+(-2===c?(o.push(void 0),e):d)}const a=r+(t[i]||"<?>")+(2===e?"</svg>":"");return[void 0!==m?m.createHTML(a):a,o]};class S{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let s=0,r=0;const n=t.length-1,a=this.parts,[l,c]=N(t,e);if(this.el=S.createElement(l,i),P.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(o=P.nextNode())&&a.length<n;){if(1===o.nodeType){if(o.hasAttributes()){const t=[];for(const e of o.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(w)){const i=c[r++];if(t.push(e),void 0!==i){const t=o.getAttribute(i.toLowerCase()+"$lit$").split(w),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:s,name:e[2],strings:t,ctor:"."===e[1]?j:"?"===e[1]?W:"@"===e[1]?T:V})}else a.push({type:6,index:s})}for(const e of t)o.removeAttribute(e)}if(z.test(o.tagName)){const t=o.textContent.split(w),e=t.length-1;if(e>0){o.textContent=p?p.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],y()),P.nextNode(),a.push({type:2,index:++s});o.append(t[e],y())}}}else if(8===o.nodeType)if(o.data===f)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=o.data.indexOf(w,t+1));)a.push({type:7,index:s}),t+=w.length-1}s++}}static createElement(t,e){const i=v.createElement("template");return i.innerHTML=t,i}}function F(t,e,i=t,o){var s,r,n,a;if(e===Q)return e;let l=void 0!==o?null===(s=i._$Cl)||void 0===s?void 0:s[o]:i._$Cu;const c=x(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(r=null==l?void 0:l._$AO)||void 0===r||r.call(l,!1),void 0===c?l=void 0:(l=new c(t),l._$AT(t,i,o)),void 0!==o?(null!==(n=(a=i)._$Cl)&&void 0!==n?n:a._$Cl=[])[o]=l:i._$Cu=l),void 0!==l&&(e=F(t,l._$AS(t,e.values),l,o)),e}class L{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:i},parts:o}=this._$AD,s=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:v).importNode(i,!0);P.currentNode=s;let r=P.nextNode(),n=0,a=0,l=o[0];for(;void 0!==l;){if(n===l.index){let e;2===l.type?e=new U(r,r.nextSibling,this,t):1===l.type?e=new l.ctor(r,l.name,l.strings,this,t):6===l.type&&(e=new Y(r,this,t)),this.v.push(e),l=o[++a]}n!==(null==l?void 0:l.index)&&(r=P.nextNode(),n++)}return s}m(t){let e=0;for(const i of this.v)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class U{constructor(t,e,i,o){var s;this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cg=null===(s=null==o?void 0:o.isConnected)||void 0===s||s}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=F(this,t,e),x(t)?t===G||null==t||""===t?(this._$AH!==G&&this._$AR(),this._$AH=G):t!==this._$AH&&t!==Q&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.S(t):(t=>{var e;return C(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])})(t)?this.M(t):this.$(t)}A(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}S(t){this._$AH!==t&&(this._$AR(),this._$AH=this.A(t))}$(t){this._$AH!==G&&x(this._$AH)?this._$AA.nextSibling.data=t:this.S(v.createTextNode(t)),this._$AH=t}T(t){var e;const{values:i,_$litType$:o}=t,s="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=S.createElement(o.h,this.options)),o);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===s)this._$AH.m(i);else{const t=new L(s,this),e=t.p(this.options);t.m(i),this.S(e),this._$AH=t}}_$AC(t){let e=k.get(t.strings);return void 0===e&&k.set(t.strings,e=new S(t)),e}M(t){C(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const s of t)o===e.length?e.push(i=new U(this.A(y()),this.A(y()),this,this.options)):i=e[o],i._$AI(s),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cg=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class V{constructor(t,e,i,o,s){this.type=1,this._$AH=G,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=G}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,o){const s=this.strings;let r=!1;if(void 0===s)t=F(this,t,e,0),r=!x(t)||t!==this._$AH&&t!==Q,r&&(this._$AH=t);else{const o=t;let n,a;for(t=s[0],n=0;n<s.length-1;n++)a=F(this,o[i+n],e,n),a===Q&&(a=this._$AH[n]),r||(r=!x(a)||a!==this._$AH[n]),a===G?t=G:t!==G&&(t+=(null!=a?a:"")+s[n+1]),this._$AH[n]=a}r&&!o&&this.k(t)}k(t){t===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class j extends V{constructor(){super(...arguments),this.type=3}k(t){this.element[this.name]=t===G?void 0:t}}class W extends V{constructor(){super(...arguments),this.type=4}k(t){t&&t!==G?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class T extends V{constructor(t,e,i,o,s){super(t,e,i,o,s),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=F(this,t,e,0))&&void 0!==i?i:G)===Q)return;const o=this._$AH,s=t===G&&o!==G||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,r=t!==G&&(o===G||s);s&&this.element.removeEventListener(this.name,this,o),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class Y{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){F(this,t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var q,X,R;null===(u=globalThis.litHtmlPolyfillSupport)||void 0===u||u.call(globalThis,S,U),(null!==(A=globalThis.litHtmlVersions)&&void 0!==A?A:globalThis.litHtmlVersions=[]).push("2.0.0");class K extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,e,i)=>{var o,s;const r=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:e;let n=r._$litPart$;if(void 0===n){const t=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:null;r._$litPart$=n=new U(e.insertBefore(y(),t),t,void 0,null!=i?i:{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return Q}}K.finalized=!0,K._$litElement$=!0,null===(q=globalThis.litElementHydrateSupport)||void 0===q||q.call(globalThis,{LitElement:K}),null===(X=globalThis.litElementPolyfillSupport)||void 0===X||X.call(globalThis,{LitElement:K}),(null!==(R=globalThis.litElementVersions)&&void 0!==R?R:globalThis.litElementVersions=[]).push("3.0.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const J=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:o}=e;return{kind:i,elements:o,finisher(e){window.customElements.define(t,e)}}})(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,Z=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function _(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):Z(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function $(t){return _({...t,state:!0})}var tt="[^\\s]+";function et(t,e){for(var i=[],o=0,s=t.length;o<s;o++)i.push(t[o].substr(0,e));return i}var it=function(t){return function(e,i){var o=i[t].map((function(t){return t.toLowerCase()})),s=o.indexOf(e.toLowerCase());return s>-1?s:null}};function ot(t){for(var e=[],i=1;i<arguments.length;i++)e[i-1]=arguments[i];for(var o=0,s=e;o<s.length;o++){var r=s[o];for(var n in r)t[n]=r[n]}return t}var st=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],rt=["January","February","March","April","May","June","July","August","September","October","November","December"],nt=et(rt,3),at={dayNamesShort:et(st,3),dayNames:st,monthNamesShort:nt,monthNames:rt,amPm:["am","pm"],DoFn:function(t){return t+["th","st","nd","rd"][t%10>3?0:(t-t%10!=10?1:0)*t%10]}},lt=(ot({},at),function(t){return+t-1}),ct=[null,"[1-9]\\d?"],ht=[null,tt],dt=["isPm",tt,function(t,e){var i=t.toLowerCase();return i===e.amPm[0]?0:i===e.amPm[1]?1:null}],gt=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(t){var e=(t+"").match(/([+-]|\d\d)/gi);if(e){var i=60*+e[1]+parseInt(e[2],10);return"+"===e[0]?i:-i}return 0}];it("monthNamesShort"),it("monthNames");var ut,At;!function(){try{(new Date).toLocaleDateString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(t){return"RangeError"===t.name}}(),function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(ut||(ut={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(At||(At={}));var pt=function(t,e,i,o){o=o||{},i=null==i?{}:i;var s=new Event(e,{bubbles:void 0===o.bubbles||o.bubbles,cancelable:Boolean(o.cancelable),composed:void 0===o.composed||o.composed});return s.detail=i,t.dispatchEvent(s),s};var mt={disconnected:"Disconnected",awaiting_start:"Paused or awaiting start",charging:"Charging",completed:"Completed or awaiting car",error:"Error",ready_to_charge:"Ready to charge"},wt={name:"Charger Card",description:"Charger card allows you to control your charging robot.",start:"Start",start_fast:"Start (fast)",start_slow:"Start (slow)",start_smart:"Start (smart)",continue:"Resume",pause:"Pause",stop:"Stop",override:"Override schedule",reboot:"Reboot charger",not_available:"Charger not available",click_for_info:"Click for Info",click_for_config:"Click for Config",click_for_limits:"Click for Limits",online:"Online",voltage:"Voltage",power:"Power",charger_current:"Changer Current",energy_per_hour:"Energy per Hour",lifetime_energy:"Lifetime Energy",circuit_current:"Circuit Energy"},ft={missing_entity:"Specifying entity is required!"},bt={entity:"Entity (Required)",smartChargingEntity:"Entity for smart charging",chargerImage:"Charger image and color",customImage:"Custom image (Optional - overrides charger image)",theme:"Color theme",compact_view:"Compact View",compact_view_aria_label_on:"Toggle compact view on",compact_view_aria_label_off:"Toggle compact view off",show_name:"Show Name",show_name_aria_label_on:"Toggle display name on",show_name_aria_label_off:"Toggle display name off",show_leds:"Show Leds",show_leds_aria_label_on:"Toggle animated leds (overlay on image) on",show_leds_aria_label_off:"Toggle animated leds (overlay on image) off",show_status:"Show Status",show_status_aria_label_on:"Toggle display status on",show_status_aria_label_off:"Toggle display status off",show_stats:"Show Data Table (stats)",show_stats_aria_label_on:"Toggle display data table on",show_stats_aria_label_off:"Toggle display data table off",show_collapsibles:"Show collapsible menu buttons",show_collapsibles_aria_label_on:"Toggle display collapsible menus on",show_collapsibles_aria_label_off:"Toggle display collapsible menus off",show_toolbar:"Show Toolbar",show_toolbar_aria_label_on:"Toggle display toolbar on",show_toolbar_aria_label_off:"Toggle display toolbar off",code_only_note:"Note: Custom actions and data table (stats) options are available exclusively using Code Editor manually."},vt={sessionEnergy:"Session Energy"},yt={not_requesting_current:"Not requesting current",ok:"Ok",pending_schedule:"Pending Schedule",none:"None",max_circuit_current_too_low:"Max circuit current too low",max_dynamic_circuit_current_too_low:"Max dynamic circuit current too low",max_dynamic_offline_fallback_circuit_current_too_low:"Max dynamic offline circuit current too low",circuit_fuse_too_low:"Circuit fuse too low",waiting_in_queue:"Waiting in queue",waiting_in_fully:"Waiting in fully",illegal_grid_type:"Illegal grid type",no_current_request:"No current request",max_charger_current_too_low:"Max charger current too low",max_dynamic_charger_current_too_low:"Max dynamic charger current too low",charger_disabled:"Charger Disabled",pending_authorization:"Pending Authorization",charger_in_error_state:"Charger in error state",undefined:"Undefined"},xt={status:mt,common:wt,error:ft,editor:bt,charger_status:vt,charger_substatus:yt},Ct={disconnected:"Getrennt",awaiting_start:"Pausiert",charging:"Laden",completed:"Fertig",error:"Fehler",ready_to_charge:"Bereit zum Laden"},Et={name:"Charger Card",description:"Charger card ermöglicht es dir, deinen Laderoboter zu steuern.",start_fast:"Start (schnell)",start_slow:"Start (langsam)",start_smart:"Start (smart)",continue:"Weiter",pause:"Pause",stop:"Stopp",override:"Zeitplan überschreiben",reboot:"Ladegerät neu starten",not_available:"Ladegerät nicht verfügbar",click_for_info:"Klicken für Infos",click_for_config:"Klicken für Konfiguration",click_for_limits:"Klicken für Limits",online:"Online",voltage:"Spannung",power:"Leistung",charger_current:"Ladestrom",energy_per_hour:"Energie pro Stunde",lifetime_energy:"Energie gesamt",circuit_current:"Aktueller Strom"},Bt={missing_entity:"Die Angabe der Entität ist erforderlich!"},Ot={entity:"Entity (Erforderlich)",smartChargingEntity:"Entity für Smart Charging",chargerImage:"Bild und Farbe des Ladegeräts",customImage:"Benutzerdefiniertes Bild (Optional - überschreibt das Bild des Ladegeräts)",theme:"Farbschema",compact_view:"Kompakte Ansicht",compact_view_aria_label_on:"Kompakte Ansicht einschalten",compact_view_aria_label_off:"Kompakte Ansicht ausschalten",show_name:"Name anzeigen",show_name_aria_label_on:"Anzeigename einschalten",show_name_aria_label_off:"Anzeigename ausschalten",show_leds:"Leds anzeigen",show_leds_aria_label_on:"Animierte Leds (Überlagerung des Bildes) einschalten",show_leds_aria_label_off:"Animierte Leds (Überlagerung des Bildes) ausschalten",show_status:"Status anzeigen",show_status_aria_label_on:"Statusanzeige einschalten",show_status_aria_label_off:"Statusanzeige ausschalten",show_stats:"Datentabelle anzeigen (Statistik)",show_stats_aria_label_on:"Datentabelle einschalten",show_stats_aria_label_off:"Datentabelle ausschalten",show_collapsibles:"Zusammenklappbare Menüschaltflächen anzeigen",show_collapsibles_aria_label_on:"Zusammenklappbare Menüschaltflächen einschalten",show_collapsibles_aria_label_off:"Zusammenklappbare Menüschaltflächen ausschalten",show_toolbar:"Symbolleiste anzeigen",show_toolbar_aria_label_on:"Symbolleiste einschalten",show_toolbar_aria_label_off:"Symbolleiste ausschalten",code_only_note:"Hinweis: Die Optionen für benutzerdefinierte Aktionen und Datentabellen (Statistiken) sind ausschließlich über den manuellen Code-Editor verfügbar."},Mt={sessionEnergy:"Energieaufladung"},It={not_requesting_current:"Keine Nachfrage nach Strom",ok:"Ok",pending_schedule:"Ausstehender Zeitplan",none:"None",max_circuit_current_too_low:"Maximalstrom zu niedrig",max_dynamic_circuit_current_too_low:"Dynamischer Maximalstrom zu niedrig",max_dynamic_offline_fallback_circuit_current_too_low:"Dynamischer offline Maximalstrom zu niedrig",circuit_fuse_too_low:"Stromkreissicherung zu niedrig",waiting_in_queue:"Warten in der Warteschlange",waiting_in_fully:"Warten in vollem Umfang",illegal_grid_type:"Unzulässiger Grid Typ",no_current_request:"Keine aktuelle Anfrage",max_charger_current_too_low:"Maximaler Ladestrom zu niedrig",max_dynamic_charger_current_too_low:"Maximaler dynamischer Ladestrom zu niedrig",charger_disabled:"Ladegerät Deaktiviert",pending_authorization:"Ausstehende Autorisierung",charger_in_error_state:"Ladegerät im Fehlerzustand",undefined:"Undefiniert"},Dt={status:Ct,common:Et,error:Bt,editor:Ot,charger_status:Mt,charger_substatus:It};const zt={en:Object.freeze({__proto__:null,status:mt,common:wt,error:ft,editor:bt,charger_status:vt,charger_substatus:yt,default:xt}),de:Object.freeze({__proto__:null,status:Ct,common:Et,error:Bt,editor:Ot,charger_status:Mt,charger_substatus:It,default:Dt})};function Ht(t,e="",i=""){const o=(navigator.language||"en").split("-")[0];let s;try{s=t.split(".").reduce(((t,e)=>t[e]),zt[o])}catch(e){s=t.split(".").reduce(((t,e)=>t[e]),zt.en)}return void 0===s&&(s=t.split(".").reduce(((t,e)=>t[e]),zt.en)),""!==e&&""!==i&&(s=s.replace(e,i)),s}var Qt="data:image/gif;base64,R0lGODlhAwBIAHAAACwAAAAAAwBIAIGAgIAAAAAAAAAAAAACDYSPqcvtD6OctNqLVQEAOw==",Gt="data:image/gif;base64,R0lGODlhAwBIAHAAACwAAAAAAwBIAIFwcHD///8AAAAAAAACGYSDqZvmwOJ6R1oKrcR60x5x4PSNimgiTgEAOw==",kt="data:image/gif;base64,R0lGODlhAwBIAHAAACwAAAAAAwBIAIFwcHAAJv8AAAAAAAACGYSDqZvmwOJ6R1oKrcR60x5x4PSNimgiTgEAOw==",Pt="data:image/gif;base64,R0lGODlhAwBIAIEAAAAAAGBgYP8AAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hZDcmVhdGVkIHdpdGggUGFpbnQuTkVUACH5BAkZAAAALAAAAAADAEgAAAINjI+py+0Po5y02otVAQAh+QQJGQAAACwAAAEAAwBGAAACF5SPecCtn5qDVDJaLYYW7Nd9SigiZGkUADs=";const Nt="disconnected",St="awaiting_start",Ft="charging",Lt="completed",Ut="error",Vt="ready_to_charge",jt={normal:{DEFAULT:Qt,disconnected:"data:image/gif;base64,R0lGODlhAwBIAHAAACwAAAAAAwBIAIFwcHBgYGD///8AAAACHYSDqZvmwOJ6R1oKrcR60x5x4EQJ5ommJ6a2qVMAADs=",awaitingStart:Gt,charging:"data:image/gif;base64,R0lGODlhAwBIAIAAAAAAAP///yH/C05FVFNDQVBFMi4wAwEAAAAh/hZDcmVhdGVkIHdpdGggUGFpbnQuTkVUACH5BAkZAAAALAAAQQADAAYAAAIEjI95BQAh+QQJGQAAACwAADkAAwAOAAACB4yPecCtnwoAIfkECRkAAAAsAAAxAAMAFgAAAgqMj3nArZ+ag7QAACH5BAkZAAAALAAAKQADAB4AAAIMjI95wK2fmoNUMkoLACH5BAkZAAAALAAAIQADACYAAAIOjI95wK2fmoNUMlothgUAIfkECRkAAAAsAAAZAAMALgAAAhGMj3nArZ+ag1QyWi2GFuxXAAAh+QQJGQAAACwAABEAAwA2AAACE4yPecCtn5qDVDJaLYYW7Nd9SgEAIfkECRkAAAAsAAAJAAMAPgAAAhWMj3nArZ+ag1QyWi2GFuzXfUooIgUAIfkECRkAAAAsAAABAAMARgAAAheMj3nArZ+ag1QyWi2GFuzXfUooImRpFAA7",completed:Gt,error:Pt,readyToCharge:Gt},smart:{DEFAULT:Qt,disconnected:"data:image/gif;base64,R0lGODlhAwBIAHAAACwAAAAAAwBIAIFwcHBgYGAAJv8AAAACHYSDqZvmwOJ6R1oKrcR60x5x4EQJ5ommJ6a2qVMAADs=",awaitingStart:kt,charging:"data:image/gif;base64,R0lGODlhAwBIAIAAAAAAAAAm/yH/C05FVFNDQVBFMi4wAwEAAAAh/hZDcmVhdGVkIHdpdGggUGFpbnQuTkVUACH5BAkZAAAALAAAQQADAAYAAAIEjI95BQAh+QQJGQAAACwAADkAAwAOAAACB4yPecCtnwoAIfkECRkAAAAsAAAxAAMAFgAAAgqMj3nArZ+ag7QAACH5BAkZAAAALAAAKQADAB4AAAIMjI95wK2fmoNUMkoLACH5BAkZAAAALAAAIQADACYAAAIOjI95wK2fmoNUMlothgUAIfkECRkAAAAsAAAZAAMALgAAAhGMj3nArZ+ag1QyWi2GFuxXAAAh+QQJGQAAACwAABEAAwA2AAACE4yPecCtn5qDVDJaLYYW7Nd9SgEAIfkECRkAAAAsAAAJAAMAPgAAAhWMj3nArZ+ag1QyWi2GFuzXfUooIgUAIfkECRkAAAAsAAABAAMARgAAAheMj3nArZ+ag1QyWi2GFuzXfUooImRpFAA7",completed:kt,error:Pt,readyToCharge:kt}},Wt="binary_sensor.plug",Tt="switch.cable_locked_permanently",Yt="binary_sensor.charging_state",qt="binary_sensor.basic_schedule",Xt="sensor.circuit_current",Rt="sensor.cost_per_kwh",Kt="sensor.dynamic_charger_limit",Jt="sensor.dynamic_circuit_limit",Zt="switch.enable_idle_current",_t="sensor.current",$t="switch.is_enabled",te="sensor.max_current",ee="sensor.max_circuit_limit",ie="sensor.offline_circuit_limit",oe="binary_sensor.status",se="sensor.output_limit",re="sensor.reason_for_no_current",ne="sensor.session_energy",ae="sensor.energy_per_hour",le="sensor.total_energy",ce="sensor.charging_power",he="binary_sensor.update_available",de="sensor.voltage",ge=[{name:"Generic",img:"data:image/png;base64,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"}],ue={"binary_sensor.plug":"mdi:lock","switch.cable_locked_permanently":"mdi:lock","binary_sensor.basic_schedule":"mdi:clock-check","sensor.circuit_current":"mdi:sine-wave","sensor.cost_per_kwh":"mdi:currency-usd","sensor.dynamic_charger_limit":"mdi:sine-wave","sensor.dynamic_circuit_limit":"mdi:sine-wave","switch.enable_idle_current":"mdi:current-dc","sensor.offline_circuit_limit":"mdi:sine-wave","sensor.current":"mdi:sine-wave","switch.is_enabled":"mdi:power","sensor.max_current":"mdi:sine-wave","sensor.max_circuit_limit":"mdi:sine-wave","binary_sensor.status":"mdi:wifi","sensor.output_limit":"mdi:sine-wave","sensor.reason_for_no_current":"mdi:alert-circle","sensor.session_energy":"mdi:flash","sensor.energy_per_hour":"mdi:flash","sensor.total_energy":"mdi:flash","switch.smart_charging":"mdi:auto-fix","sensor.charging_power":"mdi:flash","binary_sensor.update_available":"mdi:file-download","sensor.voltage":"mdi:sine-wave"},Ae=[{name:"theme_default",desc:"Default HA colors"},{name:"theme_custom",desc:"Use custom theme"},{name:"theme_transp_blue",desc:"Transparent Blue"},{name:"theme_transp_black",desc:"Transparent Black"},{name:"theme_transp_white",desc:"Transparent White"},{name:"theme_lightgrey_blue",desc:"LightGrey Blue"}];let pe=class extends K{constructor(){super(...arguments),this._initialized=!1}setConfig(t){this._config=t,this._config.entity||(this._config.entity=this.getEntitiesByType("binary_sensor")[0]||"",this._config.smartChargingEntity=this.getEntitiesByType("input_boolean")[0]||"",pt(this,"config-changed",{config:this._config})),this.loadCardHelpers()}shouldUpdate(){return this._initialized||this._initialize(),!0}get _entity(){return this._config&&this._config.entity||""}get _smartChargingEntity(){return this._config&&this._config.smartChargingEntity||""}get _customImage(){return this._config&&this._config.customImage||""}get _chargerImage(){return this._config&&this._config.chargerImage||"Generic"}get _customCardTheme(){return this._config?this._config.customCardTheme||"":"theme_default"}get showName(){return!this._config||(void 0===this._config.show_name||this._config.show_name)}get showLeds(){return!this._config||(void 0===this._config.show_leds||this._config.show_leds)}get showStatus(){return!this._config||(void 0===this._config.show_status||this._config.show_status)}get showToolbar(){return!this._config||(void 0===this._config.show_toolbar||this._config.show_toolbar)}get showStats(){return!this._config||(void 0===this._config.show_stats||this._config.show_stats)}get showCollapsibles(){return!this._config||(void 0===this._config.show_collapsibles||this._config.show_collapsibles)}get compactView(){return!!this._config&&(void 0!==this._config.compact_view&&this._config.compact_view)}getEntitiesByType(t){return this.hass?Object.keys(this.hass.states).filter((e=>e.substr(0,e.indexOf("."))===t)):[]}render(){if(!this.hass)return H``;const t=Object.keys(this.hass.states).filter((t=>"binary_sensor"===t.substr(0,t.indexOf(".")))),e=Object.keys(this.hass.states).filter((t=>"input_boolean"===t.substr(0,t.indexOf("."))));return H`
      <div class="card-config">

        <paper-dropdown-menu label="${Ht("editor.entity")}" @value-changed=${this._valueChanged} .configValue=${"entity"}>
            <paper-listbox slot="dropdown-content" .selected=${t.indexOf(this._entity)}>
              ${t.map((t=>H`
                  <paper-item>${t}</paper-item>
                `))}
            </paper-listbox>
        </paper-dropdown-menu>

        <paper-dropdown-menu label="${Ht("editor.smartChargingEntity")}" @value-changed=${this._valueChanged} .configValue=${"smartChargingEntity"}>
            <paper-listbox slot="dropdown-content" .selected=${e.indexOf(this._smartChargingEntity)}>
              ${e.map((t=>H`
                  <paper-item>${t}</paper-item>
                `))}
            </paper-listbox>
        </paper-dropdown-menu>

        <paper-dropdown-menu label="${Ht("editor.theme")}" @value-changed=${this._valueChanged} .configValue=${"customCardTheme"}>
            <paper-listbox slot="dropdown-content" selected="${this._customCardTheme}" attr-for-selected="value">
              ${Ae.map((t=>H`
                  <paper-item value="${t.name}">${t.name}</paper-item>
                `))}
            </paper-listbox>
        </paper-dropdown-menu>


              <paper-dropdown-menu label="${Ht("editor.chargerImage")}" @value-changed=${this._valueChanged} .configValue=${"chargerImage"}>
                <paper-listbox slot="dropdown-content" selected="${this._chargerImage}" attr-for-selected="value">
                  ${ge.map((t=>H`
                      <paper-item value="${t.name}">${t.name}</paper-item>
                    `))}
                </paper-listbox>
              </paper-dropdown-menu>


              <paper-input label="${Ht("editor.customImage")}" .value=${this._customImage} .configValue=${"customImage"} @value-changed=${this._valueChanged}"></paper-input>

          <p class="option">
            <ha-switch
              aria-label=${Ht(this.compactView?"editor.compact_view_aria_label_off":"editor.compact_view_aria_label_on")}
              .checked=${!1!==this.compactView}
              .configValue=${"compact_view"}
              @change=${this._valueChanged}
            >
            </ha-switch>
            ${Ht("editor.compact_view")}
          </p>

          <p class="option">
            <ha-switch
              aria-label=${Ht(this.showName?"editor.show_name_aria_label_off":"editor.show_name_aria_label_on")}
              .checked=${this.showName}
              .configValue=${"show_name"}
              @change=${this._valueChanged}
            >
            </ha-switch>
            ${Ht("editor.show_name")}
          </p>

          <p class="option">
            <ha-switch
              aria-label=${Ht(this.showLeds?"editor.show_leds_aria_label_off":"editor.show_leds_aria_label_on")}
              .checked=${!1!==this.showLeds}
              .configValue=${"show_leds"}
              @change=${this._valueChanged}
            >
            </ha-switch>
            ${Ht("editor.show_leds")}
          </p>


          <p class="option">
            <ha-switch
              aria-label=${Ht(this.showStatus?"editor.show_status_aria_label_off":"editor.show_status_aria_label_on")}
              .checked=${!1!==this.showStatus}
              .configValue=${"show_status"}
              @change=${this._valueChanged}
            >
            </ha-switch>
            ${Ht("editor.show_status")}
          </p>

          <p class="option">
          <ha-switch
            aria-label=${Ht(this.showCollapsibles?"editor.show_collapsibles_aria_label_off":"editor.show_collapsibles_aria_label_on")}
            .checked=${!1!==this.showCollapsibles}
            .configValue=${"show_collapsibles"}
            @change=${this._valueChanged}
          >
          </ha-switch>
          ${Ht("editor.show_collapsibles")}
        </p>

          <p class="option">
            <ha-switch
              aria-label=${Ht(this.showStats?"editor.show_stats_aria_label_off":"editor.show_stats_aria_label_on")}
              .checked=${this.showStats}
              .configValue=${"show_stats"}
              @change=${this._valueChanged}
            >
            </ha-switch>
            ${Ht("editor.show_stats")}
          </p>




          <p class="option">
            <ha-switch
              aria-label=${Ht(this.showToolbar?"editor.show_toolbar_aria_label_off":"editor.show_toolbar_aria_label_on")}
              .checked=${!1!==this.showToolbar}
              .configValue=${"show_toolbar"}
              @change=${this._valueChanged}
            >
            </ha-switch>
            ${Ht("editor.show_toolbar")}
          </p>


        </div>
      `}_initialize(){void 0!==this.hass&&void 0!==this._config&&void 0!==this._helpers&&(this._initialized=!0)}async loadCardHelpers(){this._helpers=await window.loadCardHelpers()}_valueChanged(t){if(!this._config||!this.hass)return void console.log("C: no config");const e=t.target;this[`_${e.configValue}`]!==e.value&&(e.configValue&&(""===e.value?delete this._config[e.configValue]:this._config=Object.assign(Object.assign({},this._config),{[e.configValue]:void 0!==e.checked?e.checked:e.value})),pt(this,"config-changed",{config:this._config}))}static get styles(){return r`
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
    `}};t([_({attribute:!1})],pe.prototype,"hass",void 0),t([$()],pe.prototype,"_config",void 0),t([$()],pe.prototype,"_toggle",void 0),t([$()],pe.prototype,"_helpers",void 0),pe=t([J("keba-charger-card-editor")],pe);var me=r`
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

  .keba-leds {
    position: absolute;
    left: 221px;
    top: 109px;
    background: lime;
    margin-right: auto;
    margin-left: auto;
    animation: blink 3s infinite;
    width: 42px;
    height: 3px;
    border-radius: 2px;
  }

  .keba-leds-green {
    background: lime;
  }

  .keba-leds-blue {
    background: blue;
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
`;console.info("%cKEBA-CHARGER-CARD 0.0.2 IS INSTALLED","color: green; font-weight: bold",""),window.customCards=window.customCards||[],window.customCards.push({type:"keba-charger-card",name:"Keba Charger Card Card",description:"A keba charger card for visualizing the status and interacting with your Keba P30"});let we=class extends K{static get styles(){return me}static async getConfigElement(){return document.createElement("keba-charger-card-editor")}static getStubConfig(t){const[e]=t.filter((t=>"binary_sensor"===t.substr(0,t.indexOf("."))));return{entity:e||"",image:"default"}}get entity(){return null!=this.config.entity?this.hass.states[this.config.entity]:void 0}get smartChargingEntity(){return null!=this.config.smartChargingEntity?this.hass.states[this.config.smartChargingEntity]:void 0}get scriptDomain(){return void 0===this.config.domain?"script":this.config.domain}get status(){if("off"==this.getEntityState(this.getEntity(Wt)))return Nt;return"on"==this.getEntityState(this.getEntity(Yt))?Ft:this.smartChargingEntity&&"on"==this.smartChargingEntity.state?St:Vt}get image(){const t=this.config.chargerImage||"Generic",e=ge.find((({name:e})=>e===t?e:void 0));if(void 0===this.config.customImage||""===this.config.customImage)try{return void 0===e?void 0:e.img}catch(t){return""}return this.config.customImage}get customCardTheme(){return void 0===this.config.customCardTheme?"theme_default":this.config.customCardTheme}get showLeds(){return void 0===this.config.show_leds||this.config.show_leds}get showName(){return void 0===this.config.show_name||this.config.show_name}get showStatus(){return void 0===this.config.show_status||this.config.show_status}get showStats(){return void 0===this.config.show_stats||this.config.show_stats}get showCollapsibles(){return void 0===this.config.show_collapsibles||this.config.show_collapsibles}get showToolbar(){return void 0===this.config.show_toolbar||this.config.show_toolbar}get compactView(){return void 0!==this.config.compact_view&&this.config.compact_view}get entityBasename(){return void 0===this.config.entity?"":this.config.entity.split(".")[1].replace("_status","")}getEntityId(t){try{return t.split(".")[0]+"."+this.entityBasename+"_"+t.split(".")[1]}catch(t){return}}getEntityBase(t){try{return t.split(".")[0]+"."+t.split(".")[1].replace(this.entityBasename+"_","")}catch(t){return}}getEntities(){return{cableLocked:this.getEntity(Wt),cableLockedPermanently:this.getEntity(Tt),chargingState:this.getEntity(Yt),basicSchedule:this.getEntity(qt),circuitCurrent:this.getEntity(Xt),costPerKwh:this.getEntity(Rt),dynamicChargerCurrent:this.getEntity(Kt),dynamicCircuitCurrent:this.getEntity(Jt),enableIdleCurrent:this.getEntity(Zt),offlineCircuitCurrent:this.getEntity(ie),inCurrent:this.getEntity(_t),isEnabled:this.getEntity($t),maxChargerCurrent:this.getEntity(te),maxCircuitCurrent:this.getEntity(ee),isOnline:this.getEntity(oe),outputCurrent:this.getEntity(se),reasonForNoCurrent:this.getEntity(re),sessionEnergy:this.getEntity(ne),energyPerHour:this.getEntity(ae),energyLifetime:this.getEntity(le),smartCharging:this.smartChargingEntity,totalPower:this.getEntity(ce),updateAvailable:this.getEntity(he),voltage:this.getEntity(de),status:this.entity}}getEntity(t){try{const e=this.getEntityId(t);return void 0===e?void 0:this.hass.states[e]}catch(t){return}}getEntityState(t){try{return t.state}catch(t){return}}getEntityAttribute(t,e){try{return t.attributes[e]}catch(t){return}}getStatsDefault(t){switch(t){case Nt:return[{entityId:this.getEntityId(ne),unit:"kWh",subtitle:Ht("charger_status.sessionEnergy")},{entityId:this.getEntityId(te),unit:"A",subtitle:"Current Limit"},{entityId:this.getEntityId(Wt),unit:"",subtitle:"Locked"}];case St:return[{entityId:this.getEntityId(te),unit:"A",subtitle:"Current Limit"},{entityId:this.getEntityId(ne),unit:"kWh",subtitle:Ht("charger_status.sessionEnergy")},{entityId:this.smartChargingEntity?this.smartChargingEntity.entity_id:"",unit:"",subtitle:"Smart Charging"}];case Ft:return[{entityId:this.getEntityId(ne),unit:"kWh",subtitle:"Energy"},{entityId:this.getEntityId(te),unit:"A",subtitle:"Current Limit"},{entityId:this.getEntityId(Xt),unit:"A",subtitle:"Circuit"},{entityId:this.getEntityId(se),unit:"A",subtitle:"Allowed"},{entityId:this.getEntityId(_t),unit:"A",subtitle:"Actual"},{entityId:this.getEntityId(ce),unit:"kW",subtitle:"Power"},{entityId:this.smartChargingEntity?this.smartChargingEntity.entity_id:"",unit:"",subtitle:"Smart Charging"}];case Lt:case Ut:return[{entityId:this.getEntityId(ne),unit:"kWh",subtitle:Ht("charger_status.sessionEnergy")},{entityId:this.getEntityId(te),unit:"A",subtitle:"Current Limit"}];case Vt:return[{entityId:this.getEntityId(ne),unit:"kWh",subtitle:Ht("charger_status.sessionEnergy")},{entityId:this.getEntityId(te),unit:"A",subtitle:"Current Limit"},{entityId:this.getEntityId(qt),unit:"",subtitle:"Schedule"}]}return[]}setConfig(t){if(!t.entity)throw new Error(Ht("error.missing_entity"));this.config=t}getCardSize(){return 2}shouldUpdate(t){return function(t,e,i){if(e.has("config")||i)return!0;if(t.config.entity){var o=e.get("hass");return!o||o.states[t.config.entity]!==t.hass.states[t.config.entity]}return!1}(this,t,!0)}updated(t){this.config.entity&&t.get("hass")&&t.get("hass").states[this.config.entity].state!==this.hass.states[this.config.entity].state&&(this.requestInProgress=!1)}handleMore(t){t&&t.entity_id&&pt(this,"hass-more-info",{entityId:t.entity_id},{bubbles:!0,composed:!0})}callService(t,e=!0,i={}){this.hass.callService(this.scriptDomain,t,Object.assign({},i)),e&&this.requestUpdate()}imageLed(t,e){const i=e?"smart":"normal";return jt[i][t]||jt[i].DEFAULT}renderImage(t){let e="";return this.compactView&&(e="-compact"),this.image?H`
      <img
        class="charger${e}"
        src="${this.image}"
        @click="${()=>this.handleMore(this.entity)}"
        ?more-info="true"
      />${this.renderLeds(t)}
    `:H``}renderLeds(t){return console.log(t),this.showLeds?t===Ft?H`<div class="keba-leds keba-leds-green"></div>`:H`<div class="keba-leds keba-leds-blue"></div>`:H``}renderStats(t){if(!this.showStats)return H``;let e="";this.compactView&&(e="-compact");const i=this.getStatsDefault(t)||[];return H` <div class="stats${e}">${this.renderStatsList(i)}</div> `}renderStatsList(t){return t.map((({entityId:t,attribute:e,calcValue:i,unit:o,subtitle:s})=>{if(!(t||e||i))return H``;if(i)return this.renderStatsHtml(i,o,s,this.hass.states[t]);try{const i=e?this.hass.states[t].attributes[e]:this.hass.states[t].state;return this.renderStatsHtml(i,o,s,this.hass.states[t])}catch(t){return null}}))}renderStatsHtml(t,e,i,o){return H`
      <div class="stats-block" @click="${()=>this.handleMore(o)}" ?more-info="true">
        <span class="stats-value">${t}</span>
        ${e}
        <div class="stats-subtitle">${i}</div>
      </div>
    `}renderName(){if(!this.showName)return H``;let t="";return this.compactView&&(t="-compact"),H` <div class="charger-name${t}">Keba P30</div> `}renderStatus(){if(!this.showStatus)return H``;let t="";this.compactView&&(t="-compact");const e=Ht(`status.${this.status}`)||this.status;return H`
      <div class="status${t}">
        <span class="status-text${t}" alt=${e}> ${e} </span>
        <ha-circular-progress .active=${this.requestInProgress} size="small"></ha-circular-progress>
      </div>
    `}renderCollapsibleInfo(){if(!this.showCollapsibles)return H``;const{isOnline:t,totalPower:e,sessionEnergy:i,energyLifetime:o}=this.getEntities(),s=Ht("common.click_for_info");return H`
      <div>
        <input id="collapsible-info" class="toggle-info" type="checkbox" />
        <label for="collapsible-info" class="lbl-toggle-info">
          <div class="tooltip-right">
            <ha-icon icon="mdi:information"></ha-icon>
            <span class="tooltiptext-right">${s}</span>
          </div>
        </label>
        <div class="collapsible-content-info">
          <div class="content-inner-info">
            ${this.renderCollapsibleItems(t,Ht("common.online"))}
            ${this.renderCollapsibleItems(e,Ht("common.power"))}
            ${this.renderCollapsibleItems(i,Ht("charger_status.sessionEnergy"))}
            ${this.renderCollapsibleItems(o,Ht("common.lifetime_energy"),!0)}
          </div>
        </div>
      </div>
    `}renderCollapsibleItems(t,e,i=!1){if(null==t)return H``;const o=i?Math.round(this.getEntityState(t)):this.getEntityState(t),s=this.renderIcon(t),r=this.getEntityAttribute(t,"unit_of_measurement");return H`
      <div class="collapsible-item" @click="${()=>this.handleMore(t)}" ?more-info="true">
        <div class="tooltip">
          <ha-icon icon="${s}"></ha-icon>
          <br />${o} ${r}
          <span class="tooltiptext">${e}</span>
        </div>
      </div>
    `}renderInfoItemsLeft(){const{isOnline:t}=this.getEntities();return H` ${this.renderInfoItem(t,Ht("common.online"))} `}renderInfoItemsRight(){const{cableLocked:t,totalPower:e,voltage:i}=this.getEntities(),o=t&&"on"==t.state?"mdi:power-plug":"mdi:power-plug-off";return H`
      ${this.renderInfoItem(i,Ht("common.voltage"),!0)}
      ${this.renderInfoItem(e,Ht("common.power"))}
      <ha-icon icon="${o}"></ha-icon>
    `}renderInfoItemsCompact(){const{totalPower:t,voltage:e}=this.getEntities();return H`
      ${this.renderInfoItem(e,Ht("common.voltage"),!0)}
      ${this.renderInfoItem(t,Ht("common.power"),!0)}
    `}renderInfoItem(t,e,i=!1){if(null==t)return H``;const o=i?Math.round(this.getEntityState(t)):this.getEntityState(t),s=this.getEntityAttribute(t,"unit_of_measurement"),r=this.renderIcon(t);return H`
      <div class="infoitems-item" @click="${()=>this.handleMore(t)}" ?more-info="true">
        <div class="tooltip">
          <ha-icon icon="${r}"></ha-icon>
          ${o} ${s}
          <span class="tooltiptext">${e}</span>
        </div>
      </div>
    `}renderIcon(t){const e=t.entity_id,i=this.getEntityBase(e);return void 0!==this.getEntityAttribute(t,"icon")?this.getEntityAttribute(t,"icon"):(void 0===i?null:ue[i])||"mdi:cancel"}renderToolbar(t){if(!this.showToolbar)return H``;let e=H``;switch(t){case Nt:case Ut:return H``;case St:e=H`
          ${this.renderToolbarButton("keba_off","hass:stop","common.stop")}
          ${this.renderToolbarButton("keba_fast","mdi:fast-forward","common.start_fast")}
          ${this.renderToolbarButton("keba_slow","mdi:play","common.start_slow")}
        `;break;case Ft:e=H`
          ${this.renderToolbarButton("keba_off","hass:stop","common.stop")}
          ${this.renderToolbarButton("keba_fast","mdi:fast-forward","common.start_fast")}
          ${this.renderToolbarButton("keba_slow","mdi:play","common.start_slow")}
          ${this.renderToolbarButton("keba_auto","mdi:play-speed","common.start_smart")}
        `;break;case Lt:case Vt:e=H`
          ${this.renderToolbarButton("keba_fast","mdi:fast-forward","common.start_fast")}
          ${this.renderToolbarButton("keba_slow","mdi:play","common.start_slow")}
          ${this.renderToolbarButton("keba_auto","mdi:play-speed","common.start_smart")}
        `}return H`
      <div class="toolbar">
        ${e}
        <div class="fill-gap"></div>
      </div>
    `}renderToolbarButton(t,e,i,o={},s=!0){let r="";try{r=Ht(i)}catch(t){r=i}return H`
      <div class="tooltip">
        <ha-icon-button
          icon="${e}"
          title="${r}"
          @click="${()=>this.callService(t,s,o)}"
        ></ha-icon-button>
        <span class="tooltiptext">${r}</span>
      </div>
    `}renderCompact(){const t=this.status;return H`
      <ha-card>
        <div class="preview-compact">
          ${this.renderImage(t)}

          <div class="metadata">${this.renderName()} ${this.renderStatus()}</div>

          <div class="infoitems">${this.renderInfoItemsCompact()}</div>

          ${this.renderStats(t)}
        </div>

        ${this.renderToolbar(t)}
      </ha-card>
    `}renderFull(){const t=this.status;return H`
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
    `}renderCustomCardTheme(){switch(this.customCardTheme){case"theme_custom":break;default:this.style.setProperty("--custom-card-background-color","#03A9F4"),this.style.setProperty("--custom-text-color","#FFFFFF"),this.style.setProperty("--custom-primary-color","#03A9F4"),this.style.setProperty("--custom-icon-color","#FFFFFF");break;case"theme_transp_blue":this.style.setProperty("--custom-card-background-color","transparent"),this.style.setProperty("--custom-text-color","#03A9F4"),this.style.setProperty("--custom-primary-color","#03A9F4"),this.style.setProperty("--custom-icon-color","#03A9F4");break;case"theme_transp_black":this.style.setProperty("--custom-card-background-color","transparent"),this.style.setProperty("--custom-text-color","black"),this.style.setProperty("--custom-primary-color","black"),this.style.setProperty("--custom-icon-color","black");break;case"theme_transp_white":this.style.setProperty("--custom-card-background-color","transparent"),this.style.setProperty("--custom-text-color","white"),this.style.setProperty("--custom-primary-color","white"),this.style.setProperty("--custom-icon-color","white");break;case"theme_lightgrey_blue":this.style.setProperty("--custom-card-background-color","lightgrey"),this.style.setProperty("--custom-text-color","#03A9F4"),this.style.setProperty("--custom-primary-color","#03A9F4"),this.style.setProperty("--custom-icon-color","#03A9F4")}}render(){return this.renderCustomCardTheme(),this.entity?this.compactView?this.renderCompact():this.renderFull():H`
        <ha-card>
          <div class="preview not-available">
            <div class="metadata">
              <div class="not-available">${Ht("common.not_available")}</div>
            </div>
          </div>
        </ha-card>
      `}};t([_({attribute:!1})],we.prototype,"hass",void 0),t([$()],we.prototype,"config",void 0),t([_({attribute:!1})],we.prototype,"requestInProgress",void 0),we=t([J("keba-charger-card")],we);export{we as ChargerCard};
