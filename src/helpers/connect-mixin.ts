// https://github.com/Polymer/pwa-helpers/blob/master/connect-mixin.js

export const connect = (store: any) => (baseElement: any) =>
  class extends baseElement {
    connectedCallback() {
      // Connect the element to the store.
      console.log("connect-mixin connectedCallback");
      this.__storeUnsubscribe = store.subscribe(() =>
        this._stateChanged(store.getState())
      );
      this._stateChanged(store.getState());
      if (super.connectedCallback) {
        super.connectedCallback();
      }
    }

    disconnectedCallback() {
      this.__storeUnsubscribe();
      console.log("connect-mixin disconnectedCallback");
      if (super.disconnectedCallback) {
        super.disconnectedCallback();
      }
    }

    // This is called every time something is updated in the store.
    _stateChanged(state: any) {
      console.log("state: ", state);
      console.log("this: ", this);

      throw new Error("_stateChanged() not implemented", this);
    }
  };
