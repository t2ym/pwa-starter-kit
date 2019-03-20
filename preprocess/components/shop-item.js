/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import { LitElement } from 'lit-element';
import {
  html,
  i18n,
  bind
} from 'i18n-element/i18n-core.js';
class ShopItem extends i18n(LitElement) {
  static get importMeta() {
    return import.meta;
  }
  static get properties() {
    return {
      langUpdated: { type: String },
      name: { type: String },
      amount: { type: String },
      price: { type: String }
    };
  }
  render() {
    return html([
      '<!-- localizable -->',
      '<i18n-format lang="',
      '"><span>',
      '</span><span slot="1">',
      '</span></i18n-format><span ?hidden="',
      '"><i18n-format lang="',
      '"><span>',
      '</span><span slot="1">',
      '</span></i18n-format></span><i18n-format lang="',
      '"><span>',
      '</span><span slot="1">',
      '</span></i18n-format>'
    ], ...bind(this, 'shop-item', (_bind, text, model, effectiveLang) => [
      _bind,
      effectiveLang,
      text['text']['0'],
      this.name,
      this.amount === 0,
      effectiveLang,
      text['span_1']['0'],
      this.amount,
      effectiveLang,
      text['text_2']['0'],
      this.price
    ], {
      'meta': {},
      'model': {},
      'text': [
        ' {1}: ',
        '{{parts.0}}'
      ],
      'span_1': [
        '{1} * ',
        '{{parts.2}}'
      ],
      'text_2': [
        ' ${1} ',
        '{{parts.3}}'
      ]
    }));
  }
  constructor() {
    super();
    this.addEventListener('lang-updated', this._langUpdated);
  }
  _langUpdated(event) {
    this.langUpdated = this.lang;
  }
}
window.customElements.define('shop-item', ShopItem);
