import { createStore, applyMiddleware, compose } from "redux";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
import { socket } from "./websocket";

export const history = createBrowserHistory();

export default createStore(
  rootReducer(history),
  compose(
    applyMiddleware(thunk, routerMiddleware(history), socket),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
