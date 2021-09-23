/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * True if the custom elements polyfill is in use.
 */
const isCEPolyfill = typeof window !== 'undefined' && window.customElements != null && window.customElements.polyfillWrapFlushCallback !== undefined;
/**
 * Removes nodes, starting from `start` (inclusive) to `end` (exclusive), from
 * `container`.
 */

const removeNodes = (container, start, end = null) => {
  while (start !== end) {
    const n = start.nextSibling;
    container.removeChild(start);
    start = n;
  }
};

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * An expression marker with embedded unique key to avoid collision with
 * possible text in templates.
 */
const marker = `{{lit-${String(Math.random()).slice(2)}}}`;
/**
 * An expression marker used text-positions, multi-binding attributes, and
 * attributes with markup-like text values.
 */

const nodeMarker = `<!--${marker}-->`;
const markerRegex = new RegExp(`${marker}|${nodeMarker}`);
/**
 * Suffix appended to all bound attribute names.
 */

const boundAttributeSuffix = '$lit$';
/**
 * An updatable Template that tracks the location of dynamic parts.
 */

class Template {
  constructor(result, element) {
    this.parts = [];
    this.element = element;
    const nodesToRemove = [];
    const stack = []; // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null

    const walker = document.createTreeWalker(element.content, 133
    /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */
    , null, false); // Keeps track of the last index associated with a part. We try to delete
    // unnecessary nodes, but we never want to associate two different parts
    // to the same index. They must have a constant node between.

    let lastPartIndex = 0;
    let index = -1;
    let partIndex = 0;
    const {
      strings,
      values: {
        length
      }
    } = result;

    while (partIndex < length) {
      const node = walker.nextNode();

      if (node === null) {
        // We've exhausted the content inside a nested template element.
        // Because we still have parts (the outer for-loop), we know:
        // - There is a template in the stack
        // - The walker will find a nextNode outside the template
        walker.currentNode = stack.pop();
        continue;
      }

      index++;

      if (node.nodeType === 1
      /* Node.ELEMENT_NODE */
      ) {
          if (node.hasAttributes()) {
            const attributes = node.attributes;
            const {
              length
            } = attributes; // Per
            // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
            // attributes are not guaranteed to be returned in document order.
            // In particular, Edge/IE can return them out of order, so we cannot
            // assume a correspondence between part index and attribute index.

            let count = 0;

            for (let i = 0; i < length; i++) {
              if (endsWith(attributes[i].name, boundAttributeSuffix)) {
                count++;
              }
            }

            while (count-- > 0) {
              // Get the template literal section leading up to the first
              // expression in this attribute
              const stringForPart = strings[partIndex]; // Find the attribute name

              const name = lastAttributeNameRegex.exec(stringForPart)[2]; // Find the corresponding attribute
              // All bound attributes have had a suffix added in
              // TemplateResult#getHTML to opt out of special attribute
              // handling. To look up the attribute value we also need to add
              // the suffix.

              const attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
              const attributeValue = node.getAttribute(attributeLookupName);
              node.removeAttribute(attributeLookupName);
              const statics = attributeValue.split(markerRegex);
              this.parts.push({
                type: 'attribute',
                index,
                name,
                strings: statics
              });
              partIndex += statics.length - 1;
            }
          }

          if (node.tagName === 'TEMPLATE') {
            stack.push(node);
            walker.currentNode = node.content;
          }
        } else if (node.nodeType === 3
      /* Node.TEXT_NODE */
      ) {
          const data = node.data;

          if (data.indexOf(marker) >= 0) {
            const parent = node.parentNode;
            const strings = data.split(markerRegex);
            const lastIndex = strings.length - 1; // Generate a new text node for each literal section
            // These nodes are also used as the markers for node parts

            for (let i = 0; i < lastIndex; i++) {
              let insert;
              let s = strings[i];

              if (s === '') {
                insert = createMarker();
              } else {
                const match = lastAttributeNameRegex.exec(s);

                if (match !== null && endsWith(match[2], boundAttributeSuffix)) {
                  s = s.slice(0, match.index) + match[1] + match[2].slice(0, -boundAttributeSuffix.length) + match[3];
                }

                insert = document.createTextNode(s);
              }

              parent.insertBefore(insert, node);
              this.parts.push({
                type: 'node',
                index: ++index
              });
            } // If there's no text, we must insert a comment to mark our place.
            // Else, we can trust it will stick around after cloning.


            if (strings[lastIndex] === '') {
              parent.insertBefore(createMarker(), node);
              nodesToRemove.push(node);
            } else {
              node.data = strings[lastIndex];
            } // We have a part for each match found


            partIndex += lastIndex;
          }
        } else if (node.nodeType === 8
      /* Node.COMMENT_NODE */
      ) {
          if (node.data === marker) {
            const parent = node.parentNode; // Add a new marker node to be the startNode of the Part if any of
            // the following are true:
            //  * We don't have a previousSibling
            //  * The previousSibling is already the start of a previous part

            if (node.previousSibling === null || index === lastPartIndex) {
              index++;
              parent.insertBefore(createMarker(), node);
            }

            lastPartIndex = index;
            this.parts.push({
              type: 'node',
              index
            }); // If we don't have a nextSibling, keep this node so we have an end.
            // Else, we can remove it to save future costs.

            if (node.nextSibling === null) {
              node.data = '';
            } else {
              nodesToRemove.push(node);
              index--;
            }

            partIndex++;
          } else {
            let i = -1;

            while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
              // Comment node has a binding marker inside, make an inactive part
              // The binding won't work, but subsequent bindings will
              // TODO (justinfagnani): consider whether it's even worth it to
              // make bindings in comments work
              this.parts.push({
                type: 'node',
                index: -1
              });
              partIndex++;
            }
          }
        }
    } // Remove text binding nodes after the walk to not disturb the TreeWalker


    for (const n of nodesToRemove) {
      n.parentNode.removeChild(n);
    }
  }

}

const endsWith = (str, suffix) => {
  const index = str.length - suffix.length;
  return index >= 0 && str.slice(index) === suffix;
};

const isTemplatePartActive = part => part.index !== -1; // Allows `document.createComment('')` to be renamed for a
// small manual size-savings.

const createMarker = () => document.createComment('');
/**
 * This regex extracts the attribute name preceding an attribute-position
 * expression. It does this by matching the syntax allowed for attributes
 * against the string literal directly preceding the expression, assuming that
 * the expression is in an attribute-value position.
 *
 * See attributes in the HTML spec:
 * https://www.w3.org/TR/html5/syntax.html#elements-attributes
 *
 * " \x09\x0a\x0c\x0d" are HTML space characters:
 * https://www.w3.org/TR/html5/infrastructure.html#space-characters
 *
 * "\0-\x1F\x7F-\x9F" are Unicode control characters, which includes every
 * space character except " ".
 *
 * So an attribute is:
 *  * The name: any character except a control character, space character, ('),
 *    ("), ">", "=", or "/"
 *  * Followed by zero or more space characters
 *  * Followed by "="
 *  * Followed by zero or more space characters
 *  * Followed by:
 *    * Any character except space, ('), ("), "<", ">", "=", (`), or
 *    * (") then any non-("), or
 *    * (') then any non-(')
 */

const lastAttributeNameRegex = // eslint-disable-next-line no-control-regex
/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const walkerNodeFilter = 133
/* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */
;
/**
 * Removes the list of nodes from a Template safely. In addition to removing
 * nodes from the Template, the Template part indices are updated to match
 * the mutated Template DOM.
 *
 * As the template is walked the removal state is tracked and
 * part indices are adjusted as needed.
 *
 * div
 *   div#1 (remove) <-- start removing (removing node is div#1)
 *     div
 *       div#2 (remove)  <-- continue removing (removing node is still div#1)
 *         div
 * div <-- stop removing since previous sibling is the removing node (div#1,
 * removed 4 nodes)
 */

function removeNodesFromTemplate(template, nodesToRemove) {
  const {
    element: {
      content
    },
    parts
  } = template;
  const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
  let partIndex = nextActiveIndexInTemplateParts(parts);
  let part = parts[partIndex];
  let nodeIndex = -1;
  let removeCount = 0;
  const nodesToRemoveInTemplate = [];
  let currentRemovingNode = null;

  while (walker.nextNode()) {
    nodeIndex++;
    const node = walker.currentNode; // End removal if stepped past the removing node

    if (node.previousSibling === currentRemovingNode) {
      currentRemovingNode = null;
    } // A node to remove was found in the template


    if (nodesToRemove.has(node)) {
      nodesToRemoveInTemplate.push(node); // Track node we're removing

      if (currentRemovingNode === null) {
        currentRemovingNode = node;
      }
    } // When removing, increment count by which to adjust subsequent part indices


    if (currentRemovingNode !== null) {
      removeCount++;
    }

    while (part !== undefined && part.index === nodeIndex) {
      // If part is in a removed node deactivate it by setting index to -1 or
      // adjust the index as needed.
      part.index = currentRemovingNode !== null ? -1 : part.index - removeCount; // go to the next active part.

      partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
      part = parts[partIndex];
    }
  }

  nodesToRemoveInTemplate.forEach(n => n.parentNode.removeChild(n));
}

const countNodes = node => {
  let count = node.nodeType === 11
  /* Node.DOCUMENT_FRAGMENT_NODE */
  ? 0 : 1;
  const walker = document.createTreeWalker(node, walkerNodeFilter, null, false);

  while (walker.nextNode()) {
    count++;
  }

  return count;
};

const nextActiveIndexInTemplateParts = (parts, startIndex = -1) => {
  for (let i = startIndex + 1; i < parts.length; i++) {
    const part = parts[i];

    if (isTemplatePartActive(part)) {
      return i;
    }
  }

  return -1;
};
/**
 * Inserts the given node into the Template, optionally before the given
 * refNode. In addition to inserting the node into the Template, the Template
 * part indices are updated to match the mutated Template DOM.
 */


function insertNodeIntoTemplate(template, node, refNode = null) {
  const {
    element: {
      content
    },
    parts
  } = template; // If there's no refNode, then put node at end of template.
  // No part indices need to be shifted in this case.

  if (refNode === null || refNode === undefined) {
    content.appendChild(node);
    return;
  }

  const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
  let partIndex = nextActiveIndexInTemplateParts(parts);
  let insertCount = 0;
  let walkerIndex = -1;

  while (walker.nextNode()) {
    walkerIndex++;
    const walkerNode = walker.currentNode;

    if (walkerNode === refNode) {
      insertCount = countNodes(node);
      refNode.parentNode.insertBefore(node, refNode);
    }

    while (partIndex !== -1 && parts[partIndex].index === walkerIndex) {
      // If we've inserted the node, simply adjust all subsequent parts
      if (insertCount > 0) {
        while (partIndex !== -1) {
          parts[partIndex].index += insertCount;
          partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
        }

        return;
      }

      partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
    }
  }
}

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const directives = new WeakMap();
const isDirective = o => {
  return typeof o === 'function' && directives.has(o);
};

/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * A sentinel value that signals that a value was handled by a directive and
 * should not be written to the DOM.
 */
const noChange = {};
/**
 * A sentinel value that signals a NodePart to fully clear its content.
 */

const nothing = {};

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * An instance of a `Template` that can be attached to the DOM and updated
 * with new values.
 */

class TemplateInstance {
  constructor(template, processor, options) {
    this.__parts = [];
    this.template = template;
    this.processor = processor;
    this.options = options;
  }

  update(values) {
    let i = 0;

    for (const part of this.__parts) {
      if (part !== undefined) {
        part.setValue(values[i]);
      }

      i++;
    }

    for (const part of this.__parts) {
      if (part !== undefined) {
        part.commit();
      }
    }
  }

  _clone() {
    // There are a number of steps in the lifecycle of a template instance's
    // DOM fragment:
    //  1. Clone - create the instance fragment
    //  2. Adopt - adopt into the main document
    //  3. Process - find part markers and create parts
    //  4. Upgrade - upgrade custom elements
    //  5. Update - set node, attribute, property, etc., values
    //  6. Connect - connect to the document. Optional and outside of this
    //     method.
    //
    // We have a few constraints on the ordering of these steps:
    //  * We need to upgrade before updating, so that property values will pass
    //    through any property setters.
    //  * We would like to process before upgrading so that we're sure that the
    //    cloned fragment is inert and not disturbed by self-modifying DOM.
    //  * We want custom elements to upgrade even in disconnected fragments.
    //
    // Given these constraints, with full custom elements support we would
    // prefer the order: Clone, Process, Adopt, Upgrade, Update, Connect
    //
    // But Safari does not implement CustomElementRegistry#upgrade, so we
    // can not implement that order and still have upgrade-before-update and
    // upgrade disconnected fragments. So we instead sacrifice the
    // process-before-upgrade constraint, since in Custom Elements v1 elements
    // must not modify their light DOM in the constructor. We still have issues
    // when co-existing with CEv0 elements like Polymer 1, and with polyfills
    // that don't strictly adhere to the no-modification rule because shadow
    // DOM, which may be created in the constructor, is emulated by being placed
    // in the light DOM.
    //
    // The resulting order is on native is: Clone, Adopt, Upgrade, Process,
    // Update, Connect. document.importNode() performs Clone, Adopt, and Upgrade
    // in one step.
    //
    // The Custom Elements v1 polyfill supports upgrade(), so the order when
    // polyfilled is the more ideal: Clone, Process, Adopt, Upgrade, Update,
    // Connect.
    const fragment = isCEPolyfill ? this.template.element.content.cloneNode(true) : document.importNode(this.template.element.content, true);
    const stack = [];
    const parts = this.template.parts; // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null

    const walker = document.createTreeWalker(fragment, 133
    /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */
    , null, false);
    let partIndex = 0;
    let nodeIndex = 0;
    let part;
    let node = walker.nextNode(); // Loop through all the nodes and parts of a template

    while (partIndex < parts.length) {
      part = parts[partIndex];

      if (!isTemplatePartActive(part)) {
        this.__parts.push(undefined);

        partIndex++;
        continue;
      } // Progress the tree walker until we find our next part's node.
      // Note that multiple parts may share the same node (attribute parts
      // on a single element), so this loop may not run at all.


      while (nodeIndex < part.index) {
        nodeIndex++;

        if (node.nodeName === 'TEMPLATE') {
          stack.push(node);
          walker.currentNode = node.content;
        }

        if ((node = walker.nextNode()) === null) {
          // We've exhausted the content inside a nested template element.
          // Because we still have parts (the outer for-loop), we know:
          // - There is a template in the stack
          // - The walker will find a nextNode outside the template
          walker.currentNode = stack.pop();
          node = walker.nextNode();
        }
      } // We've arrived at our part's node.


      if (part.type === 'node') {
        const part = this.processor.handleTextExpression(this.options);
        part.insertAfterNode(node.previousSibling);

        this.__parts.push(part);
      } else {
        this.__parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
      }

      partIndex++;
    }

    if (isCEPolyfill) {
      document.adoptNode(fragment);
      customElements.upgrade(fragment);
    }

    return fragment;
  }

}

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * Our TrustedTypePolicy for HTML which is declared using the html template
 * tag function.
 *
 * That HTML is a developer-authored constant, and is parsed with innerHTML
 * before any untrusted expressions have been mixed in. Therefor it is
 * considered safe by construction.
 */

const policy = window.trustedTypes && trustedTypes.createPolicy('lit-html', {
  createHTML: s => s
});
const commentMarker = ` ${marker} `;
/**
 * The return type of `html`, which holds a Template and the values from
 * interpolated expressions.
 */

class TemplateResult {
  constructor(strings, values, type, processor) {
    this.strings = strings;
    this.values = values;
    this.type = type;
    this.processor = processor;
  }
  /**
   * Returns a string of HTML used to create a `<template>` element.
   */


  getHTML() {
    const l = this.strings.length - 1;
    let html = '';
    let isCommentBinding = false;

    for (let i = 0; i < l; i++) {
      const s = this.strings[i]; // For each binding we want to determine the kind of marker to insert
      // into the template source before it's parsed by the browser's HTML
      // parser. The marker type is based on whether the expression is in an
      // attribute, text, or comment position.
      //   * For node-position bindings we insert a comment with the marker
      //     sentinel as its text content, like <!--{{lit-guid}}-->.
      //   * For attribute bindings we insert just the marker sentinel for the
      //     first binding, so that we support unquoted attribute bindings.
      //     Subsequent bindings can use a comment marker because multi-binding
      //     attributes must be quoted.
      //   * For comment bindings we insert just the marker sentinel so we don't
      //     close the comment.
      //
      // The following code scans the template source, but is *not* an HTML
      // parser. We don't need to track the tree structure of the HTML, only
      // whether a binding is inside a comment, and if not, if it appears to be
      // the first binding in an attribute.

      const commentOpen = s.lastIndexOf('<!--'); // We're in comment position if we have a comment open with no following
      // comment close. Because <-- can appear in an attribute value there can
      // be false positives.

      isCommentBinding = (commentOpen > -1 || isCommentBinding) && s.indexOf('-->', commentOpen + 1) === -1; // Check to see if we have an attribute-like sequence preceding the
      // expression. This can match "name=value" like structures in text,
      // comments, and attribute values, so there can be false-positives.

      const attributeMatch = lastAttributeNameRegex.exec(s);

      if (attributeMatch === null) {
        // We're only in this branch if we don't have a attribute-like
        // preceding sequence. For comments, this guards against unusual
        // attribute values like <div foo="<!--${'bar'}">. Cases like
        // <!-- foo=${'bar'}--> are handled correctly in the attribute branch
        // below.
        html += s + (isCommentBinding ? commentMarker : nodeMarker);
      } else {
        // For attributes we use just a marker sentinel, and also append a
        // $lit$ suffix to the name to opt-out of attribute-specific parsing
        // that IE and Edge do for style and certain SVG attributes.
        html += s.substr(0, attributeMatch.index) + attributeMatch[1] + attributeMatch[2] + boundAttributeSuffix + attributeMatch[3] + marker;
      }
    }

    html += this.strings[l];
    return html;
  }

  getTemplateElement() {
    const template = document.createElement('template');
    let value = this.getHTML();

    if (policy !== undefined) {
      // this is secure because `this.strings` is a TemplateStringsArray.
      // TODO: validate this when
      // https://github.com/tc39/proposal-array-is-template-object is
      // implemented.
      value = policy.createHTML(value);
    }

    template.innerHTML = value;
    return template;
  }

}

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const isPrimitive = value => {
  return value === null || !(typeof value === 'object' || typeof value === 'function');
};
const isIterable = value => {
  return Array.isArray(value) || // eslint-disable-next-line @typescript-eslint/no-explicit-any
  !!(value && value[Symbol.iterator]);
};
/**
 * Writes attribute values to the DOM for a group of AttributeParts bound to a
 * single attribute. The value is only set once even if there are multiple parts
 * for an attribute.
 */

class AttributeCommitter {
  constructor(element, name, strings) {
    this.dirty = true;
    this.element = element;
    this.name = name;
    this.strings = strings;
    this.parts = [];

    for (let i = 0; i < strings.length - 1; i++) {
      this.parts[i] = this._createPart();
    }
  }
  /**
   * Creates a single part. Override this to create a differnt type of part.
   */


  _createPart() {
    return new AttributePart(this);
  }

