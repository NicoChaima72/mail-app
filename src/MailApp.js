import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";

import "./MailApp.css";
import AppRouter from "./routers/AppRouter";

const MailApp = () => {
  return (
    <Provider store={store}>
      <AppRouter></AppRouter>
    </Provider>
  );
};

export default MailApp;
