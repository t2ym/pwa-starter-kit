/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import { css } from 'lit-element';
import {
  html,
  bind
} from 'i18n-element/i18n.js';
import { PageViewElement } from './page-view-element.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../store.js';
import {
  checkout,
  binding as getAllProductsBinding
} from '../actions/shop.js';
import shop, { cartQuantitySelector } from '../reducers/shop.js';
store.addReducers({ shop });
import './shop-products.js';
import './shop-cart.js';
import { SharedStyles } from './shared-styles.js';
import { ButtonSharedStyles } from './button-shared-styles.js';
import { addToCartIcon } from './my-icons.js';
class MyView3 extends connect(store)(PageViewElement) {
  static get importMeta() {
    return import.meta;
  }
  static get properties() {
    return {
      _quantity: { type: Number },
      _error: { type: String }
    };
  }
  static get styles() {
    return [
      SharedStyles,
      ButtonSharedStyles,
      css`
        button {
          border: 2px solid var(--app-dark-text-color);
          border-radius: 3px;
          padding: 8px 16px;
        }

        button:hover {
          border-color: var(--app-primary-color);
          color: var(--app-primary-color);
        }

        .cart,
        .cart svg {
          fill: var(--app-primary-color);
          width: 64px;
          height: 64px;
        }

        .circle.small {
          margin-top: -72px;
          width: 28px;
          height: 28px;
          font-size: 16px;
          font-weight: bold;
          line-height: 30px;
        }
      `
    ];
  }
  render() {
    return html([
      '<!-- localizable -->',
      '\n      <section>\n        <h2>',
      '</h2>\n        <div class="cart"><i18n-format lang="',
      '"><span>',
      '</span><span slot="1">',
      '</span><div class="circle small" slot="2">',
      '</div></i18n-format></div>\n        <p>',
      '</p>\n        <p><i18n-format lang="',
      '"><span>',
      '</span><code slot="1">',
      '</code><code slot="2">',
      '</code></i18n-format></p>\n      </section>\n      <section>\n        <h3>',
      '</h3>\n        <shop-products></shop-products>\n\n        <br>\n        <h3>',
      '</h3>\n        <shop-cart></shop-cart>\n\n        <div>',
      '</div>\n        <br>\n        <p>\n          <button ?hidden="',
      '" @click="',
      '">',
      '</button>\n        </p>\n      </section>\n    '
    ], ...bind(this, 'my-view3', (_bind, text, model, effectiveLang) => [
      _bind,
      text['section:h2'],
      effectiveLang,
      text['section:div_1']['0'],
      addToCartIcon,
      this._quantity,
      text['section:p_2'],
      effectiveLang,
      text['section:p_3']['0'],
      text['section:p_3']['1'],
      text['section:p_3']['2'],
      text['section_1:h3'],
      text['section_1:h3_3'],
      this._error,
      this._quantity == 0,
      this._checkoutButtonClicked,
      text['section_1:p_7:button']
    ], {
      'meta': {},
      'model': {},
      'section:h2': 'Redux example: shopping cart',
      'section:div_1': [
        '{1}{2}',
        '{{parts.0}}',
        '{{parts.1}}'
      ],
      'section:p_2': 'This is a slightly more advanced Redux example, that simulates a\n          shopping cart: getting the products, adding/removing items to the\n          cart, and a checkout action, that can sometimes randomly fail (to\n          simulate where you would add failure handling). ',
      'section:p_3': [
        'This view, as well as its 2 child elements, {1} and\n        {2} are connected to the Redux store.',
        '<shop-products>',
        '<shop-cart>'
      ],
      'section_1:h3': 'Products',
      'section_1:h3_3': 'Your Cart',
      'section_1:p_7:button': ' Checkout '
    }));
  }
  constructor() {
    super();
    getAllProductsBinding.element.addEventListener('lang-updated', this._langUpdated.bind(this));
  }
  _checkoutButtonClicked() {
    store.dispatch(checkout());
  }
  stateChanged(state) {
    this._quantity = cartQuantitySelector(state);
    this._error = state.shop.error;
  }
}
window.customElements.define('my-view3', MyView3);
