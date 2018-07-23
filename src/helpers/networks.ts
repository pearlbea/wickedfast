//github.com/Polymer/pwa-helpers/blob/master/network.js

interface OfflineUpdatedCallback {
  (online: boolean): any;
}

export const installOfflineWatcher = (
  offlineUpdatedCallback: OfflineUpdatedCallback
) => {
  window.addEventListener("online", () => offlineUpdatedCallback(false));
  window.addEventListener("offline", () => offlineUpdatedCallback(true));

  offlineUpdatedCallback(navigator.onLine === false);
};
