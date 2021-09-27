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
function t(t,e,i,r){var o,s=arguments.length,n=s<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}const e=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new Map;class o{constructor(t,e){if(this._$cssResult$=!0,e!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let t=r.get(this.cssText);return e&&void 0===t&&(r.set(this.cssText,t=new CSSStyleSheet),t.replaceSync(this.cssText)),t}toString(){return this.cssText}}const s=(t,...e)=>{const r=1===t.length?t[0]:e.reduce(((e,i,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[r+1]),t[0]);return new o(r,i)},n=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",i))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var a,l;const c={toAttribute(t,e){switch(e){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},d=(t,e)=>e!==t&&(e==e||t==t),h={attribute:!0,type:String,converter:c,reflect:!1,hasChanged:d};class p extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;null!==(e=this.l)&&void 0!==e||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const r=this._$Eh(i,e);void 0!==r&&(this._$Eu.set(r,i),t.push(r))})),t}static createProperty(t,e=h){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,r=this.getPropertyDescriptor(t,i,e);void 0!==r&&Object.defineProperty(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(r){const o=this[t];this[e]=r,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||h}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eh(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ev=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Ep(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$Em)&&void 0!==e?e:this._$Em=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$Em)||void 0===e||e.splice(this._$Em.indexOf(t)>>>0,1)}_$Ep(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const i=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{e?t.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):i.forEach((e=>{const i=document.createElement("style"),r=window.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=e.cssText,t.appendChild(i)}))})(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$Eg(t,e,i=h){var r,o;const s=this.constructor._$Eh(t,i);if(void 0!==s&&!0===i.reflect){const n=(null!==(o=null===(r=i.converter)||void 0===r?void 0:r.toAttribute)&&void 0!==o?o:c.toAttribute)(e,i.type);this._$Ei=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Ei=null}}_$AK(t,e){var i,r,o;const s=this.constructor,n=s._$Eu.get(t);if(void 0!==n&&this._$Ei!==n){const t=s.getPropertyOptions(n),a=t.converter,l=null!==(o=null!==(r=null===(i=a)||void 0===i?void 0:i.fromAttribute)&&void 0!==r?r:"function"==typeof a?a:null)&&void 0!==o?o:c.fromAttribute;this._$Ei=n,this[n]=l(e,t.type),this._$Ei=null}}requestUpdate(t,e,i){let r=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||d)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Ei!==t&&(void 0===this._$ES&&(this._$ES=new Map),this._$ES.set(t,i))):r=!1),!this.isUpdatePending&&r&&(this._$Ev=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ev}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,e)=>this[e]=t)),this._$Et=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$ET()}catch(t){throw e=!1,this._$ET(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$Em)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$ET(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ev}shouldUpdate(t){return!0}update(t){void 0!==this._$ES&&(this._$ES.forEach(((t,e)=>this._$Eg(e,this[e],t))),this._$ES=void 0),this._$ET()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var u,g;p.finalized=!0,p.elementProperties=new Map,p.elementStyles=[],p.shadowRootOptions={mode:"open"},null===(a=globalThis.reactiveElementPolyfillSupport)||void 0===a||a.call(globalThis,{ReactiveElement:p}),(null!==(l=globalThis.reactiveElementVersions)&&void 0!==l?l:globalThis.reactiveElementVersions=[]).push("1.0.0");const f=globalThis.trustedTypes,m=f?f.createPolicy("lit-html",{createHTML:t=>t}):void 0,b=`lit$${(Math.random()+"").slice(9)}$`,y="?"+b,A=`<${y}>`,v=document,x=(t="")=>v.createComment(t),w=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,V=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,C=/-->/g,z=/>/g,k=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,S=/'/g,M=/"/g,P=/^(?:script|style|textarea)$/i,X=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),j=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),H=new WeakMap,q=v.createTreeWalker(v,129,null,!1),U=(t,e)=>{const i=t.length-1,r=[];let o,s=2===e?"<svg>":"",n=V;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,d=0;for(;d<i.length&&(n.lastIndex=d,l=n.exec(i),null!==l);)d=n.lastIndex,n===V?"!--"===l[1]?n=C:void 0!==l[1]?n=z:void 0!==l[2]?(P.test(l[2])&&(o=RegExp("</"+l[2],"g")),n=k):void 0!==l[3]&&(n=k):n===k?">"===l[0]?(n=null!=o?o:V,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?k:'"'===l[3]?M:S):n===M||n===S?n=k:n===C||n===z?n=V:(n=k,o=void 0);const h=n===k&&t[e+1].startsWith("/>")?" ":"";s+=n===V?i+A:c>=0?(r.push(a),i.slice(0,c)+"$lit$"+i.slice(c)+b+h):i+b+(-2===c?(r.push(void 0),e):h)}const a=s+(t[i]||"<?>")+(2===e?"</svg>":"");return[void 0!==m?m.createHTML(a):a,r]};class K{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let o=0,s=0;const n=t.length-1,a=this.parts,[l,c]=U(t,e);if(this.el=K.createElement(l,i),q.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(r=q.nextNode())&&a.length<n;){if(1===r.nodeType){if(r.hasAttributes()){const t=[];for(const e of r.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(b)){const i=c[s++];if(t.push(e),void 0!==i){const t=r.getAttribute(i.toLowerCase()+"$lit$").split(b),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?J:"?"===e[1]?D:"@"===e[1]?F:W})}else a.push({type:6,index:o})}for(const e of t)r.removeAttribute(e)}if(P.test(r.tagName)){const t=r.textContent.split(b),e=t.length-1;if(e>0){r.textContent=f?f.emptyScript:"";for(let i=0;i<e;i++)r.append(t[i],x()),q.nextNode(),a.push({type:2,index:++o});r.append(t[e],x())}}}else if(8===r.nodeType)if(r.data===y)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=r.data.indexOf(b,t+1));)a.push({type:7,index:o}),t+=b.length-1}o++}}static createElement(t,e){const i=v.createElement("template");return i.innerHTML=t,i}}function I(t,e,i=t,r){var o,s,n,a;if(e===j)return e;let l=void 0!==r?null===(o=i._$Cl)||void 0===o?void 0:o[r]:i._$Cu;const c=w(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(s=null==l?void 0:l._$AO)||void 0===s||s.call(l,!1),void 0===c?l=void 0:(l=new c(t),l._$AT(t,i,r)),void 0!==r?(null!==(n=(a=i)._$Cl)&&void 0!==n?n:a._$Cl=[])[r]=l:i._$Cu=l),void 0!==l&&(e=I(t,l._$AS(t,e.values),l,r)),e}class Z{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:i},parts:r}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:v).importNode(i,!0);q.currentNode=o;let s=q.nextNode(),n=0,a=0,l=r[0];for(;void 0!==l;){if(n===l.index){let e;2===l.type?e=new T(s,s.nextSibling,this,t):1===l.type?e=new l.ctor(s,l.name,l.strings,this,t):6===l.type&&(e=new R(s,this,t)),this.v.push(e),l=r[++a]}n!==(null==l?void 0:l.index)&&(s=q.nextNode(),n++)}return o}m(t){let e=0;for(const i of this.v)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class T{constructor(t,e,i,r){var o;this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cg=null===(o=null==r?void 0:r.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=I(this,t,e),w(t)?t===E||null==t||""===t?(this._$AH!==E&&this._$AR(),this._$AH=E):t!==this._$AH&&t!==j&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.S(t):(t=>{var e;return O(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])})(t)?this.M(t):this.$(t)}A(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}S(t){this._$AH!==t&&(this._$AR(),this._$AH=this.A(t))}$(t){this._$AH!==E&&w(this._$AH)?this._$AA.nextSibling.data=t:this.S(v.createTextNode(t)),this._$AH=t}T(t){var e;const{values:i,_$litType$:r}=t,o="number"==typeof r?this._$AC(t):(void 0===r.el&&(r.el=K.createElement(r.h,this.options)),r);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.m(i);else{const t=new Z(o,this),e=t.p(this.options);t.m(i),this.S(e),this._$AH=t}}_$AC(t){let e=H.get(t.strings);return void 0===e&&H.set(t.strings,e=new K(t)),e}M(t){O(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const o of t)r===e.length?e.push(i=new T(this.A(x()),this.A(x()),this,this.options)):i=e[r],i._$AI(o),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cg=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class W{constructor(t,e,i,r,o){this.type=1,this._$AH=E,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=E}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,r){const o=this.strings;let s=!1;if(void 0===o)t=I(this,t,e,0),s=!w(t)||t!==this._$AH&&t!==j,s&&(this._$AH=t);else{const r=t;let n,a;for(t=o[0],n=0;n<o.length-1;n++)a=I(this,r[i+n],e,n),a===j&&(a=this._$AH[n]),s||(s=!w(a)||a!==this._$AH[n]),a===E?t=E:t!==E&&(t+=(null!=a?a:"")+o[n+1]),this._$AH[n]=a}s&&!r&&this.k(t)}k(t){t===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class J extends W{constructor(){super(...arguments),this.type=3}k(t){this.element[this.name]=t===E?void 0:t}}class D extends W{constructor(){super(...arguments),this.type=4}k(t){t&&t!==E?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class F extends W{constructor(t,e,i,r,o){super(t,e,i,r,o),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=I(this,t,e,0))&&void 0!==i?i:E)===j)return;const r=this._$AH,o=t===E&&r!==E||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==E&&(r===E||o);o&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class R{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){I(this,t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var L,B,N;null===(u=globalThis.litHtmlPolyfillSupport)||void 0===u||u.call(globalThis,K,T),(null!==(g=globalThis.litHtmlVersions)&&void 0!==g?g:globalThis.litHtmlVersions=[]).push("2.0.0");class Q extends p{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,e,i)=>{var r,o;const s=null!==(r=null==i?void 0:i.renderBefore)&&void 0!==r?r:e;let n=s._$litPart$;if(void 0===n){const t=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;s._$litPart$=n=new T(e.insertBefore(x(),t),t,void 0,null!=i?i:{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return j}}Q.finalized=!0,Q._$litElement$=!0,null===(L=globalThis.litElementHydrateSupport)||void 0===L||L.call(globalThis,{LitElement:Q}),null===(B=globalThis.litElementPolyfillSupport)||void 0===B||B.call(globalThis,{LitElement:Q}),(null!==(N=globalThis.litElementVersions)&&void 0!==N?N:globalThis.litElementVersions=[]).push("3.0.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const G=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:r}=e;return{kind:i,elements:r,finisher(e){window.customElements.define(t,e)}}})(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,Y=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function _(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):Y(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function $(t){return _({...t,state:!0})}var tt="[^\\s]+";function et(t,e){for(var i=[],r=0,o=t.length;r<o;r++)i.push(t[r].substr(0,e));return i}var it=function(t){return function(e,i){var r=i[t].map((function(t){return t.toLowerCase()})),o=r.indexOf(e.toLowerCase());return o>-1?o:null}};function rt(t){for(var e=[],i=1;i<arguments.length;i++)e[i-1]=arguments[i];for(var r=0,o=e;r<o.length;r++){var s=o[r];for(var n in s)t[n]=s[n]}return t}var ot=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],st=["January","February","March","April","May","June","July","August","September","October","November","December"],nt=et(st,3),at={dayNamesShort:et(ot,3),dayNames:ot,monthNamesShort:nt,monthNames:st,amPm:["am","pm"],DoFn:function(t){return t+["th","st","nd","rd"][t%10>3?0:(t-t%10!=10?1:0)*t%10]}},lt=(rt({},at),function(t){return+t-1}),ct=[null,"[1-9]\\d?"],dt=[null,tt],ht=["isPm",tt,function(t,e){var i=t.toLowerCase();return i===e.amPm[0]?0:i===e.amPm[1]?1:null}],pt=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(t){var e=(t+"").match(/([+-]|\d\d)/gi);if(e){var i=60*+e[1]+parseInt(e[2],10);return"+"===e[0]?i:-i}return 0}];it("monthNamesShort"),it("monthNames");var ut,gt;!function(){try{(new Date).toLocaleDateString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(t){return"RangeError"===t.name}}(),function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(ut||(ut={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(gt||(gt={}));var ft=function(t,e,i,r){r=r||{},i=null==i?{}:i;var o=new Event(e,{bubbles:void 0===r.bubbles||r.bubbles,cancelable:Boolean(r.cancelable),composed:void 0===r.composed||r.composed});return o.detail=i,t.dispatchEvent(o),o};var mt={disconnected:"Disconnected",awaiting_start:"Paused or awaiting start",charging:"Charging",completed:"Completed or awaiting car",error:"Error",ready_to_charge:"Ready to charge"},bt={name:"Charger Card",description:"Charger card allows you to control your charging robot.",start:"Start",start_fast:"Start (fast)",start_slow:"Start (slow)",start_smart:"Start (smart)",continue:"Resume",pause:"Pause",stop:"Stop",override:"Override schedule",reboot:"Reboot charger",not_available:"Charger not available",click_for_info:"Click for Info",click_for_config:"Click for Config",click_for_limits:"Click for Limits",online:"Online",voltage:"Voltage",power:"Power",charger_current:"Changer Current",energy_per_hour:"Energy per Hour",lifetime_energy:"Lifetime Energy",circuit_current:"Circuit Energy"},yt={missing_entity:"Specifying entity is required!"},At={entity:"Entity (Required)",smartChargingEntity:"Entity for smart charging",chargerImage:"Charger image and color",customImage:"Custom image (Optional - overrides charger image)",theme:"Color theme",compact_view:"Compact View",compact_view_aria_label_on:"Toggle compact view on",compact_view_aria_label_off:"Toggle compact view off",show_name:"Show Name",show_name_aria_label_on:"Toggle display name on",show_name_aria_label_off:"Toggle display name off",show_leds:"Show Leds",show_leds_aria_label_on:"Toggle animated leds (overlay on image) on",show_leds_aria_label_off:"Toggle animated leds (overlay on image) off",show_status:"Show Status",show_status_aria_label_on:"Toggle display status on",show_status_aria_label_off:"Toggle display status off",show_stats:"Show Data Table (stats)",show_stats_aria_label_on:"Toggle display data table on",show_stats_aria_label_off:"Toggle display data table off",show_collapsibles:"Show collapsible menu buttons",show_collapsibles_aria_label_on:"Toggle display collapsible menus on",show_collapsibles_aria_label_off:"Toggle display collapsible menus off",show_toolbar:"Show Toolbar",show_toolbar_aria_label_on:"Toggle display toolbar on",show_toolbar_aria_label_off:"Toggle display toolbar off",code_only_note:"Note: Custom actions and data table (stats) options are available exclusively using Code Editor manually."},vt={sessionEnergy:"Session Energy"},xt={not_requesting_current:"Not requesting current",ok:"Ok",pending_schedule:"Pending Schedule",none:"None",max_circuit_current_too_low:"Max circuit current too low",max_dynamic_circuit_current_too_low:"Max dynamic circuit current too low",max_dynamic_offline_fallback_circuit_current_too_low:"Max dynamic offline circuit current too low",circuit_fuse_too_low:"Circuit fuse too low",waiting_in_queue:"Waiting in queue",waiting_in_fully:"Waiting in fully",illegal_grid_type:"Illegal grid type",no_current_request:"No current request",max_charger_current_too_low:"Max charger current too low",max_dynamic_charger_current_too_low:"Max dynamic charger current too low",charger_disabled:"Charger Disabled",pending_authorization:"Pending Authorization",charger_in_error_state:"Charger in error state",undefined:"Undefined"},wt={status:mt,common:bt,error:yt,editor:At,charger_status:vt,charger_substatus:xt},Ot={disconnected:"Getrennt",awaiting_start:"Pausiert",charging:"Laden",completed:"Fertig",error:"Fehler",ready_to_charge:"Bereit zum Laden"},Vt={name:"Charger Card",description:"Charger card ermöglicht es dir, deinen Laderoboter zu steuern.",start_fast:"Start (schnell)",start_slow:"Start (langsam)",start_smart:"Start (smart)",continue:"Weiter",pause:"Pause",stop:"Stopp",override:"Zeitplan überschreiben",reboot:"Ladegerät neu starten",not_available:"Ladegerät nicht verfügbar",click_for_info:"Klicken für Infos",click_for_config:"Klicken für Konfiguration",click_for_limits:"Klicken für Limits",online:"Online",voltage:"Spannung",power:"Leistung",charger_current:"Ladestrom",energy_per_hour:"Energie pro Stunde",lifetime_energy:"Energie gesamt",circuit_current:"Aktueller Strom"},Ct={missing_entity:"Die Angabe der Entität ist erforderlich!"},zt={entity:"Entity (Erforderlich)",smartChargingEntity:"Entity für Smart Charging",chargerImage:"Bild und Farbe des Ladegeräts",customImage:"Benutzerdefiniertes Bild (Optional - überschreibt das Bild des Ladegeräts)",theme:"Farbschema",compact_view:"Kompakte Ansicht",compact_view_aria_label_on:"Kompakte Ansicht einschalten",compact_view_aria_label_off:"Kompakte Ansicht ausschalten",show_name:"Name anzeigen",show_name_aria_label_on:"Anzeigename einschalten",show_name_aria_label_off:"Anzeigename ausschalten",show_leds:"Leds anzeigen",show_leds_aria_label_on:"Animierte Leds (Überlagerung des Bildes) einschalten",show_leds_aria_label_off:"Animierte Leds (Überlagerung des Bildes) ausschalten",show_status:"Status anzeigen",show_status_aria_label_on:"Statusanzeige einschalten",show_status_aria_label_off:"Statusanzeige ausschalten",show_stats:"Datentabelle anzeigen (Statistik)",show_stats_aria_label_on:"Datentabelle einschalten",show_stats_aria_label_off:"Datentabelle ausschalten",show_collapsibles:"Zusammenklappbare Menüschaltflächen anzeigen",show_collapsibles_aria_label_on:"Zusammenklappbare Menüschaltflächen einschalten",show_collapsibles_aria_label_off:"Zusammenklappbare Menüschaltflächen ausschalten",show_toolbar:"Symbolleiste anzeigen",show_toolbar_aria_label_on:"Symbolleiste einschalten",show_toolbar_aria_label_off:"Symbolleiste ausschalten",code_only_note:"Hinweis: Die Optionen für benutzerdefinierte Aktionen und Datentabellen (Statistiken) sind ausschließlich über den manuellen Code-Editor verfügbar."},kt={sessionEnergy:"Energieaufladung"},St={not_requesting_current:"Keine Nachfrage nach Strom",ok:"Ok",pending_schedule:"Ausstehender Zeitplan",none:"None",max_circuit_current_too_low:"Maximalstrom zu niedrig",max_dynamic_circuit_current_too_low:"Dynamischer Maximalstrom zu niedrig",max_dynamic_offline_fallback_circuit_current_too_low:"Dynamischer offline Maximalstrom zu niedrig",circuit_fuse_too_low:"Stromkreissicherung zu niedrig",waiting_in_queue:"Warten in der Warteschlange",waiting_in_fully:"Warten in vollem Umfang",illegal_grid_type:"Unzulässiger Grid Typ",no_current_request:"Keine aktuelle Anfrage",max_charger_current_too_low:"Maximaler Ladestrom zu niedrig",max_dynamic_charger_current_too_low:"Maximaler dynamischer Ladestrom zu niedrig",charger_disabled:"Ladegerät Deaktiviert",pending_authorization:"Ausstehende Autorisierung",charger_in_error_state:"Ladegerät im Fehlerzustand",undefined:"Undefiniert"},Mt={status:Ot,common:Vt,error:Ct,editor:zt,charger_status:kt,charger_substatus:St};const Pt={en:Object.freeze({__proto__:null,status:mt,common:bt,error:yt,editor:At,charger_status:vt,charger_substatus:xt,default:wt}),de:Object.freeze({__proto__:null,status:Ot,common:Vt,error:Ct,editor:zt,charger_status:kt,charger_substatus:St,default:Mt})};function Xt(t,e="",i=""){const r=(navigator.language||"en").split("-")[0];let o;try{o=t.split(".").reduce(((t,e)=>t[e]),Pt[r])}catch(e){o=t.split(".").reduce(((t,e)=>t[e]),Pt.en)}return void 0===o&&(o=t.split(".").reduce(((t,e)=>t[e]),Pt.en)),""!==e&&""!==i&&(o=o.replace(e,i)),o}var jt="data:image/gif;base64,R0lGODlhAwBIAHAAACwAAAAAAwBIAIGAgIAAAAAAAAAAAAACDYSPqcvtD6OctNqLVQEAOw==",Et="data:image/gif;base64,R0lGODlhAwBIAHAAACwAAAAAAwBIAIFwcHD///8AAAAAAAACGYSDqZvmwOJ6R1oKrcR60x5x4PSNimgiTgEAOw==",Ht="data:image/gif;base64,R0lGODlhAwBIAHAAACwAAAAAAwBIAIFwcHAAJv8AAAAAAAACGYSDqZvmwOJ6R1oKrcR60x5x4PSNimgiTgEAOw==",qt="data:image/gif;base64,R0lGODlhAwBIAIEAAAAAAGBgYP8AAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hZDcmVhdGVkIHdpdGggUGFpbnQuTkVUACH5BAkZAAAALAAAAAADAEgAAAINjI+py+0Po5y02otVAQAh+QQJGQAAACwAAAEAAwBGAAACF5SPecCtn5qDVDJaLYYW7Nd9SigiZGkUADs=";const Ut="disconnected",Kt="awaiting_start",It="charging",Zt="completed",Tt="error",Wt="ready_to_charge",Jt={normal:{DEFAULT:jt,disconnected:"data:image/gif;base64,R0lGODlhAwBIAHAAACwAAAAAAwBIAIFwcHBgYGD///8AAAACHYSDqZvmwOJ6R1oKrcR60x5x4EQJ5ommJ6a2qVMAADs=",awaitingStart:Et,charging:"data:image/gif;base64,R0lGODlhAwBIAIAAAAAAAP///yH/C05FVFNDQVBFMi4wAwEAAAAh/hZDcmVhdGVkIHdpdGggUGFpbnQuTkVUACH5BAkZAAAALAAAQQADAAYAAAIEjI95BQAh+QQJGQAAACwAADkAAwAOAAACB4yPecCtnwoAIfkECRkAAAAsAAAxAAMAFgAAAgqMj3nArZ+ag7QAACH5BAkZAAAALAAAKQADAB4AAAIMjI95wK2fmoNUMkoLACH5BAkZAAAALAAAIQADACYAAAIOjI95wK2fmoNUMlothgUAIfkECRkAAAAsAAAZAAMALgAAAhGMj3nArZ+ag1QyWi2GFuxXAAAh+QQJGQAAACwAABEAAwA2AAACE4yPecCtn5qDVDJaLYYW7Nd9SgEAIfkECRkAAAAsAAAJAAMAPgAAAhWMj3nArZ+ag1QyWi2GFuzXfUooIgUAIfkECRkAAAAsAAABAAMARgAAAheMj3nArZ+ag1QyWi2GFuzXfUooImRpFAA7",completed:Et,error:qt,readyToCharge:Et},smart:{DEFAULT:jt,disconnected:"data:image/gif;base64,R0lGODlhAwBIAHAAACwAAAAAAwBIAIFwcHBgYGAAJv8AAAACHYSDqZvmwOJ6R1oKrcR60x5x4EQJ5ommJ6a2qVMAADs=",awaitingStart:Ht,charging:"data:image/gif;base64,R0lGODlhAwBIAIAAAAAAAAAm/yH/C05FVFNDQVBFMi4wAwEAAAAh/hZDcmVhdGVkIHdpdGggUGFpbnQuTkVUACH5BAkZAAAALAAAQQADAAYAAAIEjI95BQAh+QQJGQAAACwAADkAAwAOAAACB4yPecCtnwoAIfkECRkAAAAsAAAxAAMAFgAAAgqMj3nArZ+ag7QAACH5BAkZAAAALAAAKQADAB4AAAIMjI95wK2fmoNUMkoLACH5BAkZAAAALAAAIQADACYAAAIOjI95wK2fmoNUMlothgUAIfkECRkAAAAsAAAZAAMALgAAAhGMj3nArZ+ag1QyWi2GFuxXAAAh+QQJGQAAACwAABEAAwA2AAACE4yPecCtn5qDVDJaLYYW7Nd9SgEAIfkECRkAAAAsAAAJAAMAPgAAAhWMj3nArZ+ag1QyWi2GFuzXfUooIgUAIfkECRkAAAAsAAABAAMARgAAAheMj3nArZ+ag1QyWi2GFuzXfUooImRpFAA7",completed:Ht,error:qt,readyToCharge:Ht}},Dt="binary_sensor.plug",Ft="switch.cable_locked_permanently",Rt="binary_sensor.charging_state",Lt="binary_sensor.basic_schedule",Bt="sensor.circuit_current",Nt="sensor.cost_per_kwh",Qt="sensor.dynamic_charger_limit",Gt="sensor.dynamic_circuit_limit",Yt="switch.enable_idle_current",_t="sensor.current",$t="switch.is_enabled",te="sensor.max_current",ee="sensor.max_circuit_limit",ie="sensor.offline_circuit_limit",re="binary_sensor.status",oe="sensor.output_limit",se="sensor.reason_for_no_current",ne="sensor.session_energy",ae="sensor.energy_per_hour",le="sensor.total_energy",ce="sensor.charging_power",de="binary_sensor.update_available",he="sensor.voltage",pe=[{name:"Generic",img:"data:image/png;base64,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"}],ue={"binary_sensor.plug":"mdi:lock","switch.cable_locked_permanently":"mdi:lock","binary_sensor.basic_schedule":"mdi:clock-check","sensor.circuit_current":"mdi:sine-wave","sensor.cost_per_kwh":"mdi:currency-usd","sensor.dynamic_charger_limit":"mdi:sine-wave","sensor.dynamic_circuit_limit":"mdi:sine-wave","switch.enable_idle_current":"mdi:current-dc","sensor.offline_circuit_limit":"mdi:sine-wave","sensor.current":"mdi:sine-wave","switch.is_enabled":"mdi:power","sensor.max_current":"mdi:sine-wave","sensor.max_circuit_limit":"mdi:sine-wave","binary_sensor.status":"mdi:wifi","sensor.output_limit":"mdi:sine-wave","sensor.reason_for_no_current":"mdi:alert-circle","sensor.session_energy":"mdi:flash","sensor.energy_per_hour":"mdi:flash","sensor.total_energy":"mdi:flash","switch.smart_charging":"mdi:auto-fix","sensor.charging_power":"mdi:flash","binary_sensor.update_available":"mdi:file-download","sensor.voltage":"mdi:sine-wave"},ge=[{name:"theme_default",desc:"Default HA colors"},{name:"theme_custom",desc:"Use custom theme"},{name:"theme_transp_blue",desc:"Transparent Blue"},{name:"theme_transp_black",desc:"Transparent Black"},{name:"theme_transp_white",desc:"Transparent White"},{name:"theme_lightgrey_blue",desc:"LightGrey Blue"}];let fe=class extends Q{constructor(){super(...arguments),this._initialized=!1}setConfig(t){this._config=t,this._config.entity||(this._config.entity=this.getEntitiesByType("binary_sensor")[0]||"",this._config.smartChargingEntity=this.getEntitiesByType("input_boolean")[0]||"",ft(this,"config-changed",{config:this._config})),this.loadCardHelpers()}shouldUpdate(){return this._initialized||this._initialize(),!0}get _entity(){return this._config&&this._config.entity||""}get _smartChargingEntity(){return this._config&&this._config.smartChargingEntity||""}get _customImage(){return this._config&&this._config.customImage||""}get _chargerImage(){return this._config&&this._config.chargerImage||"Generic"}get _customCardTheme(){return this._config?this._config.customCardTheme||"":"theme_default"}get showName(){return!this._config||(void 0===this._config.show_name||this._config.show_name)}get showLeds(){return!this._config||(void 0===this._config.show_leds||this._config.show_leds)}get showStatus(){return!this._config||(void 0===this._config.show_status||this._config.show_status)}get showToolbar(){return!this._config||(void 0===this._config.show_toolbar||this._config.show_toolbar)}get showStats(){return!this._config||(void 0===this._config.show_stats||this._config.show_stats)}get showCollapsibles(){return!this._config||(void 0===this._config.show_collapsibles||this._config.show_collapsibles)}get compactView(){return!!this._config&&(void 0!==this._config.compact_view&&this._config.compact_view)}getEntitiesByType(t){return this.hass?Object.keys(this.hass.states).filter((e=>e.substr(0,e.indexOf("."))===t)):[]}render(){if(!this.hass)return X``;const t=Object.keys(this.hass.states).filter((t=>"binary_sensor"===t.substr(0,t.indexOf(".")))),e=Object.keys(this.hass.states).filter((t=>"input_boolean"===t.substr(0,t.indexOf("."))));return X`
      <div class="card-config">

        <paper-dropdown-menu label="${Xt("editor.entity")}" @value-changed=${this._valueChanged} .configValue=${"entity"}>
            <paper-listbox slot="dropdown-content" .selected=${t.indexOf(this._entity)}>
              ${t.map((t=>X`
                  <paper-item>${t}</paper-item>
                `))}
            </paper-listbox>
        </paper-dropdown-menu>

        <paper-dropdown-menu label="${Xt("editor.smartChargingEntity")}" @value-changed=${this._valueChanged} .configValue=${"smartChargingEntity"}>
            <paper-listbox slot="dropdown-content" .selected=${e.indexOf(this._smartChargingEntity)}>
              ${e.map((t=>X`
                  <paper-item>${t}</paper-item>
                `))}
            </paper-listbox>
        </paper-dropdown-menu>

        <paper-dropdown-menu label="${Xt("editor.theme")}" @value-changed=${this._valueChanged} .configValue=${"customCardTheme"}>
            <paper-listbox slot="dropdown-content" selected="${this._customCardTheme}" attr-for-selected="value">
              ${ge.map((t=>X`
                  <paper-item value="${t.name}">${t.name}</paper-item>
                `))}
            </paper-listbox>
        </paper-dropdown-menu>


              <paper-dropdown-menu label="${Xt("editor.chargerImage")}" @value-changed=${this._valueChanged} .configValue=${"chargerImage"}>
                <paper-listbox slot="dropdown-content" selected="${this._chargerImage}" attr-for-selected="value">
                  ${pe.map((t=>X`
                      <paper-item value="${t.name}">${t.name}</paper-item>
                    `))}
                </paper-listbox>
              </paper-dropdown-menu>


              <paper-input label="${Xt("editor.customImage")}" .value=${this._customImage} .configValue=${"customImage"} @value-changed=${this._valueChanged}"></paper-input>

          <p class="option">
            <ha-switch
              aria-label=${Xt(this.compactView?"editor.compact_view_aria_label_off":"editor.compact_view_aria_label_on")}
              .checked=${!1!==this.compactView}
              .configValue=${"compact_view"}
              @change=${this._valueChanged}
            >
            </ha-switch>
            ${Xt("editor.compact_view")}
          </p>

          <p class="option">
            <ha-switch
              aria-label=${Xt(this.showName?"editor.show_name_aria_label_off":"editor.show_name_aria_label_on")}
              .checked=${this.showName}
              .configValue=${"show_name"}
              @change=${this._valueChanged}
            >
            </ha-switch>
            ${Xt("editor.show_name")}
          </p>

          <p class="option">
            <ha-switch
              aria-label=${Xt(this.showLeds?"editor.show_leds_aria_label_off":"editor.show_leds_aria_label_on")}
              .checked=${!1!==this.showLeds}
              .configValue=${"show_leds"}
              @change=${this._valueChanged}
            >
            </ha-switch>
            ${Xt("editor.show_leds")}
          </p>


          <p class="option">
            <ha-switch
              aria-label=${Xt(this.showStatus?"editor.show_status_aria_label_off":"editor.show_status_aria_label_on")}
              .checked=${!1!==this.showStatus}
              .configValue=${"show_status"}
              @change=${this._valueChanged}
            >
            </ha-switch>
            ${Xt("editor.show_status")}
          </p>

          <p class="option">
          <ha-switch
            aria-label=${Xt(this.showCollapsibles?"editor.show_collapsibles_aria_label_off":"editor.show_collapsibles_aria_label_on")}
            .checked=${!1!==this.showCollapsibles}
            .configValue=${"show_collapsibles"}
            @change=${this._valueChanged}
          >
          </ha-switch>
          ${Xt("editor.show_collapsibles")}
        </p>

          <p class="option">
            <ha-switch
              aria-label=${Xt(this.showStats?"editor.show_stats_aria_label_off":"editor.show_stats_aria_label_on")}
              .checked=${this.showStats}
              .configValue=${"show_stats"}
              @change=${this._valueChanged}
            >
            </ha-switch>
            ${Xt("editor.show_stats")}
          </p>




          <p class="option">
            <ha-switch
              aria-label=${Xt(this.showToolbar?"editor.show_toolbar_aria_label_off":"editor.show_toolbar_aria_label_on")}
              .checked=${!1!==this.showToolbar}
              .configValue=${"show_toolbar"}
              @change=${this._valueChanged}
            >
            </ha-switch>
            ${Xt("editor.show_toolbar")}
          </p>


        </div>
      `}_initialize(){void 0!==this.hass&&void 0!==this._config&&void 0!==this._helpers&&(this._initialized=!0)}async loadCardHelpers(){this._helpers=await window.loadCardHelpers()}_valueChanged(t){if(!this._config||!this.hass)return void console.log("C: no config");const e=t.target;this[`_${e.configValue}`]!==e.value&&(e.configValue&&(""===e.value?delete this._config[e.configValue]:this._config=Object.assign(Object.assign({},this._config),{[e.configValue]:void 0!==e.checked?e.checked:e.value})),ft(this,"config-changed",{config:this._config}))}static get styles(){return s`
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
    `}};t([_({attribute:!1})],fe.prototype,"hass",void 0),t([$()],fe.prototype,"_config",void 0),t([$()],fe.prototype,"_toggle",void 0),t([$()],fe.prototype,"_helpers",void 0),fe=t([G("keba-charger-card-editor")],fe);var me=s`
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
    max-height: 200px;
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
    font-weight: bold;
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
    font-weight: bold;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-left: calc(20px + 9px); /* size + margin of spinner */
    text-transform: uppercase;
    font-size: 22px;
  }
  .status-text-compact {
    color: var(--custom-text-color);
    white-space: nowrap;
    font-weight: bold;
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
    top: -50px;

    // border-color: pink;
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
    font-weight: bold;
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
    // font-weight: bold;
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
`;console.info("%cKEBA-CHARGER-CARD 0.0.2 IS INSTALLED","color: green; font-weight: bold","");let be=class extends Q{static get styles(){return me}static async getConfigElement(){return document.createElement("keba-charger-card-editor")}static getStubConfig(t){const[e]=t.filter((t=>"binary_sensor"===t.substr(0,t.indexOf("."))));return{entity:e||"",image:"default"}}get entity(){return null!=this.config.entity?this.hass.states[this.config.entity]:void 0}get smartChargingEntity(){return null!=this.config.smartChargingEntity?this.hass.states[this.config.smartChargingEntity]:void 0}get scriptDomain(){return void 0===this.config.domain?"script":this.config.domain}get status(){if("off"==this.getEntityState(this.getEntity(Dt)))return Ut;return"on"==this.getEntityState(this.getEntity(Rt))?It:this.smartChargingEntity&&"on"==this.smartChargingEntity.state?Kt:Wt}get image(){const t=this.config.chargerImage||"Generic",e=pe.find((({name:e})=>e===t?e:void 0));if(void 0===this.config.customImage||""===this.config.customImage)try{return void 0===e?void 0:e.img}catch(t){return""}return this.config.customImage}get customCardTheme(){return void 0===this.config.customCardTheme?"theme_default":this.config.customCardTheme}get showLeds(){return void 0===this.config.show_leds||this.config.show_leds}get showName(){return void 0===this.config.show_name||this.config.show_name}get showStatus(){return void 0===this.config.show_status||this.config.show_status}get showStats(){return void 0===this.config.show_stats||this.config.show_stats}get showCollapsibles(){return void 0===this.config.show_collapsibles||this.config.show_collapsibles}get showToolbar(){return void 0===this.config.show_toolbar||this.config.show_toolbar}get compactView(){return void 0!==this.config.compact_view&&this.config.compact_view}get entityBasename(){return void 0===this.config.entity?"":this.config.entity.split(".")[1].replace("_status","")}getEntityId(t){try{return t.split(".")[0]+"."+this.entityBasename+"_"+t.split(".")[1]}catch(t){return}}getEntityBase(t){try{return t.split(".")[0]+"."+t.split(".")[1].replace(this.entityBasename+"_","")}catch(t){return}}getEntities(){return{cableLocked:this.getEntity(Dt),cableLockedPermanently:this.getEntity(Ft),chargingState:this.getEntity(Rt),basicSchedule:this.getEntity(Lt),circuitCurrent:this.getEntity(Bt),costPerKwh:this.getEntity(Nt),dynamicChargerCurrent:this.getEntity(Qt),dynamicCircuitCurrent:this.getEntity(Gt),enableIdleCurrent:this.getEntity(Yt),offlineCircuitCurrent:this.getEntity(ie),inCurrent:this.getEntity(_t),isEnabled:this.getEntity($t),maxChargerCurrent:this.getEntity(te),maxCircuitCurrent:this.getEntity(ee),isOnline:this.getEntity(re),outputCurrent:this.getEntity(oe),reasonForNoCurrent:this.getEntity(se),sessionEnergy:this.getEntity(ne),energyPerHour:this.getEntity(ae),energyLifetime:this.getEntity(le),smartCharging:this.smartChargingEntity,totalPower:this.getEntity(ce),updateAvailable:this.getEntity(de),voltage:this.getEntity(he),status:this.entity}}getEntity(t){try{const e=this.getEntityId(t);return void 0===e?void 0:this.hass.states[e]}catch(t){return}}getEntityState(t){try{return t.state}catch(t){return}}getEntityAttribute(t,e){try{return t.attributes[e]}catch(t){return}}getStatsDefault(t){switch(t){case Ut:return[{entityId:this.getEntityId(ne),unit:"kWh",subtitle:Xt("charger_status.sessionEnergy")},{entityId:this.getEntityId(te),unit:"A",subtitle:"Current Limit"},{entityId:this.getEntityId(Dt),unit:"",subtitle:"Locked"}];case Kt:return[{entityId:this.getEntityId(te),unit:"A",subtitle:"Current Limit"},{entityId:this.getEntityId(ne),unit:"kWh",subtitle:Xt("charger_status.sessionEnergy")},{entityId:this.smartChargingEntity?this.smartChargingEntity.entity_id:"",unit:"",subtitle:"Smart Charging"}];case It:return[{entityId:this.getEntityId(ne),unit:"kWh",subtitle:"Energy"},{entityId:this.getEntityId(te),unit:"A",subtitle:"Current Limit"},{entityId:this.getEntityId(Bt),unit:"A",subtitle:"Circuit"},{entityId:this.getEntityId(oe),unit:"A",subtitle:"Allowed"},{entityId:this.getEntityId(_t),unit:"A",subtitle:"Actual"},{entityId:this.getEntityId(ce),unit:"kW",subtitle:"Power"},{entityId:this.smartChargingEntity?this.smartChargingEntity.entity_id:"",unit:"",subtitle:"Smart Charging"}];case Zt:case Tt:return[{entityId:this.getEntityId(ne),unit:"kWh",subtitle:Xt("charger_status.sessionEnergy")},{entityId:this.getEntityId(te),unit:"A",subtitle:"Current Limit"}];case Wt:return[{entityId:this.getEntityId(ne),unit:"kWh",subtitle:Xt("charger_status.sessionEnergy")},{entityId:this.getEntityId(te),unit:"A",subtitle:"Current Limit"},{entityId:this.getEntityId(Lt),unit:"",subtitle:"Schedule"}]}return[]}setConfig(t){if(!t.entity)throw new Error(Xt("error.missing_entity"));this.config=t}getCardSize(){return 2}shouldUpdate(t){return function(t,e,i){if(e.has("config")||i)return!0;if(t.config.entity){var r=e.get("hass");return!r||r.states[t.config.entity]!==t.hass.states[t.config.entity]}return!1}(this,t,!0)}updated(t){this.config.entity&&t.get("hass")&&t.get("hass").states[this.config.entity].state!==this.hass.states[this.config.entity].state&&(this.requestInProgress=!1)}handleMore(t){t&&t.entity_id&&ft(this,"hass-more-info",{entityId:t.entity_id},{bubbles:!0,composed:!0})}callService(t,e=!0,i={}){this.hass.callService(this.scriptDomain,t,Object.assign({},i)),e&&this.requestUpdate()}imageLed(t,e){const i=e?"smart":"normal";return Jt[i][t]||Jt[i].DEFAULT}renderImage(t){let e="";return this.compactView&&(e="-compact"),this.image?X`
      <img
        class="charger${e}"
        src="${this.image}"
        @click="${()=>this.handleMore(this.entity)}"
        ?more-info="true"
      />${this.renderLeds(t)}
    `:X``}renderLeds(t){if(this.showLeds){let e="";this.compactView&&(e="-compact");const i=!!this.smartChargingEntity&&"on"==this.smartChargingEntity.state;return X`
        <img
          class="charger led${e}"
          src="${this.imageLed(t,i)}"
        />
      `}return X``}renderStats(t){if(!this.showStats)return X``;let e="";this.compactView&&(e="-compact");const i=this.getStatsDefault(t)||[];return X`
      <div class="stats${e}">
        ${this.renderStatsList(i)}
      </div>
    `}renderStatsList(t){return t.map((({entityId:t,attribute:e,calcValue:i,unit:r,subtitle:o})=>{if(!(t||e||i))return X``;if(i)return this.renderStatsHtml(i,r,o,this.hass.states[t]);try{const i=e?this.hass.states[t].attributes[e]:this.hass.states[t].state;return this.renderStatsHtml(i,r,o,this.hass.states[t])}catch(t){return null}}))}renderStatsHtml(t,e,i,r){return X`
      <div class="stats-block" @click="${()=>this.handleMore(r)}"
        ?more-info="true">
        <span class="stats-value">${t}</span>
        ${e}
        <div class="stats-subtitle">${i}</div>
      </div>
    `}renderName(){if(!this.showName)return X``;let t="";return this.compactView&&(t="-compact"),X`
      <div class="charger-name${t}">
        Keba P30
      </div>
    `}renderStatus(){if(!this.showStatus)return X``;let t="";this.compactView&&(t="-compact");const e=Xt(`status.${this.status}`)||this.status;return X`
      <div class="status${t}">
        <span class="status-text${t}" alt=${e}>
          ${e}
        </span>
        <ha-circular-progress .active=${this.requestInProgress} size="small"></ha-circular-progress>
      </div>
    `}renderCollapsibleInfo(){if(!this.showCollapsibles)return X``;const{isOnline:t,totalPower:e,sessionEnergy:i,energyLifetime:r}=this.getEntities(),o=Xt("common.click_for_info");return X`
      <div class="wrap-collabsible-info">
        <input id="collapsible-info" class="toggle-info" type="checkbox" />
        <label for="collapsible-info" class="lbl-toggle-info">
          <div class="tooltip-right">
            <ha-icon icon="mdi:information"></ha-icon>
            <span class="tooltiptext-right">${o}</span>
          </div>
        </label>
        <div class="collapsible-content-info">
          <div class="content-inner-info">
            ${this.renderCollapsibleItems(t,Xt("common.online"))}
            ${this.renderCollapsibleItems(e,Xt("common.power"))}
            ${this.renderCollapsibleItems(i,Xt("charger_status.sessionEnergy"))}
            ${this.renderCollapsibleItems(r,Xt("common.lifetime_energy"),!0)}
          </div>
        </div>
      </div>
    `}renderCollapsibleItems(t,e,i=!1){if(null==t)return X``;const r=i?Math.round(this.getEntityState(t)):this.getEntityState(t),o=this.renderIcon(t),s=this.getEntityAttribute(t,"unit_of_measurement");return X`
      <div class="collapsible-item"
        @click="${()=>this.handleMore(t)}"
        ?more-info="true">
        <div class="tooltip">
          <ha-icon icon="${o}"></ha-icon>
          <br />${r} ${s}
          <span class="tooltiptext">${e}</span>
        </div>
      </div>
    `}renderInfoItemsLeft(){const{isOnline:t}=this.getEntities();return X`
      ${this.renderInfoItem(t,Xt("common.online"))}
    `}renderInfoItemsRight(){const{cableLocked:t,totalPower:e,voltage:i}=this.getEntities(),r=t&&"on"==t.state?"mdi:power-plug":"mdi:power-plug-off";return X`
      ${this.renderInfoItem(i,Xt("common.voltage"),!0)}
      ${this.renderInfoItem(e,Xt("common.power"))}
      <ha-icon icon="${r}"></ha-icon>
    `}renderInfoItemsCompact(){const{totalPower:t,voltage:e}=this.getEntities();return X`
      ${this.renderInfoItem(e,Xt("common.voltage"),!0)}
      ${this.renderInfoItem(t,Xt("common.power"),!0)}
    `}renderInfoItem(t,e,i=!1){if(null==t)return X``;const r=i?Math.round(this.getEntityState(t)):this.getEntityState(t),o=this.getEntityAttribute(t,"unit_of_measurement"),s=this.renderIcon(t);return X`
      <div class="infoitems-item"
        @click="${()=>this.handleMore(t)}"
        ?more-info="true">
        <div class="tooltip">
          <ha-icon icon="${s}"></ha-icon>
          ${r} ${o}
          <span class="tooltiptext">${e}</span>
        </div>
      </div>
    `}renderIcon(t){const e=t.entity_id,i=this.getEntityBase(e);return void 0!==this.getEntityAttribute(t,"icon")?this.getEntityAttribute(t,"icon"):(void 0===i?null:ue[i])||"mdi:cancel"}renderToolbar(t){if(!this.showToolbar)return X``;let e=X``;switch(t){case Ut:case Tt:return X``;case Kt:e=X`
          ${this.renderToolbarButton("keba_off","hass:stop","common.stop")}
          ${this.renderToolbarButton("keba_fast","mdi:fast-forward","common.start_fast")}
          ${this.renderToolbarButton("keba_slow","mdi:play","common.start_slow")}
        `;break;case It:e=X`
          ${this.renderToolbarButton("keba_off","hass:stop","common.stop")}
          ${this.renderToolbarButton("keba_fast","mdi:fast-forward","common.start_fast")}
          ${this.renderToolbarButton("keba_slow","mdi:play","common.start_slow")}
          ${this.renderToolbarButton("keba_auto","mdi:play-speed","common.start_smart")}
        `;break;case Zt:e=X`
          ${this.renderToolbarButton("keba_fast","mdi:fast-forward","common.start_fast")}
          ${this.renderToolbarButton("keba_slow","mdi:play","common.start_slow")}
          ${this.renderToolbarButton("keba_auto","mdi:play-speed","common.start_smart")}
        `;break;case Wt:e=X`
          ${this.renderToolbarButton("keba_fast","mdi:fast-forward","common.start_fast")}
          ${this.renderToolbarButton("keba_slow","mdi:play","common.start_slow")}
          ${this.renderToolbarButton("keba_auto","mdi:play-speed","common.start_smart")}        `}return X`
      <div class="toolbar">
        ${e}
        <div class="fill-gap"></div>
      </div>
    `}renderToolbarButton(t,e,i,r={},o=!0){let s="";try{s=Xt(i)}catch(t){s=i}return X`
      <div class="tooltip">
        <ha-icon-button
          icon="${e}"
          title="${s}"
          @click="${()=>this.callService(t,o,r)}"
        ></ha-icon-button>
        <span class="tooltiptext">${s}</span>
      </div>
    `}renderCompact(){const t=this.status;return X`
      <ha-card>
        <div class="preview-compact">
          ${this.renderImage(t)}

          <div class="metadata">
            ${this.renderName()} ${this.renderStatus()}
          </div>

          <div class="infoitems">${this.renderInfoItemsCompact()}</div>

          ${this.renderStats(t)}
        </div>

        ${this.renderToolbar(t)}
      </ha-card>
    `}renderFull(){const t=this.status;return X`
      <ha-card>
        <div class="preview">
          <div class="header">
            <div class="infoitems-left">${this.renderInfoItemsLeft()}</div>

            <div class="infoitems">${this.renderInfoItemsRight()}</div>
          </div>

          ${this.renderImage(t)}

         <div class="metadata">
            ${this.renderName()} ${this.renderStatus()}
          </div>

          ${this.renderCollapsibleInfo()}
          ${this.renderStats(t)}
        </div>

        ${this.renderToolbar(t)}
      </ha-card>
    `}renderCustomCardTheme(){switch(this.customCardTheme){case"theme_custom":break;default:this.style.setProperty("--custom-card-background-color","#03A9F4"),this.style.setProperty("--custom-text-color","#FFFFFF"),this.style.setProperty("--custom-primary-color","#03A9F4"),this.style.setProperty("--custom-icon-color","#FFFFFF");break;case"theme_transp_blue":this.style.setProperty("--custom-card-background-color","transparent"),this.style.setProperty("--custom-text-color","#03A9F4"),this.style.setProperty("--custom-primary-color","#03A9F4"),this.style.setProperty("--custom-icon-color","#03A9F4");break;case"theme_transp_black":this.style.setProperty("--custom-card-background-color","transparent"),this.style.setProperty("--custom-text-color","black"),this.style.setProperty("--custom-primary-color","black"),this.style.setProperty("--custom-icon-color","black");break;case"theme_transp_white":this.style.setProperty("--custom-card-background-color","transparent"),this.style.setProperty("--custom-text-color","white"),this.style.setProperty("--custom-primary-color","white"),this.style.setProperty("--custom-icon-color","white");break;case"theme_lightgrey_blue":this.style.setProperty("--custom-card-background-color","lightgrey"),this.style.setProperty("--custom-text-color","#03A9F4"),this.style.setProperty("--custom-primary-color","#03A9F4"),this.style.setProperty("--custom-icon-color","#03A9F4")}}render(){return this.renderCustomCardTheme(),this.entity?this.compactView?this.renderCompact():this.renderFull():X`
        <ha-card>
          <div class="preview not-available">
            <div class="metadata">
              <div class="not-available">
                ${Xt("common.not_available")}
              </div>
            </div>
          </div>
        </ha-card>
      `}};t([_({attribute:!1})],be.prototype,"hass",void 0),t([$()],be.prototype,"config",void 0),t([_({attribute:!1})],be.prototype,"requestInProgress",void 0),be=t([G("keba-charger-card")],be);export{be as ChargerCard};