  _getValue() {
    const strings = this.strings;
    const l = strings.length - 1;
    const parts = this.parts; // If we're assigning an attribute via syntax like:
    //    attr="${foo}"  or  attr=${foo}
    // but not
    //    attr="${foo} ${bar}" or attr="${foo} baz"
    // then we don't want to coerce the attribute value into one long
    // string. Instead we want to just return the value itself directly,
    // so that sanitizeDOMValue can get the actual value rather than
    // String(value)
    // The exception is if v is an array, in which case we do want to smash
    // it together into a string without calling String() on the array.
    //
    // This also allows trusted values (when using TrustedTypes) being
    // assigned to DOM sinks without being stringified in the process.

    if (l === 1 && strings[0] === '' && strings[1] === '') {
      const v = parts[0].value;

      if (typeof v === 'symbol') {
        return String(v);
      }

      if (typeof v === 'string' || !isIterable(v)) {
        return v;
      }
    }

    let text = '';

    for (let i = 0; i < l; i++) {
      text += strings[i];
      const part = parts[i];

      if (part !== undefined) {
        const v = part.value;

        if (isPrimitive(v) || !isIterable(v)) {
          text += typeof v === 'string' ? v : String(v);
        } else {
          for (const t of v) {
            text += typeof t === 'string' ? t : String(t);
          }
        }
      }
    }

    text += strings[l];
    return text;
  }

  commit() {
    if (this.dirty) {
      this.dirty = false;
      this.element.setAttribute(this.name, this._getValue());
    }
  }

}
/**
 * A Part that controls all or part of an attribute value.
 */

class AttributePart {
  constructor(committer) {
    this.value = undefined;
    this.committer = committer;
  }

  setValue(value) {
    if (value !== noChange && (!isPrimitive(value) || value !== this.value)) {
      this.value = value; // If the value is a not a directive, dirty the committer so that it'll
      // call setAttribute. If the value is a directive, it'll dirty the
      // committer if it calls setValue().

      if (!isDirective(value)) {
        this.committer.dirty = true;
      }
    }
  }

  commit() {
    while (isDirective(this.value)) {
      const directive = this.value;
      this.value = noChange;
      directive(this);
    }

    if (this.value === noChange) {
      return;
    }

    this.committer.commit();
  }

}
/**
 * A Part that controls a location within a Node tree. Like a Range, NodePart
 * has start and end locations and can set and update the Nodes between those
 * locations.
 *
 * NodeParts support several value types: primitives, Nodes, TemplateResults,
 * as well as arrays and iterables of those types.
 */

class NodePart {
  constructor(options) {
    this.value = undefined;
    this.__pendingValue = undefined;
    this.options = options;
  }
  /**
   * Appends this part into a container.
   *
   * This part must be empty, as its contents are not automatically moved.
   */


  appendInto(container) {
    this.startNode = container.appendChild(createMarker());
    this.endNode = container.appendChild(createMarker());
  }
  /**
   * Inserts this part after the `ref` node (between `ref` and `ref`'s next
   * sibling). Both `ref` and its next sibling must be static, unchanging nodes
   * such as those that appear in a literal section of a template.
   *
   * This part must be empty, as its contents are not automatically moved.
   */


  insertAfterNode(ref) {
    this.startNode = ref;
    this.endNode = ref.nextSibling;
  }
  /**
   * Appends this part into a parent part.
   *
   * This part must be empty, as its contents are not automatically moved.
   */


  appendIntoPart(part) {
    part.__insert(this.startNode = createMarker());

    part.__insert(this.endNode = createMarker());
  }
  /**
   * Inserts this part after the `ref` part.
   *
   * This part must be empty, as its contents are not automatically moved.
   */


  insertAfterPart(ref) {
    ref.__insert(this.startNode = createMarker());

    this.endNode = ref.endNode;
    ref.endNode = this.startNode;
  }

  setValue(value) {
    this.__pendingValue = value;
  }

  commit() {
    if (this.startNode.parentNode === null) {
      return;
    }

    while (isDirective(this.__pendingValue)) {
      const directive = this.__pendingValue;
      this.__pendingValue = noChange;
      directive(this);
    }

    const value = this.__pendingValue;

    if (value === noChange) {
      return;
    }

    if (isPrimitive(value)) {
      if (value !== this.value) {
        this.__commitText(value);
      }
    } else if (value instanceof TemplateResult) {
      this.__commitTemplateResult(value);
    } else if (value instanceof Node) {
      this.__commitNode(value);
    } else if (isIterable(value)) {
      this.__commitIterable(value);
    } else if (value === nothing) {
      this.value = nothing;
      this.clear();
    } else {
      // Fallback, will render the string representation
      this.__commitText(value);
    }
  }

  __insert(node) {
    this.endNode.parentNode.insertBefore(node, this.endNode);
  }

  __commitNode(value) {
    if (this.value === value) {
      return;
    }

    this.clear();

    this.__insert(value);

    this.value = value;
  }

  __commitText(value) {
    const node = this.startNode.nextSibling;
    value = value == null ? '' : value; // If `value` isn't already a string, we explicitly convert it here in case
    // it can't be implicitly converted - i.e. it's a symbol.

    const valueAsString = typeof value === 'string' ? value : String(value);

    if (node === this.endNode.previousSibling && node.nodeType === 3
    /* Node.TEXT_NODE */
    ) {
        // If we only have a single text node between the markers, we can just
        // set its value, rather than replacing it.
        // TODO(justinfagnani): Can we just check if this.value is primitive?
        node.data = valueAsString;
      } else {
      this.__commitNode(document.createTextNode(valueAsString));
    }

    this.value = value;
  }

  __commitTemplateResult(value) {
    const template = this.options.templateFactory(value);

    if (this.value instanceof TemplateInstance && this.value.template === template) {
      this.value.update(value.values);
    } else {
      // Make sure we propagate the template processor from the TemplateResult
      // so that we use its syntax extension, etc. The template factory comes
      // from the render function options so that it can control template
      // caching and preprocessing.
      const instance = new TemplateInstance(template, value.processor, this.options);

      const fragment = instance._clone();

      instance.update(value.values);

      this.__commitNode(fragment);

      this.value = instance;
    }
  }

  __commitIterable(value) {
    // For an Iterable, we create a new InstancePart per item, then set its
    // value to the item. This is a little bit of overhead for every item in
    // an Iterable, but it lets us recurse easily and efficiently update Arrays
    // of TemplateResults that will be commonly returned from expressions like:
    // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
    // If _value is an array, then the previous render was of an
    // iterable and _value will contain the NodeParts from the previous
    // render. If _value is not an array, clear this part and make a new
    // array for NodeParts.
    if (!Array.isArray(this.value)) {
      this.value = [];
      this.clear();
    } // Lets us keep track of how many items we stamped so we can clear leftover
    // items from a previous render


    const itemParts = this.value;
    let partIndex = 0;
    let itemPart;

    for (const item of value) {
      // Try to reuse an existing part
      itemPart = itemParts[partIndex]; // If no existing part, create a new one

      if (itemPart === undefined) {
        itemPart = new NodePart(this.options);
        itemParts.push(itemPart);

        if (partIndex === 0) {
          itemPart.appendIntoPart(this);
        } else {
          itemPart.insertAfterPart(itemParts[partIndex - 1]);
        }
      }

      itemPart.setValue(item);
      itemPart.commit();
      partIndex++;
    }

    if (partIndex < itemParts.length) {
      // Truncate the parts array so _value reflects the current state
      itemParts.length = partIndex;
      this.clear(itemPart && itemPart.endNode);
    }
  }

  clear(startNode = this.startNode) {
    removeNodes(this.startNode.parentNode, startNode.nextSibling, this.endNode);
  }

}
/**
 * Implements a boolean attribute, roughly as defined in the HTML
 * specification.
 *
 * If the value is truthy, then the attribute is present with a value of
 * ''. If the value is falsey, the attribute is removed.
 */

class BooleanAttributePart {
  constructor(element, name, strings) {
    this.value = undefined;
    this.__pendingValue = undefined;

    if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
      throw new Error('Boolean attributes can only contain a single expression');
    }

    this.element = element;
    this.name = name;
    this.strings = strings;
  }

  setValue(value) {
    this.__pendingValue = value;
  }

  commit() {
    while (isDirective(this.__pendingValue)) {
      const directive = this.__pendingValue;
      this.__pendingValue = noChange;
      directive(this);
    }

    if (this.__pendingValue === noChange) {
      return;
    }

    const value = !!this.__pendingValue;

    if (this.value !== value) {
      if (value) {
        this.element.setAttribute(this.name, '');
      } else {
        this.element.removeAttribute(this.name);
      }

      this.value = value;
    }

    this.__pendingValue = noChange;
  }

}
/**
 * Sets attribute values for PropertyParts, so that the value is only set once
 * even if there are multiple parts for a property.
 *
 * If an expression controls the whole property value, then the value is simply
 * assigned to the property under control. If there are string literals or
 * multiple expressions, then the strings are expressions are interpolated into
 * a string first.
 */

class PropertyCommitter extends AttributeCommitter {
  constructor(element, name, strings) {
    super(element, name, strings);
    this.single = strings.length === 2 && strings[0] === '' && strings[1] === '';
  }

  _createPart() {
    return new PropertyPart(this);
  }

  _getValue() {
    if (this.single) {
      return this.parts[0].value;
    }

    return super._getValue();
  }

  commit() {
    if (this.dirty) {
      this.dirty = false; // eslint-disable-next-line @typescript-eslint/no-explicit-any

      this.element[this.name] = this._getValue();
    }
  }

}
class PropertyPart extends AttributePart {} // Detect event listener options support. If the `capture` property is read
// from the options object, then options are supported. If not, then the third
// argument to add/removeEventListener is interpreted as the boolean capture
// value so we should only pass the `capture` property.

let eventOptionsSupported = false; // Wrap into an IIFE because MS Edge <= v41 does not support having try/catch
// blocks right into the body of a module

(() => {
  try {
    const options = {
      get capture() {
        eventOptionsSupported = true;
        return false;
      }

    }; // eslint-disable-next-line @typescript-eslint/no-explicit-any

    window.addEventListener('test', options, options); // eslint-disable-next-line @typescript-eslint/no-explicit-any

    window.removeEventListener('test', options, options);
  } catch (_e) {// event options not supported
  }
})();

class EventPart {
  constructor(element, eventName, eventContext) {
    this.value = undefined;
    this.__pendingValue = undefined;
    this.element = element;
    this.eventName = eventName;
    this.eventContext = eventContext;

    this.__boundHandleEvent = e => this.handleEvent(e);
  }

  setValue(value) {
    this.__pendingValue = value;
  }

  commit() {
    while (isDirective(this.__pendingValue)) {
      const directive = this.__pendingValue;
      this.__pendingValue = noChange;
      directive(this);
    }

    if (this.__pendingValue === noChange) {
      return;
    }

    const newListener = this.__pendingValue;
    const oldListener = this.value;
    const shouldRemoveListener = newListener == null || oldListener != null && (newListener.capture !== oldListener.capture || newListener.once !== oldListener.once || newListener.passive !== oldListener.passive);
    const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);

    if (shouldRemoveListener) {
      this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options);
    }

    if (shouldAddListener) {
      this.__options = getOptions(newListener);
      this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options);
    }

    this.value = newListener;
    this.__pendingValue = noChange;
  }

  handleEvent(event) {
    if (typeof this.value === 'function') {
      this.value.call(this.eventContext || this.element, event);
    } else {
      this.value.handleEvent(event);
    }
  }

} // We copy options because of the inconsistent behavior of browsers when reading
// the third argument of add/removeEventListener. IE11 doesn't support options
// at all. Chrome 41 only reads `capture` if the argument is an object.

const getOptions = o => o && (eventOptionsSupported ? {
  capture: o.capture,
  passive: o.passive,
  once: o.once
} : o.capture);

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * The default TemplateFactory which caches Templates keyed on
 * result.type and result.strings.
 */

function templateFactory(result) {
  let templateCache = templateCaches.get(result.type);

  if (templateCache === undefined) {
    templateCache = {
      stringsArray: new WeakMap(),
      keyString: new Map()
    };
    templateCaches.set(result.type, templateCache);
  }

  let template = templateCache.stringsArray.get(result.strings);

  if (template !== undefined) {
    return template;
  } // If the TemplateStringsArray is new, generate a key from the strings
  // This key is shared between all templates with identical content


  const key = result.strings.join(marker); // Check if we already have a Template for this key

  template = templateCache.keyString.get(key);

  if (template === undefined) {
    // If we have not seen this key before, create a new Template
    template = new Template(result, result.getTemplateElement()); // Cache the Template for this key

    templateCache.keyString.set(key, template);
  } // Cache all future queries for this TemplateStringsArray


  templateCache.stringsArray.set(result.strings, template);
  return template;
}
const templateCaches = new Map();

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const parts = new WeakMap();
/**
 * Renders a template result or other value to a container.
 *
 * To update a container with new values, reevaluate the template literal and
 * call `render` with the new result.
 *
 * @param result Any value renderable by NodePart - typically a TemplateResult
 *     created by evaluating a template tag like `html` or `svg`.
 * @param container A DOM parent to render to. The entire contents are either
 *     replaced, or efficiently updated if the same result type was previous
 *     rendered there.
 * @param options RenderOptions for the entire render tree rendered to this
 *     container. Render options must *not* change between renders to the same
 *     container, as those changes will not effect previously rendered DOM.
 */

const render = (result, container, options) => {
  let part = parts.get(container);

  if (part === undefined) {
    removeNodes(container, container.firstChild);
    parts.set(container, part = new NodePart(Object.assign({
      templateFactory
    }, options)));
    part.appendInto(container);
  }

  part.setValue(result);
  part.commit();
};

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * Creates Parts when a template is instantiated.
 */

class DefaultTemplateProcessor {
  /**
   * Create parts for an attribute-position binding, given the event, attribute
   * name, and string literals.
   *
   * @param element The element containing the binding
   * @param name  The attribute name
   * @param strings The string literals. There are always at least two strings,
   *   event for fully-controlled bindings with a single expression.
   */
  handleAttributeExpressions(element, name, strings, options) {
    const prefix = name[0];

    if (prefix === '.') {
      const committer = new PropertyCommitter(element, name.slice(1), strings);
      return committer.parts;
    }

    if (prefix === '@') {
      return [new EventPart(element, name.slice(1), options.eventContext)];
    }

    if (prefix === '?') {
      return [new BooleanAttributePart(element, name.slice(1), strings)];
    }

    const committer = new AttributeCommitter(element, name, strings);
    return committer.parts;
  }
  /**
   * Create parts for a text-position binding.
   * @param templateFactory
   */


  handleTextExpression(options) {
    return new NodePart(options);
  }

}
const defaultTemplateProcessor = new DefaultTemplateProcessor();

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// This line will be used in regexes to search for lit-html usage.
// TODO(justinfagnani): inject version number at build time

