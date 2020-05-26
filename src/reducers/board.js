import * as actions from "../actions/actionTypes";
import { produce } from "immer";

let initialState = [];
let pieces = [1, 2, 2, 3, 3, 4, 6, 8, 10, "z", "b", "b"];
for (let i = 0; i < 2; ++i) {
  for (let j = 0; j < 6; ++j) {
    const randomElement = pieces.splice(
      Math.floor(Math.random() * pieces.length),
      1
    );
    initialState.push({
      player: 1,
      value: randomElement[0],
      posX: j,
      posY: i,
      selected: false,
      moveable: false,
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
      selected: false,
      moveable: false,
    });
  }
}

for (let i = 4; i < 6; ++i) {
  for (let j = 0; j < 6; ++j) {
    initialState.push({
      player: 0,
      value: "",
      posX: j,
      posY: i,
      selected: false,
      moveable: false,
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
    case actions.GET:
      return produce(state, (draftState) => {
        if (found) {
          draftState[fid].selected = false;
          draftState[action.payload.id].selected = true;
        } else {
          draftState[action.payload.id].selected = true;
        }
      });
    case actions.SELECT:
      return produce(state, (draftState) => {
        if (found) {
          draftState[fid].selected = false;
        }
      });
    case actions.PUTBACK:
      return produce(state, (draftState) => {
        if (action.payload.sid !== -1) {
          draftState[action.payload.sid].value = "";
          draftState[action.payload.sid].selected = false;
        }
      });
    case actions.MOVESELECT:
      return produce(state, (dS) => {
        dS.map((x) => (x.moveable = false));
        if (!found) {
          dS[action.payload.id].selected = true;
        } else if (found && fid === action.payload.id) {
          dS[fid].selected = false;
        } else if (found) {
          dS[fid].selected = false;
          dS[action.payload.id].selected = true;
        }

        let sid = action.payload.id;
        let selectedPiece = dS[sid];
        let player = action.payload.player;
        if (selectedPiece.value !== 2 && fid !== sid) {
          if (sid !== 0 && sid % 6 !== 0) {
            if (dS[sid - 1].player !== player || dS[sid - 1].value === "") {
              dS[sid - 1].moveable = true;
            }
          }
          if (sid % 6 !== 5) {
            if (dS[sid + 1].player !== player || dS[sid + 1].value === "") {
              dS[sid + 1].moveable = true;
            }
          }
          if (sid > 5) {
            if (dS[sid - 6].player !== player || dS[sid - 6].value === "") {
              dS[sid - 6].moveable = true;
            }
          }
          if (sid < 29) {
            if (dS[sid + 6].player !== player || dS[sid + 6].value === "") {
              dS[sid + 6].moveable = true;
            }
          }
        }

        if (selectedPiece.value === 2 && sid !== fid) {
          if (sid < 29) {
            for (let i = sid + 6; i < 36; i += 6) {
              if (dS[i].player !== player) {
                dS[i].moveable = true;
              }
            }
          }
          if (sid > 5) {
            for (let i = sid - 6; i > -1; i -= 6) {
              if (dS[i].player !== player) {
                dS[i].moveable = true;
              }
            }
          }
          if (sid % 6 !== 5) {
            let i = sid + 1;
            while (i % 6 !== 0 && i < 36) {
              if (dS[i].player !== player) {
                dS[i].moveable = true;
              }
              ++i;
            }
          }
          if (sid % 6 !== 0 && sid !== 0) {
            let i = sid - 1;
            while (i % 6 !== 5 && i > -1) {
              if (dS[i].player !== player) {
                dS[i].moveable = true;
              }
              --i;
            }
          }
        }
      });
    case actions.MOVE:
      return produce(state, (draftState) => {
        draftState[action.payload.id].value = found.value;
        draftState.map((x) => (x.moveable = false));
        draftState[action.payload.id].player = action.payload.player;
        draftState[fid].value = "";
        draftState[fid].selected = false;
        draftState[fid].player = "none";
      });
    default:
      return state;
  }
};

export default putReducer;
