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
  static get styles() {
    return [css`
        :host {
          display: block;
          --app-drawer-width: 256px;
          --app-primary-color: #E91E63;
          --app-secondary-color: #293237;
          --app-dark-text-color: var(--app-secondary-color);
          --app-light-text-color: white;
          --app-section-even-color: #f7f7f7;
          --app-section-odd-color: white;
          --app-header-background-color: white;
          --app-header-text-color: var(--app-dark-text-color);
          --app-header-selected-color: var(--app-primary-color);
          --app-drawer-background-color: var(--app-secondary-color);
          --app-drawer-text-color: var(--app-light-text-color);
          --app-drawer-selected-color: #78909C;
        }
        app-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          text-align: center;
          background-color: var(--app-header-background-color);
          color: var(--app-header-text-color);
          border-bottom: 1px solid #eee;
        }
        .toolbar-top {
          background-color: var(--app-header-background-color);
        }
        [main-title] {
          font-family: 'Pacifico';
          text-transform: lowercase;
          font-size: 30px;
          /* In the narrow layout, the toolbar is offset by the width of the
          drawer button, and the text looks not centered. Add a padding to
          match that button */
          padding-right: 44px;
        }
        .toolbar-list {
          display: none;
        }
        .toolbar-list > a {
          display: inline-block;
          color: var(--app-header-text-color);
          text-decoration: none;
          line-height: 30px;
          padding: 4px 24px;
        }
        .toolbar-list > a[selected] {
          color: var(--app-header-selected-color);
          border-bottom: 4px solid var(--app-header-selected-color);
        }
        .menu-btn {
          background: none;
          border: none;
          fill: var(--app-header-text-color);
          cursor: pointer;
          height: 44px;
          width: 44px;
        }
        .drawer-list {
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          padding: 24px;
          background: var(--app-drawer-background-color);
          position: relative;
        }
        .drawer-list > a {
          display: block;
          text-decoration: none;
          color: var(--app-drawer-text-color);
          line-height: 40px;
          padding: 0 24px;
        }
        .drawer-list > a[selected] {
          color: var(--app-drawer-selected-color);
        }
        /* Workaround for IE11 displaying <main> as inline */
        main {
          display: block;
        }
        .main-content {
          padding-top: 64px;
          min-height: 100vh;
        }
        .page {
          display: none;
        }
        .page[active] {
          display: block;
        }
        footer {
          padding: 24px;
          background: var(--app-drawer-background-color);
          color: var(--app-drawer-text-color);
          text-align: center;
        }
        /* Wide layout: when the viewport width is bigger than 460px, layout
        changes to a wide layout */
        @media (min-width: 460px) {
          .toolbar-list {
            display: block;
          }
          .menu-btn {
            display: none;
          }
          .main-content {
            padding-top: 107px;
          }
          /* The drawer button isn't shown in the wide layout, so we don't
          need to offset the title */
          [main-title] {
            padding-right: 0px;
          }
        }
      `];
  }
  render() {
    return html([
      '<!-- localizable -->',
      '\n      <!-- Header -->\n      <app-header condenses="" reveals="" effects="waterfall">\n        <app-toolbar class="toolbar-top">\n          <button class="menu-btn" title="',
      '" @click="',
      '">',
      '</button>\n          <div main-title="">',
      '</div>\n        </app-toolbar>\n\n        <!-- This gets hidden on a small screen-->\n        <nav class="toolbar-list">\n          <a ?selected="',
      '" href="/view1">',
      '</a>\n          <a ?selected="',
      '" href="/view2">',
      '</a>\n          <a ?selected="',
      '" href="/view3">',
      '</a>\n        </nav>\n      </app-header>\n\n      <!-- Drawer content -->\n      <app-drawer .opened="',
      '" @opened-changed="',
      '">\n        <nav class="drawer-list">\n          <a ?selected="',
      '" href="/view1">',
      '</a>\n          <a ?selected="',
      '" href="/view2">',
      '</a>\n          <a ?selected="',
      '" href="/view3">',
      '</a>\n        </nav>\n      </app-drawer>\n\n      <!-- Main content -->\n      <main role="main" class="main-content">\n        <my-view1 class="page" ?active="',
      '"></my-view1>\n        <my-view2 class="page" ?active="',
      '"></my-view2>\n        <my-view3 class="page" ?active="',
      '"></my-view3>\n        <my-view404 class="page" ?active="',
      '"></my-view404>\n      </main>\n\n      <footer>\n        <p>',
      '</p>\n      </footer>\n\n      <snack-bar ?active="',
      '"><i18n-format lang="',
      '"><span>',
      '</span><span slot="1">',
      '</span></i18n-format></snack-bar>\n      <template><span id="appTitle">',
      '</span></template>\n    '
    ], ...bind(this, (_bind, text, model, effectiveLang) => [
      _bind,
      model['app-header:app-toolbar:button']['title'],
      this._menuButtonClicked,
      menuIcon,
      this.appTitle,
      this._page === 'view1',
      text['app-header:nav_1:a'],
      this._page === 'view2',
      text['app-header:nav_1:a_1'],
      this._page === 'view3',
      text['app-header:nav_1:a_2'],
      this._drawerOpened,
      this._drawerOpenedChanged,
      this._page === 'view1',
      text['app-drawer_1:nav:a'],
      this._page === 'view2',
      text['app-drawer_1:nav:a_1'],
      this._page === 'view3',
      text['app-drawer_1:nav:a_2'],
      this._page === 'view1',
      this._page === 'view2',
      this._page === 'view3',
      this._page === 'view404',
      text['footer_3:p'],
      this._snackbarOpened,
      effectiveLang,
      text['snack-bar_4']['0'],
      this._offline ? 'offline' : 'online',
      text['appTitle']
    ], {
      'meta': {},
      'model': { 'app-header:app-toolbar:button': { 'title': 'Menu' } },
      'app-header:nav_1:a': 'View One',
      'app-header:nav_1:a_1': 'View Two',
      'app-header:nav_1:a_2': 'View Three',
      'app-drawer_1:nav:a': 'View One',
      'app-drawer_1:nav:a_1': 'View Two',
      'app-drawer_1:nav:a_2': 'View Three',
      'footer_3:p': 'Made with \u2665 by the Polymer team.',
      'snack-bar_4': [
        ' You are now {1}. ',
        '{{parts.16}}'
      ],
      'appTitle': 'my app'
    }));
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
