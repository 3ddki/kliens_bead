import * as actions from "../actions/actionTypes";
import { produce } from "immer";

const initialState = {
  currentPlayer: 1,
  ready: 0,
  player: 0,
  isReady: 0,
  roomNumber: null,
  gameState: null,
};

const playerReducer = (state = initialState, action) => {
  return produce(state, (draftState) => {
    switch (action.type) {
      case actions.CONNECTING:
        draftState.currentPlayer = 0;
        break;
      case actions.PLAYING:
        draftState.currentPlayer = 1;
        break;
      case actions.MOVE:
        if (draftState.currentPlayer === 1) {
          draftState.currentPlayer = 0;
        } else {
          draftState.currentPlayer = 1;
        }
        break;
      case actions.ATTACK:
        if (draftState.currentPlayer === 1) {
          draftState.currentPlayer = 0;
        } else {
          draftState.currentPlayer = 1;
        }
        break;
      case actions.CREATE:
        draftState.player = 0;
        break;
      case actions.SETGAMESTATE:
        draftState.gameState = action.payload.state;
        draftState.roomNumber = action.payload.roomNumber;
        action.payload.player === 2
          ? (draftState.player = 0)
          : (draftState.player = 1);
        break;
      case actions.SETREADY:
        draftState.ready++;
        draftState.isReady = 1;
        break;
      case actions.UPDATESTATE:
        if (state.gameState === "CONNECTING") {
          draftState.ready = action.payload.player.ready;
          if (draftState.ready >= 2) {
            draftState.gameState = "PLAYING";
            draftState.currentPlayer = 1;
          }
        } else {
          draftState.currentPlayer = action.payload.player.currentPlayer;
        }
        break;
      case actions.BACK:
        draftState.gameState = null;
        break;
      default:
        return state;
    }
  });
};

export default playerReducer;
