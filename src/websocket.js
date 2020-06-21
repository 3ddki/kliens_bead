import io from "socket.io-client";
import * as actions from "./actions/actionTypes";
import { setGameState, updateState, goBack } from "./actions";

let websocket = null;

export const socket = (store) => (next) => (action) => {
  switch (action.type) {
    case actions.CONNECT:
      websocket = io("http://webprogramozas.inf.elte.hu:3030");

      websocket.on("room-is-full", (ack) => {
        store.dispatch(setGameState("CONNECTING", ack.roomId, ack.player));
      });
      websocket.on("state-changed", (ack) => {
        console.log("State changed");
        console.log(ack.state);
        store.dispatch(updateState(ack.state));
        next(action);
      });
      websocket.on("action-sent", (ack) => {
        console.log("Action sent");
        next(action);
      });
      websocket.on("player-left", (ack) => {
        console.log(`${ack.socketId} left the room with id: ${ack.roomId}`);
        store.dispatch(goBack());
      });
      break;
    case actions.CREATE:
      websocket.emit("create-room", (ack) => {
        if (ack.status === "ok") {
          store.dispatch(setGameState("WAITING", ack.roomId, ack.player));
          next(action);
        } else {
          console.log(`Error: ${ack.message}`);
        }
      });
      break;
    case actions.JOIN:
      websocket.emit("join-room", action.payload.roomNumber, (ack) => {
        if (ack.status === "ok") {
          next(action);
        } else {
          console.log(`Error: ${ack.message}`);
        }
      });
      break;
    case actions.SYNC:
      let state = store.getState();
      websocket.emit(
        "sync-state",
        store.getState().player.roomNumber,
        state,
        true,
        (ack) => {
          console.log("Syncing state");
        }
      );
      next(action);
      break;
    case actions.LEAVEROOM:
      websocket.emit(
        "leave-room",
        store.getState().player.roomNumber,
        (ack) => {
          if (ack.status === "ok") {
            next(action);
          } else {
            console.log(`Error: ${ack.message}`);
          }
        }
      );
      break;
    default:
      return next(action);
  }
};
