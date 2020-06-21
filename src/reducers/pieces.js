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
  fight: {
    fighting: false,
    attacker: "",
    defender: "",
    ar: "",
    dr: "",
  },
};

export default function piecesReducer(state = initialState, action) {
  let found = state.pieces2.find((o) => o.selected);
  let fid = state.pieces2.findIndex((o) => o.selected);
  let ap = action.payload;
  function kill(draftState, value, player = ap.playerp) {
    if (player) draftState.pieces1.find((x) => x.value === "").value = value;
    else draftState.pieces2.find((x) => x.value === "").value = value;
  }
  return produce(state, (draftState) => {
    switch (action.type) {
      case actions.INITIALIZE:
        draftState.pieces1 = initialState.pieces1;
        draftState.pieces2 = initialState.pieces2;
        draftState.fight = initialState.fight;
        draftState.gameEnded = false;
        break;
      case actions.GET:
        if (action.payload.player === 0) {
          if (found) {
            draftState.pieces2[fid].selected = false;
          }
        } else {
          found = state.pieces1.find((o) => o.selected);
          if (found) {
            fid = state.pieces1.findIndex((o) => o.selected);
            draftState.pieces1[fid].selected = false;
          }
        }
        break;
      case actions.SELECT:
        if (action.payload.player === 0) {
          if (found && draftState.pieces2[ap.id].value !== "") {
            draftState.pieces2[fid].selected = false;
            draftState.pieces2[ap.id].selected = true;
          } else if (!found && draftState.pieces2[ap.id].value !== "") {
            draftState.pieces2[ap.id].selected = true;
          }
        } else {
          fid = state.pieces1.findIndex((o) => o.selected);
          found = state.pieces1.find((o) => o.selected);
          if (found && draftState.pieces1[ap.id].value !== "") {
            draftState.pieces1[fid].selected = false;
            draftState.pieces1[ap.id].selected = true;
          } else if (!found && draftState.pieces1[ap.id].value !== "") {
            draftState.pieces1[ap.id].selected = true;
          }
        }
        break;
      case actions.PUT:
        if (action.payload.player === 0) {
          if (ap.sid !== -1) {
            draftState.pieces2[ap.sid].value = "";
            draftState.pieces2[ap.sid].selected = false;
          }
        } else {
          fid = state.pieces1.findIndex((o) => o.selected);
          found = state.pieces1.find((o) => o.selected);
          if (ap.sid !== -1) {
            draftState.pieces1[ap.sid].value = "";
            draftState.pieces1[ap.sid].selected = false;
          }
        }
        break;
      case actions.PUTBACK:
        if (action.payload.player === 0) {
          if (ap.sid !== -1) {
            draftState.pieces2[ap.id].value = ap.value;
          } else if (ap.sid === -1) {
            draftState.pieces2[ap.id].value = ap.value;
            draftState.pieces2[fid].selected = false;
            draftState.pieces2[fid].value = "";
          }
        } else {
          fid = state.pieces1.findIndex((o) => o.selected);
          found = state.pieces1.find((o) => o.selected);
          if (ap.sid !== -1) {
            draftState.pieces1[ap.id].value = ap.value;
          } else if (ap.sid === -1) {
            draftState.pieces1[ap.id].value = ap.value;
            draftState.pieces1[fid].selected = false;
            draftState.pieces1[fid].value = "";
          }
        }
        break;
      case actions.ST:
        draftState = draftState.pieces1.map((x) => (x.value = ""));
        break;
      case actions.ST2:
        draftState = draftState.pieces2.map((x) => (x.value = ""));
        break;
      case actions.ATTACK:
        console.log(ap.value);
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
        break;
      case actions.FIGHTING:
        if (!draftState.fight.fighting) {
          draftState.fight.fighting = true;
          draftState.fight.attacker = ap.attacker.player;
          draftState.fight.defender = ap.defender.player;
          draftState.fight.ar = ap.attacker.value;
          draftState.fight.dr = ap.defender.value;
        } else {
          draftState.fight.fighting = false;
          draftState.fight.attacker = "";
          draftState.fight.defender = "";
          draftState.fight.ar = "";
          draftState.fight.dr = "";
        }
        break;
      case actions.UPDATESTATE:
        draftState.pieces1 = action.payload.pieces.pieces1;
        draftState.pieces2 = action.payload.pieces.pieces2;
        draftState.fight = action.payload.pieces.fight;
        draftState.gameEnded = action.payload.pieces.gameEnded;
        break;
      default:
        draftState = state;
    }
  });
}
