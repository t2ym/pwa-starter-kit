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
import { SharedStyles } from './shared-styles.js';
class MyView404 extends PageViewElement {
  static get importMeta() {
    return import.meta;
  }
  static get styles() {
    return [SharedStyles];
  }
  render() {
    return html([
      '<!-- localizable -->',
      '\n      <section>\n        <h2>',
      '</h2>\n        <p><i18n-format lang="',
      '"><span>',
      '</span><a href="/" slot="1">',
      '</a></i18n-format></p>\n      </section>\n    '
    ], ...bind(this, 'my-view404', (_bind, text, model, effectiveLang) => [
      _bind,
      text['section:h2'],
      effectiveLang,
      text['section:p_1']['0'],
      text['section:p_1']['1']
    ], {
      'meta': {},
      'model': {},
      'section:h2': 'Oops! You hit a 404',
      'section:p_1': [
        ' The page you\'re looking for doesn\'t seem to exist. Head back\n          {1} and try again? ',
        'home'
      ]
    }));
  }
}
window.customElements.define('my-view404', MyView404);
