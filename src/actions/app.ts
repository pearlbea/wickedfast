export const UPDATE_PAGE = "UPDATE_PAGE";
export const UPDATE_OFFLINE = "UPDATE_OFFLINE";
export const UPDATE_DRAWER_STATE = "UPDATE_DRAWER_STATE";
export const OPEN_SNACKBAR = "OPEN_SNACKBAR";
export const CLOSE_SNACKBAR = "CLOSE_SNACKBAR";

// TODO Define Dispatch
type Dispatch = any;

export const navigate = (path: string) => (dispatch: Dispatch) => {
  const page: string = path === "/" ? "view1" : path.slice(1);

  // Any other info you might want to extract from the path (like page type),
  // you can do here
  dispatch(loadPage(page));

  // Close the drawer - in case the *path* change came from a link in the drawer.
  dispatch(updateDrawerState(false));
};

const loadPage = (page: string) => (dispatch: Dispatch) => {
  switch (page) {
    case "view1":
      import("../components/my-view1.js").then(module => {
        // Put code in here that you want to run every time when
        // navigating to view1 after my-view1.js is loaded.
      });
      break;
    case "view2":
      import("../components/my-view2.js");
      break;
    case "view3":
      import("../components/my-view3.js");
      break;
    default:
      page = "view404";
      import("../components/my-view404.js");
  }

  dispatch(updatePage(page));
};

const updatePage = (page: string) => {
  return {
    type: UPDATE_PAGE,
    page
  };
};

let snackbarTimer: any;

export const showSnackbar = () => (dispatch: any) => {
  dispatch({
    type: OPEN_SNACKBAR
  });
  clearTimeout(snackbarTimer);
  snackbarTimer = setTimeout(() => dispatch({ type: CLOSE_SNACKBAR }), 3000);
};

export const updateOffline = offline => (dispatch: Dispatch, getState) => {
  // Show the snackbar, unless this is the first load of the page.
  if (getState().app.offline !== undefined) {
    dispatch(showSnackbar());
  }
  dispatch({
    type: UPDATE_OFFLINE,
    offline
  });
};

export const updateLayout = wide => (dispatch: Dispatch, getState) => {
  if (getState().app.drawerOpened) {
    dispatch(updateDrawerState(false));
  }
};

export const updateDrawerState = opened => (dispatch: Dispatch, getState) => {
  if (getState().app.drawerOpened !== opened) {
    dispatch({
      type: UPDATE_DRAWER_STATE,
      opened
    });
  }
};
