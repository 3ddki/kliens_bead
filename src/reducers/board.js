import * as actions from "../actions/actionTypes";
import { produce } from "immer";

let initialState = [];

let pieces = [1, 2, 2, 3, 3, 4, 6, 8, 10, "z", "b", "b"];
let pieces2 = [1, 2, 2, 3, 3, 4, 6, 8, 10, "z", "b", "b"];
let player = 1;
function initialize() {
  initialState = [];
  for (let i = 0; i < 6; ++i) {
    if (i > 1 && i < 4) player = "none";
    else if (i > 3) player = 0;
    for (let j = 0; j < 6; ++j) {
      const randomElement = pieces.splice(
        Math.floor(Math.random() * pieces.length),
        1
      );
      initialState.push({
        player,
        value: i < 2 ? randomElement[0] : "",
        selected: false,
        moveable: false,
      });
    }
  }
  pieces = [1, 2, 2, 3, 3, 4, 6, 8, 10, "z", "b", "b"];
  pieces2 = [1, 2, 2, 3, 3, 4, 6, 8, 10, "z", "b", "b"];
  player = 1;
}

initialize();

const putReducer = (state = initialState, action) => {
  let found = state.find((o) => o.selected);
  let fid = state.findIndex((o) => o.selected);
  let ap = action.payload;

  function move(draftState) {
    draftState[ap.id].value = found.value;
    draftState.map((x) => (x.moveable = false));
    draftState[ap.id].player = ap.player;
    draftState[fid].value = "";
    draftState[fid].selected = false;
    draftState[fid].player = "none";
  }

  function kill(draftState, id = fid) {
    draftState[id].value = "";
    draftState[id].player = "none";
    draftState.map((x) => (x.moveable = false));
    draftState[id].selected = false;
  }
  return produce(state, (draftState) => {
    switch (action.type) {
      case actions.INITIALIZE:
        initialize();
        for (let i = 0; i < 36; i++) {
          draftState[i] = initialState[i];
        }
        break;
      case actions.PUT:
        if (draftState[ap.id].value === "" && ap.sid !== -1) {
          draftState[ap.id].value = ap.value;
        } else if (ap.sid === -1) {
          draftState[ap.id].value = ap.value;
          draftState[fid].value = "";
          draftState[fid].selected = false;
        }
        break;
      case actions.GET:
        if (found) {
          draftState[fid].selected = false;
          draftState[ap.id].selected = true;
        } else {
          draftState[ap.id].selected = true;
        }
        break;
      case actions.SELECT:
        if (found) {
          draftState[fid].selected = false;
        }
        break;
      case actions.PUTBACK:
        if (ap.sid !== -1) {
          draftState[ap.sid].value = "";
          draftState[ap.sid].selected = false;
        }
        break;
      case actions.MOVESELECT:
        draftState.map((x) => (x.moveable = false));
        if (!found) {
          draftState[ap.id].selected = true;
        } else if (found && fid === ap.id) {
          draftState[fid].selected = false;
        } else if (found) {
          draftState[fid].selected = false;
          draftState[ap.id].selected = true;
        }

        let sid = ap.id;
        let selectedPiece = draftState[sid];
        let player = ap.player;
        if (selectedPiece.value !== 2 && fid !== sid) {
          if (sid !== 0 && sid % 6 !== 0) {
            if (
              draftState[sid - 1].player !== player ||
              draftState[sid - 1].value === ""
            ) {
              draftState[sid - 1].moveable = true;
            }
          }
          if (sid % 6 !== 5) {
            if (
              draftState[sid + 1].player !== player ||
              draftState[sid + 1].value === ""
            ) {
              draftState[sid + 1].moveable = true;
            }
          }
          if (sid > 5) {
            if (
              draftState[sid - 6].player !== player ||
              draftState[sid - 6].value === ""
            ) {
              draftState[sid - 6].moveable = true;
            }
          }
          if (sid < 30) {
            if (
              draftState[sid + 6].player !== player ||
              draftState[sid + 6].value === ""
            ) {
              draftState[sid + 6].moveable = true;
            }
          }
        }

        if (selectedPiece.value === 2 && sid !== fid) {
          // nem találtam arról infót, hogy átugorhatja-e a bábúkat vagy sem
          // ezért átugorhatja nálam, csak a tóról találtam ilyen infót
          if (sid < 29) {
            for (let i = sid + 6; i < 36; i += 6) {
              if (draftState[i].player !== player) {
                draftState[i].moveable = true;
              }
            }
          }
          if (sid > 5) {
            for (let i = sid - 6; i > -1; i -= 6) {
              if (draftState[i].player !== player) {
                draftState[i].moveable = true;
              }
            }
          }
          if (sid % 6 !== 5) {
            let i = sid + 1;
            while (i % 6 !== 0 && i < 36) {
              if (draftState[i].player !== player) {
                draftState[i].moveable = true;
              }
              ++i;
            }
          }
          if (sid % 6 !== 0 && sid !== 0) {
            let i = sid - 1;
            while (i % 6 !== 5 && i > -1) {
              if (draftState[i].player !== player) {
                draftState[i].moveable = true;
              }
              --i;
            }
          }
        }
        break;
      case actions.MOVE:
        move(draftState);
        break;
      case actions.ATTACK:
        if (ap.value === "b") {
          if (found.value === 3) {
            move(draftState);
          } else {
            kill(draftState);
          }
        } else if (found.value === 1) {
          if (ap.value === 10) {
            move(draftState);
          } else if (ap.value > found.value) {
            kill(draftState);
          } else if (ap.value === found.value) {
            kill(draftState);
            kill(draftState, ap.id);
          }
        } else {
          if (ap.value > found.value) {
            kill(draftState);
          } else if (ap.value < found.value) {
            move(draftState);
          } else if (ap.value === found.value) {
            kill(draftState);
            kill(draftState, ap.id);
          }
        }
        break;
      case actions.ST2:
        if (state[24].value === "") {
          for (let i = 24; i < 36; i++) {
            const randomElement = pieces2.splice(
              Math.floor(Math.random() * pieces2.length),
              1
            );
            draftState[i].value = randomElement[0];
            console.log(draftState[i].value);
          }
        }
        break;
      default:
        return state;
    }
  });
};

export default putReducer;
