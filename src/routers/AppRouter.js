import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import LoginScreen from "../pages/LoginScreen";
import MailRouter from "./MailRouter";
import { firebase } from "../firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import { PublicRoute } from "./PublicRouter";
import { PrivateRoute } from "./PrivateRouter";
import { startLoadingMails } from "../actions/mails";

const AppRouter = () => {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user?.uid) {
        dispatch(login(user));
        setIsLoggedIn(true);
        dispatch(startLoadingMails(user.email));
      } else setIsLoggedIn(false);
      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLoggedIn]);

  if (checking) return <h1>Cargando</h1>;

  return (
    <BrowserRouter>
      <PublicRoute
        exact
        path="/login"
        component={LoginScreen}
        isAuthenticated={isLoggedIn}
      ></PublicRoute>

      <PrivateRoute
        exact
        path="/"
        component={MailRouter}
        isAuthenticated={isLoggedIn}
      ></PrivateRoute>
    </BrowserRouter>
  );
};

export default AppRouter;
