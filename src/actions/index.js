import * as actions from "./actionTypes";

export const putPiece = (id, value, sid, player) => (dispatch) => {
  dispatch({ type: actions.PUT, payload: { id, value, sid, player } });
};

export const getPiece = (id, value, player) => (dispatch) => {
  dispatch({ type: actions.GET, payload: { id, value, player } });
};

export const selectPiece = (id, player) => (dispatch) => {
  dispatch({ type: actions.SELECT, payload: { id, player } });
};

export const putPieceBack = (id, value, sid, player) => (dispatch) => {
  dispatch({ type: actions.PUTBACK, payload: { id, value, sid, player } });
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

export const connectSocket = () => (dispatch) => {
  dispatch({ type: actions.CONNECT });
};

export const joinRoom = (roomNumber) => (dispatch) => {
  dispatch({ type: actions.JOIN, payload: { roomNumber } });
};

export const createRoom = () => (dispatch) => {
  dispatch({ type: actions.CREATE });
};

export const sync = (state) => (dispatch) => {
  dispatch({ type: actions.SYNC, payload: { state } });
};

export const setGameState = (state, roomNumber, player) => (dispatch) => {
  dispatch({
    type: actions.SETGAMESTATE,
    payload: { state, roomNumber, player },
  });
};

export const updateState = (state) => (dispatch) => {
  dispatch({
    type: actions.UPDATESTATE,
    payload: state,
  });
};

export const setReady = () => (dispatch) => {
  dispatch({ type: actions.SETREADY });
};

export const leaveRoom = (roomNumber) => (dispatch) => {
  dispatch({ type: actions.LEAVEROOM, payload: roomNumber });
};

export const goBack = () => (dispatch) => {
  dispatch({ type: actions.BACK });
};
