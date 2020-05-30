import * as actions from "./actionTypes";

export const putPiece = (id, value, sid) => (dispatch) => {
  dispatch({ type: actions.PUT, payload: { id, value, sid } });
};

export const getPiece = (id, value) => (dispatch) => {
  dispatch({ type: actions.GET, payload: { id, value } });
};

export const selectPiece = (id) => (dispatch) => {
  dispatch({ type: actions.SELECT, payload: { id } });
};

export const putPieceBack = (id, value, sid) => (dispatch) => {
  dispatch({ type: actions.PUTBACK, payload: { id, value, sid } });
};

export const connectingPlayer = () => (dispatch) => {
  dispatch({ type: actions.CONNECTING });
};

export const playing = () => (dispatch) => {
  dispatch({ type: actions.PLAYING });
};

export const moveSelect = (id, player) => (dispatch) => {
  dispatch({ type: actions.MOVESELECT, payload: { id, player } });
};

export const move = (id, player) => (dispatch) => {
  dispatch({ type: actions.MOVE, payload: { id, player } });
};

export const initialize = () => (dispatch) => {
  dispatch({ type: actions.INITIALIZE });
};

export const st = () => (dispatch) => {
  dispatch({ type: actions.ST });
};

export const st2 = () => (dispatch) => {
  dispatch({ type: actions.ST2 });
};

export const attack = (id, player, value, selected, playerp) => (dispatch) => {
  dispatch({
    type: actions.ATTACK,
    payload: { id, player, value, selected, playerp },
  });
};

export const fighting = (defender, attacker) => (dispatch) => {
  dispatch({ type: actions.FIGHTING, payload: { defender, attacker } });
};
