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
import { html, i18n, bind } from 'i18n-element/i18n.js';

// This element is *not* connected to the Redux store.
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
    return html`${bind(this, 'shop-item')}
      ${this.name}:
      <span ?hidden="${this.amount === 0}">${this.amount} * </span>
      $${this.price}
      </span>
    `;
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