if (typeof window !== 'undefined') {
  (window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.4.1');
}
/**
 * Interprets a template literal as an HTML template that can efficiently
 * render to and update a container.
 */


const html = (strings, ...values) => new TemplateResult(strings, values, 'html', defaultTemplateProcessor);

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

const getTemplateCacheKey = (type, scopeName) => `${type}--${scopeName}`;

let compatibleShadyCSSVersion = true;

if (typeof window.ShadyCSS === 'undefined') {
  compatibleShadyCSSVersion = false;
} else if (typeof window.ShadyCSS.prepareTemplateDom === 'undefined') {
  console.warn(`Incompatible ShadyCSS version detected. ` + `Please update to at least @webcomponents/webcomponentsjs@2.0.2 and ` + `@webcomponents/shadycss@1.3.1.`);
  compatibleShadyCSSVersion = false;
}
/**
 * Template factory which scopes template DOM using ShadyCSS.
 * @param scopeName {string}
 */


const shadyTemplateFactory = scopeName => result => {
  const cacheKey = getTemplateCacheKey(result.type, scopeName);
  let templateCache = templateCaches.get(cacheKey);

  if (templateCache === undefined) {
    templateCache = {
      stringsArray: new WeakMap(),
      keyString: new Map()
    };
    templateCaches.set(cacheKey, templateCache);
  }

  let template = templateCache.stringsArray.get(result.strings);

  if (template !== undefined) {
    return template;
  }

  const key = result.strings.join(marker);
  template = templateCache.keyString.get(key);

  if (template === undefined) {
    const element = result.getTemplateElement();

    if (compatibleShadyCSSVersion) {
      window.ShadyCSS.prepareTemplateDom(element, scopeName);
    }

    template = new Template(result, element);
    templateCache.keyString.set(key, template);
  }

  templateCache.stringsArray.set(result.strings, template);
  return template;
};
const TEMPLATE_TYPES = ['html', 'svg'];
/**
 * Removes all style elements from Templates for the given scopeName.
 */

const removeStylesFromLitTemplates = scopeName => {
  TEMPLATE_TYPES.forEach(type => {
    const templates = templateCaches.get(getTemplateCacheKey(type, scopeName));

    if (templates !== undefined) {
      templates.keyString.forEach(template => {
        const {
          element: {
            content
          }
        } = template; // IE 11 doesn't support the iterable param Set constructor

        const styles = new Set();
        Array.from(content.querySelectorAll('style')).forEach(s => {
          styles.add(s);
        });
        removeNodesFromTemplate(template, styles);
      });
    }
  });
};

const shadyRenderSet = new Set();
/**
 * For the given scope name, ensures that ShadyCSS style scoping is performed.
 * This is done just once per scope name so the fragment and template cannot
 * be modified.
 * (1) extracts styles from the rendered fragment and hands them to ShadyCSS
 * to be scoped and appended to the document
 * (2) removes style elements from all lit-html Templates for this scope name.
 *
 * Note, <style> elements can only be placed into templates for the
 * initial rendering of the scope. If <style> elements are included in templates
 * dynamically rendered to the scope (after the first scope render), they will
 * not be scoped and the <style> will be left in the template and rendered
 * output.
 */

const prepareTemplateStyles = (scopeName, renderedDOM, template) => {
  shadyRenderSet.add(scopeName); // If `renderedDOM` is stamped from a Template, then we need to edit that
  // Template's underlying template element. Otherwise, we create one here
  // to give to ShadyCSS, which still requires one while scoping.

  const templateElement = !!template ? template.element : document.createElement('template'); // Move styles out of rendered DOM and store.

  const styles = renderedDOM.querySelectorAll('style');
  const {
    length
  } = styles; // If there are no styles, skip unnecessary work

  if (length === 0) {
    // Ensure prepareTemplateStyles is called to support adding
    // styles via `prepareAdoptedCssText` since that requires that
    // `prepareTemplateStyles` is called.
    //
    // ShadyCSS will only update styles containing @apply in the template
    // given to `prepareTemplateStyles`. If no lit Template was given,
    // ShadyCSS will not be able to update uses of @apply in any relevant
    // template. However, this is not a problem because we only create the
    // template for the purpose of supporting `prepareAdoptedCssText`,
    // which doesn't support @apply at all.
    window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
    return;
  }

  const condensedStyle = document.createElement('style'); // Collect styles into a single style. This helps us make sure ShadyCSS
  // manipulations will not prevent us from being able to fix up template
  // part indices.
  // NOTE: collecting styles is inefficient for browsers but ShadyCSS
  // currently does this anyway. When it does not, this should be changed.

  for (let i = 0; i < length; i++) {
    const style = styles[i];
    style.parentNode.removeChild(style);
    condensedStyle.textContent += style.textContent;
  } // Remove styles from nested templates in this scope.


  removeStylesFromLitTemplates(scopeName); // And then put the condensed style into the "root" template passed in as
  // `template`.

  const content = templateElement.content;

  if (!!template) {
    insertNodeIntoTemplate(template, condensedStyle, content.firstChild);
  } else {
    content.insertBefore(condensedStyle, content.firstChild);
  } // Note, it's important that ShadyCSS gets the template that `lit-html`
  // will actually render so that it can update the style inside when
  // needed (e.g. @apply native Shadow DOM case).


  window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
  const style = content.querySelector('style');

  if (window.ShadyCSS.nativeShadow && style !== null) {
    // When in native Shadow DOM, ensure the style created by ShadyCSS is
    // included in initially rendered output (`renderedDOM`).
    renderedDOM.insertBefore(style.cloneNode(true), renderedDOM.firstChild);
  } else if (!!template) {
    // When no style is left in the template, parts will be broken as a
    // result. To fix this, we put back the style node ShadyCSS removed
    // and then tell lit to remove that node from the template.
    // There can be no style in the template in 2 cases (1) when Shady DOM
    // is in use, ShadyCSS removes all styles, (2) when native Shadow DOM
    // is in use ShadyCSS removes the style if it contains no content.
    // NOTE, ShadyCSS creates its own style so we can safely add/remove
    // `condensedStyle` here.
    content.insertBefore(condensedStyle, content.firstChild);
    const removes = new Set();
    removes.add(condensedStyle);
    removeNodesFromTemplate(template, removes);
  }
};
/**
 * Extension to the standard `render` method which supports rendering
 * to ShadowRoots when the ShadyDOM (https://github.com/webcomponents/shadydom)
 * and ShadyCSS (https://github.com/webcomponents/shadycss) polyfills are used
 * or when the webcomponentsjs
 * (https://github.com/webcomponents/webcomponentsjs) polyfill is used.
 *
 * Adds a `scopeName` option which is used to scope element DOM and stylesheets
 * when native ShadowDOM is unavailable. The `scopeName` will be added to
 * the class attribute of all rendered DOM. In addition, any style elements will
 * be automatically re-written with this `scopeName` selector and moved out
 * of the rendered DOM and into the document `<head>`.
 *
 * It is common to use this render method in conjunction with a custom element
 * which renders a shadowRoot. When this is done, typically the element's
 * `localName` should be used as the `scopeName`.
 *
 * In addition to DOM scoping, ShadyCSS also supports a basic shim for css
 * custom properties (needed only on older browsers like IE11) and a shim for
 * a deprecated feature called `@apply` that supports applying a set of css
 * custom properties to a given location.
 *
 * Usage considerations:
 *
 * * Part values in `<style>` elements are only applied the first time a given
 * `scopeName` renders. Subsequent changes to parts in style elements will have
 * no effect. Because of this, parts in style elements should only be used for
 * values that will never change, for example parts that set scope-wide theme
 * values or parts which render shared style elements.
 *
 * * Note, due to a limitation of the ShadyDOM polyfill, rendering in a
 * custom element's `constructor` is not supported. Instead rendering should
 * either done asynchronously, for example at microtask timing (for example
 * `Promise.resolve()`), or be deferred until the first time the element's
 * `connectedCallback` runs.
 *
 * Usage considerations when using shimmed custom properties or `@apply`:
 *
 * * Whenever any dynamic changes are made which affect
 * css custom properties, `ShadyCSS.styleElement(element)` must be called
 * to update the element. There are two cases when this is needed:
 * (1) the element is connected to a new parent, (2) a class is added to the
 * element that causes it to match different custom properties.
 * To address the first case when rendering a custom element, `styleElement`
 * should be called in the element's `connectedCallback`.
 *
 * * Shimmed custom properties may only be defined either for an entire
 * shadowRoot (for example, in a `:host` rule) or via a rule that directly
 * matches an element with a shadowRoot. In other words, instead of flowing from
 * parent to child as do native css custom properties, shimmed custom properties
 * flow only from shadowRoots to nested shadowRoots.
 *
 * * When using `@apply` mixing css shorthand property names with
 * non-shorthand names (for example `border` and `border-width`) is not
 * supported.
 */


const render$1 = (result, container, options) => {
  if (!options || typeof options !== 'object' || !options.scopeName) {
    throw new Error('The `scopeName` option is required.');
  }

  const scopeName = options.scopeName;
  const hasRendered = parts.has(container);
  const needsScoping = compatibleShadyCSSVersion && container.nodeType === 11
  /* Node.DOCUMENT_FRAGMENT_NODE */
  && !!container.host; // Handle first render to a scope specially...

  const firstScopeRender = needsScoping && !shadyRenderSet.has(scopeName); // On first scope render, render into a fragment; this cannot be a single
  // fragment that is reused since nested renders can occur synchronously.

  const renderContainer = firstScopeRender ? document.createDocumentFragment() : container;
  render(result, renderContainer, Object.assign({
    templateFactory: shadyTemplateFactory(scopeName)
  }, options)); // When performing first scope render,
  // (1) We've rendered into a fragment so that there's a chance to
  // `prepareTemplateStyles` before sub-elements hit the DOM
  // (which might cause them to render based on a common pattern of
  // rendering in a custom element's `connectedCallback`);
  // (2) Scope the template with ShadyCSS one time only for this scope.
  // (3) Render the fragment into the container and make sure the
  // container knows its `part` is the one we just rendered. This ensures
  // DOM will be re-used on subsequent renders.

  if (firstScopeRender) {
    const part = parts.get(renderContainer);
    parts.delete(renderContainer); // ShadyCSS might have style sheets (e.g. from `prepareAdoptedCssText`)
    // that should apply to `renderContainer` even if the rendered value is
    // not a TemplateInstance. However, it will only insert scoped styles
    // into the document if `prepareTemplateStyles` has already been called
    // for the given scope name.

    const template = part.value instanceof TemplateInstance ? part.value.template : undefined;
    prepareTemplateStyles(scopeName, renderContainer, template);
    removeNodes(container, container.firstChild);
    container.appendChild(renderContainer);
    parts.set(container, part);
  } // After elements have hit the DOM, update styling if this is the
  // initial render to this container.
  // This is needed whenever dynamic changes are made so it would be
  // safest to do every render; however, this would regress performance
  // so we leave it up to the user to call `ShadyCSS.styleElement`
  // for dynamic changes.


  if (!hasRendered && needsScoping) {
    window.ShadyCSS.styleElement(container.host);
  }
};

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var _a;
/**
 * Use this module if you want to create your own base class extending
 * [[UpdatingElement]].
 * @packageDocumentation
 */

/*
 * When using Closure Compiler, JSCompiler_renameProperty(property, object) is
 * replaced at compile time by the munged name for object[property]. We cannot
 * alias this function, so we have to use a small shim that has the same
 * behavior when not compiling.
 */


window.JSCompiler_renameProperty = (prop, _obj) => prop;

const defaultConverter = {
  toAttribute(value, type) {
    switch (type) {
      case Boolean:
        return value ? '' : null;

      case Object:
      case Array:
        // if the value is `null` or `undefined` pass this through
        // to allow removing/no change behavior.
        return value == null ? value : JSON.stringify(value);
    }

    return value;
  },

  fromAttribute(value, type) {
    switch (type) {
      case Boolean:
        return value !== null;

      case Number:
        return value === null ? null : Number(value);

      case Object:
      case Array:
        return JSON.parse(value);
    }

    return value;
  }

};
/**
 * Change function that returns true if `value` is different from `oldValue`.
 * This method is used as the default for a property's `hasChanged` function.
 */

const notEqual = (value, old) => {
  // This ensures (old==NaN, value==NaN) always returns false
  return old !== value && (old === old || value === value);
};
const defaultPropertyDeclaration = {
  attribute: true,
  type: String,
  converter: defaultConverter,
  reflect: false,
  hasChanged: notEqual
};
const STATE_HAS_UPDATED = 1;
const STATE_UPDATE_REQUESTED = 1 << 2;
const STATE_IS_REFLECTING_TO_ATTRIBUTE = 1 << 3;
const STATE_IS_REFLECTING_TO_PROPERTY = 1 << 4;
/**
 * The Closure JS Compiler doesn't currently have good support for static
 * property semantics where "this" is dynamic (e.g.
 * https://github.com/google/closure-compiler/issues/3177 and others) so we use
 * this hack to bypass any rewriting by the compiler.
 */

const finalized = 'finalized';
/**
 * Base element class which manages element properties and attributes. When
 * properties change, the `update` method is asynchronously called. This method
 * should be supplied by subclassers to render updates as desired.
 * @noInheritDoc
 */

class UpdatingElement extends HTMLElement {
  constructor() {
    super();
    this.initialize();
  }
  /**
   * Returns a list of attributes corresponding to the registered properties.
   * @nocollapse
   */


  static get observedAttributes() {
    // note: piggy backing on this to ensure we're finalized.
    this.finalize();
    const attributes = []; // Use forEach so this works even if for/of loops are compiled to for loops
    // expecting arrays

    this._classProperties.forEach((v, p) => {
      const attr = this._attributeNameForProperty(p, v);

      if (attr !== undefined) {
        this._attributeToPropertyMap.set(attr, p);

        attributes.push(attr);
      }
    });

    return attributes;
  }
  /**
   * Ensures the private `_classProperties` property metadata is created.
   * In addition to `finalize` this is also called in `createProperty` to
   * ensure the `@property` decorator can add property metadata.
   */

  /** @nocollapse */


  static _ensureClassProperties() {
    // ensure private storage for property declarations.
    if (!this.hasOwnProperty(JSCompiler_renameProperty('_classProperties', this))) {
      this._classProperties = new Map(); // NOTE: Workaround IE11 not supporting Map constructor argument.

      const superProperties = Object.getPrototypeOf(this)._classProperties;

      if (superProperties !== undefined) {
        superProperties.forEach((v, k) => this._classProperties.set(k, v));
      }
    }
  }
  /**
   * Creates a property accessor on the element prototype if one does not exist
   * and stores a PropertyDeclaration for the property with the given options.
   * The property setter calls the property's `hasChanged` property option
   * or uses a strict identity check to determine whether or not to request
   * an update.
   *
   * This method may be overridden to customize properties; however,
   * when doing so, it's important to call `super.createProperty` to ensure
   * the property is setup correctly. This method calls
   * `getPropertyDescriptor` internally to get a descriptor to install.
   * To customize what properties do when they are get or set, override
   * `getPropertyDescriptor`. To customize the options for a property,
   * implement `createProperty` like this:
   *
   * static createProperty(name, options) {
   *   options = Object.assign(options, {myOption: true});
   *   super.createProperty(name, options);
   * }
   *
   * @nocollapse
   */


  static createProperty(name, options = defaultPropertyDeclaration) {
    // Note, since this can be called by the `@property` decorator which
    // is called before `finalize`, we ensure storage exists for property
    // metadata.
    this._ensureClassProperties();

    this._classProperties.set(name, options); // Do not generate an accessor if the prototype already has one, since
    // it would be lost otherwise and that would never be the user's intention;
    // Instead, we expect users to call `requestUpdate` themselves from
    // user-defined accessors. Note that if the super has an accessor we will
    // still overwrite it


    if (options.noAccessor || this.prototype.hasOwnProperty(name)) {
      return;
    }

    const key = typeof name === 'symbol' ? Symbol() : `__${name}`;
    const descriptor = this.getPropertyDescriptor(name, key, options);

    if (descriptor !== undefined) {
      Object.defineProperty(this.prototype, name, descriptor);
    }
  }
  /**
   * Returns a property descriptor to be defined on the given named property.
   * If no descriptor is returned, the property will not become an accessor.
   * For example,
   *
   *   class MyElement extends LitElement {
   *     static getPropertyDescriptor(name, key, options) {
   *       const defaultDescriptor =
   *           super.getPropertyDescriptor(name, key, options);
   *       const setter = defaultDescriptor.set;
   *       return {
   *         get: defaultDescriptor.get,
   *         set(value) {
   *           setter.call(this, value);
   *           // custom action.
   *         },
   *         configurable: true,
   *         enumerable: true
   *       }
   *     }
   *   }
   *
   * @nocollapse
   */


  static getPropertyDescriptor(name, key, options) {
    return {
      // tslint:disable-next-line:no-any no symbol in index
      get() {
        return this[key];
      },

      set(value) {
        const oldValue = this[name];
        this[key] = value;
        this.requestUpdateInternal(name, oldValue, options);
      },

      configurable: true,
      enumerable: true
    };
  }
  /**
   * Returns the property options associated with the given property.
   * These options are defined with a PropertyDeclaration via the `properties`
   * object or the `@property` decorator and are registered in
   * `createProperty(...)`.
   *
   * Note, this method should be considered "final" and not overridden. To
   * customize the options for a given property, override `createProperty`.
   *
   * @nocollapse
   * @final
   */


  static getPropertyOptions(name) {
    return this._classProperties && this._classProperties.get(name) || defaultPropertyDeclaration;
  }
  /**
   * Creates property accessors for registered properties and ensures
   * any superclasses are also finalized.
   * @nocollapse
   */


  static finalize() {
    // finalize any superclasses
    const superCtor = Object.getPrototypeOf(this);

    if (!superCtor.hasOwnProperty(finalized)) {
      superCtor.finalize();
    }

    this[finalized] = true;

    this._ensureClassProperties(); // initialize Map populated in observedAttributes


    this._attributeToPropertyMap = new Map(); // make any properties
    // Note, only process "own" properties since this element will inherit
    // any properties defined on the superClass, and finalization ensures
    // the entire prototype chain is finalized.

    if (this.hasOwnProperty(JSCompiler_renameProperty('properties', this))) {
      const props = this.properties; // support symbols in properties (IE11 does not support this)

      const propKeys = [...Object.getOwnPropertyNames(props), ...(typeof Object.getOwnPropertySymbols === 'function' ? Object.getOwnPropertySymbols(props) : [])]; // This for/of is ok because propKeys is an array

      for (const p of propKeys) {
        // note, use of `any` is due to TypeSript lack of support for symbol in
        // index types
        // tslint:disable-next-line:no-any no symbol in index
        this.createProperty(p, props[p]);
      }
    }
  }
  /**
   * Returns the property name for the given attribute `name`.
   * @nocollapse
   */


  static _attributeNameForProperty(name, options) {
    const attribute = options.attribute;
    return attribute === false ? undefined : typeof attribute === 'string' ? attribute : typeof name === 'string' ? name.toLowerCase() : undefined;
  }
  /**
   * Returns true if a property should request an update.
   * Called when a property value is set and uses the `hasChanged`
   * option for the property if present or a strict identity check.
   * @nocollapse
   */


  static _valueHasChanged(value, old, hasChanged = notEqual) {
    return hasChanged(value, old);
  }
  /**
   * Returns the property value for the given attribute value.
   * Called via the `attributeChangedCallback` and uses the property's
   * `converter` or `converter.fromAttribute` property option.
   * @nocollapse
   */


  static _propertyValueFromAttribute(value, options) {
    const type = options.type;
    const converter = options.converter || defaultConverter;
    const fromAttribute = typeof converter === 'function' ? converter : converter.fromAttribute;
    return fromAttribute ? fromAttribute(value, type) : value;
  }
  /**
   * Returns the attribute value for the given property value. If this
   * returns undefined, the property will *not* be reflected to an attribute.
   * If this returns null, the attribute will be removed, otherwise the
   * attribute will be set to the value.
   * This uses the property's `reflect` and `type.toAttribute` property options.
   * @nocollapse
   */


  static _propertyValueToAttribute(value, options) {
    if (options.reflect === undefined) {
      return;
    }

    const type = options.type;
    const converter = options.converter;
    const toAttribute = converter && converter.toAttribute || defaultConverter.toAttribute;
    return toAttribute(value, type);
  }
  /**
   * Performs element initialization. By default captures any pre-set values for
   * registered properties.
   */


  initialize() {
    this._updateState = 0;
    this._updatePromise = new Promise(res => this._enableUpdatingResolver = res);
    this._changedProperties = new Map();

    this._saveInstanceProperties(); // ensures first update will be caught by an early access of
    // `updateComplete`


    this.requestUpdateInternal();
  }
  /**
   * Fixes any properties set on the instance before upgrade time.
   * Otherwise these would shadow the accessor and break these properties.
   * The properties are stored in a Map which is played back after the
   * constructor runs. Note, on very old versions of Safari (<=9) or Chrome
   * (<=41), properties created for native platform properties like (`id` or
   * `name`) may not have default values set in the element constructor. On
   * these browsers native properties appear on instances and therefore their
   * default value will overwrite any element default (e.g. if the element sets
   * this.id = 'id' in the constructor, the 'id' will become '' since this is
   * the native platform default).
   */


  _saveInstanceProperties() {
    // Use forEach so this works even if for/of loops are compiled to for loops
    // expecting arrays
    this.constructor._classProperties.forEach((_v, p) => {
      if (this.hasOwnProperty(p)) {
        const value = this[p];
        delete this[p];

        if (!this._instanceProperties) {
          this._instanceProperties = new Map();
        }

        this._instanceProperties.set(p, value);
      }
    });
  }
  /**
   * Applies previously saved instance properties.
   */


  _applyInstanceProperties() {
    // Use forEach so this works even if for/of loops are compiled to for loops
    // expecting arrays
    // tslint:disable-next-line:no-any
    this._instanceProperties.forEach((v, p) => this[p] = v);

    this._instanceProperties = undefined;
  }

  connectedCallback() {
    // Ensure first connection completes an update. Updates cannot complete
    // before connection.
    this.enableUpdating();
  }

  enableUpdating() {
    if (this._enableUpdatingResolver !== undefined) {
      this._enableUpdatingResolver();

      this._enableUpdatingResolver = undefined;
    }
  }
  /**
   * Allows for `super.disconnectedCallback()` in extensions while
   * reserving the possibility of making non-breaking feature additions
   * when disconnecting at some point in the future.
   */


  disconnectedCallback() {}
  /**
   * Synchronizes property values when attributes change.
   */


  attributeChangedCallback(name, old, value) {
    if (old !== value) {
      this._attributeToProperty(name, value);
    }
  }

  _propertyToAttribute(name, value, options = defaultPropertyDeclaration) {
    const ctor = this.constructor;

    const attr = ctor._attributeNameForProperty(name, options);

    if (attr !== undefined) {
      const attrValue = ctor._propertyValueToAttribute(value, options); // an undefined value does not change the attribute.


      if (attrValue === undefined) {
        return;
      } // Track if the property is being reflected to avoid
      // setting the property again via `attributeChangedCallback`. Note:
      // 1. this takes advantage of the fact that the callback is synchronous.
      // 2. will behave incorrectly if multiple attributes are in the reaction
      // stack at time of calling. However, since we process attributes
      // in `update` this should not be possible (or an extreme corner case
      // that we'd like to discover).
      // mark state reflecting


      this._updateState = this._updateState | STATE_IS_REFLECTING_TO_ATTRIBUTE;

      if (attrValue == null) {
        this.removeAttribute(attr);
      } else {
        this.setAttribute(attr, attrValue);
      } // mark state not reflecting


      this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_ATTRIBUTE;
    }
  }

  _attributeToProperty(name, value) {
    // Use tracking info to avoid deserializing attribute value if it was
    // just set from a property setter.
    if (this._updateState & STATE_IS_REFLECTING_TO_ATTRIBUTE) {
      return;
    }

    const ctor = this.constructor; // Note, hint this as an `AttributeMap` so closure clearly understands
    // the type; it has issues with tracking types through statics
    // tslint:disable-next-line:no-unnecessary-type-assertion

    const propName = ctor._attributeToPropertyMap.get(name);

    if (propName !== undefined) {
      const options = ctor.getPropertyOptions(propName); // mark state reflecting

      this._updateState = this._updateState | STATE_IS_REFLECTING_TO_PROPERTY;
      this[propName] = // tslint:disable-next-line:no-any
      ctor._propertyValueFromAttribute(value, options); // mark state not reflecting

      this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_PROPERTY;
    }
  }
  /**
   * This protected version of `requestUpdate` does not access or return the
   * `updateComplete` promise. This promise can be overridden and is therefore
   * not free to access.
   */


  requestUpdateInternal(name, oldValue, options) {
    let shouldRequestUpdate = true; // If we have a property key, perform property update steps.

    if (name !== undefined) {
      const ctor = this.constructor;
      options = options || ctor.getPropertyOptions(name);

      if (ctor._valueHasChanged(this[name], oldValue, options.hasChanged)) {
        if (!this._changedProperties.has(name)) {
          this._changedProperties.set(name, oldValue);
        } // Add to reflecting properties set.
        // Note, it's important that every change has a chance to add the
        // property to `_reflectingProperties`. This ensures setting
        // attribute + property reflects correctly.


        if (options.reflect === true && !(this._updateState & STATE_IS_REFLECTING_TO_PROPERTY)) {
          if (this._reflectingProperties === undefined) {
            this._reflectingProperties = new Map();
          }

          this._reflectingProperties.set(name, options);
        }
      } else {
        // Abort the request if the property should not be considered changed.
        shouldRequestUpdate = false;
      }
    }

    if (!this._hasRequestedUpdate && shouldRequestUpdate) {
      this._updatePromise = this._enqueueUpdate();
    }
  }
  /**
   * Requests an update which is processed asynchronously. This should
   * be called when an element should update based on some state not triggered
   * by setting a property. In this case, pass no arguments. It should also be
   * called when manually implementing a property setter. In this case, pass the
   * property `name` and `oldValue` to ensure that any configured property
   * options are honored. Returns the `updateComplete` Promise which is resolved
   * when the update completes.
   *
   * @param name {PropertyKey} (optional) name of requesting property
   * @param oldValue {any} (optional) old value of requesting property
   * @returns {Promise} A Promise that is resolved when the update completes.
   */


  requestUpdate(name, oldValue) {
    this.requestUpdateInternal(name, oldValue);
    return this.updateComplete;
  }
  /**
   * Sets up the element to asynchronously update.
   */


  async _enqueueUpdate() {
    this._updateState = this._updateState | STATE_UPDATE_REQUESTED;

    try {
      // Ensure any previous update has resolved before updating.
      // This `await` also ensures that property changes are batched.
      await this._updatePromise;
    } catch (e) {// Ignore any previous errors. We only care that the previous cycle is
      // done. Any error should have been handled in the previous update.
    }

    const result = this.performUpdate(); // If `performUpdate` returns a Promise, we await it. This is done to
    // enable coordinating updates with a scheduler. Note, the result is
    // checked to avoid delaying an additional microtask unless we need to.

    if (result != null) {
      await result;
    }

    return !this._hasRequestedUpdate;
  }

  get _hasRequestedUpdate() {
    return this._updateState & STATE_UPDATE_REQUESTED;
  }

  get hasUpdated() {
    return this._updateState & STATE_HAS_UPDATED;
  }
  /**
   * Performs an element update. Note, if an exception is thrown during the
   * update, `firstUpdated` and `updated` will not be called.
   *
   * You can override this method to change the timing of updates. If this
   * method is overridden, `super.performUpdate()` must be called.
   *
   * For instance, to schedule updates to occur just before the next frame:
   *
   * ```
   * protected async performUpdate(): Promise<unknown> {
   *   await new Promise((resolve) => requestAnimationFrame(() => resolve()));
   *   super.performUpdate();
   * }
   * ```
   */


  performUpdate() {
    // Abort any update if one is not pending when this is called.
    // This can happen if `performUpdate` is called early to "flush"
    // the update.
    if (!this._hasRequestedUpdate) {
      return;
    } // Mixin instance properties once, if they exist.


    if (this._instanceProperties) {
      this._applyInstanceProperties();
    }

    let shouldUpdate = false;
    const changedProperties = this._changedProperties;

    try {
      shouldUpdate = this.shouldUpdate(changedProperties);

      if (shouldUpdate) {
        this.update(changedProperties);
      } else {
        this._markUpdated();
      }
    } catch (e) {
      // Prevent `firstUpdated` and `updated` from running when there's an
      // update exception.
      shouldUpdate = false; // Ensure element can accept additional updates after an exception.

      this._markUpdated();

      throw e;
    }

    if (shouldUpdate) {
      if (!(this._updateState & STATE_HAS_UPDATED)) {
        this._updateState = this._updateState | STATE_HAS_UPDATED;
        this.firstUpdated(changedProperties);
      }

      this.updated(changedProperties);
    }
  }

  _markUpdated() {
    this._changedProperties = new Map();
    this._updateState = this._updateState & ~STATE_UPDATE_REQUESTED;
  }
  /**
   * Returns a Promise that resolves when the element has completed updating.
   * The Promise value is a boolean that is `true` if the element completed the
   * update without triggering another update. The Promise result is `false` if
   * a property was set inside `updated()`. If the Promise is rejected, an
   * exception was thrown during the update.
   *
   * To await additional asynchronous work, override the `_getUpdateComplete`
   * method. For example, it is sometimes useful to await a rendered element
   * before fulfilling this Promise. To do this, first await
   * `super._getUpdateComplete()`, then any subsequent state.
   *
   * @returns {Promise} The Promise returns a boolean that indicates if the
   * update resolved without triggering another update.
   */


  get updateComplete() {
    return this._getUpdateComplete();
  }
  /**
   * Override point for the `updateComplete` promise.
   *
   * It is not safe to override the `updateComplete` getter directly due to a
   * limitation in TypeScript which means it is not possible to call a
   * superclass getter (e.g. `super.updateComplete.then(...)`) when the target
   * language is ES5 (https://github.com/microsoft/TypeScript/issues/338).
   * This method should be overridden instead. For example:
   *
   *   class MyElement extends LitElement {
   *     async _getUpdateComplete() {
   *       await super._getUpdateComplete();
   *       await this._myChild.updateComplete;
   *     }
   *   }
   */


  _getUpdateComplete() {
    return this._updatePromise;
  }
  /**
   * Controls whether or not `update` should be called when the element requests
   * an update. By default, this method always returns `true`, but this can be
   * customized to control when to update.
   *
   * @param _changedProperties Map of changed properties with old values
   */


  shouldUpdate(_changedProperties) {
    return true;
  }
  /**
   * Updates the element. This method reflects property values to attributes.
   * It can be overridden to render and keep updated element DOM.
   * Setting properties inside this method will *not* trigger
   * another update.
   *
   * @param _changedProperties Map of changed properties with old values
   */


  update(_changedProperties) {
    if (this._reflectingProperties !== undefined && this._reflectingProperties.size > 0) {
      // Use forEach so this works even if for/of loops are compiled to for
      // loops expecting arrays
      this._reflectingProperties.forEach((v, k) => this._propertyToAttribute(k, this[k], v));

      this._reflectingProperties = undefined;
    }

    this._markUpdated();
  }
  /**
   * Invoked whenever the element is updated. Implement to perform
   * post-updating tasks via DOM APIs, for example, focusing an element.
   *
   * Setting properties inside this method will trigger the element to update
   * again after this update cycle completes.
   *
   * @param _changedProperties Map of changed properties with old values
   */


  updated(_changedProperties) {}
  /**
   * Invoked when the element is first updated. Implement to perform one time
   * work on the element after update.
   *
   * Setting properties inside this method will trigger the element to update
   * again after this update cycle completes.
   *
   * @param _changedProperties Map of changed properties with old values
   */


  firstUpdated(_changedProperties) {}

}
_a = finalized;
/**
 * Marks class as having finished creating properties.
 */

UpdatingElement[_a] = true;

/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/

/**
 * Whether the current browser supports `adoptedStyleSheets`.
 */
const supportsAdoptingStyleSheets = window.ShadowRoot && (window.ShadyCSS === undefined || window.ShadyCSS.nativeShadow) && 'adoptedStyleSheets' in Document.prototype && 'replace' in CSSStyleSheet.prototype;
const constructionToken = Symbol();
class CSSResult {
  constructor(cssText, safeToken) {
    if (safeToken !== constructionToken) {
      throw new Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.');
    }

    this.cssText = cssText;
  } // Note, this is a getter so that it's lazy. In practice, this means
  // stylesheets are not created until the first element instance is made.


  get styleSheet() {
    if (this._styleSheet === undefined) {
      // Note, if `supportsAdoptingStyleSheets` is true then we assume
      // CSSStyleSheet is constructable.
      if (supportsAdoptingStyleSheets) {
        this._styleSheet = new CSSStyleSheet();

        this._styleSheet.replaceSync(this.cssText);
      } else {
        this._styleSheet = null;
      }
    }

    return this._styleSheet;
  }

  toString() {
    return this.cssText;
  }

}
/**
 * Wrap a value for interpolation in a [[`css`]] tagged template literal.
 *
 * This is unsafe because untrusted CSS text can be used to phone home
 * or exfiltrate data to an attacker controlled site. Take care to only use
 * this with trusted input.
 */

const unsafeCSS = value => {
  return new CSSResult(String(value), constructionToken);
};

const textFromCSSResult = value => {
  if (value instanceof CSSResult) {
    return value.cssText;
  } else if (typeof value === 'number') {
    return value;
  } else {
    throw new Error(`Value passed to 'css' function must be a 'css' function result: ${value}. Use 'unsafeCSS' to pass non-literal values, but
            take care to ensure page security.`);
  }
};
/**
 * Template tag which which can be used with LitElement's [[LitElement.styles |
 * `styles`]] property to set element styles. For security reasons, only literal
 * string values may be used. To incorporate non-literal values [[`unsafeCSS`]]
 * may be used inside a template string part.
 */


const css = (strings, ...values) => {
  const cssText = values.reduce((acc, v, idx) => acc + textFromCSSResult(v) + strings[idx + 1], strings[0]);
  return new CSSResult(cssText, constructionToken);
};

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// This line will be used in regexes to search for LitElement usage.
// TODO(justinfagnani): inject version number at build time

(window['litElementVersions'] || (window['litElementVersions'] = [])).push('2.4.0');
/**
 * Sentinal value used to avoid calling lit-html's render function when
 * subclasses do not implement `render`
 */

const renderNotImplemented = {};
/**
 * Base element class that manages element properties and attributes, and
 * renders a lit-html template.
 *
 * To define a component, subclass `LitElement` and implement a
 * `render` method to provide the component's template. Define properties
 * using the [[`properties`]] property or the [[`property`]] decorator.
 */

class LitElement extends UpdatingElement {
  /**
   * Return the array of styles to apply to the element.
   * Override this method to integrate into a style management system.
   *
   * @nocollapse
   */
  static getStyles() {
    return this.styles;
  }
  /** @nocollapse */


  static _getUniqueStyles() {
    // Only gather styles once per class
    if (this.hasOwnProperty(JSCompiler_renameProperty('_styles', this))) {
      return;
    } // Take care not to call `this.getStyles()` multiple times since this
    // generates new CSSResults each time.
    // TODO(sorvell): Since we do not cache CSSResults by input, any
    // shared styles will generate new stylesheet objects, which is wasteful.
    // This should be addressed when a browser ships constructable
    // stylesheets.


    const userStyles = this.getStyles();

    if (Array.isArray(userStyles)) {
      // De-duplicate styles preserving the _last_ instance in the set.
      // This is a performance optimization to avoid duplicated styles that can
      // occur especially when composing via subclassing.
      // The last item is kept to try to preserve the cascade order with the
      // assumption that it's most important that last added styles override
      // previous styles.
      const addStyles = (styles, set) => styles.reduceRight((set, s) => // Note: On IE set.add() does not return the set
      Array.isArray(s) ? addStyles(s, set) : (set.add(s), set), set); // Array.from does not work on Set in IE, otherwise return
      // Array.from(addStyles(userStyles, new Set<CSSResult>())).reverse()


      const set = addStyles(userStyles, new Set());
      const styles = [];
      set.forEach(v => styles.unshift(v));
      this._styles = styles;
    } else {
      this._styles = userStyles === undefined ? [] : [userStyles];
    } // Ensure that there are no invalid CSSStyleSheet instances here. They are
    // invalid in two conditions.
    // (1) the sheet is non-constructible (`sheet` of a HTMLStyleElement), but
    //     this is impossible to check except via .replaceSync or use
    // (2) the ShadyCSS polyfill is enabled (:. supportsAdoptingStyleSheets is
    //     false)


    this._styles = this._styles.map(s => {
      if (s instanceof CSSStyleSheet && !supportsAdoptingStyleSheets) {
        // Flatten the cssText from the passed constructible stylesheet (or
        // undetectable non-constructible stylesheet). The user might have
        // expected to update their stylesheets over time, but the alternative
        // is a crash.
        const cssText = Array.prototype.slice.call(s.cssRules).reduce((css, rule) => css + rule.cssText, '');
        return unsafeCSS(cssText);
      }

      return s;
    });
  }
  /**
   * Performs element initialization. By default this calls
   * [[`createRenderRoot`]] to create the element [[`renderRoot`]] node and
   * captures any pre-set values for registered properties.
   */


  initialize() {
    super.initialize();

    this.constructor._getUniqueStyles();

    this.renderRoot = this.createRenderRoot(); // Note, if renderRoot is not a shadowRoot, styles would/could apply to the
    // element's getRootNode(). While this could be done, we're choosing not to
    // support this now since it would require different logic around de-duping.

    if (window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot) {
      this.adoptStyles();
    }
  }
  /**
   * Returns the node into which the element should render and by default
   * creates and returns an open shadowRoot. Implement to customize where the
   * element's DOM is rendered. For example, to render into the element's
   * childNodes, return `this`.
   * @returns {Element|DocumentFragment} Returns a node into which to render.
   */


  createRenderRoot() {
    return this.attachShadow({
      mode: 'open'
    });
  }
  /**
   * Applies styling to the element shadowRoot using the [[`styles`]]
   * property. Styling will apply using `shadowRoot.adoptedStyleSheets` where
   * available and will fallback otherwise. When Shadow DOM is polyfilled,
   * ShadyCSS scopes styles and adds them to the document. When Shadow DOM
   * is available but `adoptedStyleSheets` is not, styles are appended to the
   * end of the `shadowRoot` to [mimic spec
   * behavior](https://wicg.github.io/construct-stylesheets/#using-constructed-stylesheets).
   */


  adoptStyles() {
    const styles = this.constructor._styles;

    if (styles.length === 0) {
      return;
    } // There are three separate cases here based on Shadow DOM support.
    // (1) shadowRoot polyfilled: use ShadyCSS
    // (2) shadowRoot.adoptedStyleSheets available: use it
    // (3) shadowRoot.adoptedStyleSheets polyfilled: append styles after
    // rendering


    if (window.ShadyCSS !== undefined && !window.ShadyCSS.nativeShadow) {
      window.ShadyCSS.ScopingShim.prepareAdoptedCssText(styles.map(s => s.cssText), this.localName);
    } else if (supportsAdoptingStyleSheets) {
      this.renderRoot.adoptedStyleSheets = styles.map(s => s instanceof CSSStyleSheet ? s : s.styleSheet);
    } else {
      // This must be done after rendering so the actual style insertion is done
      // in `update`.
      this._needsShimAdoptedStyleSheets = true;
    }
  }

  connectedCallback() {
    super.connectedCallback(); // Note, first update/render handles styleElement so we only call this if
    // connected after first update.

    if (this.hasUpdated && window.ShadyCSS !== undefined) {
      window.ShadyCSS.styleElement(this);
    }
  }
  /**
   * Updates the element. This method reflects property values to attributes
   * and calls `render` to render DOM via lit-html. Setting properties inside
   * this method will *not* trigger another update.
   * @param _changedProperties Map of changed properties with old values
   */


  update(changedProperties) {
    // Setting properties in `render` should not trigger an update. Since
    // updates are allowed after super.update, it's important to call `render`
    // before that.
    const templateResult = this.render();
    super.update(changedProperties); // If render is not implemented by the component, don't call lit-html render

    if (templateResult !== renderNotImplemented) {
      this.constructor.render(templateResult, this.renderRoot, {
        scopeName: this.localName,
        eventContext: this
      });
    } // When native Shadow DOM is used but adoptedStyles are not supported,
    // insert styling after rendering to ensure adoptedStyles have highest
    // priority.


    if (this._needsShimAdoptedStyleSheets) {
      this._needsShimAdoptedStyleSheets = false;

      this.constructor._styles.forEach(s => {
        const style = document.createElement('style');
        style.textContent = s.cssText;
        this.renderRoot.appendChild(style);
      });
    }
  }
  /**
   * Invoked on each update to perform rendering tasks. This method may return
   * any value renderable by lit-html's `NodePart` - typically a
   * `TemplateResult`. Setting properties inside this method will *not* trigger
   * the element to update.
   */


  render() {
    return renderNotImplemented;
  }

}
/**
 * Ensure this class is marked as `finalized` as an optimization ensuring
 * it will not needlessly try to `finalize`.
 *
 * Note this property name is a string to prevent breaking Closure JS Compiler
 * optimizations. See updating-element.ts for more information.
 */

LitElement['finalized'] = true;
/**
 * Reference to the underlying library method used to render the element's
 * DOM. By default, points to the `render` method from lit-html's shady-render
 * module.
 *
 * **Most users will never need to touch this property.**
 *
 * This  property should not be confused with the `render` instance method,
 * which should be overridden to define a template for the element.
 *
 * Advanced users creating a new base class based on LitElement can override
 * this property to point to a custom render method with a signature that
 * matches [shady-render's `render`
 * method](https://lit-html.polymer-project.org/api/modules/shady_render.html#render).
 *
 * @nocollapse
 */

LitElement.render = render$1;

var token = /d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g;
var twoDigitsOptional = "[1-9]\\d?";
var twoDigits = "\\d\\d";
var threeDigits = "\\d{3}";
var fourDigits = "\\d{4}";
var word = "[^\\s]+";
var literal = /\[([^]*?)\]/gm;

function shorten(arr, sLen) {
  var newArr = [];

  for (var i = 0, len = arr.length; i < len; i++) {
    newArr.push(arr[i].substr(0, sLen));
  }

  return newArr;
}

var monthUpdate = function (arrName) {
  return function (v, i18n) {
    var lowerCaseArr = i18n[arrName].map(function (v) {
      return v.toLowerCase();
    });
    var index = lowerCaseArr.indexOf(v.toLowerCase());

    if (index > -1) {
      return index;
    }

    return null;
  };
};

function assign(origObj) {
  var args = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }

  for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
    var obj = args_1[_a];

    for (var key in obj) {
      // @ts-ignore ex
      origObj[key] = obj[key];
    }
  }

  return origObj;
}

