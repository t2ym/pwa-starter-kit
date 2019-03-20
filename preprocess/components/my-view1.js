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
class MyView1 extends PageViewElement {
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
      '</h2>\n        <p>',
      '</p>\n        <p>',
      '</p>\n      </section>\n      <section>\n        <h2>',
      '</h2>\n        <p>',
      '</p>\n      </section>\n      <section>\n        <p>',
      '</p>\n      </section>\n    '
    ], ...bind(this, 'my-view1', (_bind, text, model, effectiveLang) => [
      _bind,
      text['section:h2'],
      text['section:p_1'],
      text['section:p_2'],
      text['section_1:h2'],
      text['section_1:p_1'],
      text['section_2:p']
    ], {
      'meta': {},
      'model': {},
      'section:h2': 'Static page',
      'section:p_1': 'This is a text-only page.',
      'section:p_2': 'It doesn\'t do anything other than display some static text.',
      'section_1:h2': 'Welcome',
      'section_1:p_1': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac nisi orci. Maecenas sollicitudin diam in diam efficitur cursus. Morbi sollicitudin in justo tincidunt placerat. Integer tincidunt elementum nisi, eu ornare dolor lacinia eget. Fusce pulvinar massa eget odio placerat, commodo molestie ipsum tempus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse porttitor id purus eu cursus. Suspendisse arcu nulla, mattis vel hendrerit et, malesuada a elit. Nam at diam ornare, aliquet est sed, malesuada metus. Cras nec enim vel nibh tincidunt euismod ut et enim. Etiam pharetra eros in sodales iaculis. Duis sagittis urna et cursus mollis. Cras tempor rutrum est. Praesent sollicitudin ligula at laoreet placerat. Praesent tortor dui, semper in sapien non, pharetra luctus turpis.',
      'section_2:p': 'Vestibulum at est ex. Aenean id ligula id nibh dictum laoreet. Etiam non semper erat. Pellentesque eu justo rhoncus diam vulputate facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat metus ex, vel fringilla massa tincidunt sit amet. Nunc facilisis bibendum tristique. Mauris commodo, dolor vitae dapibus fermentum, odio nibh viverra lorem, eu cursus diam turpis et sapien. Nunc suscipit tortor a ligula tincidunt, id hendrerit tellus sollicitudin.'
    }));
  }
}
window.customElements.define('my-view1', MyView1);
