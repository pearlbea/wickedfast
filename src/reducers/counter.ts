import { INCREMENT, DECREMENT } from "../actions/counter.js";

interface action {
  type: string;
}

const counter = (state = { clicks: 0, value: 0 }, action: action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        clicks: state.clicks + 1,
        value: state.value + 1
      };
    case DECREMENT:
      return {
        clicks: state.clicks + 1,
        value: state.value - 1
      };
    default:
      return state;
  }
};

export default counter;