var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var monthNamesShort = shorten(monthNames, 3);
var dayNamesShort = shorten(dayNames, 3);
var defaultI18n = {
  dayNamesShort: dayNamesShort,
  dayNames: dayNames,
  monthNamesShort: monthNamesShort,
  monthNames: monthNames,
  amPm: ["am", "pm"],
  DoFn: function (dayOfMonth) {
    return dayOfMonth + ["th", "st", "nd", "rd"][dayOfMonth % 10 > 3 ? 0 : (dayOfMonth - dayOfMonth % 10 !== 10 ? 1 : 0) * dayOfMonth % 10];
  }
};
var globalI18n = assign({}, defaultI18n);

var setGlobalDateI18n = function (i18n) {
  return globalI18n = assign(globalI18n, i18n);
};

var regexEscape = function (str) {
  return str.replace(/[|\\{()[^$+*?.-]/g, "\\$&");
};

var pad = function (val, len) {
  if (len === void 0) {
    len = 2;
  }

  val = String(val);

  while (val.length < len) {
    val = "0" + val;
  }

  return val;
};

var formatFlags = {
  D: function (dateObj) {
    return String(dateObj.getDate());
  },
  DD: function (dateObj) {
    return pad(dateObj.getDate());
  },
  Do: function (dateObj, i18n) {
    return i18n.DoFn(dateObj.getDate());
  },
  d: function (dateObj) {
    return String(dateObj.getDay());
  },
  dd: function (dateObj) {
    return pad(dateObj.getDay());
  },
  ddd: function (dateObj, i18n) {
    return i18n.dayNamesShort[dateObj.getDay()];
  },
  dddd: function (dateObj, i18n) {
    return i18n.dayNames[dateObj.getDay()];
  },
  M: function (dateObj) {
    return String(dateObj.getMonth() + 1);
  },
  MM: function (dateObj) {
    return pad(dateObj.getMonth() + 1);
  },
  MMM: function (dateObj, i18n) {
    return i18n.monthNamesShort[dateObj.getMonth()];
  },
  MMMM: function (dateObj, i18n) {
    return i18n.monthNames[dateObj.getMonth()];
  },
  YY: function (dateObj) {
    return pad(String(dateObj.getFullYear()), 4).substr(2);
  },
  YYYY: function (dateObj) {
    return pad(dateObj.getFullYear(), 4);
  },
  h: function (dateObj) {
    return String(dateObj.getHours() % 12 || 12);
  },
  hh: function (dateObj) {
    return pad(dateObj.getHours() % 12 || 12);
  },
  H: function (dateObj) {
    return String(dateObj.getHours());
  },
  HH: function (dateObj) {
    return pad(dateObj.getHours());
  },
  m: function (dateObj) {
    return String(dateObj.getMinutes());
  },
  mm: function (dateObj) {
    return pad(dateObj.getMinutes());
  },
  s: function (dateObj) {
    return String(dateObj.getSeconds());
  },
  ss: function (dateObj) {
    return pad(dateObj.getSeconds());
  },
  S: function (dateObj) {
    return String(Math.round(dateObj.getMilliseconds() / 100));
  },
  SS: function (dateObj) {
    return pad(Math.round(dateObj.getMilliseconds() / 10), 2);
  },
  SSS: function (dateObj) {
    return pad(dateObj.getMilliseconds(), 3);
  },
  a: function (dateObj, i18n) {
    return dateObj.getHours() < 12 ? i18n.amPm[0] : i18n.amPm[1];
  },
  A: function (dateObj, i18n) {
    return dateObj.getHours() < 12 ? i18n.amPm[0].toUpperCase() : i18n.amPm[1].toUpperCase();
  },
  ZZ: function (dateObj) {
    var offset = dateObj.getTimezoneOffset();
    return (offset > 0 ? "-" : "+") + pad(Math.floor(Math.abs(offset) / 60) * 100 + Math.abs(offset) % 60, 4);
  },
  Z: function (dateObj) {
    var offset = dateObj.getTimezoneOffset();
    return (offset > 0 ? "-" : "+") + pad(Math.floor(Math.abs(offset) / 60), 2) + ":" + pad(Math.abs(offset) % 60, 2);
  }
};

var monthParse = function (v) {
  return +v - 1;
};

var emptyDigits = [null, twoDigitsOptional];
var emptyWord = [null, word];
var amPm = ["isPm", word, function (v, i18n) {
  var val = v.toLowerCase();

  if (val === i18n.amPm[0]) {
    return 0;
  } else if (val === i18n.amPm[1]) {
    return 1;
  }

  return null;
}];
var timezoneOffset = ["timezoneOffset", "[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?", function (v) {
  var parts = (v + "").match(/([+-]|\d\d)/gi);

  if (parts) {
    var minutes = +parts[1] * 60 + parseInt(parts[2], 10);
    return parts[0] === "+" ? minutes : -minutes;
  }

  return 0;
}];
var parseFlags = {
  D: ["day", twoDigitsOptional],
  DD: ["day", twoDigits],
  Do: ["day", twoDigitsOptional + word, function (v) {
    return parseInt(v, 10);
  }],
  M: ["month", twoDigitsOptional, monthParse],
  MM: ["month", twoDigits, monthParse],
  YY: ["year", twoDigits, function (v) {
    var now = new Date();
    var cent = +("" + now.getFullYear()).substr(0, 2);
    return +("" + (+v > 68 ? cent - 1 : cent) + v);
  }],
  h: ["hour", twoDigitsOptional, undefined, "isPm"],
  hh: ["hour", twoDigits, undefined, "isPm"],
  H: ["hour", twoDigitsOptional],
  HH: ["hour", twoDigits],
  m: ["minute", twoDigitsOptional],
  mm: ["minute", twoDigits],
  s: ["second", twoDigitsOptional],
  ss: ["second", twoDigits],
  YYYY: ["year", fourDigits],
  S: ["millisecond", "\\d", function (v) {
    return +v * 100;
  }],
  SS: ["millisecond", twoDigits, function (v) {
    return +v * 10;
  }],
  SSS: ["millisecond", threeDigits],
  d: emptyDigits,
  dd: emptyDigits,
  ddd: emptyWord,
  dddd: emptyWord,
  MMM: ["month", word, monthUpdate("monthNamesShort")],
  MMMM: ["month", word, monthUpdate("monthNames")],
  a: amPm,
  A: amPm,
  ZZ: timezoneOffset,
  Z: timezoneOffset
}; // Some common format strings

var globalMasks = {
  default: "ddd MMM DD YYYY HH:mm:ss",
  shortDate: "M/D/YY",
  mediumDate: "MMM D, YYYY",
  longDate: "MMMM D, YYYY",
  fullDate: "dddd, MMMM D, YYYY",
  isoDate: "YYYY-MM-DD",
  isoDateTime: "YYYY-MM-DDTHH:mm:ssZ",
  shortTime: "HH:mm",
  mediumTime: "HH:mm:ss",
  longTime: "HH:mm:ss.SSS"
};

var setGlobalDateMasks = function (masks) {
  return assign(globalMasks, masks);
};
/***
 * Format a date
 * @method format
 * @param {Date|number} dateObj
 * @param {string} mask Format of the date, i.e. 'mm-dd-yy' or 'shortDate'
 * @returns {string} Formatted date string
 */


var format = function (dateObj, mask, i18n) {
  if (mask === void 0) {
    mask = globalMasks["default"];
  }

  if (i18n === void 0) {
    i18n = {};
  }

  if (typeof dateObj === "number") {
    dateObj = new Date(dateObj);
  }

  if (Object.prototype.toString.call(dateObj) !== "[object Date]" || isNaN(dateObj.getTime())) {
    throw new Error("Invalid Date pass to format");
  }

  mask = globalMasks[mask] || mask;
  var literals = []; // Make literals inactive by replacing them with @@@

  mask = mask.replace(literal, function ($0, $1) {
    literals.push($1);
    return "@@@";
  });
  var combinedI18nSettings = assign(assign({}, globalI18n), i18n); // Apply formatting rules

  mask = mask.replace(token, function ($0) {
    return formatFlags[$0](dateObj, combinedI18nSettings);
  }); // Inline literal values back into the formatted value

  return mask.replace(/@@@/g, function () {
    return literals.shift();
  });
};
/**
 * Parse a date string into a Javascript Date object /
 * @method parse
 * @param {string} dateStr Date string
 * @param {string} format Date parse format
 * @param {i18n} I18nSettingsOptional Full or subset of I18N settings
 * @returns {Date|null} Returns Date object. Returns null what date string is invalid or doesn't match format
 */


function parse(dateStr, format, i18n) {
  if (i18n === void 0) {
    i18n = {};
  }

  if (typeof format !== "string") {
    throw new Error("Invalid format in fecha parse");
  } // Check to see if the format is actually a mask


  format = globalMasks[format] || format; // Avoid regular expression denial of service, fail early for really long strings
  // https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS

  if (dateStr.length > 1000) {
    return null;
  } // Default to the beginning of the year.


  var today = new Date();
  var dateInfo = {
    year: today.getFullYear(),
    month: 0,
    day: 1,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
    isPm: null,
    timezoneOffset: null
  };
  var parseInfo = [];
  var literals = []; // Replace all the literals with @@@. Hopefully a string that won't exist in the format

  var newFormat = format.replace(literal, function ($0, $1) {
    literals.push(regexEscape($1));
    return "@@@";
  });
  var specifiedFields = {};
  var requiredFields = {}; // Change every token that we find into the correct regex

  newFormat = regexEscape(newFormat).replace(token, function ($0) {
    var info = parseFlags[$0];
    var field = info[0],
        regex = info[1],
        requiredField = info[3]; // Check if the person has specified the same field twice. This will lead to confusing results.

    if (specifiedFields[field]) {
      throw new Error("Invalid format. " + field + " specified twice in format");
    }

    specifiedFields[field] = true; // Check if there are any required fields. For instance, 12 hour time requires AM/PM specified

    if (requiredField) {
      requiredFields[requiredField] = true;
    }

    parseInfo.push(info);
    return "(" + regex + ")";
  }); // Check all the required fields are present

  Object.keys(requiredFields).forEach(function (field) {
    if (!specifiedFields[field]) {
      throw new Error("Invalid format. " + field + " is required in specified format");
    }
  }); // Add back all the literals after

  newFormat = newFormat.replace(/@@@/g, function () {
    return literals.shift();
  }); // Check if the date string matches the format. If it doesn't return null

  var matches = dateStr.match(new RegExp(newFormat, "i"));

  if (!matches) {
    return null;
  }

  var combinedI18nSettings = assign(assign({}, globalI18n), i18n); // For each match, call the parser function for that date part

  for (var i = 1; i < matches.length; i++) {
    var _a = parseInfo[i - 1],
        field = _a[0],
        parser = _a[2];
    var value = parser ? parser(matches[i], combinedI18nSettings) : +matches[i]; // If the parser can't make sense of the value, return null

    if (value == null) {
      return null;
    }

    dateInfo[field] = value;
  }

  if (dateInfo.isPm === 1 && dateInfo.hour != null && +dateInfo.hour !== 12) {
    dateInfo.hour = +dateInfo.hour + 12;
  } else if (dateInfo.isPm === 0 && +dateInfo.hour === 12) {
    dateInfo.hour = 0;
  }

  var dateWithoutTZ = new Date(dateInfo.year, dateInfo.month, dateInfo.day, dateInfo.hour, dateInfo.minute, dateInfo.second, dateInfo.millisecond);
  var validateFields = [["month", "getMonth"], ["day", "getDate"], ["hour", "getHours"], ["minute", "getMinutes"], ["second", "getSeconds"]];

  for (var i = 0, len = validateFields.length; i < len; i++) {
    // Check to make sure the date field is within the allowed range. Javascript dates allows values
    // outside the allowed range. If the values don't match the value was invalid
    if (specifiedFields[validateFields[i][0]] && dateInfo[validateFields[i][0]] !== dateWithoutTZ[validateFields[i][1]]()) {
      return null;
    }
  }

  if (dateInfo.timezoneOffset == null) {
    return dateWithoutTZ;
  }

  return new Date(Date.UTC(dateInfo.year, dateInfo.month, dateInfo.day, dateInfo.hour, dateInfo.minute - dateInfo.timezoneOffset, dateInfo.second, dateInfo.millisecond));
}

var fecha = {
  format: format,
  parse: parse,
  defaultI18n: defaultI18n,
  setGlobalDateI18n: setGlobalDateI18n,
  setGlobalDateMasks: setGlobalDateMasks
};

var a = function () {
  try {
    new Date().toLocaleDateString("i");
  } catch (e) {
    return "RangeError" === e.name;
  }

  return !1;
}() ? function (e, t) {
  return e.toLocaleDateString(t, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
} : function (t) {
  return fecha.format(t, "mediumDate");
},
    r = function () {
  try {
    new Date().toLocaleString("i");
  } catch (e) {
    return "RangeError" === e.name;
  }

  return !1;
}() ? function (e, t) {
  return e.toLocaleString(t, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
} : function (t) {
  return fecha.format(t, "haDateTime");
},
    n = function () {
  try {
    new Date().toLocaleTimeString("i");
  } catch (e) {
    return "RangeError" === e.name;
  }

  return !1;
}() ? function (e, t) {
  return e.toLocaleTimeString(t, {
    hour: "numeric",
    minute: "2-digit"
  });
} : function (t) {
  return fecha.format(t, "shortTime");
};

var C = function (e, t, a, r) {
  r = r || {}, a = null == a ? {} : a;
  var n = new Event(t, {
    bubbles: void 0 === r.bubbles || r.bubbles,
    cancelable: Boolean(r.cancelable),
    composed: void 0 === r.composed || r.composed
  });
  return n.detail = a, e.dispatchEvent(n), n;
};

function Y(e, t, a) {
  if (t.has("config") || a) return !0;

  if (e.config.entity) {
    var r = t.get("hass");
    return !r || r.states[e.config.entity] !== e.hass.states[e.config.entity];
  }

  return !1;
}

var status = {
	disconnected: "Disconnected",
	awaiting_start: "Paused or awaiting start",
	charging: "Charging",
	completed: "Completed or awaiting car",
	error: "Error",
	ready_to_charge: "Ready to charge"
};
var common = {
	name: "Charger Card",
	description: "Charger card allows you to control your charging robot.",
	start: "Start",
	"continue": "Resume",
	pause: "Pause",
	stop: "Stop",
	override: "Override schedule",
	reboot: "Reboot charger",
	not_available: "Charger not available",
	click_for_info: "Click for Info",
	click_for_config: "Click for Config",
	click_for_limits: "Click for Limits",
	online: "Online",
	voltage: "Voltage",
	power: "Power",
	charger_current: "Changer Current",
	energy_per_hour: "Energy per Hour",
	lifetime_energy: "Lifetime Energy",
	circuit_current: "Circuit Energy"
};
var error = {
	missing_entity: "Specifying entity is required!"
};
var editor = {
	entity: "Entity (Required)",
	chargerImage: "Charger image and color",
	customImage: "Custom image (Optional - overrides charger image)",
	theme: "Color theme",
	compact_view: "Compact View",
	compact_view_aria_label_on: "Toggle compact view on",
	compact_view_aria_label_off: "Toggle compact view off",
	show_name: "Show Name",
	show_name_aria_label_on: "Toggle display name on",
	show_name_aria_label_off: "Toggle display name off",
	show_leds: "Show Leds",
	show_leds_aria_label_on: "Toggle animated leds (overlay on image) on",
	show_leds_aria_label_off: "Toggle animated leds (overlay on image) off",
	show_status: "Show Status",
	show_status_aria_label_on: "Toggle display status on",
	show_status_aria_label_off: "Toggle display status off",
	show_stats: "Show Data Table (stats)",
	show_stats_aria_label_on: "Toggle display data table on",
	show_stats_aria_label_off: "Toggle display data table off",
	show_collapsibles: "Show collapsible menu buttons",
	show_collapsibles_aria_label_on: "Toggle display collapsible menus on",
	show_collapsibles_aria_label_off: "Toggle display collapsible menus off",
	show_toolbar: "Show Toolbar",
	show_toolbar_aria_label_on: "Toggle display toolbar on",
	show_toolbar_aria_label_off: "Toggle display toolbar off",
	code_only_note: "Note: Custom actions and data table (stats) options are available exclusively using Code Editor manually."
};
var charger_status = {
	sessionEnergy: "Session Energy"
};
var charger_substatus = {
	not_requesting_current: "Not requesting current",
	ok: "Ok",
	pending_schedule: "Pending Schedule",
	none: "None",
	max_circuit_current_too_low: "Max circuit current too low",
	max_dynamic_circuit_current_too_low: "Max dynamic circuit current too low",
	max_dynamic_offline_fallback_circuit_current_too_low: "Max dynamic offline circuit current too low",
	circuit_fuse_too_low: "Circuit fuse too low",
	waiting_in_queue: "Waiting in queue",
	waiting_in_fully: "Waiting in fully",
	illegal_grid_type: "Illegal grid type",
	no_current_request: "No current request",
	max_charger_current_too_low: "Max charger current too low",
	max_dynamic_charger_current_too_low: "Max dynamic charger current too low",
	charger_disabled: "Charger Disabled",
	pending_authorization: "Pending Authorization",
	charger_in_error_state: "Charger in error state",
	"undefined": "Undefined"
};
var en = {
	status: status,
	common: common,
	error: error,
	editor: editor,
	charger_status: charger_status,
	charger_substatus: charger_substatus
};

var en$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    status: status,
    common: common,
    error: error,
    editor: editor,
    charger_status: charger_status,
    charger_substatus: charger_substatus,
    'default': en
});

var status$1 = {
	disconnected: "Frakoblet",
	awaiting_start: "Pauset eller venter start",
	charging: "Lader",
	completed: "Fullført eller venter på bil",
	error: "Feil",
	ready_to_charge: "Klar til lading"
};
var common$1 = {
	name: "Charger Card",
	description: "Charger card gir deg mulighet for å styre din laderobot.",
	start: "Start",
	"continue": "Fortsett",
	pause: "Pause",
	stop: "Stopp",
	override: "Overstyr plan",
	reboot: "Reboot lader",
	not_available: "Lader utilgjengelig",
	click_for_info: "Klikk for info",
	click_for_config: "Klikk for konfigurasjon",
	click_for_limits: "Klikk for limiteringer",
	online: "Online",
	voltage: "Spenning",
	power: "Effekt",
	charger_current: "Ladestrøm",
	energy_per_hour: "Energi per time",
	lifetime_energy: "Energi totalt",
	circuit_current: "Kursstrøm"
};
var error$1 = {
	missing_entity: "Du må angi en entity!"
};
var editor$1 = {
	entity: "Entity (Påkrevd)",
	chargerImage: "Laderbilde og -farge",
	customImage: "Eget bilde (opsjon - overstyrer laderbilde)",
	theme: "Fargemal",
	compact_view: "Kompakt",
	compact_view_aria_label_on: "Toggle compact view on",
	compact_view_aria_label_off: "Toggle compact view off",
	show_name: "Vis navn",
	show_name_aria_label_on: "Toggle display name on",
	show_name_aria_label_off: "Toggle display name off",
	show_leds: "Vis led",
	show_leds_aria_label_on: "Toggle animated leds (overlay on image) on",
	show_leds_aria_label_off: "Toggle animated leds (overlay on image) off",
	show_status: "Vis status",
	show_status_aria_label_on: "Toggle display status on",
	show_status_aria_label_off: "Toggle display status off",
	show_stats: "Vis Data Tabell (stats)",
	show_stats_aria_label_on: "Toggle display data table on",
	show_stats_aria_label_off: "Toggle display data table off",
	show_collapsibles: "Vis sammenslåbare menyvalg",
	show_collapsibles_aria_label_on: "Toggle display collapsible menus on",
	show_collapsibles_aria_label_off: "Toggle display collapsible menus off",
	show_toolbar: "Vis verktøylinje",
	show_toolbar_aria_label_on: "Toggle display toolbar on",
	show_toolbar_aria_label_off: "Toggle display toolbar off",
	code_only_note: "Merk: Egendefinerte actions og data tabell (stats) er kun tilgjengelig ved å benytte Code Editor manuelt."
};
var charger_status$1 = {
	sessionEnergy: "Energi ladeøkt"
};
var charger_substatus$1 = {
	not_requesting_current: "Bilen ber ikke om strøm",
	ok: "Ok"
};
var nb = {
	status: status$1,
	common: common$1,
	error: error$1,
	editor: editor$1,
	charger_status: charger_status$1,
	charger_substatus: charger_substatus$1
};

var nb$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    status: status$1,
    common: common$1,
    error: error$1,
    editor: editor$1,
    charger_status: charger_status$1,
    charger_substatus: charger_substatus$1,
    'default': nb
});

