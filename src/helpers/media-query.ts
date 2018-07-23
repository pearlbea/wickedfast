//github.com/Polymer/pwa-helpers/blob/master/media-query.js

interface LayoutChangedCallback {
  (matches: MediaQueryList["matches"]): any;
}

export const installMediaQueryWatcher = (
  mediaQuery: string,
  layoutChangedCallback: LayoutChangedCallback
) => {
  let mql = window.matchMedia(mediaQuery);
  mql.addListener(e => layoutChangedCallback(e.matches));
  layoutChangedCallback(mql.matches);
};
