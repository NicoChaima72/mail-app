import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { ui, mail, auth, answer } from "../reducers";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const reducers = combineReducers({
  ui,
  mail,
  auth,
  answer,
});

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