var status$2 = {
	disconnected: "Frånkopplad",
	awaiting_start: "Pausad eller inväntar start",
	charging: "Laddar",
	completed: "Färdig eller inväntar bil",
	error: "Error",
	ready_to_charge: "Klar att ladda"
};
var common$2 = {
	name: "Charger Card",
	description: "Charger card ger dig möjlighet att styra din laddningsrobot.",
	start: "Starta",
	"continue": "Återuppta",
	pause: "Pausa",
	stop: "Stopp",
	override: "Åsidosätt schema",
	reboot: "Starta om laddared",
	not_available: "Laddaren inte tillgänglig",
	click_for_info: "Klicka för info",
	click_for_config: "Klicka för konfigurering",
	click_for_limits: "Klicka för begränsningar",
	online: "Uppkopplad",
	voltage: "Spänning",
	power: "Kraft",
	charger_current: "Laddningsenergi",
	energy_per_hour: "Energi per timme",
	lifetime_energy: "Livstids energi",
	circuit_current: "Kretsenergi"
};
var error$2 = {
	missing_entity: "Entiteten måsta anges!"
};
var editor$2 = {
	entity: "Entitet (Obligatorisk)",
	chargerImage: "Laddar bild och färg",
	customImage: "Egen bild (Frivilligt - åsidosätter laddarbild)",
	theme: "Färgtema",
	compact_view: "Kompakt vy",
	compact_view_aria_label_on: "Toggle compact view on",
	compact_view_aria_label_off: "Toggle compact view off",
	show_name: "Visa namn",
	show_name_aria_label_on: "Toggle display name on",
	show_name_aria_label_off: "Toggle display name off",
	show_leds: "Visa Leds",
	show_leds_aria_label_on: "Toggle animated leds (overlay on image) on",
	show_leds_aria_label_off: "Toggle animated leds (overlay on image) off",
	show_status: "Visa Status",
	show_status_aria_label_on: "Toggle display status on",
	show_status_aria_label_off: "Toggle display status off",
	show_stats: "Visa Data Tabell (stats)",
	show_stats_aria_label_on: "Toggle display data table on",
	show_stats_aria_label_off: "Toggle display data table off",
	show_collapsibles: "Show collapsible menu buttons",
	show_collapsibles_aria_label_on: "Toggle display collapsible menus on",
	show_collapsibles_aria_label_off: "Toggle display collapsible menus off",
	show_toolbar: "Visa verktygsfält",
	show_toolbar_aria_label_on: "Toggle display toolbar on",
	show_toolbar_aria_label_off: "Toggle display toolbar off",
	code_only_note: "Notera: Egendefinierade Custom actions och data tabell (stats) är bara tillgängligt när Code Editorn används manuellt."
};
var charger_status$2 = {
	sessionEnergy: "Sessionsenergi"
};
var charger_substatus$2 = {
	not_requesting_current: "Ingen bil ansluten",
	ok: "Klar"
};
var sv = {
	status: status$2,
	common: common$2,
	error: error$2,
	editor: editor$2,
	charger_status: charger_status$2,
	charger_substatus: charger_substatus$2
};

