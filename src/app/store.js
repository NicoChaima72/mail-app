import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import authReducer from "../features/auth/authSlice";
import mailReducer from "../features/mail/mailSlice";
import answerReducer from "../features/answer/answerSlice";
// import { ui, answer, auth, mail } from "../reducers";
import { ui } from "../reducers";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const reducers = combineReducers({
  ui,
  // mail,
  mail: mailReducer,
  // auth,
  auth: authReducer,
  answer: answerReducer,
});

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
