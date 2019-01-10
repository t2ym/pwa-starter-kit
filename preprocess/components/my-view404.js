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
} from 'i18n-element/i18n.js';
import { PageViewElement } from './page-view-element.js';
import { SharedStyles } from './shared-styles.js';
class MyView404 extends PageViewElement {
  static get importMeta() {
    return import.meta;
  }
  render() {
    return html([
      '<!-- localizable -->',
      '\n      ',
      '\n      <section>\n        <h2>',
      '</h2>\n        <p><i18n-format lang="',
      '"><span>',
      '</span><a href="/" slot="1">',
      '</a></i18n-format></p>\n      </section>\n    '
    ], ...bind(this, 'my-view404', (_bind, text, model, effectiveLang) => [
      _bind,
      SharedStyles,
      text['section_1:h2'],
      effectiveLang,
      text['section_1:p_1']['0'],
      text['section_1:p_1']['1']
    ], {
      'meta': {},
      'model': {},
      'section_1:h2': 'Oops! You hit a 404',
      'section_1:p_1': [
        'The page you\'re looking for doesn\'t seem to exist. Head back\n           {1} and try again? ',
        'home'
      ]
    }));
  }
}
window.customElements.define('my-view404', MyView404);