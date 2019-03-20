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
  html,
  bind
} from 'i18n-element/i18n-core.js';
import { PageViewElement } from './page-view-element.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../store.js';
import {
  increment,
  decrement
} from '../actions/counter.js';
import counter from '../reducers/counter.js';
store.addReducers({ counter });
import './counter-element.js';
import { SharedStyles } from './shared-styles.js';
class MyView2 extends connect(store)(PageViewElement) {
  static get importMeta() {
    return import.meta;
  }
  static get properties() {
    return {
      _clicks: { type: Number },
      _value: { type: Number }
    };
  }
  static get styles() {
    return [SharedStyles];
  }
  render() {
    return html([
      '<!-- localizable -->',
      '\n      <section>\n        <h2>',
      '</h2>\n        <div class="circle">',
      '</div>\n        <p><i18n-format lang="',
      '"><span>',
      '</span><code slot="1">',
      '</code></i18n-format></p>\n        <br><br>\n      </section>\n      <section>\n        <p>\n          <counter-element value="',
      '" clicks="',
      '" @counter-incremented="',
      '" @counter-decremented="',
      '">\n          </counter-element>\n        </p>\n      </section>\n    '
    ], ...bind(this, 'my-view2', (_bind, text, model, effectiveLang) => [
      _bind,
      text['section:h2'],
      this._value,
      effectiveLang,
      text['section:p_2']['0'],
      text['section:p_2']['1'],
      this._value,
      this._clicks,
      this._counterIncremented,
      this._counterDecremented
    ], {
      'meta': {},
      'model': {},
      'section:h2': 'Redux example: simple counter',
      'section:p_2': [
        'This page contains a reusable {1}. The\n        element is not built in a Redux-y way (you can think of it as being a\n        third-party element you got from someone else), but this page is connected to the\n        Redux store. When the element updates its counter, this page updates the values\n        in the Redux store, and you can see the current value of the counter reflected in\n        the bubble above.',
        '<counter-element>'
      ]
    }));
  }
  _counterIncremented() {
    store.dispatch(increment());
  }
  _counterDecremented() {
    store.dispatch(decrement());
  }
  stateChanged(state) {
    this._clicks = state.counter.clicks;
    this._value = state.counter.value;
  }
}
window.customElements.define('my-view2', MyView2);
