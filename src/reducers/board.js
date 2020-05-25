import * as actions from "../actions/actionTypes";
import { produce } from "immer";

let initialState = [];
for (let i = 0; i < 2; ++i) {
  for (let j = 0; j < 6; ++j) {
    initialState.push({
      player: "red",
      value: "",
      posX: j,
      posY: i,
      class: "bg-dark",
      selected: false,
    });
  }
}

for (let i = 2; i < 4; ++i) {
  for (let j = 0; j < 6; ++j) {
    initialState.push({
      player: "none",
      value: "",
      posX: j,
      posY: i,
      class: "bg-white",
      selected: false,
    });
  }
}

for (let i = 4; i < 6; ++i) {
  for (let j = 0; j < 6; ++j) {
    initialState.push({
      player: "blue",
      value: "",
      posX: j,
      posY: i,
      class: "bg-secondary",
      selected: false,
    });
  }
}

const putReducer = (state = initialState, action) => {
  let found = state.find((o) => o.selected);
  let fid = state.findIndex((o) => o.selected);
  switch (action.type) {
    case actions.PUT:
      return produce(state, (draftState) => {
        if (
          draftState[action.payload.id].value === "" &&
          action.payload.sid !== -1
        ) {
          draftState[action.payload.id].value = action.payload.value;
        } else if (action.payload.sid === -1) {
          draftState[action.payload.id].value = action.payload.value;
          draftState[fid].value = "";
          draftState[fid].selected = false;
        }
      });
    /* falls through */
    case actions.GET:
      return produce(state, (draftState) => {
        if (found) {
          draftState[fid].selected = false;
          draftState[action.payload.id].selected = true;
        } else {
          draftState[action.payload.id].selected = true;
        }
      });
    /* falls through */
    case actions.SELECT:
      return produce(state, (draftState) => {
        if (found) {
          draftState[fid].selected = false;
        }
      });
    /* falls through */
    case actions.PUTBACK:
      return produce(state, (draftState) => {
        if (action.payload.sid !== -1) {
          draftState[action.payload.sid].value = "";
          draftState[action.payload.sid].selected = false;
        }
      });
    /* falls through */
    default:
      return state;
  }
};

export default putReducer;
