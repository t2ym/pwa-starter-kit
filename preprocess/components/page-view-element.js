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
import { i18n } from 'i18n-element/i18n.js';

export class PageViewElement extends i18n(LitElement) {
  static get importMeta() {
    return import.meta;
  }

  // Only render this page if it's actually visible.
  shouldUpdate() {
    return this.active;
  }

  static get properties() {
    return {
      langUpdated: { type: String },
      active: { type: Boolean }
    }
  }

  constructor() {
  	super();
    this.addEventListener('lang-updated', this._langUpdated);
  }

  _langUpdated(event) {
    this.langUpdated = this.lang;
  }
}
