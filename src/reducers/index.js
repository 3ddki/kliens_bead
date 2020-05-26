import putReducer from "./board";
import { combineReducers } from "redux";
import piecesReducer from "./pieces";
import playerReducer from "./player";

const rootReducers = combineReducers({
  board: putReducer,
  pieces: piecesReducer,
  player: playerReducer,
});

export default rootReducers;
