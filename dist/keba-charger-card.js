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
 */;var a,l;const c={toAttribute(t,e){switch(e){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},h=(t,e)=>e!==t&&(e==e||t==t),d={attribute:!0,type:String,converter:c,reflect:!1,hasChanged:h};class g extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;null!==(e=this.l)&&void 0!==e||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const r=this._$Eh(i,e);void 0!==r&&(this._$Eu.set(r,i),t.push(r))})),t}static createProperty(t,e=d){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,r=this.getPropertyDescriptor(t,i,e);void 0!==r&&Object.defineProperty(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(r){const o=this[t];this[e]=r,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||d}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eh(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ev=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Ep(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$Em)&&void 0!==e?e:this._$Em=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$Em)||void 0===e||e.splice(this._$Em.indexOf(t)>>>0,1)}_$Ep(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const i=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{e?t.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):i.forEach((e=>{const i=document.createElement("style"),r=window.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=e.cssText,t.appendChild(i)}))})(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$Eg(t,e,i=d){var r,o;const s=this.constructor._$Eh(t,i);if(void 0!==s&&!0===i.reflect){const n=(null!==(o=null===(r=i.converter)||void 0===r?void 0:r.toAttribute)&&void 0!==o?o:c.toAttribute)(e,i.type);this._$Ei=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Ei=null}}_$AK(t,e){var i,r,o;const s=this.constructor,n=s._$Eu.get(t);if(void 0!==n&&this._$Ei!==n){const t=s.getPropertyOptions(n),a=t.converter,l=null!==(o=null!==(r=null===(i=a)||void 0===i?void 0:i.fromAttribute)&&void 0!==r?r:"function"==typeof a?a:null)&&void 0!==o?o:c.fromAttribute;this._$Ei=n,this[n]=l(e,t.type),this._$Ei=null}}requestUpdate(t,e,i){let r=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||h)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Ei!==t&&(void 0===this._$ES&&(this._$ES=new Map),this._$ES.set(t,i))):r=!1),!this.isUpdatePending&&r&&(this._$Ev=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ev}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,e)=>this[e]=t)),this._$Et=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$ET()}catch(t){throw e=!1,this._$ET(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$Em)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$ET(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ev}shouldUpdate(t){return!0}update(t){void 0!==this._$ES&&(this._$ES.forEach(((t,e)=>this._$Eg(e,this[e],t))),this._$ES=void 0),this._$ET()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var u,A;g.finalized=!0,g.elementProperties=new Map,g.elementStyles=[],g.shadowRootOptions={mode:"open"},null===(a=globalThis.reactiveElementPolyfillSupport)||void 0===a||a.call(globalThis,{ReactiveElement:g}),(null!==(l=globalThis.reactiveElementVersions)&&void 0!==l?l:globalThis.reactiveElementVersions=[]).push("1.0.0");const p=globalThis.trustedTypes,m=p?p.createPolicy("lit-html",{createHTML:t=>t}):void 0,f=`lit$${(Math.random()+"").slice(9)}$`,w="?"+f,b=`<${w}>`,v=document,y=(t="")=>v.createComment(t),x=t=>null===t||"object"!=typeof t&&"function"!=typeof t,B=Array.isArray,E=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,I=/-->/g,C=/>/g,D=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,O=/'/g,N=/"/g,H=/^(?:script|style|textarea)$/i,M=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),G=Symbol.for("lit-noChange"),k=Symbol.for("lit-nothing"),P=new WeakMap,U=v.createTreeWalker(v,129,null,!1),Y=(t,e)=>{const i=t.length-1,r=[];let o,s=2===e?"<svg>":"",n=E;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,h=0;for(;h<i.length&&(n.lastIndex=h,l=n.exec(i),null!==l);)h=n.lastIndex,n===E?"!--"===l[1]?n=I:void 0!==l[1]?n=C:void 0!==l[2]?(H.test(l[2])&&(o=RegExp("</"+l[2],"g")),n=D):void 0!==l[3]&&(n=D):n===D?">"===l[0]?(n=null!=o?o:E,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?D:'"'===l[3]?N:O):n===N||n===O?n=D:n===I||n===C?n=E:(n=D,o=void 0);const d=n===D&&t[e+1].startsWith("/>")?" ":"";s+=n===E?i+b:c>=0?(r.push(a),i.slice(0,c)+"$lit$"+i.slice(c)+f+d):i+f+(-2===c?(r.push(void 0),e):d)}const a=s+(t[i]||"<?>")+(2===e?"</svg>":"");return[void 0!==m?m.createHTML(a):a,r]};class L{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let o=0,s=0;const n=t.length-1,a=this.parts,[l,c]=Y(t,e);if(this.el=L.createElement(l,i),U.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(r=U.nextNode())&&a.length<n;){if(1===r.nodeType){if(r.hasAttributes()){const t=[];for(const e of r.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(f)){const i=c[s++];if(t.push(e),void 0!==i){const t=r.getAttribute(i.toLowerCase()+"$lit$").split(f),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?S:"?"===e[1]?K:"@"===e[1]?V:F})}else a.push({type:6,index:o})}for(const e of t)r.removeAttribute(e)}if(H.test(r.tagName)){const t=r.textContent.split(f),e=t.length-1;if(e>0){r.textContent=p?p.emptyScript:"";for(let i=0;i<e;i++)r.append(t[i],y()),U.nextNode(),a.push({type:2,index:++o});r.append(t[e],y())}}}else if(8===r.nodeType)if(r.data===w)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=r.data.indexOf(f,t+1));)a.push({type:7,index:o}),t+=f.length-1}o++}}static createElement(t,e){const i=v.createElement("template");return i.innerHTML=t,i}}function j(t,e,i=t,r){var o,s,n,a;if(e===G)return e;let l=void 0!==r?null===(o=i._$Cl)||void 0===o?void 0:o[r]:i._$Cu;const c=x(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(s=null==l?void 0:l._$AO)||void 0===s||s.call(l,!1),void 0===c?l=void 0:(l=new c(t),l._$AT(t,i,r)),void 0!==r?(null!==(n=(a=i)._$Cl)&&void 0!==n?n:a._$Cl=[])[r]=l:i._$Cu=l),void 0!==l&&(e=j(t,l._$AS(t,e.values),l,r)),e}class z{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:i},parts:r}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:v).importNode(i,!0);U.currentNode=o;let s=U.nextNode(),n=0,a=0,l=r[0];for(;void 0!==l;){if(n===l.index){let e;2===l.type?e=new Q(s,s.nextSibling,this,t):1===l.type?e=new l.ctor(s,l.name,l.strings,this,t):6===l.type&&(e=new T(s,this,t)),this.v.push(e),l=r[++a]}n!==(null==l?void 0:l.index)&&(s=U.nextNode(),n++)}return o}m(t){let e=0;for(const i of this.v)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{constructor(t,e,i,r){var o;this.type=2,this._$AH=k,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cg=null===(o=null==r?void 0:r.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=j(this,t,e),x(t)?t===k||null==t||""===t?(this._$AH!==k&&this._$AR(),this._$AH=k):t!==this._$AH&&t!==G&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.S(t):(t=>{var e;return B(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])})(t)?this.M(t):this.$(t)}A(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}S(t){this._$AH!==t&&(this._$AR(),this._$AH=this.A(t))}$(t){this._$AH!==k&&x(this._$AH)?this._$AA.nextSibling.data=t:this.S(v.createTextNode(t)),this._$AH=t}T(t){var e;const{values:i,_$litType$:r}=t,o="number"==typeof r?this._$AC(t):(void 0===r.el&&(r.el=L.createElement(r.h,this.options)),r);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.m(i);else{const t=new z(o,this),e=t.p(this.options);t.m(i),this.S(e),this._$AH=t}}_$AC(t){let e=P.get(t.strings);return void 0===e&&P.set(t.strings,e=new L(t)),e}M(t){B(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const o of t)r===e.length?e.push(i=new Q(this.A(y()),this.A(y()),this,this.options)):i=e[r],i._$AI(o),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cg=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class F{constructor(t,e,i,r,o){this.type=1,this._$AH=k,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=k}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,r){const o=this.strings;let s=!1;if(void 0===o)t=j(this,t,e,0),s=!x(t)||t!==this._$AH&&t!==G,s&&(this._$AH=t);else{const r=t;let n,a;for(t=o[0],n=0;n<o.length-1;n++)a=j(this,r[i+n],e,n),a===G&&(a=this._$AH[n]),s||(s=!x(a)||a!==this._$AH[n]),a===k?t=k:t!==k&&(t+=(null!=a?a:"")+o[n+1]),this._$AH[n]=a}s&&!r&&this.k(t)}k(t){t===k?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class S extends F{constructor(){super(...arguments),this.type=3}k(t){this.element[this.name]=t===k?void 0:t}}class K extends F{constructor(){super(...arguments),this.type=4}k(t){t&&t!==k?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class V extends F{constructor(t,e,i,r,o){super(t,e,i,r,o),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=j(this,t,e,0))&&void 0!==i?i:k)===G)return;const r=this._$AH,o=t===k&&r!==k||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==k&&(r===k||o);o&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class T{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){j(this,t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var X,Z,R;null===(u=globalThis.litHtmlPolyfillSupport)||void 0===u||u.call(globalThis,L,Q),(null!==(A=globalThis.litHtmlVersions)&&void 0!==A?A:globalThis.litHtmlVersions=[]).push("2.0.0");class q extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,e,i)=>{var r,o;const s=null!==(r=null==i?void 0:i.renderBefore)&&void 0!==r?r:e;let n=s._$litPart$;if(void 0===n){const t=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;s._$litPart$=n=new Q(e.insertBefore(y(),t),t,void 0,null!=i?i:{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return G}}q.finalized=!0,q._$litElement$=!0,null===(X=globalThis.litElementHydrateSupport)||void 0===X||X.call(globalThis,{LitElement:q}),null===(Z=globalThis.litElementPolyfillSupport)||void 0===Z||Z.call(globalThis,{LitElement:q}),(null!==(R=globalThis.litElementVersions)&&void 0!==R?R:globalThis.litElementVersions=[]).push("3.0.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const W=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:r}=e;return{kind:i,elements:r,finisher(e){window.customElements.define(t,e)}}})(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,J=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function _(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):J(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function $(t){return _({...t,state:!0})}var tt="[^\\s]+";function et(t,e){for(var i=[],r=0,o=t.length;r<o;r++)i.push(t[r].substr(0,e));return i}var it=function(t){return function(e,i){var r=i[t].map((function(t){return t.toLowerCase()})),o=r.indexOf(e.toLowerCase());return o>-1?o:null}};function rt(t){for(var e=[],i=1;i<arguments.length;i++)e[i-1]=arguments[i];for(var r=0,o=e;r<o.length;r++){var s=o[r];for(var n in s)t[n]=s[n]}return t}var ot=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],st=["January","February","March","April","May","June","July","August","September","October","November","December"],nt=et(st,3),at={dayNamesShort:et(ot,3),dayNames:ot,monthNamesShort:nt,monthNames:st,amPm:["am","pm"],DoFn:function(t){return t+["th","st","nd","rd"][t%10>3?0:(t-t%10!=10?1:0)*t%10]}},lt=(rt({},at),function(t){return+t-1}),ct=[null,"[1-9]\\d?"],ht=[null,tt],dt=["isPm",tt,function(t,e){var i=t.toLowerCase();return i===e.amPm[0]?0:i===e.amPm[1]?1:null}],gt=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(t){var e=(t+"").match(/([+-]|\d\d)/gi);if(e){var i=60*+e[1]+parseInt(e[2],10);return"+"===e[0]?i:-i}return 0}];it("monthNamesShort"),it("monthNames");var ut,At;!function(){try{(new Date).toLocaleDateString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(t){return"RangeError"===t.name}}(),function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(ut||(ut={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(At||(At={}));var pt=function(t,e,i,r){r=r||{},i=null==i?{}:i;var o=new Event(e,{bubbles:void 0===r.bubbles||r.bubbles,cancelable:Boolean(r.cancelable),composed:void 0===r.composed||r.composed});return o.detail=i,t.dispatchEvent(o),o};var mt={disconnected:"Disconnected",awaiting_start:"Paused or awaiting start",charging:"Charging",completed:"Completed or awaiting car",error:"Error",ready_to_charge:"Ready to charge"},ft={name:"Charger Card",description:"Charger card allows you to control your charging robot.",start:"Start",start_fast:"Start (fast)",start_slow:"Start (slow)",start_smart:"Start (smart)",continue:"Resume",pause:"Pause",stop:"Stop",override:"Override schedule",reboot:"Reboot charger",not_available:"Charger not available",click_for_info:"Click for Info",click_for_config:"Click for Config",click_for_limits:"Click for Limits",online:"Online",voltage:"Voltage",power:"Power",charger_current:"Changer Current",energy_per_hour:"Energy per Hour",lifetime_energy:"Lifetime Energy",circuit_current:"Circuit Energy"},wt={missing_entity:"Specifying entity is required!"},bt={entity:"Entity (Required)",smartChargingEntity:"Entity for smart charging",chargerImage:"Charger image and color",customImage:"Custom image (Optional - overrides charger image)",theme:"Color theme",compact_view:"Compact View",compact_view_aria_label_on:"Toggle compact view on",compact_view_aria_label_off:"Toggle compact view off",show_name:"Show Name",show_name_aria_label_on:"Toggle display name on",show_name_aria_label_off:"Toggle display name off",show_leds:"Show Leds",show_leds_aria_label_on:"Toggle animated leds (overlay on image) on",show_leds_aria_label_off:"Toggle animated leds (overlay on image) off",show_status:"Show Status",show_status_aria_label_on:"Toggle display status on",show_status_aria_label_off:"Toggle display status off",show_stats:"Show Data Table (stats)",show_stats_aria_label_on:"Toggle display data table on",show_stats_aria_label_off:"Toggle display data table off",show_collapsibles:"Show collapsible menu buttons",show_collapsibles_aria_label_on:"Toggle display collapsible menus on",show_collapsibles_aria_label_off:"Toggle display collapsible menus off",show_toolbar:"Show Toolbar",show_toolbar_aria_label_on:"Toggle display toolbar on",show_toolbar_aria_label_off:"Toggle display toolbar off",code_only_note:"Note: Custom actions and data table (stats) options are available exclusively using Code Editor manually."},vt={sessionEnergy:"Session Energy"},yt={not_requesting_current:"Not requesting current",ok:"Ok",pending_schedule:"Pending Schedule",none:"None",max_circuit_current_too_low:"Max circuit current too low",max_dynamic_circuit_current_too_low:"Max dynamic circuit current too low",max_dynamic_offline_fallback_circuit_current_too_low:"Max dynamic offline circuit current too low",circuit_fuse_too_low:"Circuit fuse too low",waiting_in_queue:"Waiting in queue",waiting_in_fully:"Waiting in fully",illegal_grid_type:"Illegal grid type",no_current_request:"No current request",max_charger_current_too_low:"Max charger current too low",max_dynamic_charger_current_too_low:"Max dynamic charger current too low",charger_disabled:"Charger Disabled",pending_authorization:"Pending Authorization",charger_in_error_state:"Charger in error state",undefined:"Undefined"},xt={status:mt,common:ft,error:wt,editor:bt,charger_status:vt,charger_substatus:yt},Bt={disconnected:"Getrennt",awaiting_start:"Pausiert",charging:"Laden",completed:"Fertig",error:"Fehler",ready_to_charge:"Bereit zum Laden"},Et={name:"Charger Card",description:"Charger card ermöglicht es dir, deinen Laderoboter zu steuern.",start_fast:"Start (schnell)",start_slow:"Start (langsam)",start_smart:"Start (smart)",continue:"Weiter",pause:"Pause",stop:"Stopp",override:"Zeitplan überschreiben",reboot:"Ladegerät neu starten",not_available:"Ladegerät nicht verfügbar",click_for_info:"Klicken für Infos",click_for_config:"Klicken für Konfiguration",click_for_limits:"Klicken für Limits",online:"Online",voltage:"Spannung",power:"Leistung",charger_current:"Ladestrom",energy_per_hour:"Energie pro Stunde",lifetime_energy:"Energie gesamt",circuit_current:"Aktueller Strom"},It={missing_entity:"Die Angabe der Entität ist erforderlich!"},Ct={entity:"Entity (Erforderlich)",smartChargingEntity:"Entity für Smart Charging",chargerImage:"Bild und Farbe des Ladegeräts",customImage:"Benutzerdefiniertes Bild (Optional - überschreibt das Bild des Ladegeräts)",theme:"Farbschema",compact_view:"Kompakte Ansicht",compact_view_aria_label_on:"Kompakte Ansicht einschalten",compact_view_aria_label_off:"Kompakte Ansicht ausschalten",show_name:"Name anzeigen",show_name_aria_label_on:"Anzeigename einschalten",show_name_aria_label_off:"Anzeigename ausschalten",show_leds:"Leds anzeigen",show_leds_aria_label_on:"Animierte Leds (Überlagerung des Bildes) einschalten",show_leds_aria_label_off:"Animierte Leds (Überlagerung des Bildes) ausschalten",show_status:"Status anzeigen",show_status_aria_label_on:"Statusanzeige einschalten",show_status_aria_label_off:"Statusanzeige ausschalten",show_stats:"Datentabelle anzeigen (Statistik)",show_stats_aria_label_on:"Datentabelle einschalten",show_stats_aria_label_off:"Datentabelle ausschalten",show_collapsibles:"Zusammenklappbare Menüschaltflächen anzeigen",show_collapsibles_aria_label_on:"Zusammenklappbare Menüschaltflächen einschalten",show_collapsibles_aria_label_off:"Zusammenklappbare Menüschaltflächen ausschalten",show_toolbar:"Symbolleiste anzeigen",show_toolbar_aria_label_on:"Symbolleiste einschalten",show_toolbar_aria_label_off:"Symbolleiste ausschalten",code_only_note:"Hinweis: Die Optionen für benutzerdefinierte Aktionen und Datentabellen (Statistiken) sind ausschließlich über den manuellen Code-Editor verfügbar."},Dt={sessionEnergy:"Energieaufladung"},Ot={not_requesting_current:"Keine Nachfrage nach Strom",ok:"Ok",pending_schedule:"Ausstehender Zeitplan",none:"None",max_circuit_current_too_low:"Maximalstrom zu niedrig",max_dynamic_circuit_current_too_low:"Dynamischer Maximalstrom zu niedrig",max_dynamic_offline_fallback_circuit_current_too_low:"Dynamischer offline Maximalstrom zu niedrig",circuit_fuse_too_low:"Stromkreissicherung zu niedrig",waiting_in_queue:"Warten in der Warteschlange",waiting_in_fully:"Warten in vollem Umfang",illegal_grid_type:"Unzulässiger Grid Typ",no_current_request:"Keine aktuelle Anfrage",max_charger_current_too_low:"Maximaler Ladestrom zu niedrig",max_dynamic_charger_current_too_low:"Maximaler dynamischer Ladestrom zu niedrig",charger_disabled:"Ladegerät Deaktiviert",pending_authorization:"Ausstehende Autorisierung",charger_in_error_state:"Ladegerät im Fehlerzustand",undefined:"Undefiniert"},Nt={status:Bt,common:Et,error:It,editor:Ct,charger_status:Dt,charger_substatus:Ot};const Ht={en:Object.freeze({__proto__:null,status:mt,common:ft,error:wt,editor:bt,charger_status:vt,charger_substatus:yt,default:xt}),de:Object.freeze({__proto__:null,status:Bt,common:Et,error:It,editor:Ct,charger_status:Dt,charger_substatus:Ot,default:Nt})};function Mt(t,e="",i=""){const r=(navigator.language||"en").split("-")[0];let o;try{o=t.split(".").reduce(((t,e)=>t[e]),Ht[r])}catch(e){o=t.split(".").reduce(((t,e)=>t[e]),Ht.en)}return void 0===o&&(o=t.split(".").reduce(((t,e)=>t[e]),Ht.en)),""!==e&&""!==i&&(o=o.replace(e,i)),o}var Gt="data:image/gif;base64,R0lGODlhAwBIAHAAACwAAAAAAwBIAIGAgIAAAAAAAAAAAAACDYSPqcvtD6OctNqLVQEAOw==",kt="data:image/gif;base64,R0lGODlhAwBIAHAAACwAAAAAAwBIAIFwcHD///8AAAAAAAACGYSDqZvmwOJ6R1oKrcR60x5x4PSNimgiTgEAOw==",Pt="data:image/gif;base64,R0lGODlhAwBIAHAAACwAAAAAAwBIAIFwcHAAJv8AAAAAAAACGYSDqZvmwOJ6R1oKrcR60x5x4PSNimgiTgEAOw==",Ut="data:image/gif;base64,R0lGODlhAwBIAIEAAAAAAGBgYP8AAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hZDcmVhdGVkIHdpdGggUGFpbnQuTkVUACH5BAkZAAAALAAAAAADAEgAAAINjI+py+0Po5y02otVAQAh+QQJGQAAACwAAAEAAwBGAAACF5SPecCtn5qDVDJaLYYW7Nd9SigiZGkUADs=";const Yt="disconnected",Lt="awaiting_start",jt="charging",zt="completed",Qt="error",Ft="ready_to_charge",St={normal:{DEFAULT:Gt,disconnected:"data:image/gif;base64,R0lGODlhAwBIAHAAACwAAAAAAwBIAIFwcHBgYGD///8AAAACHYSDqZvmwOJ6R1oKrcR60x5x4EQJ5ommJ6a2qVMAADs=",awaitingStart:kt,charging:"data:image/gif;base64,R0lGODlhAwBIAIAAAAAAAP///yH/C05FVFNDQVBFMi4wAwEAAAAh/hZDcmVhdGVkIHdpdGggUGFpbnQuTkVUACH5BAkZAAAALAAAQQADAAYAAAIEjI95BQAh+QQJGQAAACwAADkAAwAOAAACB4yPecCtnwoAIfkECRkAAAAsAAAxAAMAFgAAAgqMj3nArZ+ag7QAACH5BAkZAAAALAAAKQADAB4AAAIMjI95wK2fmoNUMkoLACH5BAkZAAAALAAAIQADACYAAAIOjI95wK2fmoNUMlothgUAIfkECRkAAAAsAAAZAAMALgAAAhGMj3nArZ+ag1QyWi2GFuxXAAAh+QQJGQAAACwAABEAAwA2AAACE4yPecCtn5qDVDJaLYYW7Nd9SgEAIfkECRkAAAAsAAAJAAMAPgAAAhWMj3nArZ+ag1QyWi2GFuzXfUooIgUAIfkECRkAAAAsAAABAAMARgAAAheMj3nArZ+ag1QyWi2GFuzXfUooImRpFAA7",completed:kt,error:Ut,readyToCharge:kt},smart:{DEFAULT:Gt,disconnected:"data:image/gif;base64,R0lGODlhAwBIAHAAACwAAAAAAwBIAIFwcHBgYGAAJv8AAAACHYSDqZvmwOJ6R1oKrcR60x5x4EQJ5ommJ6a2qVMAADs=",awaitingStart:Pt,charging:"data:image/gif;base64,R0lGODlhAwBIAIAAAAAAAAAm/yH/C05FVFNDQVBFMi4wAwEAAAAh/hZDcmVhdGVkIHdpdGggUGFpbnQuTkVUACH5BAkZAAAALAAAQQADAAYAAAIEjI95BQAh+QQJGQAAACwAADkAAwAOAAACB4yPecCtnwoAIfkECRkAAAAsAAAxAAMAFgAAAgqMj3nArZ+ag7QAACH5BAkZAAAALAAAKQADAB4AAAIMjI95wK2fmoNUMkoLACH5BAkZAAAALAAAIQADACYAAAIOjI95wK2fmoNUMlothgUAIfkECRkAAAAsAAAZAAMALgAAAhGMj3nArZ+ag1QyWi2GFuxXAAAh+QQJGQAAACwAABEAAwA2AAACE4yPecCtn5qDVDJaLYYW7Nd9SgEAIfkECRkAAAAsAAAJAAMAPgAAAhWMj3nArZ+ag1QyWi2GFuzXfUooIgUAIfkECRkAAAAsAAABAAMARgAAAheMj3nArZ+ag1QyWi2GFuzXfUooImRpFAA7",completed:Pt,error:Ut,readyToCharge:Pt}},Kt="binary_sensor.plug",Vt="switch.cable_locked_permanently",Tt="binary_sensor.charging_state",Xt="binary_sensor.basic_schedule",Zt="sensor.circuit_current",Rt="sensor.cost_per_kwh",qt="sensor.dynamic_charger_limit",Wt="sensor.dynamic_circuit_limit",Jt="switch.enable_idle_current",_t="sensor.current",$t="switch.is_enabled",te="sensor.max_current",ee="sensor.max_circuit_limit",ie="sensor.offline_circuit_limit",re="binary_sensor.status",oe="sensor.output_limit",se="sensor.reason_for_no_current",ne="sensor.session_energy",ae="sensor.energy_per_hour",le="sensor.total_energy",ce="sensor.charging_power",he="binary_sensor.update_available",de="sensor.voltage",ge=[{name:"Generic",img:"data:image/png;base64,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"}],ue={"binary_sensor.plug":"mdi:lock","switch.cable_locked_permanently":"mdi:lock","binary_sensor.basic_schedule":"mdi:clock-check","sensor.circuit_current":"mdi:sine-wave","sensor.cost_per_kwh":"mdi:currency-usd","sensor.dynamic_charger_limit":"mdi:sine-wave","sensor.dynamic_circuit_limit":"mdi:sine-wave","switch.enable_idle_current":"mdi:current-dc","sensor.offline_circuit_limit":"mdi:sine-wave","sensor.current":"mdi:sine-wave","switch.is_enabled":"mdi:power","sensor.max_current":"mdi:sine-wave","sensor.max_circuit_limit":"mdi:sine-wave","binary_sensor.status":"mdi:wifi","sensor.output_limit":"mdi:sine-wave","sensor.reason_for_no_current":"mdi:alert-circle","sensor.session_energy":"mdi:flash","sensor.energy_per_hour":"mdi:flash","sensor.total_energy":"mdi:flash","switch.smart_charging":"mdi:auto-fix","sensor.charging_power":"mdi:flash","binary_sensor.update_available":"mdi:file-download","sensor.voltage":"mdi:sine-wave"},Ae=[{name:"theme_default",desc:"Default HA colors"},{name:"theme_custom",desc:"Use custom theme"},{name:"theme_transp_blue",desc:"Transparent Blue"},{name:"theme_transp_black",desc:"Transparent Black"},{name:"theme_transp_white",desc:"Transparent White"},{name:"theme_lightgrey_blue",desc:"LightGrey Blue"}];let pe=class extends q{constructor(){super(...arguments),this._initialized=!1}setConfig(t){this._config=t,this._config.entity||(this._config.entity=this.getEntitiesByType("binary_sensor")[0]||"",this._config.smartChargingEntity=this.getEntitiesByType("input_boolean")[0]||"",pt(this,"config-changed",{config:this._config})),this.loadCardHelpers()}shouldUpdate(){return this._initialized||this._initialize(),!0}get _entity(){return this._config&&this._config.entity||""}get _smartChargingEntity(){return this._config&&this._config.smartChargingEntity||""}get _customImage(){return this._config&&this._config.customImage||""}get _chargerImage(){return this._config&&this._config.chargerImage||"Generic"}get _customCardTheme(){return this._config?this._config.customCardTheme||"":"theme_default"}get showName(){return!this._config||(void 0===this._config.show_name||this._config.show_name)}get showLeds(){return!this._config||(void 0===this._config.show_leds||this._config.show_leds)}get showStatus(){return!this._config||(void 0===this._config.show_status||this._config.show_status)}get showToolbar(){return!this._config||(void 0===this._config.show_toolbar||this._config.show_toolbar)}get showStats(){return!this._config||(void 0===this._config.show_stats||this._config.show_stats)}get showCollapsibles(){return!this._config||(void 0===this._config.show_collapsibles||this._config.show_collapsibles)}get compactView(){return!!this._config&&(void 0!==this._config.compact_view&&this._config.compact_view)}getEntitiesByType(t){return this.hass?Object.keys(this.hass.states).filter((e=>e.substr(0,e.indexOf("."))===t)):[]}render(){if(!this.hass)return M``;const t=Object.keys(this.hass.states).filter((t=>"binary_sensor"===t.substr(0,t.indexOf(".")))),e=Object.keys(this.hass.states).filter((t=>"input_boolean"===t.substr(0,t.indexOf("."))));return M`
      <div class="card-config">

        <paper-dropdown-menu label="${Mt("editor.entity")}" @value-changed=${this._valueChanged} .configValue=${"entity"}>
            <paper-listbox slot="dropdown-content" .selected=${t.indexOf(this._entity)}>
              ${t.map((t=>M`
                  <paper-item>${t}</paper-item>
                `))}
            </paper-listbox>
        </paper-dropdown-menu>

        <paper-dropdown-menu label="${Mt("editor.smartChargingEntity")}" @value-changed=${this._valueChanged} .configValue=${"smartChargingEntity"}>
            <paper-listbox slot="dropdown-content" .selected=${e.indexOf(this._smartChargingEntity)}>
              ${e.map((t=>M`
                  <paper-item>${t}</paper-item>
                `))}
            </paper-listbox>
        </paper-dropdown-menu>

        <paper-dropdown-menu label="${Mt("editor.theme")}" @value-changed=${this._valueChanged} .configValue=${"customCardTheme"}>
            <paper-listbox slot="dropdown-content" selected="${this._customCardTheme}" attr-for-selected="value">
              ${Ae.map((t=>M`
                  <paper-item value="${t.name}">${t.name}</paper-item>
                `))}
            </paper-listbox>
        </paper-dropdown-menu>


              <paper-dropdown-menu label="${Mt("editor.chargerImage")}" @value-changed=${this._valueChanged} .configValue=${"chargerImage"}>
                <paper-listbox slot="dropdown-content" selected="${this._chargerImage}" attr-for-selected="value">
                  ${ge.map((t=>M`
                      <paper-item value="${t.name}">${t.name}</paper-item>
                    `))}
                </paper-listbox>
              </paper-dropdown-menu>


              <paper-input label="${Mt("editor.customImage")}" .value=${this._customImage} .configValue=${"customImage"} @value-changed=${this._valueChanged}"></paper-input>

          <p class="option">
            <ha-switch
              aria-label=${Mt(this.compactView?"editor.compact_view_aria_label_off":"editor.compact_view_aria_label_on")}
              .checked=${!1!==this.compactView}
              .configValue=${"compact_view"}
              @change=${this._valueChanged}
            >
            </ha-switch>
            ${Mt("editor.compact_view")}
          </p>

          <p class="option">
            <ha-switch
              aria-label=${Mt(this.showName?"editor.show_name_aria_label_off":"editor.show_name_aria_label_on")}
              .checked=${this.showName}
              .configValue=${"show_name"}
              @change=${this._valueChanged}
            >
            </ha-switch>
            ${Mt("editor.show_name")}
          </p>

          <p class="option">
            <ha-switch
              aria-label=${Mt(this.showLeds?"editor.show_leds_aria_label_off":"editor.show_leds_aria_label_on")}
              .checked=${!1!==this.showLeds}
              .configValue=${"show_leds"}
              @change=${this._valueChanged}
            >
            </ha-switch>
            ${Mt("editor.show_leds")}
          </p>


          <p class="option">
            <ha-switch
              aria-label=${Mt(this.showStatus?"editor.show_status_aria_label_off":"editor.show_status_aria_label_on")}
              .checked=${!1!==this.showStatus}
              .configValue=${"show_status"}
              @change=${this._valueChanged}
            >
            </ha-switch>
            ${Mt("editor.show_status")}
          </p>

          <p class="option">
          <ha-switch
            aria-label=${Mt(this.showCollapsibles?"editor.show_collapsibles_aria_label_off":"editor.show_collapsibles_aria_label_on")}
            .checked=${!1!==this.showCollapsibles}
            .configValue=${"show_collapsibles"}
            @change=${this._valueChanged}
          >
          </ha-switch>
          ${Mt("editor.show_collapsibles")}
        </p>

          <p class="option">
            <ha-switch
              aria-label=${Mt(this.showStats?"editor.show_stats_aria_label_off":"editor.show_stats_aria_label_on")}
              .checked=${this.showStats}
              .configValue=${"show_stats"}
              @change=${this._valueChanged}
            >
            </ha-switch>
            ${Mt("editor.show_stats")}
          </p>




          <p class="option">
            <ha-switch
              aria-label=${Mt(this.showToolbar?"editor.show_toolbar_aria_label_off":"editor.show_toolbar_aria_label_on")}
              .checked=${!1!==this.showToolbar}
              .configValue=${"show_toolbar"}
              @change=${this._valueChanged}
            >
            </ha-switch>
            ${Mt("editor.show_toolbar")}
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
    `}};t([_({attribute:!1})],pe.prototype,"hass",void 0),t([$()],pe.prototype,"_config",void 0),t([$()],pe.prototype,"_toggle",void 0),t([$()],pe.prototype,"_helpers",void 0),pe=t([W("keba-charger-card-editor")],pe);var me=s`
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

  .keba-leds-container {
    position: absolute;
    top: 109px;
    width: 100%;
  }

  .keba-leds {
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
`;console.info("%cKEBA-CHARGER-CARD 0.0.2 IS INSTALLED","color: green; font-weight: bold",""),window.customCards=window.customCards||[],window.customCards.push({type:"keba-charger-card",name:"Keba Charger Card Card",description:"A keba charger card for visualizing the status and interacting with your Keba P30"});let fe=class extends q{static get styles(){return me}static async getConfigElement(){return document.createElement("keba-charger-card-editor")}static getStubConfig(t){const[e]=t.filter((t=>"binary_sensor"===t.substr(0,t.indexOf("."))));return{entity:e||"",image:"default"}}get entity(){return null!=this.config.entity?this.hass.states[this.config.entity]:void 0}get smartChargingEntity(){return null!=this.config.smartChargingEntity?this.hass.states[this.config.smartChargingEntity]:void 0}get scriptDomain(){return void 0===this.config.domain?"script":this.config.domain}get status(){if("off"==this.getEntityState(this.getEntity(Kt)))return Yt;return"on"==this.getEntityState(this.getEntity(Tt))?jt:this.smartChargingEntity&&"on"==this.smartChargingEntity.state?Lt:Ft}get image(){const t=this.config.chargerImage||"Generic",e=ge.find((({name:e})=>e===t?e:void 0));if(void 0===this.config.customImage||""===this.config.customImage)try{return void 0===e?void 0:e.img}catch(t){return""}return this.config.customImage}get customCardTheme(){return void 0===this.config.customCardTheme?"theme_default":this.config.customCardTheme}get showLeds(){return void 0===this.config.show_leds||this.config.show_leds}get showName(){return void 0===this.config.show_name||this.config.show_name}get showStatus(){return void 0===this.config.show_status||this.config.show_status}get showStats(){return void 0===this.config.show_stats||this.config.show_stats}get showCollapsibles(){return void 0===this.config.show_collapsibles||this.config.show_collapsibles}get showToolbar(){return void 0===this.config.show_toolbar||this.config.show_toolbar}get compactView(){return void 0!==this.config.compact_view&&this.config.compact_view}get entityBasename(){return void 0===this.config.entity?"":this.config.entity.split(".")[1].replace("_status","")}getEntityId(t){try{return t.split(".")[0]+"."+this.entityBasename+"_"+t.split(".")[1]}catch(t){return}}getEntityBase(t){try{return t.split(".")[0]+"."+t.split(".")[1].replace(this.entityBasename+"_","")}catch(t){return}}getEntities(){return{cableLocked:this.getEntity(Kt),cableLockedPermanently:this.getEntity(Vt),chargingState:this.getEntity(Tt),basicSchedule:this.getEntity(Xt),circuitCurrent:this.getEntity(Zt),costPerKwh:this.getEntity(Rt),dynamicChargerCurrent:this.getEntity(qt),dynamicCircuitCurrent:this.getEntity(Wt),enableIdleCurrent:this.getEntity(Jt),offlineCircuitCurrent:this.getEntity(ie),inCurrent:this.getEntity(_t),isEnabled:this.getEntity($t),maxChargerCurrent:this.getEntity(te),maxCircuitCurrent:this.getEntity(ee),isOnline:this.getEntity(re),outputCurrent:this.getEntity(oe),reasonForNoCurrent:this.getEntity(se),sessionEnergy:this.getEntity(ne),energyPerHour:this.getEntity(ae),energyLifetime:this.getEntity(le),smartCharging:this.smartChargingEntity,totalPower:this.getEntity(ce),updateAvailable:this.getEntity(he),voltage:this.getEntity(de),status:this.entity}}getEntity(t){try{const e=this.getEntityId(t);return void 0===e?void 0:this.hass.states[e]}catch(t){return}}getEntityState(t){try{return t.state}catch(t){return}}getEntityAttribute(t,e){try{return t.attributes[e]}catch(t){return}}getStatsDefault(t){switch(t){case Yt:return[{entityId:this.getEntityId(ne),unit:"kWh",subtitle:Mt("charger_status.sessionEnergy")},{entityId:this.getEntityId(te),unit:"A",subtitle:"Current Limit"},{entityId:this.getEntityId(Kt),unit:"",subtitle:"Locked"}];case Lt:return[{entityId:this.getEntityId(te),unit:"A",subtitle:"Current Limit"},{entityId:this.getEntityId(ne),unit:"kWh",subtitle:Mt("charger_status.sessionEnergy")},{entityId:this.smartChargingEntity?this.smartChargingEntity.entity_id:"",unit:"",subtitle:"Smart Charging"}];case jt:return[{entityId:this.getEntityId(ne),unit:"kWh",subtitle:"Energy"},{entityId:this.getEntityId(te),unit:"A",subtitle:"Current Limit"},{entityId:this.getEntityId(Zt),unit:"A",subtitle:"Circuit"},{entityId:this.getEntityId(oe),unit:"A",subtitle:"Allowed"},{entityId:this.getEntityId(_t),unit:"A",subtitle:"Actual"},{entityId:this.getEntityId(ce),unit:"kW",subtitle:"Power"},{entityId:this.smartChargingEntity?this.smartChargingEntity.entity_id:"",unit:"",subtitle:"Smart Charging"}];case zt:case Qt:return[{entityId:this.getEntityId(ne),unit:"kWh",subtitle:Mt("charger_status.sessionEnergy")},{entityId:this.getEntityId(te),unit:"A",subtitle:"Current Limit"}];case Ft:return[{entityId:this.getEntityId(ne),unit:"kWh",subtitle:Mt("charger_status.sessionEnergy")},{entityId:this.getEntityId(te),unit:"A",subtitle:"Current Limit"},{entityId:this.getEntityId(Xt),unit:"",subtitle:"Schedule"}]}return[]}setConfig(t){if(!t.entity)throw new Error(Mt("error.missing_entity"));this.config=t}getCardSize(){return 2}shouldUpdate(t){return function(t,e,i){if(e.has("config")||i)return!0;if(t.config.entity){var r=e.get("hass");return!r||r.states[t.config.entity]!==t.hass.states[t.config.entity]}return!1}(this,t,!0)}updated(t){this.config.entity&&t.get("hass")&&t.get("hass").states[this.config.entity].state!==this.hass.states[this.config.entity].state&&(this.requestInProgress=!1)}handleMore(t){t&&t.entity_id&&pt(this,"hass-more-info",{entityId:t.entity_id},{bubbles:!0,composed:!0})}callService(t,e=!0,i={}){this.hass.callService(this.scriptDomain,t,Object.assign({},i)),e&&this.requestUpdate()}imageLed(t,e){const i=e?"smart":"normal";return St[i][t]||St[i].DEFAULT}renderImage(t){let e="";return this.compactView&&(e="-compact"),this.image?M`
      <img
        class="charger${e}"
        src="${this.image}"
        @click="${()=>this.handleMore(this.entity)}"
        ?more-info="true"
      />${this.renderLeds(t)}
    `:M``}renderLeds(t){if(console.log(t),this.showLeds){let e="";return e=t===jt?"green":"blue",M`<div class="keba-leds-container"><div class="keba-leds keba-leds-${e}"></div></div>`}return M``}renderStats(t){if(!this.showStats)return M``;let e="";this.compactView&&(e="-compact");const i=this.getStatsDefault(t)||[];return M` <div class="stats${e}">${this.renderStatsList(i)}</div> `}renderStatsList(t){return t.map((({entityId:t,attribute:e,calcValue:i,unit:r,subtitle:o})=>{if(!(t||e||i))return M``;if(i)return this.renderStatsHtml(i,r,o,this.hass.states[t]);try{const i=e?this.hass.states[t].attributes[e]:this.hass.states[t].state;return this.renderStatsHtml(i,r,o,this.hass.states[t])}catch(t){return null}}))}renderStatsHtml(t,e,i,r){return M`
      <div class="stats-block" @click="${()=>this.handleMore(r)}" ?more-info="true">
        <span class="stats-value">${t}</span>
        ${e}
        <div class="stats-subtitle">${i}</div>
      </div>
    `}renderName(){if(!this.showName)return M``;let t="";return this.compactView&&(t="-compact"),M` <div class="charger-name${t}">Keba P30</div> `}renderStatus(){if(!this.showStatus)return M``;let t="";this.compactView&&(t="-compact");const e=Mt(`status.${this.status}`)||this.status;return M`
      <div class="status${t}">
        <span class="status-text${t}" alt=${e}> ${e} </span>
        <ha-circular-progress .active=${this.requestInProgress} size="small"></ha-circular-progress>
      </div>
    `}renderCollapsibleInfo(){if(!this.showCollapsibles)return M``;const{isOnline:t,totalPower:e,sessionEnergy:i,energyLifetime:r}=this.getEntities(),o=Mt("common.click_for_info");return M`
      <div>
        <input id="collapsible-info" class="toggle-info" type="checkbox" />
        <label for="collapsible-info" class="lbl-toggle-info">
          <div class="tooltip-right">
            <ha-icon icon="mdi:information"></ha-icon>
            <span class="tooltiptext-right">${o}</span>
          </div>
        </label>
        <div class="collapsible-content-info">
          <div class="content-inner-info">
            ${this.renderCollapsibleItems(t,Mt("common.online"))}
            ${this.renderCollapsibleItems(e,Mt("common.power"))}
            ${this.renderCollapsibleItems(i,Mt("charger_status.sessionEnergy"))}
            ${this.renderCollapsibleItems(r,Mt("common.lifetime_energy"),!0)}
          </div>
        </div>
      </div>
    `}renderCollapsibleItems(t,e,i=!1){if(null==t)return M``;const r=i?Math.round(this.getEntityState(t)):this.getEntityState(t),o=this.renderIcon(t),s=this.getEntityAttribute(t,"unit_of_measurement");return M`
      <div class="collapsible-item" @click="${()=>this.handleMore(t)}" ?more-info="true">
        <div class="tooltip">
          <ha-icon icon="${o}"></ha-icon>
          <br />${r} ${s}
          <span class="tooltiptext">${e}</span>
        </div>
      </div>
    `}renderInfoItemsLeft(){const{isOnline:t}=this.getEntities();return M` ${this.renderInfoItem(t,Mt("common.online"))} `}renderInfoItemsRight(){const{cableLocked:t,totalPower:e,voltage:i}=this.getEntities(),r=t&&"on"==t.state?"mdi:power-plug":"mdi:power-plug-off";return M`
      ${this.renderInfoItem(i,Mt("common.voltage"),!0)}
      ${this.renderInfoItem(e,Mt("common.power"))}
      <ha-icon icon="${r}"></ha-icon>
    `}renderInfoItemsCompact(){const{totalPower:t,voltage:e}=this.getEntities();return M`
      ${this.renderInfoItem(e,Mt("common.voltage"),!0)}
      ${this.renderInfoItem(t,Mt("common.power"),!0)}
    `}renderInfoItem(t,e,i=!1){if(null==t)return M``;const r=i?Math.round(this.getEntityState(t)):this.getEntityState(t),o=this.getEntityAttribute(t,"unit_of_measurement"),s=this.renderIcon(t);return M`
      <div class="infoitems-item" @click="${()=>this.handleMore(t)}" ?more-info="true">
        <div class="tooltip">
          <ha-icon icon="${s}"></ha-icon>
          ${r} ${o}
          <span class="tooltiptext">${e}</span>
        </div>
      </div>
    `}renderIcon(t){const e=t.entity_id,i=this.getEntityBase(e);return void 0!==this.getEntityAttribute(t,"icon")?this.getEntityAttribute(t,"icon"):(void 0===i?null:ue[i])||"mdi:cancel"}renderToolbar(t){if(!this.showToolbar)return M``;let e=M``;switch(t){case Yt:case Qt:return M``;case Lt:e=M`
          ${this.renderToolbarButton("keba_off","hass:stop","common.stop")}
          ${this.renderToolbarButton("keba_fast","mdi:fast-forward","common.start_fast")}
          ${this.renderToolbarButton("keba_slow","mdi:play","common.start_slow")}
        `;break;case jt:e=M`
          ${this.renderToolbarButton("keba_off","hass:stop","common.stop")}
          ${this.renderToolbarButton("keba_fast","mdi:fast-forward","common.start_fast")}
          ${this.renderToolbarButton("keba_slow","mdi:play","common.start_slow")}
          ${this.renderToolbarButton("keba_auto","mdi:play-speed","common.start_smart")}
        `;break;case zt:case Ft:e=M`
          ${this.renderToolbarButton("keba_fast","mdi:fast-forward","common.start_fast")}
          ${this.renderToolbarButton("keba_slow","mdi:play","common.start_slow")}
          ${this.renderToolbarButton("keba_auto","mdi:play-speed","common.start_smart")}
        `}return M`
      <div class="toolbar">
        ${e}
        <div class="fill-gap"></div>
      </div>
    `}renderToolbarButton(t,e,i,r={},o=!0){let s="";try{s=Mt(i)}catch(t){s=i}return M`
      <div class="tooltip">
        <ha-icon-button
          icon="${e}"
          title="${s}"
          @click="${()=>this.callService(t,o,r)}"
        ></ha-icon-button>
        <span class="tooltiptext">${s}</span>
      </div>
    `}renderCompact(){const t=this.status;return M`
      <ha-card>
        <div class="preview-compact">
          ${this.renderImage(t)}

          <div class="metadata">${this.renderName()} ${this.renderStatus()}</div>

          <div class="infoitems">${this.renderInfoItemsCompact()}</div>

          ${this.renderStats(t)}
        </div>

        ${this.renderToolbar(t)}
      </ha-card>
    `}renderFull(){const t=this.status;return M`
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
    `}renderCustomCardTheme(){switch(this.customCardTheme){case"theme_custom":break;default:this.style.setProperty("--custom-card-background-color","#03A9F4"),this.style.setProperty("--custom-text-color","#FFFFFF"),this.style.setProperty("--custom-primary-color","#03A9F4"),this.style.setProperty("--custom-icon-color","#FFFFFF");break;case"theme_transp_blue":this.style.setProperty("--custom-card-background-color","transparent"),this.style.setProperty("--custom-text-color","#03A9F4"),this.style.setProperty("--custom-primary-color","#03A9F4"),this.style.setProperty("--custom-icon-color","#03A9F4");break;case"theme_transp_black":this.style.setProperty("--custom-card-background-color","transparent"),this.style.setProperty("--custom-text-color","black"),this.style.setProperty("--custom-primary-color","black"),this.style.setProperty("--custom-icon-color","black");break;case"theme_transp_white":this.style.setProperty("--custom-card-background-color","transparent"),this.style.setProperty("--custom-text-color","white"),this.style.setProperty("--custom-primary-color","white"),this.style.setProperty("--custom-icon-color","white");break;case"theme_lightgrey_blue":this.style.setProperty("--custom-card-background-color","lightgrey"),this.style.setProperty("--custom-text-color","#03A9F4"),this.style.setProperty("--custom-primary-color","#03A9F4"),this.style.setProperty("--custom-icon-color","#03A9F4")}}render(){return this.renderCustomCardTheme(),this.entity?this.compactView?this.renderCompact():this.renderFull():M`
        <ha-card>
          <div class="preview not-available">
            <div class="metadata">
              <div class="not-available">${Mt("common.not_available")}</div>
            </div>
          </div>
        </ha-card>
      `}};t([_({attribute:!1})],fe.prototype,"hass",void 0),t([$()],fe.prototype,"config",void 0),t([_({attribute:!1})],fe.prototype,"requestInProgress",void 0),fe=t([W("keba-charger-card")],fe);export{fe as ChargerCard};