var sv$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    status: status$2,
    common: common$2,
    error: error$2,
    editor: editor$2,
    charger_status: charger_status$2,
    charger_substatus: charger_substatus$2,
    'default': sv
});

var status$3 = {
	disconnected: "Getrennt",
	awaiting_start: "Pausiert oder warte auf Start",
	charging: "Laden",
	completed: "Fertig oder warte auf Auto",
	error: "Fehler",
	ready_to_charge: "Bereit zum Laden"
};
var common$3 = {
	name: "Charger Card",
	description: "Charger card ermöglicht es dir, deinen Laderoboter zu steuern.",
	start: "Start",
	"continue": "Weiter",
	pause: "Pause",
	stop: "Stopp",
	override: "Zeitplan überschreiben",
	reboot: "Ladegerät neu starten",
	not_available: "Ladegerät nicht verfügbar",
	click_for_info: "Klicken für Infos",
	click_for_config: "Klicken für Konfiguration",
	click_for_limits: "Klicken für Limits",
	online: "Online",
	voltage: "Spannung",
	power: "Leistung",
	charger_current: "Ladestrom",
	energy_per_hour: "Energie pro Stunde",
	lifetime_energy: "Energie gesamt",
	circuit_current: "Aktueller Strom"
};
var error$3 = {
	missing_entity: "Die Angabe der Entität ist erforderlich!"
};
var editor$3 = {
	entity: "Entity (Erforderlich)",
	chargerImage: "Bild und Farbe des Ladegeräts",
	customImage: "Benutzerdefiniertes Bild (Optional - überschreibt das Bild des Ladegeräts)",
	theme: "Farbschema",
	compact_view: "Kompakte Ansicht",
	compact_view_aria_label_on: "Kompakte Ansicht einschalten",
	compact_view_aria_label_off: "Kompakte Ansicht ausschalten",
	show_name: "Name anzeigen",
	show_name_aria_label_on: "Anzeigename einschalten",
	show_name_aria_label_off: "Anzeigename ausschalten",
	show_leds: "Leds anzeigen",
	show_leds_aria_label_on: "Animierte Leds (Überlagerung des Bildes) einschalten",
	show_leds_aria_label_off: "Animierte Leds (Überlagerung des Bildes) ausschalten",
	show_status: "Status anzeigen",
	show_status_aria_label_on: "Statusanzeige einschalten",
	show_status_aria_label_off: "Statusanzeige ausschalten",
	show_stats: "Datentabelle anzeigen (Statistik)",
	show_stats_aria_label_on: "Datentabelle einschalten",
	show_stats_aria_label_off: "Datentabelle ausschalten",
	show_collapsibles: "Zusammenklappbare Menüschaltflächen anzeigen",
	show_collapsibles_aria_label_on: "Zusammenklappbare Menüschaltflächen einschalten",
	show_collapsibles_aria_label_off: "Zusammenklappbare Menüschaltflächen ausschalten",
	show_toolbar: "Symbolleiste anzeigen",
	show_toolbar_aria_label_on: "Symbolleiste einschalten",
	show_toolbar_aria_label_off: "Symbolleiste ausschalten",
	code_only_note: "Hinweis: Die Optionen für benutzerdefinierte Aktionen und Datentabellen (Statistiken) sind ausschließlich über den manuellen Code-Editor verfügbar."
};
var charger_status$3 = {
	sessionEnergy: "Energieaufladung"
};
var charger_substatus$3 = {
	not_requesting_current: "Keine Nachfrage nach Strom",
	ok: "Ok",
	pending_schedule: "Ausstehender Zeitplan",
	none: "None",
	max_circuit_current_too_low: "Maximalstrom zu niedrig",
	max_dynamic_circuit_current_too_low: "Dynamischer Maximalstrom zu niedrig",
	max_dynamic_offline_fallback_circuit_current_too_low: "Dynamischer offline Maximalstrom zu niedrig",
	circuit_fuse_too_low: "Stromkreissicherung zu niedrig",
	waiting_in_queue: "Warten in der Warteschlange",
	waiting_in_fully: "Warten in vollem Umfang",
	illegal_grid_type: "Unzulässiger Grid Typ",
	no_current_request: "Keine aktuelle Anfrage",
	max_charger_current_too_low: "Maximaler Ladestrom zu niedrig",
	max_dynamic_charger_current_too_low: "Maximaler dynamischer Ladestrom zu niedrig",
	charger_disabled: "Ladegerät Deaktiviert",
	pending_authorization: "Ausstehende Autorisierung",
	charger_in_error_state: "Ladegerät im Fehlerzustand",
	"undefined": "Undefiniert"
};
var de = {
	status: status$3,
	common: common$3,
	error: error$3,
	editor: editor$3,
	charger_status: charger_status$3,
	charger_substatus: charger_substatus$3
};

var de$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    status: status$3,
    common: common$3,
    error: error$3,
    editor: editor$3,
    charger_status: charger_status$3,
    charger_substatus: charger_substatus$3,
    'default': de
});

