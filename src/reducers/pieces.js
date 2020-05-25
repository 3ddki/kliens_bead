import * as actions from "../actions/actionTypes";
import { produce } from "immer";

let array = [
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
];

export default function piecesReducer(state = array, action) {
  let found = state.find((o) => o.selected);
  let fid = state.findIndex((o) => o.selected);
  switch (action.type) {
    case actions.GET:
      return produce(state, (draftState) => {
        if (found) {
          draftState[fid].selected = false;
        }
      });
    /* falls through */
    case actions.SELECT:
      return produce(state, (draftState) => {
        if (found && draftState[action.payload.id].value !== "") {
          draftState[fid].selected = false;
          draftState[action.payload.id].selected = true;
        } else if (!found && draftState[action.payload.id].value !== "") {
          draftState[action.payload.id].selected = true;
        }
      });
    /* falls through */
    case actions.PUT:
      return produce(state, (draftState) => {
        if (action.payload.sid !== -1) {
          draftState[action.payload.sid].value = "";
          draftState[action.payload.sid].selected = false;
        }
      });
    /* falls through */
    case actions.PUTBACK:
      return produce(state, (draftState) => {
        if (action.payload.sid !== -1) {
          draftState[action.payload.id].value = action.payload.value;
        } else if (action.payload.sid === -1) {
          draftState[action.payload.id].value = action.payload.value;
          draftState[fid].selected = false;
          draftState[fid].value = "";
        }
      });
    /* falls through */
    default:
      return state;
  }
}
