interface LocationUpdatedCallback {
  (location: Location, e?: Event): any;
}

export const installRouter = (
  locationUpdatedCallback: LocationUpdatedCallback
) => {
  document.body.addEventListener("click", (e: MouseEvent) => {
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey
    )
      return;

    const anchor = e
      .composedPath()
      .filter((n: EventTarget) => n.tagName === "A")[0];

    if (
      !anchor ||
      anchor.target ||
      anchor.hasAttribute("download") ||
      anchor.getAttribute("rel") === "external"
    )
      return;

    const href = anchor.href;
    if (!href || href.indexOf("mailto:") !== -1) return;

    const location = window.location;
    const origin = location.origin || location.protocol + "//" + location.host;
    if (href.indexOf(origin) !== 0) return;

    e.preventDefault();
    if (href !== location.href) {
      window.history.pushState({}, "", href);
      locationUpdatedCallback(location, e);
    }
  });

  window.addEventListener("popstate", e =>
    locationUpdatedCallback(window.location, e)
  );
  locationUpdatedCallback(window.location);
};
