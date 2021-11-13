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
function t(t,e,r,i){var o,n=arguments.length,s=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(s=(n<3?o(s):n>3?o(e,r,s):o(e,r))||s);return n>3&&s&&Object.defineProperty(e,r,s),s
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}const e=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),i=new Map;class o{constructor(t,e){if(this._$cssResult$=!0,e!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let t=i.get(this.cssText);return e&&void 0===t&&(i.set(this.cssText,t=new CSSStyleSheet),t.replaceSync(this.cssText)),t}toString(){return this.cssText}}const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,r,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+t[i+1]),t[0]);return new o(i,r)},s=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const r of t.cssRules)e+=r.cssText;return(t=>new o("string"==typeof t?t:t+"",r))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var a;const l=window.trustedTypes,c=l?l.emptyScript:"",d=window.reactiveElementPolyfillSupport,h={toAttribute(t,e){switch(e){case Boolean:t=t?c:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=null!==t;break;case Number:r=null===t?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch(t){r=null}}return r}},u=(t,e)=>e!==t&&(e==e||t==t),p={attribute:!0,type:String,converter:h,reflect:!1,hasChanged:u};class f extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;null!==(e=this.l)&&void 0!==e||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,r)=>{const i=this._$Eh(r,e);void 0!==i&&(this._$Eu.set(i,r),t.push(i))})),t}static createProperty(t,e=p){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const r="symbol"==typeof t?Symbol():"__"+t,i=this.getPropertyDescriptor(t,r,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,r){return{get(){return this[e]},set(i){const o=this[t];this[e]=i,this.requestUpdate(t,o,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||p}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const r of e)this.createProperty(r,t[r])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const r=new Set(t.flat(1/0).reverse());for(const t of r)e.unshift(s(t))}else void 0!==t&&e.push(s(t));return e}static _$Eh(t,e){const r=e.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ep=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Em(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,r;(null!==(e=this._$Eg)&&void 0!==e?e:this._$Eg=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(r=t.hostConnected)||void 0===r||r.call(t))}removeController(t){var e;null===(e=this._$Eg)||void 0===e||e.splice(this._$Eg.indexOf(t)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const r=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,r)=>{e?t.adoptedStyleSheets=r.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):r.forEach((e=>{const r=document.createElement("style"),i=window.litNonce;void 0!==i&&r.setAttribute("nonce",i),r.textContent=e.cssText,t.appendChild(r)}))})(r,this.constructor.elementStyles),r}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ES(t,e,r=p){var i,o;const n=this.constructor._$Eh(t,r);if(void 0!==n&&!0===r.reflect){const s=(null!==(o=null===(i=r.converter)||void 0===i?void 0:i.toAttribute)&&void 0!==o?o:h.toAttribute)(e,r.type);this._$Ei=t,null==s?this.removeAttribute(n):this.setAttribute(n,s),this._$Ei=null}}_$AK(t,e){var r,i,o;const n=this.constructor,s=n._$Eu.get(t);if(void 0!==s&&this._$Ei!==s){const t=n.getPropertyOptions(s),a=t.converter,l=null!==(o=null!==(i=null===(r=a)||void 0===r?void 0:r.fromAttribute)&&void 0!==i?i:"function"==typeof a?a:null)&&void 0!==o?o:h.fromAttribute;this._$Ei=s,this[s]=l(e,t.type),this._$Ei=null}}requestUpdate(t,e,r){let i=!0;void 0!==t&&(((r=r||this.constructor.getPropertyOptions(t)).hasChanged||u)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===r.reflect&&this._$Ei!==t&&(void 0===this._$E_&&(this._$E_=new Map),this._$E_.set(t,r))):i=!1),!this.isUpdatePending&&i&&(this._$Ep=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,e)=>this[e]=t)),this._$Et=void 0);let e=!1;const r=this._$AL;try{e=this.shouldUpdate(r),e?(this.willUpdate(r),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(r)):this._$EU()}catch(t){throw e=!1,this._$EU(),t}e&&this._$AE(r)}willUpdate(t){}_$AE(t){var e;null===(e=this._$Eg)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(t){return!0}update(t){void 0!==this._$E_&&(this._$E_.forEach(((t,e)=>this._$ES(e,this[e],t))),this._$E_=void 0),this._$EU()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var m;f.finalized=!0,f.elementProperties=new Map,f.elementStyles=[],f.shadowRootOptions={mode:"open"},null==d||d({ReactiveElement:f}),(null!==(a=globalThis.reactiveElementVersions)&&void 0!==a?a:globalThis.reactiveElementVersions=[]).push("1.0.2");const g=globalThis.trustedTypes,v=g?g.createPolicy("lit-html",{createHTML:t=>t}):void 0,b=`lit$${(Math.random()+"").slice(9)}$`,y="?"+b,x=`<${y}>`,A=document,P=(t="")=>A.createComment(t),w=t=>null===t||"object"!=typeof t&&"function"!=typeof t,z=Array.isArray,j=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,k=/-->/g,H=/>/g,S=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,O=/'/g,T=/"/g,L=/^(?:script|style|textarea)$/i,X=(t=>(e,...r)=>({_$litType$:t,strings:e,values:r}))(1),V=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),C=new WeakMap,W=A.createTreeWalker(A,129,null,!1),E=(t,e)=>{const r=t.length-1,i=[];let o,n=2===e?"<svg>":"",s=j;for(let e=0;e<r;e++){const r=t[e];let a,l,c=-1,d=0;for(;d<r.length&&(s.lastIndex=d,l=s.exec(r),null!==l);)d=s.lastIndex,s===j?"!--"===l[1]?s=k:void 0!==l[1]?s=H:void 0!==l[2]?(L.test(l[2])&&(o=RegExp("</"+l[2],"g")),s=S):void 0!==l[3]&&(s=S):s===S?">"===l[0]?(s=null!=o?o:j,c=-1):void 0===l[1]?c=-2:(c=s.lastIndex-l[2].length,a=l[1],s=void 0===l[3]?S:'"'===l[3]?T:O):s===T||s===O?s=S:s===k||s===H?s=j:(s=S,o=void 0);const h=s===S&&t[e+1].startsWith("/>")?" ":"";n+=s===j?r+x:c>=0?(i.push(a),r.slice(0,c)+"$lit$"+r.slice(c)+b+h):r+b+(-2===c?(i.push(void 0),e):h)}const a=n+(t[r]||"<?>")+(2===e?"</svg>":"");return[void 0!==v?v.createHTML(a):a,i]};class M{constructor({strings:t,_$litType$:e},r){let i;this.parts=[];let o=0,n=0;const s=t.length-1,a=this.parts,[l,c]=E(t,e);if(this.el=M.createElement(l,r),W.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(i=W.nextNode())&&a.length<s;){if(1===i.nodeType){if(i.hasAttributes()){const t=[];for(const e of i.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(b)){const r=c[n++];if(t.push(e),void 0!==r){const t=i.getAttribute(r.toLowerCase()+"$lit$").split(b),e=/([.?@])?(.*)/.exec(r);a.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?N:"?"===e[1]?J:"@"===e[1]?Z:Q})}else a.push({type:6,index:o})}for(const e of t)i.removeAttribute(e)}if(L.test(i.tagName)){const t=i.textContent.split(b),e=t.length-1;if(e>0){i.textContent=g?g.emptyScript:"";for(let r=0;r<e;r++)i.append(t[r],P()),W.nextNode(),a.push({type:2,index:++o});i.append(t[e],P())}}}else if(8===i.nodeType)if(i.data===y)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=i.data.indexOf(b,t+1));)a.push({type:7,index:o}),t+=b.length-1}o++}}static createElement(t,e){const r=A.createElement("template");return r.innerHTML=t,r}}function I(t,e,r=t,i){var o,n,s,a;if(e===V)return e;let l=void 0!==i?null===(o=r._$Cl)||void 0===o?void 0:o[i]:r._$Cu;const c=w(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(n=null==l?void 0:l._$AO)||void 0===n||n.call(l,!1),void 0===c?l=void 0:(l=new c(t),l._$AT(t,r,i)),void 0!==i?(null!==(s=(a=r)._$Cl)&&void 0!==s?s:a._$Cl=[])[i]=l:r._$Cu=l),void 0!==l&&(e=I(t,l._$AS(t,e.values),l,i)),e}class G{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:r},parts:i}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:A).importNode(r,!0);W.currentNode=o;let n=W.nextNode(),s=0,a=0,l=i[0];for(;void 0!==l;){if(s===l.index){let e;2===l.type?e=new K(n,n.nextSibling,this,t):1===l.type?e=new l.ctor(n,l.name,l.strings,this,t):6===l.type&&(e=new U(n,this,t)),this.v.push(e),l=i[++a]}s!==(null==l?void 0:l.index)&&(n=W.nextNode(),s++)}return o}m(t){let e=0;for(const r of this.v)void 0!==r&&(void 0!==r.strings?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}}class K{constructor(t,e,r,i){var o;this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=i,this._$Cg=null===(o=null==i?void 0:i.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=I(this,t,e),w(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==V&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.S(t):(t=>{var e;return z(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])})(t)?this.M(t):this.$(t)}A(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}S(t){this._$AH!==t&&(this._$AR(),this._$AH=this.A(t))}$(t){this._$AH!==q&&w(this._$AH)?this._$AA.nextSibling.data=t:this.S(A.createTextNode(t)),this._$AH=t}T(t){var e;const{values:r,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=M.createElement(i.h,this.options)),i);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.m(r);else{const t=new G(o,this),e=t.p(this.options);t.m(r),this.S(e),this._$AH=t}}_$AC(t){let e=C.get(t.strings);return void 0===e&&C.set(t.strings,e=new M(t)),e}M(t){z(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let r,i=0;for(const o of t)i===e.length?e.push(r=new K(this.A(P()),this.A(P()),this,this.options)):r=e[i],r._$AI(o),i++;i<e.length&&(this._$AR(r&&r._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var r;for(null===(r=this._$AP)||void 0===r||r.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cg=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class Q{constructor(t,e,r,i,o){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,r.length>2||""!==r[0]||""!==r[1]?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=q}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,r,i){const o=this.strings;let n=!1;if(void 0===o)t=I(this,t,e,0),n=!w(t)||t!==this._$AH&&t!==V,n&&(this._$AH=t);else{const i=t;let s,a;for(t=o[0],s=0;s<o.length-1;s++)a=I(this,i[r+s],e,s),a===V&&(a=this._$AH[s]),n||(n=!w(a)||a!==this._$AH[s]),a===q?t=q:t!==q&&(t+=(null!=a?a:"")+o[s+1]),this._$AH[s]=a}n&&!i&&this.k(t)}k(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class N extends Q{constructor(){super(...arguments),this.type=3}k(t){this.element[this.name]=t===q?void 0:t}}const R=g?g.emptyScript:"";class J extends Q{constructor(){super(...arguments),this.type=4}k(t){t&&t!==q?this.element.setAttribute(this.name,R):this.element.removeAttribute(this.name)}}class Z extends Q{constructor(t,e,r,i,o){super(t,e,r,i,o),this.type=5}_$AI(t,e=this){var r;if((t=null!==(r=I(this,t,e,0))&&void 0!==r?r:q)===V)return;const i=this._$AH,o=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==q&&(i===q||o);o&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,r;"function"==typeof this._$AH?this._$AH.call(null!==(r=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==r?r:this.element,t):this._$AH.handleEvent(t)}}class U{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){I(this,t)}}const D=window.litHtmlPolyfillSupport;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Y,F;null==D||D(M,K),(null!==(m=globalThis.litHtmlVersions)&&void 0!==m?m:globalThis.litHtmlVersions=[]).push("2.0.2");class B extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;const r=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=r.firstChild),r}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,e,r)=>{var i,o;const n=null!==(i=null==r?void 0:r.renderBefore)&&void 0!==i?i:e;let s=n._$litPart$;if(void 0===s){const t=null!==(o=null==r?void 0:r.renderBefore)&&void 0!==o?o:null;n._$litPart$=s=new K(e.insertBefore(P(),t),t,void 0,null!=r?r:{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return V}}B.finalized=!0,B._$litElement$=!0,null===(Y=globalThis.litElementHydrateSupport)||void 0===Y||Y.call(globalThis,{LitElement:B});const _=globalThis.litElementPolyfillSupport;null==_||_({LitElement:B}),(null!==(F=globalThis.litElementVersions)&&void 0!==F?F:globalThis.litElementVersions=[]).push("3.0.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:r,elements:i}=e;return{kind:r,elements:i,finisher(e){window.customElements.define(t,e)}}})(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,tt=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(r){r.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(r){r.createProperty(e.key,t)}};function et(t){return(e,r)=>void 0!==r?((t,e,r)=>{e.constructor.createProperty(r,t)})(t,e,r):tt(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function rt(t){return et({...t,state:!0})}var it="M13,6V18L21.5,12M4,18L12.5,12L4,6V18Z",ot="M8,5.14V19.14L19,12.14L8,5.14Z",nt="M13,2.05V4.05C17.39,4.59 20.5,8.58 19.96,12.97C19.5,16.61 16.64,19.5 13,19.93V21.93C18.5,21.38 22.5,16.5 21.95,11C21.5,6.25 17.73,2.5 13,2.03V2.05M5.67,19.74C7.18,21 9.04,21.79 11,22V20C9.58,19.82 8.23,19.25 7.1,18.37L5.67,19.74M7.1,5.74C8.22,4.84 9.57,4.26 11,4.06V2.06C9.05,2.25 7.19,3 5.67,4.26L7.1,5.74M5.69,7.1L4.26,5.67C3,7.19 2.25,9.04 2.05,11H4.05C4.24,9.58 4.8,8.23 5.69,7.1M4.06,13H2.06C2.26,14.96 3.03,16.81 4.27,18.33L5.69,16.9C4.81,15.77 4.24,14.42 4.06,13M10,16.5L16,12L10,7.5V16.5Z",st="[^\\s]+";function at(t,e){for(var r=[],i=0,o=t.length;i<o;i++)r.push(t[i].substr(0,e));return r}var lt=function(t){return function(e,r){var i=r[t].map((function(t){return t.toLowerCase()})),o=i.indexOf(e.toLowerCase());return o>-1?o:null}};function ct(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];for(var i=0,o=e;i<o.length;i++){var n=o[i];for(var s in n)t[s]=n[s]}return t}var dt=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],ht=["January","February","March","April","May","June","July","August","September","October","November","December"],ut=at(ht,3),pt={dayNamesShort:at(dt,3),dayNames:dt,monthNamesShort:ut,monthNames:ht,amPm:["am","pm"],DoFn:function(t){return t+["th","st","nd","rd"][t%10>3?0:(t-t%10!=10?1:0)*t%10]}},ft=(ct({},pt),function(t){return+t-1}),mt=[null,"[1-9]\\d?"],gt=[null,st],vt=["isPm",st,function(t,e){var r=t.toLowerCase();return r===e.amPm[0]?0:r===e.amPm[1]?1:null}],bt=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(t){var e=(t+"").match(/([+-]|\d\d)/gi);if(e){var r=60*+e[1]+parseInt(e[2],10);return"+"===e[0]?r:-r}return 0}];lt("monthNamesShort"),lt("monthNames");var yt,xt;!function(){try{(new Date).toLocaleDateString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(t){return"RangeError"===t.name}}(),function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(yt||(yt={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(xt||(xt={}));var At=function(t,e,r,i){i=i||{},r=null==r?{}:r;var o=new Event(e,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});return o.detail=r,t.dispatchEvent(o),o};var Pt={disconnected:"Disconnected",awaiting_start:"Paused or awaiting start",charging:"Charging",completed:"Completed or awaiting car",error:"Error",ready_to_charge:"Ready to charge"},wt={name:"Charger Card",description:"Charger card allows you to control your charging robot.",start:"Start",start_fast:"Start (fast)",start_slow:"Start (slow)",start_smart:"Start (smart)",continue:"Resume",pause:"Pause",stop:"Stop",override:"Override schedule",reboot:"Reboot charger",not_available:"Charger not available",click_for_info:"Click for Info",click_for_config:"Click for Config",click_for_limits:"Click for Limits",online:"Online",voltage:"Voltage",power:"Power",charger_current:"Changer Current",energy_per_hour:"Energy per Hour",lifetime_energy:"Lifetime Energy",circuit_current:"Circuit Energy"},zt={missing_entity:"Specifying entity is required!"},jt={entity:"Entity (Required)",smartChargingEntity:"Entity for smart charging",chargerImage:"Charger image and color",customImage:"Custom image (Optional - overrides charger image)",theme:"Color theme",compact_view:"Compact View",compact_view_aria_label_on:"Toggle compact view on",compact_view_aria_label_off:"Toggle compact view off",show_name:"Show Name",show_name_aria_label_on:"Toggle display name on",show_name_aria_label_off:"Toggle display name off",show_leds:"Show Leds",show_leds_aria_label_on:"Toggle animated leds (overlay on image) on",show_leds_aria_label_off:"Toggle animated leds (overlay on image) off",show_status:"Show Status",show_status_aria_label_on:"Toggle display status on",show_status_aria_label_off:"Toggle display status off",show_stats:"Show Data Table (stats)",show_stats_aria_label_on:"Toggle display data table on",show_stats_aria_label_off:"Toggle display data table off",show_collapsibles:"Show collapsible menu buttons",show_collapsibles_aria_label_on:"Toggle display collapsible menus on",show_collapsibles_aria_label_off:"Toggle display collapsible menus off",show_toolbar:"Show Toolbar",show_toolbar_aria_label_on:"Toggle display toolbar on",show_toolbar_aria_label_off:"Toggle display toolbar off",code_only_note:"Note: Custom actions and data table (stats) options are available exclusively using Code Editor manually."},kt={sessionEnergy:"Session Energy"},Ht={not_requesting_current:"Not requesting current",ok:"Ok",pending_schedule:"Pending Schedule",none:"None",max_circuit_current_too_low:"Max circuit current too low",max_dynamic_circuit_current_too_low:"Max dynamic circuit current too low",max_dynamic_offline_fallback_circuit_current_too_low:"Max dynamic offline circuit current too low",circuit_fuse_too_low:"Circuit fuse too low",waiting_in_queue:"Waiting in queue",waiting_in_fully:"Waiting in fully",illegal_grid_type:"Illegal grid type",no_current_request:"No current request",max_charger_current_too_low:"Max charger current too low",max_dynamic_charger_current_too_low:"Max dynamic charger current too low",charger_disabled:"Charger Disabled",pending_authorization:"Pending Authorization",charger_in_error_state:"Charger in error state",undefined:"Undefined"},St={status:Pt,common:wt,error:zt,editor:jt,charger_status:kt,charger_substatus:Ht},Ot={disconnected:"Getrennt",awaiting_start:"Pausiert",charging:"Laden",completed:"Fertig",error:"Fehler",ready_to_charge:"Bereit zum Laden"},Tt={name:"Charger Card",description:"Charger card ermöglicht es dir, deinen Laderoboter zu steuern.",start_fast:"Start (schnell)",start_slow:"Start (langsam)",start_smart:"Start (smart)",continue:"Weiter",pause:"Pause",stop:"Stopp",override:"Zeitplan überschreiben",reboot:"Ladegerät neu starten",not_available:"Ladegerät nicht verfügbar",click_for_info:"Klicken für Infos",click_for_config:"Klicken für Konfiguration",click_for_limits:"Klicken für Limits",online:"Online",voltage:"Spannung",power:"Leistung",charger_current:"Ladestrom",energy_per_hour:"Energie pro Stunde",lifetime_energy:"Energie gesamt",circuit_current:"Aktueller Strom"},Lt={missing_entity:"Die Angabe der Entität ist erforderlich!"},Xt={entity:"Entity (Erforderlich)",smartChargingEntity:"Entity für Smart Charging",chargerImage:"Bild und Farbe des Ladegeräts",customImage:"Benutzerdefiniertes Bild (Optional - überschreibt das Bild des Ladegeräts)",theme:"Farbschema",compact_view:"Kompakte Ansicht",compact_view_aria_label_on:"Kompakte Ansicht einschalten",compact_view_aria_label_off:"Kompakte Ansicht ausschalten",show_name:"Name anzeigen",show_name_aria_label_on:"Anzeigename einschalten",show_name_aria_label_off:"Anzeigename ausschalten",show_leds:"Leds anzeigen",show_leds_aria_label_on:"Animierte Leds (Überlagerung des Bildes) einschalten",show_leds_aria_label_off:"Animierte Leds (Überlagerung des Bildes) ausschalten",show_status:"Status anzeigen",show_status_aria_label_on:"Statusanzeige einschalten",show_status_aria_label_off:"Statusanzeige ausschalten",show_stats:"Datentabelle anzeigen (Statistik)",show_stats_aria_label_on:"Datentabelle einschalten",show_stats_aria_label_off:"Datentabelle ausschalten",show_collapsibles:"Zusammenklappbare Menüschaltflächen anzeigen",show_collapsibles_aria_label_on:"Zusammenklappbare Menüschaltflächen einschalten",show_collapsibles_aria_label_off:"Zusammenklappbare Menüschaltflächen ausschalten",show_toolbar:"Symbolleiste anzeigen",show_toolbar_aria_label_on:"Symbolleiste einschalten",show_toolbar_aria_label_off:"Symbolleiste ausschalten",code_only_note:"Hinweis: Die Optionen für benutzerdefinierte Aktionen und Datentabellen (Statistiken) sind ausschließlich über den manuellen Code-Editor verfügbar."},Vt={sessionEnergy:"Energieaufladung"},qt={not_requesting_current:"Keine Nachfrage nach Strom",ok:"Ok",pending_schedule:"Ausstehender Zeitplan",none:"None",max_circuit_current_too_low:"Maximalstrom zu niedrig",max_dynamic_circuit_current_too_low:"Dynamischer Maximalstrom zu niedrig",max_dynamic_offline_fallback_circuit_current_too_low:"Dynamischer offline Maximalstrom zu niedrig",circuit_fuse_too_low:"Stromkreissicherung zu niedrig",waiting_in_queue:"Warten in der Warteschlange",waiting_in_fully:"Warten in vollem Umfang",illegal_grid_type:"Unzulässiger Grid Typ",no_current_request:"Keine aktuelle Anfrage",max_charger_current_too_low:"Maximaler Ladestrom zu niedrig",max_dynamic_charger_current_too_low:"Maximaler dynamischer Ladestrom zu niedrig",charger_disabled:"Ladegerät Deaktiviert",pending_authorization:"Ausstehende Autorisierung",charger_in_error_state:"Ladegerät im Fehlerzustand",undefined:"Undefiniert"},Ct={status:Ot,common:Tt,error:Lt,editor:Xt,charger_status:Vt,charger_substatus:qt};const Wt={en:Object.freeze({__proto__:null,status:Pt,common:wt,error:zt,editor:jt,charger_status:kt,charger_substatus:Ht,default:St}),de:Object.freeze({__proto__:null,status:Ot,common:Tt,error:Lt,editor:Xt,charger_status:Vt,charger_substatus:qt,default:Ct})};function Et(t,e="",r=""){const i=(navigator.language||"en").split("-")[0];let o;try{o=t.split(".").reduce(((t,e)=>t[e]),Wt[i])}catch(e){o=t.split(".").reduce(((t,e)=>t[e]),Wt.en)}return void 0===o&&(o=t.split(".").reduce(((t,e)=>t[e]),Wt.en)),""!==e&&""!==r&&(o=o.replace(e,r)),o}const Mt="disconnected",It="awaiting_start",Gt="charging",Kt="completed",Qt="error",Nt="ready_to_charge",Rt="binary_sensor.plug",Jt="switch.cable_locked_permanently",Zt="binary_sensor.charging_state",Ut="binary_sensor.basic_schedule",Dt="sensor.circuit_current",Yt="sensor.cost_per_kwh",Ft="sensor.dynamic_charger_limit",Bt="sensor.dynamic_circuit_limit",_t="switch.enable_idle_current",$t="sensor.current",te="switch.is_enabled",ee="sensor.max_current",re="sensor.max_circuit_limit",ie="sensor.offline_circuit_limit",oe="binary_sensor.status",ne="sensor.output_limit",se="sensor.reason_for_no_current",ae="sensor.session_energy",le="sensor.energy_per_hour",ce="sensor.total_energy",de="sensor.charging_power",he="binary_sensor.update_available",ue="sensor.voltage",pe=[{name:"Generic",img:"data:image/png;base64,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"}],fe={"binary_sensor.plug":"mdi:lock","switch.cable_locked_permanently":"mdi:lock","binary_sensor.basic_schedule":"mdi:clock-check","sensor.circuit_current":"mdi:sine-wave","sensor.cost_per_kwh":"mdi:currency-usd","sensor.dynamic_charger_limit":"mdi:sine-wave","sensor.dynamic_circuit_limit":"mdi:sine-wave","switch.enable_idle_current":"mdi:current-dc","sensor.offline_circuit_limit":"mdi:sine-wave","sensor.current":"mdi:sine-wave","switch.is_enabled":"mdi:power","sensor.max_current":"mdi:sine-wave","sensor.max_circuit_limit":"mdi:sine-wave","binary_sensor.status":"mdi:wifi","sensor.output_limit":"mdi:sine-wave","sensor.reason_for_no_current":"mdi:alert-circle","sensor.session_energy":"mdi:flash","sensor.energy_per_hour":"mdi:flash","sensor.total_energy":"mdi:flash","switch.smart_charging":"mdi:auto-fix","sensor.charging_power":"mdi:flash","binary_sensor.update_available":"mdi:file-download","sensor.voltage":"mdi:sine-wave"},me=[{name:"theme_default",desc:"Default HA colors"},{name:"theme_custom",desc:"Use custom theme"},{name:"theme_transp_blue",desc:"Transparent Blue"},{name:"theme_transp_black",desc:"Transparent Black"},{name:"theme_transp_white",desc:"Transparent White"},{name:"theme_lightgrey_blue",desc:"LightGrey Blue"}];let ge=class extends B{constructor(){super(...arguments),this._initialized=!1}setConfig(t){this._config=t,this._config.entity||(this._config.entity=this.getEntitiesByType("binary_sensor")[0]||"",this._config.smartChargingEntity=this.getEntitiesByType("input_boolean")[0]||"",At(this,"config-changed",{config:this._config})),this.loadCardHelpers()}shouldUpdate(){return this._initialized||this._initialize(),!0}get _entity(){return this._config&&this._config.entity||""}get _smartChargingEntity(){return this._config&&this._config.smartChargingEntity||""}get _customImage(){return this._config&&this._config.customImage||""}get _chargerImage(){return this._config&&this._config.chargerImage||"Generic"}get _customCardTheme(){return this._config?this._config.customCardTheme||"":"theme_default"}get showName(){return!this._config||(void 0===this._config.show_name||this._config.show_name)}get showLeds(){return!this._config||(void 0===this._config.show_leds||this._config.show_leds)}get showStatus(){return!this._config||(void 0===this._config.show_status||this._config.show_status)}get showToolbar(){return!this._config||(void 0===this._config.show_toolbar||this._config.show_toolbar)}get showStats(){return!this._config||(void 0===this._config.show_stats||this._config.show_stats)}get showCollapsibles(){return!this._config||(void 0===this._config.show_collapsibles||this._config.show_collapsibles)}get compactView(){return!!this._config&&(void 0!==this._config.compact_view&&this._config.compact_view)}getEntitiesByType(t){return this.hass?Object.keys(this.hass.states).filter((e=>e.substr(0,e.indexOf("."))===t)):[]}render(){if(!this.hass)return X``;const t=Object.keys(this.hass.states).filter((t=>"binary_sensor"===t.substr(0,t.indexOf(".")))),e=Object.keys(this.hass.states).filter((t=>"input_boolean"===t.substr(0,t.indexOf("."))));return X`
      <div class="card-config">

        <paper-dropdown-menu label="${Et("editor.entity")}" @value-changed=${this._valueChanged} .configValue=${"entity"}>
            <paper-listbox slot="dropdown-content" .selected=${t.indexOf(this._entity)}>
              ${t.map((t=>X`
                  <paper-item>${t}</paper-item>
                `))}
            </paper-listbox>
        </paper-dropdown-menu>

        <paper-dropdown-menu label="${Et("editor.smartChargingEntity")}" @value-changed=${this._valueChanged} .configValue=${"smartChargingEntity"}>
            <paper-listbox slot="dropdown-content" .selected=${e.indexOf(this._smartChargingEntity)}>
              ${e.map((t=>X`
                  <paper-item>${t}</paper-item>
                `))}
            </paper-listbox>
        </paper-dropdown-menu>

        <paper-dropdown-menu label="${Et("editor.theme")}" @value-changed=${this._valueChanged} .configValue=${"customCardTheme"}>
            <paper-listbox slot="dropdown-content" selected="${this._customCardTheme}" attr-for-selected="value">
              ${me.map((t=>X`
                  <paper-item value="${t.name}">${t.name}</paper-item>
                `))}
            </paper-listbox>
        </paper-dropdown-menu>


              <paper-dropdown-menu label="${Et("editor.chargerImage")}" @value-changed=${this._valueChanged} .configValue=${"chargerImage"}>
                <paper-listbox slot="dropdown-content" selected="${this._chargerImage}" attr-for-selected="value">
                  ${pe.map((t=>X`
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
      `}_initialize(){void 0!==this.hass&&void 0!==this._config&&void 0!==this._helpers&&(this._initialized=!0)}async loadCardHelpers(){this._helpers=await window.loadCardHelpers()}_valueChanged(t){if(!this._config||!this.hass)return void console.log("C: no config");const e=t.target;this[`_${e.configValue}`]!==e.value&&(e.configValue&&(""===e.value?delete this._config[e.configValue]:this._config=Object.assign(Object.assign({},this._config),{[e.configValue]:void 0!==e.checked?e.checked:e.value})),At(this,"config-changed",{config:this._config}))}static get styles(){return n`
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
    `}};t([et({attribute:!1})],ge.prototype,"hass",void 0),t([rt()],ge.prototype,"_config",void 0),t([rt()],ge.prototype,"_toggle",void 0),t([rt()],ge.prototype,"_helpers",void 0),ge=t([$("keba-charger-card-editor")],ge);var ve=n`
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
    top: 100px;
    width: 100%;
  }

  .keba-leds {
    margin-right: auto;
    margin-left: auto;
    animation: blink 3s infinite;
    width: 42px;
    //height: 10px;
    // border-radius: 2px;
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
`;console.info("%cKEBA-CHARGER-CARD 0.0.2 IS INSTALLED","color: green; font-weight: bold",""),window.customCards=window.customCards||[],window.customCards.push({type:"keba-charger-card",name:"Keba Charger Card Card",description:"A keba charger card for visualizing the status and interacting with your Keba P30"});let be=class extends B{static get styles(){return ve}static async getConfigElement(){return document.createElement("keba-charger-card-editor")}static getStubConfig(t){const[e]=t.filter((t=>"binary_sensor"===t.substr(0,t.indexOf("."))));return{entity:e||"",image:"default"}}get entity(){return null!=this.config.entity?this.hass.states[this.config.entity]:void 0}get smartChargingEntity(){return null!=this.config.smartChargingEntity?this.hass.states[this.config.smartChargingEntity]:void 0}get scriptDomain(){return void 0===this.config.domain?"script":this.config.domain}get status(){if("off"==this.getEntityState(this.getEntity(Rt)))return Mt;return"on"==this.getEntityState(this.getEntity(Zt))?Gt:this.smartChargingEntity&&"on"==this.smartChargingEntity.state?It:Nt}get image(){const t=this.config.chargerImage||"Generic",e=pe.find((({name:e})=>e===t?e:void 0));if(void 0===this.config.customImage||""===this.config.customImage)try{return void 0===e?void 0:e.img}catch(t){return""}return this.config.customImage}get customCardTheme(){return void 0===this.config.customCardTheme?"theme_default":this.config.customCardTheme}get showLeds(){return void 0===this.config.show_leds||this.config.show_leds}get showName(){return void 0===this.config.show_name||this.config.show_name}get showStatus(){return void 0===this.config.show_status||this.config.show_status}get showStats(){return void 0===this.config.show_stats||this.config.show_stats}get showCollapsibles(){return void 0===this.config.show_collapsibles||this.config.show_collapsibles}get showToolbar(){return void 0===this.config.show_toolbar||this.config.show_toolbar}get compactView(){return void 0!==this.config.compact_view&&this.config.compact_view}get entityBasename(){return void 0===this.config.entity?"":this.config.entity.split(".")[1].replace("_status","")}getEntityId(t){try{return t.split(".")[0]+"."+this.entityBasename+"_"+t.split(".")[1]}catch(t){return}}getEntityBase(t){try{return t.split(".")[0]+"."+t.split(".")[1].replace(this.entityBasename+"_","")}catch(t){return}}getEntities(){return{cableLocked:this.getEntity(Rt),cableLockedPermanently:this.getEntity(Jt),chargingState:this.getEntity(Zt),basicSchedule:this.getEntity(Ut),circuitCurrent:this.getEntity(Dt),costPerKwh:this.getEntity(Yt),dynamicChargerCurrent:this.getEntity(Ft),dynamicCircuitCurrent:this.getEntity(Bt),enableIdleCurrent:this.getEntity(_t),offlineCircuitCurrent:this.getEntity(ie),inCurrent:this.getEntity($t),isEnabled:this.getEntity(te),maxChargerCurrent:this.getEntity(ee),maxCircuitCurrent:this.getEntity(re),isOnline:this.getEntity(oe),outputCurrent:this.getEntity(ne),reasonForNoCurrent:this.getEntity(se),sessionEnergy:this.getEntity(ae),energyPerHour:this.getEntity(le),energyLifetime:this.getEntity(ce),smartCharging:this.smartChargingEntity,totalPower:this.getEntity(de),updateAvailable:this.getEntity(he),voltage:this.getEntity(ue),status:this.entity}}getEntity(t){try{const e=this.getEntityId(t);return void 0===e?void 0:this.hass.states[e]}catch(t){return}}getEntityState(t){try{return t.state}catch(t){return}}getEntityAttribute(t,e){try{return t.attributes[e]}catch(t){return}}getStatsDefault(t){switch(t){case Mt:return[{entityId:this.getEntityId(ae),unit:"kWh",subtitle:Et("charger_status.sessionEnergy")},{entityId:this.getEntityId(ee),unit:"A",subtitle:"Current Limit"},{entityId:this.getEntityId(Rt),unit:"",subtitle:"Locked"}];case It:return[{entityId:this.getEntityId(ee),unit:"A",subtitle:"Current Limit"},{entityId:this.getEntityId(ae),unit:"kWh",subtitle:Et("charger_status.sessionEnergy")},{entityId:this.smartChargingEntity?this.smartChargingEntity.entity_id:"",unit:"",subtitle:"Smart Charging"}];case Gt:return[{entityId:this.getEntityId(ae),unit:"kWh",subtitle:"Energy"},{entityId:this.getEntityId(ee),unit:"A",subtitle:"Current Limit"},{entityId:this.getEntityId(Dt),unit:"A",subtitle:"Circuit"},{entityId:this.getEntityId(ne),unit:"A",subtitle:"Allowed"},{entityId:this.getEntityId($t),unit:"A",subtitle:"Actual"},{entityId:this.getEntityId(de),unit:"kW",subtitle:"Power"},{entityId:this.smartChargingEntity?this.smartChargingEntity.entity_id:"",unit:"",subtitle:"Smart Charging"}];case Kt:case Qt:return[{entityId:this.getEntityId(ae),unit:"kWh",subtitle:Et("charger_status.sessionEnergy")},{entityId:this.getEntityId(ee),unit:"A",subtitle:"Current Limit"}];case Nt:return[{entityId:this.getEntityId(ae),unit:"kWh",subtitle:Et("charger_status.sessionEnergy")},{entityId:this.getEntityId(ee),unit:"A",subtitle:"Current Limit"},{entityId:this.getEntityId(Ut),unit:"",subtitle:"Schedule"}]}return[]}setConfig(t){if(!t.entity)throw new Error(Et("error.missing_entity"));this.config=t}getCardSize(){return 2}shouldUpdate(t){return function(t,e,r){if(e.has("config")||r)return!0;if(t.config.entity){var i=e.get("hass");return!i||i.states[t.config.entity]!==t.hass.states[t.config.entity]}return!1}(this,t,!0)}updated(t){this.config.entity&&t.get("hass")&&t.get("hass").states[this.config.entity].state!==this.hass.states[this.config.entity].state&&(this.requestInProgress=!1)}handleMore(t){t&&t.entity_id&&At(this,"hass-more-info",{entityId:t.entity_id},{bubbles:!0,composed:!0})}callService(t,e=!0,r={}){this.hass.callService(this.scriptDomain,t,Object.assign({},r)),e&&this.requestUpdate()}renderImage(t){let e="";return this.compactView&&(e="-compact"),this.image?X`
      <img
        class="charger${e}"
        src="${this.image}"
        @click="${()=>this.handleMore(this.entity)}"
        ?more-info="true"
      />${this.renderLeds(t)}
    `:X``}renderLeds(t){if(console.log(t),this.showLeds){let e="";return e=t===Gt?"0, 255, 0":"82, 182, 255",X`<div class="keba-leds-container">
        <div class="keba-leds">
          <svg height="10" width="42">
            <defs>
              <radialGradient id="c1" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stop-color="rgba(${e}, 1)" />
                <stop offset="0.5" stop-color="rgba(${e}, 0.5)" />
                <stop offset="1" stop-color="rgba(${e},0)" />
              </radialGradient>
            </defs>

            <circle cx="6" cy="5" r="3" fill="url(#c1)" />
            <circle cx="10" cy="5" r="3" fill="url(#c1)" />
            <circle cx="14" cy="5" r="3" fill="url(#c1)" />
            <circle cx="18" cy="5" r="3" fill="url(#c1)" />
            <circle cx="22" cy="5" r="3" fill="url(#c1)" />
            <circle cx="26" cy="5" r="3" fill="url(#c1)" />
            <circle cx="30" cy="5" r="3" fill="url(#c1)" />
            <circle cx="34" cy="5" r="3" fill="url(#c1)" />
            <circle cx="38" cy="5" r="3" fill="url(#c1)" />
          </svg>
        </div>
      </div>`}return X``}renderStats(t){if(!this.showStats)return X``;let e="";this.compactView&&(e="-compact");const r=this.getStatsDefault(t)||[];return X` <div class="stats${e}">${this.renderStatsList(r)}</div> `}renderStatsList(t){return t.map((({entityId:t,attribute:e,calcValue:r,unit:i,subtitle:o})=>{if(!(t||e||r))return X``;if(r)return this.renderStatsHtml(r,i,o,this.hass.states[t]);try{const r=e?this.hass.states[t].attributes[e]:this.hass.states[t].state;return this.renderStatsHtml(r,i,o,this.hass.states[t])}catch(t){return null}}))}renderStatsHtml(t,e,r,i){return X`
      <div class="stats-block" @click="${()=>this.handleMore(i)}" ?more-info="true">
        <span class="stats-value">${t}</span>
        ${e}
        <div class="stats-subtitle">${r}</div>
      </div>
    `}renderName(){if(!this.showName)return X``;let t="";return this.compactView&&(t="-compact"),X` <div class="charger-name${t}">Keba P30</div> `}renderStatus(){if(!this.showStatus)return X``;let t="";this.compactView&&(t="-compact");const e=Et(`status.${this.status}`)||this.status;return X`
      <div class="status${t}">
        <span class="status-text${t}" alt=${e}> ${e} </span>
        <ha-circular-progress .active=${this.requestInProgress} size="small"></ha-circular-progress>
      </div>
    `}renderCollapsibleInfo(){if(!this.showCollapsibles)return X``;const{isOnline:t,totalPower:e,sessionEnergy:r,energyLifetime:i}=this.getEntities(),o=Et("common.click_for_info");return X`
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
            ${this.renderCollapsibleItems(t,Et("common.online"))}
            ${this.renderCollapsibleItems(e,Et("common.power"))}
            ${this.renderCollapsibleItems(r,Et("charger_status.sessionEnergy"))}
            ${this.renderCollapsibleItems(i,Et("common.lifetime_energy"),!0)}
          </div>
        </div>
      </div>
    `}renderCollapsibleItems(t,e,r=!1){if(null==t)return X``;const i=r?Math.round(this.getEntityState(t)):this.getEntityState(t),o=this.renderIcon(t),n=this.getEntityAttribute(t,"unit_of_measurement");return X`
      <div class="collapsible-item" @click="${()=>this.handleMore(t)}" ?more-info="true">
        <div class="tooltip">
          <ha-icon icon="${o}"></ha-icon>
          <br />${i} ${n}
          <span class="tooltiptext">${e}</span>
        </div>
      </div>
    `}renderInfoItemsLeft(){const{isOnline:t}=this.getEntities();return X` ${this.renderInfoItem(t,Et("common.online"))} `}renderInfoItemsRight(){const{cableLocked:t,totalPower:e,voltage:r}=this.getEntities(),i=t&&"on"==t.state?"mdi:power-plug":"mdi:power-plug-off";return X`
      ${this.renderInfoItem(r,Et("common.voltage"),!0)}
      ${this.renderInfoItem(e,Et("common.power"))}
      <ha-icon icon="${i}"></ha-icon>
    `}renderInfoItemsCompact(){const{totalPower:t,voltage:e}=this.getEntities();return X`
      ${this.renderInfoItem(e,Et("common.voltage"),!0)}
      ${this.renderInfoItem(t,Et("common.power"),!0)}
    `}renderInfoItem(t,e,r=!1){if(null==t)return X``;const i=r?Math.round(this.getEntityState(t)):this.getEntityState(t),o=this.getEntityAttribute(t,"unit_of_measurement"),n=this.renderIcon(t);return X`
      <div class="infoitems-item" @click="${()=>this.handleMore(t)}" ?more-info="true">
        <div class="tooltip">
          <ha-icon icon="${n}"></ha-icon>
          ${i} ${o}
          <span class="tooltiptext">${e}</span>
        </div>
      </div>
    `}renderIcon(t){const e=t.entity_id,r=this.getEntityBase(e);return void 0!==this.getEntityAttribute(t,"icon")?this.getEntityAttribute(t,"icon"):(void 0===r?null:fe[r])||"mdi:cancel"}renderToolbar(t){if(!this.showToolbar)return X``;let e=X``;switch(t){case Mt:case Qt:return X``;case It:e=X`
          ${this.renderToolbarButton("keba_off","M18,18H6V6H18V18Z","common.stop")}
          ${this.renderToolbarButton("keba_fast",it,"common.start_fast")}
          ${this.renderToolbarButton("keba_slow",ot,"common.start_slow")}
        `;break;case Gt:e=X`
          ${this.renderToolbarButton("keba_off","M18,18H6V6H18V18Z","common.stop")}
          ${this.renderToolbarButton("keba_fast",it,"common.start_fast")}
          ${this.renderToolbarButton("keba_slow",ot,"common.start_slow")}
          ${this.renderToolbarButton("keba_auto",nt,"common.start_smart")}
        `;break;case Kt:case Nt:e=X`
          ${this.renderToolbarButton("keba_fast",it,"common.start_fast")}
          ${this.renderToolbarButton("keba_slow",ot,"common.start_slow")}
          ${this.renderToolbarButton("keba_auto",nt,"common.start_smart")}
        `}return X`
      <div class="toolbar">
        ${e}
        <div class="fill-gap"></div>
      </div>
    `}renderToolbarButton(t,e,r,i={},o=!0){let n="";try{n=Et(r)}catch(t){n=r}return X`
      <div class="tooltip">
        <ha-icon-button
          .path=${e}
          .label=${n}
          @click=${()=>this.callService(t,o,i)}
        ></ha-icon-button>
        <span class="tooltiptext">${n}</span>
      </div>
    `}renderCompact(){const t=this.status;return X`
      <ha-card>
        <div class="preview-compact">
          ${this.renderImage(t)}

          <div class="metadata">${this.renderName()} ${this.renderStatus()}</div>

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

          <div class="metadata">${this.renderStatus()}</div>

          ${this.renderCollapsibleInfo()} ${this.renderStats(t)}
        </div>

        ${this.renderToolbar(t)}
      </ha-card>
    `}renderCustomCardTheme(){switch(this.customCardTheme){case"theme_custom":break;default:this.style.setProperty("--custom-card-background-color","#03A9F4"),this.style.setProperty("--custom-text-color","#FFFFFF"),this.style.setProperty("--custom-primary-color","#03A9F4"),this.style.setProperty("--custom-icon-color","#FFFFFF");break;case"theme_transp_blue":this.style.setProperty("--custom-card-background-color","transparent"),this.style.setProperty("--custom-text-color","#03A9F4"),this.style.setProperty("--custom-primary-color","#03A9F4"),this.style.setProperty("--custom-icon-color","#03A9F4");break;case"theme_transp_black":this.style.setProperty("--custom-card-background-color","transparent"),this.style.setProperty("--custom-text-color","black"),this.style.setProperty("--custom-primary-color","black"),this.style.setProperty("--custom-icon-color","black");break;case"theme_transp_white":this.style.setProperty("--custom-card-background-color","transparent"),this.style.setProperty("--custom-text-color","white"),this.style.setProperty("--custom-primary-color","white"),this.style.setProperty("--custom-icon-color","white");break;case"theme_lightgrey_blue":this.style.setProperty("--custom-card-background-color","lightgrey"),this.style.setProperty("--custom-text-color","#03A9F4"),this.style.setProperty("--custom-primary-color","#03A9F4"),this.style.setProperty("--custom-icon-color","#03A9F4")}}render(){return this.renderCustomCardTheme(),this.entity?this.compactView?this.renderCompact():this.renderFull():X`
        <ha-card>
          <div class="preview not-available">
            <div class="metadata">
              <div class="not-available">${Et("common.not_available")}</div>
            </div>
          </div>
        </ha-card>
      `}};t([et({attribute:!1})],be.prototype,"hass",void 0),t([rt()],be.prototype,"config",void 0),t([et({attribute:!1})],be.prototype,"requestInProgress",void 0),be=t([$("keba-charger-card")],be);export{be as ChargerCard};
