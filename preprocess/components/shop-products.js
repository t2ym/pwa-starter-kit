/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import { LitElement } from '@polymer/lit-element';
import {
  html,
  i18n,
  bind
} from 'i18n-element/i18n.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../store.js';
import './shop-item.js';
import {
  getAllProducts,
  addToCart
} from '../actions/shop.js';
import { addToCartIcon } from './my-icons.js';
import { ButtonSharedStyles } from './button-shared-styles.js';
class ShopProducts extends connect(store)(i18n(LitElement)) {
  static get importMeta() {
    return import.meta;
  }
  render() {
    return html([
      '<!-- localizable -->',
      '\n      ',
      '\n      <style>\n        :host { display: block; }\n      </style>\n      ',
      '\n      <template>\n        <span id="sold_out">',
      '</span>\n        <span id="add_to_cart">',
      '</span>\n      </template>\n    '
    ], ...bind(this, 'shop-products', (_bind, text, model, effectiveLang) => [
      _bind,
      ButtonSharedStyles,
      Object.keys(this._products).map(key => {
        const item = this._products[key];
        return html`
          <div>
            <shop-item name="${ item.title }" amount="${ item.inventory }" price="${ item.price }"></shop-item>
            <button
                .disabled="${ item.inventory === 0 }"
                @click="${ this._addButtonClicked }"
                data-index="${ item.id }"
                title="${ item.inventory === 0 ? this.text.sold_out : this.text.add_to_cart }">
              ${ item.inventory === 0 ? this.text.sold_out : addToCartIcon }
            </button>
          </div>
        `;
      }),
      text['sold_out'],
      text['add_to_cart']
    ], {
      'meta': {},
      'model': {},
      'sold_out': 'Sold out',
      'add_to_cart': 'Add to cart'
    }));
  }
  static get properties() {
    return { _products: { type: Object } };
  }
  constructor() {
    super();
    this.addEventListener('lang-updated', this._langUpdated);
  }
  _langUpdated(event) {
    this.langUpdated = this.lang;
    this.firstUpdated();
  }
  firstUpdated() {
    store.dispatch(getAllProducts());
  }
  _addButtonClicked(e) {
    store.dispatch(addToCart(e.currentTarget.dataset['index']));
  }
  stateChanged(state) {
    this._products = state.shop.products;
  }
}
window.customElements.define('shop-products', ShopProducts);
