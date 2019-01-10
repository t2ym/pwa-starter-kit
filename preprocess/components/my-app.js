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
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';
import { installOfflineWatcher } from 'pwa-helpers/network.js';
import { installRouter } from 'pwa-helpers/router.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';
import { store } from '../store.js';
import {
  navigate,
  updateOffline,
  updateDrawerState
} from '../actions/app.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import { menuIcon } from './my-icons.js';
import './snack-bar.js';
class MyApp extends connect(store)(i18n(LitElement)) {
  static get importMeta() {
    return import.meta;
  }
  render() {
    return html([
      '<!-- localizable -->',
      '\n    <style>\n      :host {\n        --app-drawer-width: 256px;\n        display: block;\n\n        --app-primary-color: #E91E63;\n        --app-secondary-color: #293237;\n        --app-dark-text-color: var(--app-secondary-color);\n        --app-light-text-color: white;\n        --app-section-even-color: #f7f7f7;\n        --app-section-odd-color: white;\n\n        --app-header-background-color: white;\n        --app-header-text-color: var(--app-dark-text-color);\n        --app-header-selected-color: var(--app-primary-color);\n\n        --app-drawer-background-color: var(--app-secondary-color);\n        --app-drawer-text-color: var(--app-light-text-color);\n        --app-drawer-selected-color: #78909C;\n      }\n\n      app-header {\n        position: fixed;\n        top: 0;\n        left: 0;\n        width: 100%;\n        text-align: center;\n        background-color: var(--app-header-background-color);\n        color: var(--app-header-text-color);\n        border-bottom: 1px solid #eee;\n      }\n\n      .toolbar-top {\n        background-color: var(--app-header-background-color);\n      }\n\n      [main-title] {\n        font-family: \'Pacifico\';\n        text-transform: lowercase;\n        font-size: 30px;\n        /* In the narrow layout, the toolbar is offset by the width of the\n        drawer button, and the text looks not centered. Add a padding to\n        match that button */\n        padding-right: 44px;\n      }\n\n      .toolbar-list {\n        display: none;\n      }\n\n      .toolbar-list > a {\n        display: inline-block;\n        color: var(--app-header-text-color);\n        text-decoration: none;\n        line-height: 30px;\n        padding: 4px 24px;\n      }\n\n      .toolbar-list > a[selected] {\n        color: var(--app-header-selected-color);\n        border-bottom: 4px solid var(--app-header-selected-color);\n      }\n\n      .menu-btn {\n        background: none;\n        border: none;\n        fill: var(--app-header-text-color);\n        cursor: pointer;\n        height: 44px;\n        width: 44px;\n      }\n\n      .drawer-list {\n        box-sizing: border-box;\n        width: 100%;\n        height: 100%;\n        padding: 24px;\n        background: var(--app-drawer-background-color);\n        position: relative;\n      }\n\n      .drawer-list > a {\n        display: block;\n        text-decoration: none;\n        color: var(--app-drawer-text-color);\n        line-height: 40px;\n        padding: 0 24px;\n      }\n\n      .drawer-list > a[selected] {\n        color: var(--app-drawer-selected-color);\n      }\n\n      /* Workaround for IE11 displaying <main> as inline */\n      main {\n        display: block;\n      }\n\n      .main-content {\n        padding-top: 64px;\n        min-height: 100vh;\n      }\n\n      .page {\n        display: none;\n      }\n\n      .page[active] {\n        display: block;\n      }\n\n      footer {\n        padding: 24px;\n        background: var(--app-drawer-background-color);\n        color: var(--app-drawer-text-color);\n        text-align: center;\n      }\n\n      /* Wide layout: when the viewport width is bigger than 460px, layout\n      changes to a wide layout. */\n      @media (min-width: 460px) {\n        .toolbar-list {\n          display: block;\n        }\n\n        .menu-btn {\n          display: none;\n        }\n\n        .main-content {\n          padding-top: 107px;\n        }\n\n        /* The drawer button isn\'t shown in the wide layout, so we don\'t\n        need to offset the title */\n        [main-title] {\n          padding-right: 0px;\n        }\n      }\n    </style>\n\n    <!-- Header -->\n    <app-header condenses="" reveals="" effects="waterfall">\n      <app-toolbar class="toolbar-top">\n        <button class="menu-btn" title="',
      '" @click="',
      '">',
      '</button>\n        <div main-title="">',
      '</div>\n      </app-toolbar>\n\n      <!-- This gets hidden on a small screen-->\n      <nav class="toolbar-list">\n        <a ?selected="',
      '" href="/view1">',
      '</a>\n        <a ?selected="',
      '" href="/view2">',
      '</a>\n        <a ?selected="',
      '" href="/view3">',
      '</a>\n      </nav>\n    </app-header>\n\n    <!-- Drawer content -->\n    <app-drawer .opened="',
      '" @opened-changed="',
      '">\n      <nav class="drawer-list">\n        <a ?selected="',
      '" href="/view1">',
      '</a>\n        <a ?selected="',
      '" href="/view2">',
      '</a>\n        <a ?selected="',
      '" href="/view3">',
      '</a>\n      </nav>\n    </app-drawer>\n\n    <!-- Main content -->\n    <main role="main" class="main-content">\n      <my-view1 class="page" ?active="',
      '"></my-view1>\n      <my-view2 class="page" ?active="',
      '"></my-view2>\n      <my-view3 class="page" ?active="',
      '"></my-view3>\n      <my-view404 class="page" ?active="',
      '"></my-view404>\n    </main>\n\n    <footer>\n      <p>',
      '</p>\n    </footer>\n\n    <snack-bar ?active="',
      '"><i18n-format lang="',
      '"><span>',
      '</span><span slot="1">',
      '</span></i18n-format></snack-bar>\n    <template><span id="appTitle">',
      '</span></template>\n    '
    ], ...bind(this, (_bind, text, model, effectiveLang) => [
      _bind,
      model['app-header_1:app-toolbar:button']['title'],
      this._menuButtonClicked,
      menuIcon,
      this.appTitle,
      this._page === 'view1',
      text['app-header_1:nav_1:a'],
      this._page === 'view2',
      text['app-header_1:nav_1:a_1'],
      this._page === 'view3',
      text['app-header_1:nav_1:a_2'],
      this._drawerOpened,
      this._drawerOpenedChanged,
      this._page === 'view1',
      text['app-drawer_2:nav:a'],
      this._page === 'view2',
      text['app-drawer_2:nav:a_1'],
      this._page === 'view3',
      text['app-drawer_2:nav:a_2'],
      this._page === 'view1',
      this._page === 'view2',
      this._page === 'view3',
      this._page === 'view404',
      text['footer_4:p'],
      this._snackbarOpened,
      effectiveLang,
      text['snack-bar_5']['0'],
      this._offline ? 'offline' : 'online',
      text['appTitle']
    ], {
      'meta': {},
      'model': { 'app-header_1:app-toolbar:button': { 'title': 'Menu' } },
      'app-header_1:nav_1:a': 'View One',
      'app-header_1:nav_1:a_1': 'View Two',
      'app-header_1:nav_1:a_2': 'View Three',
      'app-drawer_2:nav:a': 'View One',
      'app-drawer_2:nav:a_1': 'View Two',
      'app-drawer_2:nav:a_2': 'View Three',
      'footer_4:p': 'Made with \u2665 by the Polymer team.',
      'snack-bar_5': [
        ' You are now {1}.',
        '{{parts.16}}'
      ],
      'appTitle': 'my app'
    }));
  }
  static get properties() {
    return {
      langUpdated: { type: String },
      appTitle: { type: String },
      _page: { type: String },
      _drawerOpened: { type: Boolean },
      _snackbarOpened: { type: Boolean },
      _offline: { type: Boolean }
    };
  }
  constructor() {
    super();
    setPassiveTouchGestures(true);
    this.addEventListener('lang-updated', this._langUpdated);
  }
  _langUpdated(event) {
    this.langUpdated = this.lang;
    this.appTitle = this.text.appTitle;
  }
  firstUpdated() {
    installRouter(location => store.dispatch(navigate(decodeURIComponent(location.pathname))));
    installOfflineWatcher(offline => store.dispatch(updateOffline(offline)));
    installMediaQueryWatcher(`(min-width: 460px)`, () => store.dispatch(updateDrawerState(false)));
  }
  updated(changedProps) {
    if (changedProps.has('_page')) {
      const pageTitle = this.appTitle + ' - ' + this._page;
      updateMetadata({
        title: pageTitle,
        description: pageTitle
      });
    }
  }
  _menuButtonClicked() {
    store.dispatch(updateDrawerState(true));
  }
  _drawerOpenedChanged(e) {
    store.dispatch(updateDrawerState(e.target.opened));
  }
  stateChanged(state) {
    this._page = state.app.page;
    this._offline = state.app.offline;
    this._snackbarOpened = state.app.snackbarOpened;
    this._drawerOpened = state.app.drawerOpened;
  }
}
window.customElements.define('my-app', MyApp);
