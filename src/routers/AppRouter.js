import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import LoginScreen from "../pages/LoginScreen";
import MailRouter from "./MailRouter";
import { firebase } from "../firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { fetchMails } from "../features/mail/mailSlice";
import { PublicRoute } from "./PublicRouter";
import { PrivateRoute } from "./PrivateRouter";
import { CircularProgress } from "@mui/material";

const AppRouter = () => {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user?.uid) {
        dispatch(login(user));
        dispatch(
          fetchMails({
            user: { uid: user.uid, email: user.email },
            path: window.location.pathname,
          })
        );
        setIsLoggedIn(true);
      } else setIsLoggedIn(false);
      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLoggedIn]);

  if (checking)
    return (
      <div className="bg-white w-screen min-h-screen flex items-center justify-center">
        <div className="">
          <h1 className="text-3xl text-center">MailApp</h1>
          <div className="text-center mx-auto mt-2">
            <CircularProgress color="primary" size={30}></CircularProgress>
          </div>
        </div>
      </div>
    );

  return (
    <BrowserRouter>
      <PublicRoute
        exact
        path="/login"
        component={LoginScreen}
        isAuthenticated={isLoggedIn}
      ></PublicRoute>

      <PrivateRoute
        path="/"
        component={MailRouter}
        isAuthenticated={isLoggedIn}
      ></PrivateRoute>
    </BrowserRouter>
  );
};

export default AppRouter;
