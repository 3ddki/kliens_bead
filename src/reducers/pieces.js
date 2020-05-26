import * as actions from "../actions/actionTypes";
import { produce } from "immer";

let initialState = {
  pieces1: [
    { value: 1, selected: false },
    { value: 2, selected: false },
    { value: 2, selected: false },
    { value: 3, selected: false },
    { value: 3, selected: false },
    { value: "z", selected: false },
    { value: "b", selected: false },
    { value: "b", selected: false },
    { value: 4, selected: false },
    { value: 6, selected: false },
    { value: 8, selected: false },
    { value: 10, selected: false },
  ],
  pieces2: [
    { value: 1, selected: false },
    { value: 2, selected: false },
    { value: 2, selected: false },
    { value: 3, selected: false },
    { value: 3, selected: false },
    { value: "z", selected: false },
    { value: "b", selected: false },
    { value: "b", selected: false },
    { value: 4, selected: false },
    { value: 6, selected: false },
    { value: 8, selected: false },
    { value: 10, selected: false },
  ],
};

export default function piecesReducer(state = initialState, action) {
  let found = state.pieces2.find((o) => o.selected);
  let fid = state.pieces2.findIndex((o) => o.selected);
  switch (action.type) {
    case actions.GET:
      return produce(state, (draftState) => {
        if (found) {
          draftState.pieces2[fid].selected = false;
        }
      });
    case actions.SELECT:
      return produce(state, (draftState) => {
        if (found && draftState.pieces2[action.payload.id].value !== "") {
          draftState.pieces2[fid].selected = false;
          draftState.pieces2[action.payload.id].selected = true;
        } else if (
          !found &&
          draftState.pieces2[action.payload.id].value !== ""
        ) {
          draftState.pieces2[action.payload.id].selected = true;
        }
      });
    case actions.PUT:
      return produce(state, (draftState) => {
        if (action.payload.sid !== -1) {
          draftState.pieces2[action.payload.sid].value = "";
          draftState.pieces2[action.payload.sid].selected = false;
        }
      });
    case actions.PUTBACK:
      return produce(state, (draftState) => {
        if (action.payload.sid !== -1) {
          draftState.pieces2[action.payload.id].value = action.payload.value;
        } else if (action.payload.sid === -1) {
          draftState.pieces2[action.payload.id].value = action.payload.value;
          draftState.pieces2[fid].selected = false;
          draftState.pieces2[fid].value = "";
        }
      });
    case actions.ST:
      return produce(state, (draftState) => {
        draftState = draftState.pieces1.map((x) => (x.value = ""));
      });
    default:
      return state;
  }
}
