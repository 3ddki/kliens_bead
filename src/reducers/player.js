import * as actions from "../actions/actionTypes";

const initialState = 1;

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CONNECTING:
      return (state = 0);
    case actions.PLAYING:
      return (state = 1);
    case actions.MOVE:
      if (state === 1) {
        state = 0;
      } else {
        state = 1;
      }
      return state;
    default:
      return state;
  }
};

export default playerReducer;
