// https://github.com/Polymer/pwa-helpers/blob/master/lazy-reducer-enhancer.js

export const lazyReducerEnhancer = function(combineReducers) {
  return nextCreator => {
    return (origReducer, preloadedState) => {
      let lazyReducers = {};
      const nextStore = nextCreator(origReducer, preloadedState);
      function addReducers(newReducers) {
        this.replaceReducer(
          combineReducers(
            (lazyReducers = Object.assign({}, lazyReducers, newReducers))
          )
        );
      }
      return Object.assign({}, nextStore, { addReducers });
    };
  };
};
