import { LitElement, html } from "@polymer/lit-element";
import { setPassiveTouchGestures } from "@polymer/polymer/lib/utils/settings.js";

import { connect } from "../../helpers/connect-mixin";
import { installMediaQueryWatcher } from "../../helpers/media-query";
import { installOfflineWatcher } from "../../helpers/networks";
import { installRouter } from "../../helpers/router";
import { updateMetadata } from "../../helpers/metadata.js";

import { AppStyles } from "./my-app-styles";

// This element is connected to the Redux store.
import { store } from "../../store";

// These are the actions needed by this element.
import {
  navigate,
  updateOffline,
  updateDrawerState,
  updateLayout
} from "../../actions/app";

// These are the elements needed by this element.
import "@polymer/app-layout/app-drawer/app-drawer.js";
import "@polymer/app-layout/app-header/app-header.js";
import "@polymer/app-layout/app-scroll-effects/effects/waterfall.js";
import "@polymer/app-layout/app-toolbar/app-toolbar.js";
import { menuIcon } from "../my-icons";
import "../snack-bar";
import { TemplateElement } from "estree";

class MyApp extends connect(store)(LitElement) {
  appTitle = "";
  _page = "view1";
  _drawerOpened = false;
  _snackbarOpened = false;
  _offline = false;

  _render(props: MyApp) {
    // Anything that's related to rendering should be done in here.
    return html`
      ${AppStyles}

    <!-- Header -->
    <app-header condenses reveals effects="waterfall">
      <app-toolbar class="toolbar-top">
        <button class="menu-btn" title="Menu" on-click="${_ =>
          store.dispatch(updateDrawerState(true))}">${menuIcon}</button>
        <div main-title>${props.appTitle}</div>
      </app-toolbar>

      <!-- This gets hidden on a small screen-->
      <nav class="toolbar-list">
        <a selected?="${props._page === "view1"}" href="/view1">View1</a>
        <a selected?="${props._page === "view2"}" href="/view2">View2</a>
        <a selected?="${props._page === "view3"}" href="/view3">View3</a>
      </nav>
    </app-header>

    <!-- Drawer content -->
    <app-drawer opened="${props._drawerOpened}"
        on-opened-changed="${e =>
          store.dispatch(updateDrawerState(e.target.opened))}">
      <nav class="drawer-list">
        <a selected?="${props._page === "view1"}" href="/view1">View1</a>
        <a selected?="${props._page === "view2"}" href="/view2">View2</a>
        <a selected?="${props._page === "view3"}" href="/view3">View3</a>
      </nav>
    </app-drawer>

    <!-- Main content -->
    <main role="main" class="main-content">
      <my-view1 class="page" active?="${props._page === "view1"}"></my-view1>
      <my-view2 class="page" active?="${props._page === "view2"}"></my-view2>
      <my-view3 class="page" active?="${props._page === "view3"}"></my-view3>
      <my-view404 class="page" active?="${props._page ===
        "view404"}"></my-view404>
    </main>

    <footer>
      <p>Built with <a href="https://github.com/Polymer/pwa-starter-kit">PWA Start Kit</a>.</p>
    </footer>

    <snack-bar active?="${props._snackbarOpened}">
        You are now ${props._offline ? "offline" : "online"}.</snack-bar>
    `;
  }

  static get properties() {
    return {
      appTitle: String,
      _page: String,
      _drawerOpened: Boolean,
      _snackbarOpened: Boolean,
      _offline: Boolean
    };
  }

  constructor() {
    super();
    // To force all event listeners for gestures to be passive.
    // See https://www.polymer-project.org/3.0/docs/devguide/settings#setting-passive-touch-gestures
    setPassiveTouchGestures(true);
  }

  _firstRendered(): void {
    installRouter((location: any) =>
      store.dispatch(navigate(window.decodeURIComponent(location.pathname)))
    );
    installOfflineWatcher((offline: any) =>
      store.dispatch(updateOffline(offline))
    );
    installMediaQueryWatcher(`(min-width: 460px)`, (matches: any) =>
      store.dispatch(updateLayout(matches))
    );
  }

  _didRender(properties, changeList) {
    if ("_page" in changeList) {
      const pageTitle = properties.appTitle + " - " + changeList._page;
      updateMetadata({
        title: pageTitle,
        description: pageTitle
        // This object also takes an image property, that points to an img src.
      });
    }
  }

  _stateChanged(state) {
    this._page = state.app.page;
    this._offline = state.app.offline;
    this._snackbarOpened = state.app.snackbarOpened;
    this._drawerOpened = state.app.drawerOpened;
  }
}

window.customElements.define("my-app", MyApp);