// Borrowed from:
var languages = {
  en: en$1,
  nb: nb$1,
  sv: sv$1,
  de: de$1
};
const DEFAULT_LANG = 'en';
function localize(string, search, replace) {
  const [section, key] = string.split('.');
  let langStored;

  try {
    langStored = JSON.parse(localStorage.getItem('selectedLanguage'));
  } catch (e) {
    langStored = localStorage.getItem('selectedLanguage');
  }

  const lang = (langStored || navigator.language.split('-')[0] || DEFAULT_LANG).replace(/['"]+/g, '').replace('-', '_');
  let translated;

  try {
    translated = languages[lang][section][key];
  } catch (e) {
    translated = languages[DEFAULT_LANG][section][key];
  }

  if (translated === undefined) {
    translated = languages[DEFAULT_LANG][section][key];
  }

  if (translated === undefined) {
    return;
  }

  if (search !== '' && replace !== '') {
    translated = translated.replace(search, replace);
  }

  return translated;
}

const img = "data:image/png;base64,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";

const img$1 = "data:image/gif;base64,R0lGODlhAwBIAHAAACwAAAAAAwBIAIGAgIAAAAAAAAAAAAACDYSPqcvtD6OctNqLVQEAOw==";

const img$2 = "data:image/gif;base64,R0lGODlhAwBIAHAAACwAAAAAAwBIAIFwcHBgYGD///8AAAACHYSDqZvmwOJ6R1oKrcR60x5x4EQJ5ommJ6a2qVMAADs=";

const img$3 = "data:image/gif;base64,R0lGODlhAwBIAHAAACwAAAAAAwBIAIFwcHD///8AAAAAAAACGYSDqZvmwOJ6R1oKrcR60x5x4PSNimgiTgEAOw==";

const img$4 = "data:image/gif;base64,R0lGODlhAwBIAIAAAAAAAP///yH/C05FVFNDQVBFMi4wAwEAAAAh/hZDcmVhdGVkIHdpdGggUGFpbnQuTkVUACH5BAkZAAAALAAAQQADAAYAAAIEjI95BQAh+QQJGQAAACwAADkAAwAOAAACB4yPecCtnwoAIfkECRkAAAAsAAAxAAMAFgAAAgqMj3nArZ+ag7QAACH5BAkZAAAALAAAKQADAB4AAAIMjI95wK2fmoNUMkoLACH5BAkZAAAALAAAIQADACYAAAIOjI95wK2fmoNUMlothgUAIfkECRkAAAAsAAAZAAMALgAAAhGMj3nArZ+ag1QyWi2GFuxXAAAh+QQJGQAAACwAABEAAwA2AAACE4yPecCtn5qDVDJaLYYW7Nd9SgEAIfkECRkAAAAsAAAJAAMAPgAAAhWMj3nArZ+ag1QyWi2GFuzXfUooIgUAIfkECRkAAAAsAAABAAMARgAAAheMj3nArZ+ag1QyWi2GFuzXfUooImRpFAA7";

const img$5 = "data:image/gif;base64,R0lGODlhAwBIAHAAACwAAAAAAwBIAIFwcHBgYGAAJv8AAAACHYSDqZvmwOJ6R1oKrcR60x5x4EQJ5ommJ6a2qVMAADs=";

const img$6 = "data:image/gif;base64,R0lGODlhAwBIAHAAACwAAAAAAwBIAIFwcHAAJv8AAAAAAAACGYSDqZvmwOJ6R1oKrcR60x5x4PSNimgiTgEAOw==";

const img$7 = "data:image/gif;base64,R0lGODlhAwBIAIAAAAAAAAAm/yH/C05FVFNDQVBFMi4wAwEAAAAh/hZDcmVhdGVkIHdpdGggUGFpbnQuTkVUACH5BAkZAAAALAAAQQADAAYAAAIEjI95BQAh+QQJGQAAACwAADkAAwAOAAACB4yPecCtnwoAIfkECRkAAAAsAAAxAAMAFgAAAgqMj3nArZ+ag7QAACH5BAkZAAAALAAAKQADAB4AAAIMjI95wK2fmoNUMkoLACH5BAkZAAAALAAAIQADACYAAAIOjI95wK2fmoNUMlothgUAIfkECRkAAAAsAAAZAAMALgAAAhGMj3nArZ+ag1QyWi2GFuxXAAAh+QQJGQAAACwAABEAAwA2AAACE4yPecCtn5qDVDJaLYYW7Nd9SgEAIfkECRkAAAAsAAAJAAMAPgAAAhWMj3nArZ+ag1QyWi2GFuzXfUooIgUAIfkECRkAAAAsAAABAAMARgAAAheMj3nArZ+ag1QyWi2GFuzXfUooImRpFAA7";

const img$8 = "data:image/gif;base64,R0lGODlhAwBIAIEAAAAAAGBgYP8AAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hZDcmVhdGVkIHdpdGggUGFpbnQuTkVUACH5BAkZAAAALAAAAAADAEgAAAINjI+py+0Po5y02otVAQAh+QQJGQAAACwAAAEAAwBGAAACF5SPecCtn5qDVDJaLYYW7Nd9SigiZGkUADs=";

const VERSION = '0.0.12';
const CHARGERDOMAIN = 'keba';
const STATUS_ENTITY_BASE = '_status';
const CHARGERSTATUS = {
  STANDBY_1: 'disconnected',
  PAUSED_2: 'awaiting_start',
  CHARGING_3: 'charging',
  READY_4: 'completed',
  ERROR_5: 'error',
  CONNECTED_6: 'ready_to_charge'
};
const LEDIMAGES = {
  normal: {
    DEFAULT: img$1,
    disconnected: img$2,
    awaiting_start: img$3,
    charging: img$4,
    completed: img$3,
    error: img$8,
    ready_to_charge: img$3
  },
  smart: {
    DEFAULT: img$1,
    disconnected: img$5,
    awaiting_start: img$6,
    charging: img$7,
    completed: img$6,
    error: img$8,
    ready_to_charge: img$6
  }
};
const ENTITIES = {
  cableLocked: 'binary_sensor.plug',
  // keba done
  cableLockedPermanently: 'switch.cable_locked_permanently',
  chargingState: 'binary_sensor.charging_state',
  // keba done
  basicSchedule: 'binary_sensor.basic_schedule',
  circuitCurrent: 'sensor.circuit_current',
  costPerKwh: 'sensor.cost_per_kwh',
  dynamicChargerCurrent: 'sensor.dynamic_charger_limit',
  dynamicCircuitCurrent: 'sensor.dynamic_circuit_limit',
  enableIdleCurrent: 'switch.enable_idle_current',
  inCurrent: 'sensor.current',
  isEnabled: 'switch.is_enabled',
  maxChargerCurrent: 'sensor.max_current',
  //keba done
  maxCircuitCurrent: 'sensor.max_circuit_limit',
  offlineCircuitCurrent: 'sensor.offline_circuit_limit',
  isOnline: 'binary_sensor.status',
  //keba done
  outputCurrent: 'sensor.output_limit',
  reasonForNoCurrent: 'sensor.reason_for_no_current',
  sessionEnergy: 'sensor.session_energy',
  //keba done
  energyPerHour: 'sensor.energy_per_hour',
  energyLifetime: 'sensor.total_energy',
  //keba done
  smartCharging: 'switch.smart_charging',
  totalPower: 'sensor.charging_power',
  //keba done
  updateAvailable: 'binary_sensor.update_available',
  voltage: 'sensor.voltage'
};
const SERVICES = {
  chargerMaxCurrent: 'set_charger_max_limit',
  chargerDynCurrent: 'set_charger_dynamic_limit',
  circuitMaxCurrent: 'set_charger_circuit_max_limit',
  circuitDynCurrent: 'set_charger_circuit_dynamic_limit',
  circuitOfflineCurrent: 'set_charger_circuit_offline_limit'
};

const DEFAULTIMAGE = 'Generic';
const CHARGER_IMAGES = [{
  name: 'Generic',
  img: img
}];
const ICONS = {
  'binary_sensor.plug': 'mdi:lock',
  'switch.cable_locked_permanently': 'mdi:lock',
  'binary_sensor.basic_schedule': 'mdi:clock-check',
  'sensor.circuit_current': 'mdi:sine-wave',
  'sensor.cost_per_kwh': 'mdi:currency-usd',
  'sensor.dynamic_charger_limit': 'mdi:sine-wave',
  'sensor.dynamic_circuit_limit': 'mdi:sine-wave',
  'switch.enable_idle_current': 'mdi:current-dc',
  'sensor.offline_circuit_limit': 'mdi:sine-wave',
  'sensor.current': 'mdi:sine-wave',
  'switch.is_enabled': 'mdi:power',
  'sensor.max_current': 'mdi:sine-wave',
  'sensor.max_circuit_limit': 'mdi:sine-wave',
  'binary_sensor.status': 'mdi:wifi',
  'sensor.output_limit': 'mdi:sine-wave',
  'sensor.reason_for_no_current': 'mdi:alert-circle',
  'sensor.session_energy': 'mdi:flash',
  'sensor.energy_per_hour': 'mdi:flash',
  'sensor.total_energy': 'mdi:flash',
  'switch.smart_charging': 'mdi:auto-fix',
  'sensor.charging_power': 'mdi:flash',
  'binary_sensor.update_available': 'mdi:file-download',
  'sensor.voltage': 'mdi:sine-wave'
};
const CURRENTLIMITS = [8.0, 10.0, 16.0, 20.0, 25.0, 32.0];
const DEFAULT_CUSTOMCARDTHEME = 'theme_default';
const CUSTOM_CARD_THEMES = [{
  name: 'theme_default',
  desc: 'Default HA colors'
}, {
  name: 'theme_custom',
  desc: 'Use custom theme'
}, {
  name: 'theme_transp_blue',
  desc: 'Transparent Blue'
}, {
  name: 'theme_transp_black',
  desc: 'Transparent Black'
}, {
  name: 'theme_transp_white',
  desc: 'Transparent White'
}, {
  name: 'theme_lightgrey_blue',
  desc: 'LightGrey Blue'
}];

class ChargerCardEditor extends LitElement {
  static get properties() {
    return {
      hass: Object,
      _config: Object,
      _toggle: Boolean
    };
  }

  setConfig(config) {
    this._config = config;

    if (!this._config.entity) {
      this._config.entity = this.getEntitiesByType('binary_sensor')[0] || '';
      C(this, 'config-changed', {
        config: this._config
      });
    }
  }

  get _entity() {
    if (this._config) {
      return this._config.entity || '';
    }

    return '';
  }

  get _customImage() {
    if (this._config) {
      return this._config.customImage || '';
    }

    return '';
  }

  get _chargerImage() {
    if (this._config) {
      return this._config.chargerImage || DEFAULTIMAGE;
    }

    return DEFAULTIMAGE;
  }

  get _customCardTheme() {
    if (this._config) {
      return this._config.customCardTheme || '';
    }

    return DEFAULT_CUSTOMCARDTHEME;
  }

  get _show_name() {
    if (this._config) {
      return this._config.show_name !== undefined ? this._config.show_name : true;
    }

    return true;
  }

  get _show_leds() {
    if (this._config) {
      return this._config.show_leds !== undefined ? this._config.show_leds : true;
    }

    return true;
  }

  get _show_status() {
    if (this._config) {
      return this._config.show_status !== undefined ? this._config.show_status : true;
    }

    return true;
  }

  get _show_toolbar() {
    if (this._config) {
      return this._config.show_toolbar !== undefined ? this._config.show_toolbar : true;
    }

    return true;
  }

  get _show_stats() {
    if (this._config) {
      return this._config.show_stats !== undefined ? this._config.show_stats : true;
    }

    return true;
  }

  get _show_collapsibles() {
    if (this._config) {
      return this._config.show_collapsibles !== undefined ? this._config.show_collapsibles : true;
    }

    return true;
  }

  get _compact_view() {
    if (this._config) {
      return this._config.compact_view !== undefined ? this._config.compact_view : false;
    }

    return false;
  }

  getEntitiesByType(type) {
    return Object.keys(this.hass.states).filter(eid => eid.substr(0, eid.indexOf('.')) === type);
  }

  render() {
    if (!this.hass) {
      return html``;
    }

    const chargerEntities = this.getEntitiesByType('binary_sensor');
    return html`
      <div class="card-config">

        <paper-dropdown-menu label="${localize('editor.entity')}" @value-changed=${this._valueChanged} .configValue=${'entity'}>
          <paper-listbox slot="dropdown-content" .selected=${chargerEntities.indexOf(this._entity)}>
            ${chargerEntities.map(entity => {
      return html` <paper-item>${entity}</paper-item> `;
    })}
          </paper-listbox>
        </paper-dropdown-menu>

        <paper-dropdown-menu label="${localize('editor.theme')}" @value-changed=${this._valueChanged} .configValue=${'customCardTheme'}>
          <paper-listbox slot="dropdown-content" selected="${this._customCardTheme}" attr-for-selected="value">
            ${CUSTOM_CARD_THEMES.map(customCardTheme => {
      return html`
                <paper-item value="${customCardTheme.name}"
                  >${customCardTheme.name}</paper-item
                >
              `;
    })}
          </paper-listbox>
        </paper-dropdown-menu>


        <paper-dropdown-menu label="${localize('editor.chargerImage')}" @value-changed=${this._valueChanged} .configValue=${'chargerImage'}>
          <paper-listbox slot="dropdown-content" selected="${this._chargerImage}" attr-for-selected="value">
            ${CHARGER_IMAGES.map(chargerImage => {
      return html`
                <paper-item value="${chargerImage.name}"
                  >${chargerImage.name}</paper-item
                >
              `;
    })}
          </paper-listbox>
        </paper-dropdown-menu>


        <paper-input label="${localize('editor.customImage')}" .value=${this._customImage} .configValue=${'customImage'} @value-changed=${this._valueChanged}"></paper-input>

        <p class="option">
          <ha-switch
            aria-label=${localize(this._compact_view ? 'editor.compact_view_aria_label_off' : 'editor.compact_view_aria_label_on')}
            .checked=${this._compact_view !== false}
            .configValue=${'compact_view'}
            @change=${this._valueChanged}
          >
          </ha-switch>
          ${localize('editor.compact_view')}
        </p>

        <p class="option">
          <ha-switch
            aria-label=${localize(this._show_name ? 'editor.show_name_aria_label_off' : 'editor.show_name_aria_label_on')}
            .checked=${this._show_name}
            .configValue=${'show_name'}
            @change=${this._valueChanged}
          >
          </ha-switch>
          ${localize('editor.show_name')} [${this._show_name}]
        </p>

        <p class="option">
          <ha-switch
            aria-label=${localize(this._show_leds ? 'editor.show_leds_aria_label_off' : 'editor.show_leds_aria_label_on')}
            .checked=${this._show_leds !== false}
            .configValue=${'show_leds'}
            @change=${this._valueChanged}
          >
          </ha-switch>
          ${localize('editor.show_leds')}
        </p>


        <p class="option">
          <ha-switch
            aria-label=${localize(this._show_status ? 'editor.show_status_aria_label_off' : 'editor.show_status_aria_label_on')}
            .checked=${this._show_status !== false}
            .configValue=${'show_status'}
            @change=${this._valueChanged}
          >
          </ha-switch>
          ${localize('editor.show_status')}
        </p>

        <p class="option">
        <ha-switch
          aria-label=${localize(this._show_collapsibles ? 'editor.show_collapsibles_aria_label_off' : 'editor.show_collapsibles_aria_label_on')}
          .checked=${this._show_collapsibles !== false}
          .configValue=${'show_collapsibles'}
          @change=${this._valueChanged}
        >
        </ha-switch>
        ${localize('editor.show_collapsibles')}
      </p>

        <p class="option">
          <ha-switch
            aria-label=${localize(this._show_stats ? 'editor.show_stats_aria_label_off' : 'editor.show_stats_aria_label_on')}
            .checked=${this._show_stats}
            .configValue=${'show_stats'}
            @change=${this._valueChanged}
          >
          </ha-switch>
          ${localize('editor.show_stats')}
        </p>




        <p class="option">
          <ha-switch
            aria-label=${localize(this._show_toolbar ? 'editor.show_toolbar_aria_label_off' : 'editor.show_toolbar_aria_label_on')}
            .checked=${this._show_toolbar !== false}
            .configValue=${'show_toolbar'}
            @change=${this._valueChanged}
          >
          </ha-switch>
          ${localize('editor.show_toolbar')}
        </p>

        <strong>
          ${localize('editor.code_only_note')}
        </strong>
      </div>
    `;
  }

  _valueChanged(ev) {
    if (!this._config || !this.hass) {
      console.log('C: no config');
      return;
    }

    const target = ev.target;

    if (this[`_${target.configValue}`] === target.value) {
      return;
    }

    if (target.configValue) {
      if (target.value === '') {
        delete this._config[target.configValue];
      } else {
        this._config = { ...this._config,
          [target.configValue]: target.checked !== undefined ? target.checked : target.value
        };
      }
    }

    C(this, 'config-changed', {
      config: this._config
    });
  }

  static get styles() {
    return css`
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
    `;
  }

}
customElements.define('keba-charger-card-editor', ChargerCardEditor);

var styles = css`
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
    background: var(
      --custom-card-background-color
    ); //var(--custom-primary-color);
    cursor: pointer;
    overflow: hidden;
    position: relative;

    // border-color: yellow;
    // border-style: solid;
  }

  .preview-compact {
    background: var(
      --custom-card-background-color
    ); //var(--custom-primary-color);
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
    --mdc-theme-primary: var(
      --custom-card-background-color
    ); /* hack to override the color */
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
`;

if (!customElements.get('ha-icon-button')) {
  customElements.define('ha-icon-button', class extends customElements.get('paper-icon-button') {});
}

class ChargerCard extends LitElement {
  static get properties() {
    return {
      hass: Object,
      config: Object,
      requestInProgress: Boolean
    };
  }

  static get styles() {
    return styles;
  }

  static async getConfigElement() {
    return document.createElement('keba-charger-card-editor');
  }

  static getStubConfig(hass, entities) {
    const [chargerEntity] = entities.filter(eid => eid.substr(0, eid.indexOf('.')) === 'sensor');
    return {
      entity: chargerEntity || '',
      image: 'default'
    };
  }

  get entity() {
    return this.hass.states[this.config.entity];
  }

  get chargerId() {
    return this.hass.states[this.config.entity].attributes['id'];
  }

  get chargerDomain() {
    // if (this.config.domain === undefined) {
    return CHARGERDOMAIN; // }
  }

  get status() {
    const pluggedIn = this.getEntityState(this.getEntity(ENTITIES.cableLocked)); // console.log(pluggedIn);

    if (pluggedIn == 'off') {
      return CHARGERSTATUS.STANDBY_1;
    }

    const chargingState = this.getEntityState(this.getEntity(ENTITIES.chargingState)); //const chargingStatus = this.getEntity(cconst.ENTITIES.chargingState).attributes['status']; // charging, authorization rejected,
    //console.log(chargingState);
    //console.log(chargingStatus);

    if (chargingState == 'on') {
      return CHARGERSTATUS.CHARGING_3;
    } else {
      return CHARGERSTATUS.PAUSED_2;
    }
    /*
    READY_4: 'completed',
    ERROR_5: 'error',
    CONNECTED_6: 'ready_to_charge',*/

  }

  get usedChargerLimit() {
    const {
      dynamicChargerCurrent,
      dynamicCircuitCurrent,
      maxChargerCurrent,
      maxCircuitCurrent
    } = this.getEntities();
    const circuitRatedCurrent = this.hass.states[this.config.entity].attributes['circuit_ratedCurrent'];
    const usedChargerLimit = Math.min(this.getEntityState(dynamicChargerCurrent), this.getEntityState(dynamicCircuitCurrent), this.getEntityState(maxChargerCurrent), this.getEntityState(maxCircuitCurrent), circuitRatedCurrent);
    return usedChargerLimit;
  }

  get image() {
    let imgselected = this.config.chargerImage || DEFAULTIMAGE;
    const chargerImage = CHARGER_IMAGES.find(({
      name
    }) => {
      if (name === imgselected) {
        return name;
      }
    });

    if (this.config.customImage === undefined || this.config.customImage === '') {
      try {
        return chargerImage.img;
      } catch (err) {
        return null;
      }
    }

    return this.config.customImage;
  }

  get customCardTheme() {
    if (this.config.customCardTheme === undefined) {
      return DEFAULT_CUSTOMCARDTHEME;
    }

    return this.config.customCardTheme;
  }

  get showLeds() {
    if (this.config.show_leds === undefined) {
      return true;
    }

    return this.config.show_leds;
  }

  get showName() {
    if (this.config.show_name === undefined) {
      return true;
    }

    return this.config.show_name;
  }

  get showStatus() {
    if (this.config.show_status === undefined) {
      return true;
    }

    return this.config.show_status;
  }

  get showStats() {
    if (this.config.show_stats === undefined) {
      return true;
    }

    return this.config.show_stats;
  }

  get showCollapsibles() {
    if (this.config.show_collapsibles === undefined) {
      return true;
    }

    return this.config.show_collapsibles;
  }

  get showToolbar() {
    if (this.config.show_toolbar === undefined) {
      return true;
    }

    return this.config.show_toolbar;
  }

  get compactView() {
    if (this.config.compact_view === undefined) {
      return false;
    }

    return this.config.compact_view;
  }

  get useStatsDefault() {
    if (this.config.stats === undefined) {
      return true;
    }

    return false;
  }

  get entityBasename() {
    return this.config.entity.split('.')[1].replace(STATUS_ENTITY_BASE, '');
  }

  getEntityId(entity_base) {
    try {
      return entity_base.split('.')[0] + '.' + this.entityBasename + '_' + entity_base.split('.')[1];
    } catch (err) {
      return null;
    }
  }

  getEntityBase(entity_id) {
    try {
      return entity_id.split('.')[0] + '.' + entity_id.split('.')[1].replace(this.entityBasename + '_', '');
    } catch (err) {
      return null;
    }
  }

  getEntities() {
    const cableLocked = this.getEntity(ENTITIES.cableLocked);
    const cableLockedPermanently = this.getEntity(ENTITIES.cableLockedPermanently);
    const chargingState = this.getEntity(ENTITIES.chargingState);
    const basicSchedule = this.getEntity(ENTITIES.basicSchedule);
    const circuitCurrent = this.getEntity(ENTITIES.circuitCurrent);
    const costPerKwh = this.getEntity(ENTITIES.costPerKwh);
    const dynamicChargerCurrent = this.getEntity(ENTITIES.dynamicChargerCurrent);
    const dynamicCircuitCurrent = this.getEntity(ENTITIES.dynamicCircuitCurrent);
    const enableIdleCurrent = this.getEntity(ENTITIES.enableIdleCurrent);
    const offlineCircuitCurrent = this.getEntity(ENTITIES.offlineCircuitCurrent);
    const inCurrent = this.getEntity(ENTITIES.inCurrent);
    const isEnabled = this.getEntity(ENTITIES.isEnabled);
    const maxChargerCurrent = this.getEntity(ENTITIES.maxChargerCurrent);
    const maxCircuitCurrent = this.getEntity(ENTITIES.maxCircuitCurrent);
    const isOnline = this.getEntity(ENTITIES.isOnline);
    const outputCurrent = this.getEntity(ENTITIES.outputCurrent);
    const reasonForNoCurrent = this.getEntity(ENTITIES.reasonForNoCurrent);
    const sessionEnergy = this.getEntity(ENTITIES.sessionEnergy);
    const energyPerHour = this.getEntity(ENTITIES.energyPerHour);
    const energyLifetime = this.getEntity(ENTITIES.energyLifetime);
    const smartCharging = this.getEntity(ENTITIES.smartCharging);
    const totalPower = this.getEntity(ENTITIES.totalPower);
    const updateAvailable = this.getEntity(ENTITIES.updateAvailable);
    const voltage = this.getEntity(ENTITIES.voltage);
    const status = this.entity;
    return {
      cableLocked,
      cableLockedPermanently,
      chargingState,
      basicSchedule,
      circuitCurrent,
      costPerKwh,
      dynamicChargerCurrent,
      dynamicCircuitCurrent,
      enableIdleCurrent,
      offlineCircuitCurrent,
      inCurrent,
      isEnabled,
      maxChargerCurrent,
      maxCircuitCurrent,
      isOnline,
      outputCurrent,
      reasonForNoCurrent,
      sessionEnergy,
      energyPerHour,
      energyLifetime,
      smartCharging,
      totalPower,
      updateAvailable,
      voltage,
      status
    };
  }

  getEntity(entity_base) {
    try {
      return this.hass.states[this.getEntityId(entity_base)];
    } catch (err) {
      return null;
    }
  }

  getEntityState(entity) {
    try {
      return entity.state;
    } catch (err) {
      return null;
    }
  }

  getEntityAttribute(entity_base, attribute) {
    try {
      return entity_base.attributes[attribute];
    } catch (err) {
      return null;
    }
  }
  /**
  getEntityAttributes(entity_base) {
    try {
      return this.hass.states[this.getEntityId(entity_base)].attributes;
    } catch (err) {
      return null;
    }
  } */


  getStatsDefault(state) {
    console.log('getStatsDefault ' + state);

    switch (state) {
      case CHARGERSTATUS.STANDBY_1:
        {
          return [{
            entity_id: this.getEntityId(ENTITIES.sessionEnergy),
            unit: 'kWh',
            subtitle: localize('charger_status.sessionEnergy')
          }, {
            calcValue: this.usedChargerLimit,
            unit: 'A',
            subtitle: 'Current Limit'
          }, {
            entity_id: this.getEntityId(ENTITIES.cableLocked),
            unit: '',
            subtitle: 'Locked'
          }];
        }

      case CHARGERSTATUS.PAUSED_2:
        {
          return [{
            calcValue: this.usedChargerLimit,
            unit: 'A',
            subtitle: 'Current Limit'
          }, {
            entity_id: this.getEntityId(ENTITIES.sessionEnergy),
            unit: 'kWh',
            subtitle: localize('charger_status.sessionEnergy')
          }, {
            entity_id: this.getEntityId(ENTITIES.smartCharging),
            unit: '',
            subtitle: 'Smart Charging'
          }];
        }

      case CHARGERSTATUS.CHARGING_3:
        {
          return [{
            entity_id: this.getEntityId(ENTITIES.sessionEnergy),
            unit: 'kWh',
            subtitle: 'Energy'
          }, {
            entity_id: this.getEntityId(ENTITIES.energyPerHour),
            unit: 'kWh/h',
            subtitle: 'Rate'
          }, {
            entity_id: this.getEntityId(ENTITIES.circuitCurrent),
            unit: 'A',
            subtitle: 'Circuit'
          }, {
            entity_id: this.getEntityId(ENTITIES.outputCurrent),
            unit: 'A',
            subtitle: 'Allowed'
          }, {
            entity_id: this.getEntityId(ENTITIES.inCurrent),
            unit: 'A',
            subtitle: 'Actual'
          }, {
            entity_id: this.getEntityId(ENTITIES.totalPower),
            unit: 'kW',
            subtitle: 'Power'
          }];
        }

      case CHARGERSTATUS.READY_4:
        {
          return [{
            entity_id: this.getEntityId(ENTITIES.sessionEnergy),
            unit: 'kWh',
            subtitle: localize('charger_status.sessionEnergy')
          }, {
            calcValue: this.usedChargerLimit,
            unit: 'A',
            subtitle: 'Current Limit'
          }];
        }

      case CHARGERSTATUS.ERROR_5:
        {
          return [{
            entity_id: this.getEntityId(ENTITIES.sessionEnergy),
            unit: 'kWh',
            subtitle: localize('charger_status.sessionEnergy')
          }, {
            calcValue: this.usedChargerLimit,
            unit: 'A',
            subtitle: 'Current Limit'
          }];
        }

      case CHARGERSTATUS.CONNECTED_6:
        {
          return [{
            entity_id: this.getEntityId(ENTITIES.sessionEnergy),
            unit: 'kWh',
            subtitle: localize('charger_status.sessionEnergy')
          }, {
            calcValue: this.usedChargerLimit,
            unit: 'A',
            subtitle: 'Current Limit'
          }, {
            entity_id: this.getEntityId(ENTITIES.basicSchedule),
            unit: '',
            subtitle: 'Schedule'
          }];
        }
    }
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error(localize('error.missing_entity'));
    }

    this.config = config;
  }

  getCardSize() {
    return 2;
  }

  shouldUpdate(changedProps) {
    return Y(this, changedProps, true); //TODO: Probably not efficient to force update here?
  }

  updated(changedProps) {
    if (changedProps.get('hass') && changedProps.get('hass').states[this.config.entity].state !== this.hass.states[this.config.entity].state) {
      this.requestInProgress = false;
    }
  }

  handleMore(entity = this.entity) {
    C(this, 'hass-more-info', {
      entityId: entity.entity_id
    }, {
      bubbles: true,
      composed: true
    });
  }

  setServiceData(service, isRequest, e) {
    switch (service) {
      case SERVICES.chargerMaxCurrent:
        {
          const current = e.target.getAttribute('value');
          return this.callService(service, isRequest, {
            current
          });
        }

      case SERVICES.chargerDynCurrent:
        {
          const current = e.target.getAttribute('value');
          return this.callService(service, isRequest, {
            current
          });
        }

      case SERVICES.circuitOfflineCurrent:
        {
          const currentP1 = e.target.getAttribute('value');
          return this.callService(service, isRequest, {
            currentP1
          });
        }

      case SERVICES.circuitMaxCurrent:
        {
          const currentP1 = e.target.getAttribute('value');
          return this.callService(service, isRequest, {
            currentP1
          });
        }

      case SERVICES.circuitDynCurrent:
        {
          const currentP1 = e.target.getAttribute('value');
          return this.callService(service, isRequest, {
            currentP1
          });
        }
    }
  }

  callService(service, isRequest = true, options = {}) {
    this.hass.callService(this.chargerDomain, service, {
      charger_id: this.chargerId,
      ...options
    });

    if (isRequest) {
      // this.requestInProgress = true; //TODO: Removed, must be improved to check all sensors
      this.requestUpdate();
    }
  }

  getAttributes(entity) {
    const {
      status,
      state,
      friendly_name,
      name,
      site_name,
      icon
    } = entity.attributes;
    return {
      status: status || state,
      friendly_name,
      name,
      site_name,
      icon
    };
  }

  imageLed(state, smartCharging) {
    let chargingMode = 'normal';

    if (smartCharging == 'on') {
      chargingMode = 'smart';
    }

    return LEDIMAGES[chargingMode][state] || LEDIMAGES[chargingMode]['DEFAULT'];
  }

  renderImage(state) {
    let compactview = '';

    if (this.compactView) {
      compactview = '-compact';
    }

    if (!this.image) {
      return html``;
    }

    return html` <img
        class="charger${compactview}"
        src="${this.image}"
        @click="${() => this.handleMore()}"
        ?more-info="true"
      />${this.renderLeds(state)}`;
  }

  renderLeds(state) {
    if (this.showLeds) {
      let compactview = '';

      if (this.compactView) {
        compactview = '-compact';
      }

      const smartCharging = this.getEntityState(this.getEntity(ENTITIES.smartCharging));
      return html`<img
        class="charger led${compactview}"
        src="${this.imageLed(state, smartCharging)}"
        @click="${() => this.handleMore()}"
        ?more-info="true"
      /> `;
    }

    return html``;
  }

  renderStats(state) {
    /* SHOW DATATABLE */
    if (!this.showStats) {
      return html``;
    }

    let compactview = '';

    if (this.compactView) {
      compactview = '-compact';
    }
    /* DEFAULT DATATABLE */


    if (this.useStatsDefault) {
      const statsList = this.getStatsDefault(state) || [];
      return html`<div class="stats${compactview}">
        ${this.renderStatsList(state, statsList)}
      </div>`;
      /* CUSTOM DATATABLE */
    } else {
      const {
        stats = {}
      } = this.config;
      const statsList = stats[state] || stats.default || [];
      return html`<div class="stats${compactview}">
        ${this.renderStatsList(state, statsList)}
      </div>`;
    }
  }

  renderStatsList(state, statsList) {
    return statsList.map(({
      entity_id,
      attribute,
      calcValue,
      unit,
      subtitle
    }) => {
      if (!entity_id && !attribute && !calcValue) {
        return html``;
      } else if (calcValue) {
        return this.renderStatsHtml(calcValue, unit, subtitle);
      }

      this.getEntity();

      try {
        const value = attribute ? this.hass.states[entity_id].attributes[attribute] : this.hass.states[entity_id].state;
        return this.renderStatsHtml(value, unit, subtitle, this.hass.states[entity_id]);
      } catch (err) {
        return null;
      }
    });
  }

  renderStatsHtml(value, unit, subtitle, entity = this.entity) {
    return html`
      <div
        class="stats-block"
        @click="${() => this.handleMore(entity)}"
        ?more-info="true"
      >
        <span class="stats-value">${value}</span>
        ${unit}
        <div class="stats-subtitle">${subtitle}</div>
      </div>
    `;
  }

  renderName() {
    //    const { name, site_name } = this.getAttributes(this.entity);
    if (!this.showName) {
      return html``;
    }

    let compactview = '';

    if (this.compactView) {
      compactview = '-compact';
    }

    return html`
      <div
        class="charger-name${compactview}"
        @click="${() => this.handleMore()}"
        ?more-info="true"
      >
        Keba P30
      </div>
    `;
  }

  renderStatus() {
    if (!this.showStatus) {
      return html``;
    }

    let compactview = '';

    if (this.compactView) {
      compactview = '-compact';
    }

    const localizedStatus = localize(`status.${this.status}`) || this.status;
    return html`
      <div
        class="status${compactview}"
        @click="${() => this.handleMore()}"
        ?more-info="true"
      >
        <span class="status-text${compactview}" alt=${localizedStatus}>
          ${localizedStatus}
        </span>
        <ha-circular-progress
          .active=${this.requestInProgress}
          size="small"
        ></ha-circular-progress>
      </div>
    `;
  }

  renderCollapsibleConfig() {
    /* SHOW COLLAPSIBLES */
    if (!this.showCollapsibles) {
      return html``;
    }

    const {
      cableLocked,
      cableLockedPermanently,
      enableIdleCurrent,
      isEnabled,
      smartCharging //    updateAvailable,

    } = this.getEntities(); //    let updateAvailableState = this.getEntityState(updateAvailable) || 'off';

    let localizedClickForConfig = localize('common.click_for_config');
    return html`
      <div class="wrap-collabsible">
        <input id="collapsible" class="toggle" type="checkbox" />
        <label for="collapsible" class="lbl-toggle">
          <div class="tooltip-right">
            <ha-icon icon="mdi:cog"></ha-icon>
            <span class="tooltiptext-right">${localizedClickForConfig}</span>
          </div>
        </label>
        <div class="collapsible-content">
          <div class="content-inner">
            ${this.renderCollapsibleItems(isEnabled, 'Enabled')}
            ${this.renderCollapsibleItems(enableIdleCurrent, 'Idle Current')}
            ${this.renderCollapsibleItems(cableLockedPermanently, 'Permanently Locked')}
            ${this.renderCollapsibleItems(cableLocked, 'Locked')}
            ${this.renderCollapsibleItems(smartCharging, 'Smart Charging')}
          </div>
        </div>
      </div>
    `;
  }

  renderCollapsibleInfo() {
    /* SHOW COLLAPSIBLES */
    if (!this.showCollapsibles) {
      return html``;
    }

    const {
      isOnline,
      voltage,
      totalPower,
      circuitCurrent,
      inCurrent,
      sessionEnergy,
      energyPerHour,
      energyLifetime
    } = this.getEntities();
    let localizedClickForStatus = localize('common.click_for_info');
    return html`
      <div class="wrap-collabsible-info">
        <input id="collapsible-info" class="toggle-info" type="checkbox" />
        <label for="collapsible-info" class="lbl-toggle-info">
          <div class="tooltip-right">
            <ha-icon icon="mdi:information"></ha-icon>
            <span class="tooltiptext-right">${localizedClickForStatus}</span>
          </div>
        </label>
        <div class="collapsible-content-info">
          <div class="content-inner-info">
            ${this.renderCollapsibleItems(isOnline, localize('common.online'))}
            ${this.renderCollapsibleItems(voltage, localize('common.voltage'), true)}
            ${this.renderCollapsibleItems(totalPower, localize('common.power'))}
            ${this.renderCollapsibleItems(inCurrent, localize('common.charger_current'), true)}
            ${this.renderCollapsibleItems(circuitCurrent, localize('common.circuit_current'), true)}
            ${this.renderCollapsibleItems(energyPerHour, localize('common.energy_per_hour'))}
            ${this.renderCollapsibleItems(sessionEnergy, localize('charger_status.sessionEnergy'))}
            ${this.renderCollapsibleItems(energyLifetime, localize('common.lifetime_energy'), true)}
          </div>
        </div>
      </div>
    `;
  }

  renderCollapsibleLimits() {
    /* SHOW COLLAPSIBLES */
    if (!this.showCollapsibles) {
      return html``;
    }

    const {
      maxChargerCurrent,
      maxCircuitCurrent,
      dynamicChargerCurrent,
      dynamicCircuitCurrent,
      offlineCircuitCurrent
    } = this.getEntities();
    let localizedClickForLimits = localize('common.click_for_limits');
    return html`
      <div class="wrap-collabsible-lim">
        <input id="collapsible-lim" class="toggle-lim" type="checkbox" />
        <label for="collapsible-lim" class="lbl-toggle-lim">
          <div class="tooltip-right">
            <ha-icon icon="mdi:speedometer"></ha-icon>
            <span class="tooltiptext-right">${localizedClickForLimits}</span>
          </div>
        </label>
        <div class="collapsible-content-lim">
          <div class="content-inner-lim">
            ${this.renderCollapsibleDropDownItems(maxChargerCurrent, SERVICES.chargerMaxCurrent, 'Max Charger', undefined, 'Max Charger Limit', true)}
            ${this.renderCollapsibleDropDownItems(dynamicChargerCurrent, SERVICES.chargerDynCurrent, 'Dyn Charger', undefined, 'Dyn Charger Limit', true)}
            ${this.renderCollapsibleDropDownItems(maxCircuitCurrent, SERVICES.circuitMaxCurrent, 'Max Circuit', undefined, 'Max Circuit Limit', true)}
            ${this.renderCollapsibleDropDownItems(dynamicCircuitCurrent, SERVICES.circuitDynCurrent, 'Dyn Circuit', undefined, 'Dyn Circuit Limit', true)}
            ${this.renderCollapsibleDropDownItems(offlineCircuitCurrent, SERVICES.circuitOfflineCurrent, 'Off Lim', undefined, 'Offline Limit', true)}
          </div>
        </div>
      </div>
    `;
  }

  renderCollapsibleItems(entity, tooltip, round = false) {
    if (entity === null || entity === undefined) {
      return html`x`;
    }

    let value = this.getEntityState(entity);
    let icon = this.renderIcon(entity);
    let useUnit = this.getEntityAttribute(entity, 'unit_of_measurement');

    if (round) {
      value = Math.round(value);
    }

    return html`
      <div
        class="collapsible-item"
        @click="${() => this.handleMore(entity)}"
        ?more-info="true"
      >
        <div class="tooltip">
          <ha-icon icon="${icon}"></ha-icon>
          <br />${value} ${useUnit}
          <span class="tooltiptext">${tooltip}</span>
        </div>
      </div>
    `;
  }

  renderCollapsibleServiceItems(entity, service, text, icon, tooltip, isRequest = true, options = {}) {
    let useIcon = icon;

    if (icon === null || icon === undefined) {
      useIcon = this.renderIcon(entity);
    }

    return html`
      <div
        class="collapsible-item"
        @click="${() => this.callService(service, isRequest, options)}"
      >
        <div class="tooltip">
          <ha-icon icon="${useIcon}"></ha-icon>
          <br />${text}
          <span class="tooltiptext">${tooltip}</span>
        </div>
      </div>
    `;
  }

  renderCollapsibleDropDownItems(entity, service, text, icon, tooltip, isRequest = true) {
    if (entity === null || entity === undefined) {
      return html``;
    }

    const sources = CURRENTLIMITS;
    let value = this.getEntityState(entity);
    let selected = sources.indexOf(value);
    let useUnit = this.getEntityAttribute(entity, 'unit_of_measurement');
    let useIcon = icon === undefined ? this.renderIcon(entity) : icon;
    return html`
      <paper-menu-button
        slot="dropdown-trigger"
        .noAnimations=${true}
        @click="${e => e.stopPropagation()}"
      >
        <paper-button slot="dropdown-trigger">
          <div class="tooltip">
            <ha-icon icon="${useIcon}"></ha-icon>
            <br />${value}${useUnit}
            <span class="tooltiptext">${tooltip}</span>
          </div>
        </paper-button>
        <paper-listbox
          slot="dropdown-content"
          selected=${selected}
          @click="${e => this.setServiceData(service, isRequest, e)}"
        >
          ${sources.map(item => html`<paper-item value=${item}>${item}</paper-item>`)}
        </paper-listbox>
      </paper-menu-button>
    `;
  }

  renderInfoItemsLeft() {
    const {
      isOnline
    } = this.getEntities();
    return html` ${this.renderInfoItem(isOnline, localize('common.online'))} `;
  }

  renderInfoItemsRight() {
    const {
      totalPower,
      voltage
    } = this.getEntities();
    return html`
      ${this.renderInfoItem(voltage, localize('common.voltage'), true)}
      ${this.renderInfoItem(totalPower, localize('common.power'))}
    `;
  }

  renderInfoItemsCompact() {
    const {
      totalPower,
      voltage
    } = this.getEntities();
    return html`
      ${this.renderInfoItem(voltage, localize('common.voltage'), true)}
      ${this.renderInfoItem(totalPower, localize('common.power'), true)}
    `;
  }

  renderInfoItem(entity, tooltip, round = false) {
    if (entity === null || entity === undefined) {
      return html``;
    }

    let value = this.getEntityState(entity);
    let useUnit = this.getEntityAttribute(entity, 'unit_of_measurement');
    let icon = this.renderIcon(entity);

    if (round) {
      value = Math.round(value);
    }

    return html`
      <div
        class="infoitems-item"
        @click="${() => this.handleMore(entity)}"
        ?more-info="true"
      >
        <div class="tooltip">
          <ha-icon icon="${icon}"></ha-icon>
          ${value} ${useUnit}
          <span class="tooltiptext">${tooltip}</span>
        </div>
      </div>
    `;
  }

  renderIcon(entity) {
    let entity_id = entity.entity_id;
    let icon = this.getEntityAttribute(entity, 'icon') == !null ? this.getEntityAttribute(entity, 'icon') : ICONS[this.getEntityBase(entity_id)] || 'mdi:cancel';
    let domainIcon = this.getEntityAttribute(entity, 'device_class') == !null ? domainIcon(this.getEntityAttribute(entity, 'device_class'), this.getEntityState(entity)) : false;
    return domainIcon || icon;
  }

  renderToolbar(state) {
    /* SHOW TOOLBAR */
    if (!this.showToolbar) {
      return html``;
    }
    /* CUSTOM BUTTONS FROM CONFIG */


    const {
      actions = []
    } = this.config;
    const customButtons = actions.map(({
      name,
      service,
      icon,
      service_data
    }) => {
      return this.renderToolbarButton(service, icon, name, service_data);
    });
    let stateButtons = html``;
    /* STATE BUTTONS */

    switch (state) {
      case CHARGERSTATUS.STANDBY_1:
        {
          stateButtons = html``;
          break;
        }

      case CHARGERSTATUS.PAUSED_2:
        {
          stateButtons = html`
          ${this.renderToolbarButton('disable', 'hass:stop', 'common.stop')}
          ${this.renderToolbarButton('enable', 'hass:play-pause', 'common.continue')}
        `;
          break;
        }

      case CHARGERSTATUS.CHARGING_3:
        {
          stateButtons = html`
          ${this.renderToolbarButton('disable', 'hass:stop', 'common.stop')}
        `;
          break;
        }

      case CHARGERSTATUS.READY_4:
        {
          stateButtons = html`
          ${this.renderToolbarButton('disable', 'hass:stop', 'common.stop')}
        `;
          break;
        }

      case CHARGERSTATUS.ERROR_5:
        {
          stateButtons = html``;
          break;
        }

      case CHARGERSTATUS.CONNECTED_6:
        {
          stateButtons = html`
          ${this.renderToolbarButton('disable', 'hass:stop', 'common.stop')}
        `;
          break;
        }
    }

    return html`
      <div class="toolbar">
        ${stateButtons}
        <div class="fill-gap"></div>
        ${customButtons}
      </div>
    `;
  }

  renderToolbarButton(service, icon, text, service_data = {}, isRequest = true) {
    let useText = '';

    try {
      useText = localize(text);
    } catch (e) {
      useText = text;
    }

    return html`
      <div class="tooltip">
        <ha-icon-button
          icon="${icon}"
          title="${useText}"
          @click="${() => this.callService(service, isRequest, service_data)}"
        ></ha-icon-button>
        <span class="tooltiptext">${useText}</span>
      </div>
    `;
  }

  renderCompact() {
    const state = this.status; //  this.entity;

    return html`
      <ha-card>
        <div class="preview-compact">
          ${this.renderImage(state)}

          <div class="metadata">
            ${this.renderName()} ${this.renderStatus()}
          </div>

          <div class="infoitems">${this.renderInfoItemsCompact()}</div>

          ${this.renderStats(state)}
        </div>

        ${this.renderToolbar(state)}
      </ha-card>
    `;
  }

  renderFull() {
    const state = this.status; //this.entity;

    return html`
      <ha-card>
        <div class="preview">
          <div class="header">
            <div class="infoitems-left">${this.renderInfoItemsLeft()}</div>

            <div class="infoitems">${this.renderInfoItemsRight()}</div>
          </div>

          ${this.renderImage(state)}

          <div class="metadata">
            ${this.renderName()} ${this.renderStatus()}
          </div>

          ${this.renderCollapsibleConfig()} ${this.renderCollapsibleInfo()}
          ${this.renderCollapsibleLimits()} ${this.renderStats(state)}
        </div>

        ${this.renderToolbar(state)}
      </ha-card>
    `;
  }

  renderCustomCardTheme() {
    switch (this.customCardTheme) {
      case 'theme_custom':
        {
          break;
        }

      case 'theme_default':
        {
          this.style.setProperty('--custom-card-background-color', '#03A9F4');
          this.style.setProperty('--custom-text-color', '#FFFFFF');
          this.style.setProperty('--custom-primary-color', '#03A9F4');
          this.style.setProperty('--custom-icon-color', '#FFFFFF');
          break;
        }

      case 'theme_transp_blue':
        {
          this.style.setProperty('--custom-card-background-color', 'transparent');
          this.style.setProperty('--custom-text-color', '#03A9F4');
          this.style.setProperty('--custom-primary-color', '#03A9F4');
          this.style.setProperty('--custom-icon-color', '#03A9F4');
          break;
        }

      case 'theme_transp_black':
        {
          this.style.setProperty('--custom-card-background-color', 'transparent');
          this.style.setProperty('--custom-text-color', 'black');
          this.style.setProperty('--custom-primary-color', 'black');
          this.style.setProperty('--custom-icon-color', 'black');
          break;
        }

      case 'theme_transp_white':
        {
          this.style.setProperty('--custom-card-background-color', 'transparent');
          this.style.setProperty('--custom-text-color', 'white');
          this.style.setProperty('--custom-primary-color', 'white');
          this.style.setProperty('--custom-icon-color', 'white');
          break;
        }

      case 'theme_lightgrey_blue':
        {
          this.style.setProperty('--custom-card-background-color', 'lightgrey');
          this.style.setProperty('--custom-text-color', '#03A9F4');
          this.style.setProperty('--custom-primary-color', '#03A9F4');
          this.style.setProperty('--custom-icon-color', '#03A9F4');
          break;
        }

      default:
        {
          this.style.setProperty('--custom-card-background-color', '#03A9F4');
          this.style.setProperty('--custom-text-color', '#FFFFFF');
          this.style.setProperty('--custom-primary-color', '#03A9F4');
          this.style.setProperty('--custom-icon-color', '#FFFFFF');
          break;
        }
    }
  }

  render() {
    this.renderCustomCardTheme();

    if (!this.entity) {
      return html`
        <ha-card>
          <div class="preview not-available">
            <div class="metadata">
              <div class="not-available">
                ${localize('common.not_available')}
              </div>
            <div>
          </div>
        </ha-card>
      `;
    }

    if (this.compactView) {
      return this.renderCompact();
    } else {
      return this.renderFull();
    }
  }

}

customElements.define('keba-charger-card', ChargerCard);
console.info(`%cKEBA-CHARGER-CARD ${VERSION} IS INSTALLED`, 'color: green; font-weight: bold', '');
window.customCards = window.customCards || [];
window.customCards.push({
  preview: true,
  type: 'keba-charger-card',
  name: localize('common.name'),
  description: localize('common.description')
});
