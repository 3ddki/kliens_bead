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
