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
  gameEnded: false,
};

export default function piecesReducer(state = initialState, action) {
  let found = state.pieces2.find((o) => o.selected);
  let fid = state.pieces2.findIndex((o) => o.selected);
  let ap = action.payload;
  function kill(draftState, value, player = ap.playerp) {
    if (player) draftState.pieces1.find((x) => x.value === "").value = value;
    else draftState.pieces2.find((x) => x.value === "").value = value;
  }

  switch (action.type) {
    case actions.GET:
      return produce(state, (draftState) => {
        if (found) {
          draftState.pieces2[fid].selected = false;
        }
      });
    case actions.SELECT:
      return produce(state, (draftState) => {
        if (found && draftState.pieces2[ap.id].value !== "") {
          draftState.pieces2[fid].selected = false;
          draftState.pieces2[ap.id].selected = true;
        } else if (!found && draftState.pieces2[ap.id].value !== "") {
          draftState.pieces2[ap.id].selected = true;
        }
      });
    case actions.PUT:
      return produce(state, (draftState) => {
        if (ap.sid !== -1) {
          draftState.pieces2[ap.sid].value = "";
          draftState.pieces2[ap.sid].selected = false;
        }
      });
    case actions.PUTBACK:
      return produce(state, (draftState) => {
        if (ap.sid !== -1) {
          draftState.pieces2[ap.id].value = ap.value;
        } else if (ap.sid === -1) {
          draftState.pieces2[ap.id].value = ap.value;
          draftState.pieces2[fid].selected = false;
          draftState.pieces2[fid].value = "";
        }
      });
    case actions.ST:
      return produce(state, (draftState) => {
        draftState = draftState.pieces1.map((x) => (x.value = ""));
      });
    case actions.ST2:
      return produce(state, (draftState) => {
        draftState = draftState.pieces2.map((x) => (x.value = ""));
      });
    case actions.ATTACK:
      console.log(ap.value);
      return produce(state, (draftState) => {
        if (ap.value === "z") {
          draftState.gameEnded = true;
        } else if (ap.value === "b") {
          if (ap.selected.value === 3) {
            kill(draftState, ap.value);
          } else {
            kill(draftState, ap.selected.value, ap.selected.player);
          }
        } else if (ap.selected.value === 1) {
          if (ap.value === 10) {
            kill(draftState, ap.value);
          } else if (ap.value > ap.selected.value) {
            kill(draftState, ap.selected.value, ap.selected.player);
          } else if (ap.value === ap.selected.value) {
            kill(draftState, ap.selected.value, ap.selected.player);
            kill(draftState, ap.value);
          }
        } else {
          if (ap.value > ap.selected.value) {
            kill(draftState, ap.selected.value, ap.selected.player);
          } else if (ap.value < ap.selected.value) {
            kill(draftState, ap.value);
          } else if (ap.value === ap.selected.value) {
            kill(draftState, ap.value);
            kill(draftState, ap.selected.value, ap.selected.player);
          }
        }
      });
    default:
      return state;
  }
}
