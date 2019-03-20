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
} from 'i18n-element/i18n-core.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../store.js';
import { removeFromCartIcon } from './my-icons.js';
import './shop-item.js';
import { removeFromCart } from '../actions/shop.js';
import {
  cartItemsSelector,
  cartTotalSelector
} from '../reducers/shop.js';
import { ButtonSharedStyles } from './button-shared-styles.js';
class ShopCart extends connect(store)(i18n(LitElement)) {
  static get importMeta() {
    return import.meta;
  }
  static get properties() {
    return {
      _items: { type: Array },
      _total: { type: Number }
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
    return html([
      '<!-- localizable -->',
      '\n      <p ?hidden="',
      '">',
      '</p>\n      ',
      '\n      <p ?hidden="',
      '"><i18n-format lang="',
      '"><span>',
      '</span><b slot="1">',
      '</b><span slot="2">',
      '</span></i18n-format></p>\n    '
    ], ...bind(this, 'shop-cart', (_bind, text, model, effectiveLang) => [
      _bind,
      this._items.length !== 0,
      text['p'],
      this._items.map(item => html`
          <div>
            <shop-item .name="${ item.title }" .amount="${ item.amount }" .price="${ item.price }"></shop-item>
            <button
                @click="${ this._removeButtonClicked }"
                data-index="${ item.id }"
                title="Remove from cart">
              ${ removeFromCartIcon }
            </button>
          </div>
        `),
      !this._items.length,
      effectiveLang,
      text['p_2']['0'],
      text['p_2']['1'],
      this._total
    ], {
      'meta': {},
      'model': {},
      'p': 'Please add some products to cart.',
      'p_2': [
        '{1} {2}',
        'Total:',
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
  _removeButtonClicked(e) {
    store.dispatch(removeFromCart(e.currentTarget.dataset['index']));
  }
  stateChanged(state) {
    this._items = cartItemsSelector(state);
    this._total = cartTotalSelector(state);
  }
}
window.customElements.define('shop-cart', ShopCart);
