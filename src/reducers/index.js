import putReducer from "./board";
import { combineReducers } from "redux";
import piecesReducer from "./pieces";

const rootReducers = combineReducers({
  board: putReducer,
  pieces: piecesReducer,
});

export default rootReducers;
