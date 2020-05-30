import putReducer from "./board";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import piecesReducer from "./pieces";
import playerReducer from "./player";

const rootReducers = (history) =>
  combineReducers({
    router: connectRouter(history),
    board: putReducer,
    pieces: piecesReducer,
    player: playerReducer,
  });

export default rootReducers;
