/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, css } from 'lit-element';
import { html, i18n, bind } from 'i18n-element/i18n.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the elements needed by this element.
import './shop-item.js';

// These are the actions needed by this element.
import { getAllProducts, addToCart } from '../actions/shop.js';

// These are the elements needed by this element.
import { addToCartIcon } from './my-icons.js';

// These are the shared styles needed by this element.
import { ButtonSharedStyles } from './button-shared-styles.js';

class ShopProducts extends connect(store)(i18n(LitElement)) {
  static get importMeta() {
    return import.meta;
  }

  static get properties() {
    return {
      _products: { type: Object }
    };
  }

  static get styles() {
    return [
      ButtonSharedStyles,
      css`
        :host {
          display: block;
        }
      `
    ];
  }

  render() {
    return html`${bind(this, 'shop-products')}
      ${Object.keys(this._products).map((key) => {
        const item = this._products[key];
        return html`
          <div>
            <shop-item name="${item.title}" amount="${item.inventory}" price="${item.price}"></shop-item>
            <button
                .disabled="${item.inventory === 0}"
                @click="${this._addButtonClicked}"
                data-index="${item.id}"
                title="${item.inventory === 0 ? this.text.sold_out : this.text.add_to_cart }">
              ${item.inventory === 0 ? this.text.sold_out : addToCartIcon }
            </button>
          </div>
        `;
      })}
      <template>
        <span id="sold_out">Sold out</span>
        <span id="add_to_cart">Add to cart</span>
      </template>
    `;
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

  // This is called every time something is updated in the store.
  stateChanged(state) {
    this._products = state.shop.products;
  }
}

window.customElements.define('shop-products', ShopProducts);
