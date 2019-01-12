/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import {
  LitElement,
  css
} from 'lit-element';
import {
  html,
  i18n,
  bind
} from 'i18n-element/i18n.js';
import {
  plusIcon,
  minusIcon
} from './my-icons.js';
import { ButtonSharedStyles } from './button-shared-styles.js';
class CounterElement extends i18n(LitElement) {
  static get importMeta() {
    return import.meta;
  }
  static get properties() {
    return {
      langUpdated: { type: String },
      clicks: { type: Number },
      value: { type: Number }
    };
  }
  static get styles() {
    return [
      ButtonSharedStyles,
      css`
        span {
          width: 20px;
          display: inline-block;
          text-align: center;
          font-weight: bold;
        }
      `
    ];
  }
  render() {
    return html([
      '<!-- localizable -->',
      '\n      <div>\n        <p><i18n-format lang="',
      '"><span>',
      '</span><span slot="1">',
      '</span><span slot="2">',
      '</span><button @click="',
      '" title="',
      '" slot="3">',
      '</button><button @click="',
      '" title="',
      '" slot="4">',
      '</button></i18n-format></p>\n      </div>\n    '
    ], ...bind(this, 'counter-element', (_bind, text, model, effectiveLang) => [
      _bind,
      effectiveLang,
      text['div:p']['0'],
      this.clicks,
      this.value,
      this._onIncrement,
      model['div:p:3']['title'],
      plusIcon,
      this._onDecrement,
      model['div:p:4']['title'],
      minusIcon
    ], {
      'meta': {},
      'model': {
        'div:p:3': { 'title': 'Add 1' },
        'div:p:4': { 'title': 'Minus 1' }
      },
      'div:p': [
        ' Clicked: {1} times.\n          Value is {2}.\n          {3}\n          {4} ',
        '{{parts.0}}',
        '{{parts.1}}',
        '{{parts.3}}',
        '{{parts.5}}'
      ]
    }));
  }
  constructor() {
    super();
    this.clicks = 0;
    this.value = 0;
    this.addEventListener('lang-updated', this._langUpdated);
  }
  _langUpdated(event) {
    this.langUpdated = this.lang;
  }
  _onIncrement() {
    this.value++;
    this.clicks++;
    this.dispatchEvent(new CustomEvent('counter-incremented'));
  }
  _onDecrement() {
    this.value--;
    this.clicks++;
    this.dispatchEvent(new CustomEvent('counter-decremented'));
  }
}
window.customElements.define('counter-element', CounterElement);
