import { firebase, googleAuthProvider } from "../firebase/firebaseConfig";
import { types } from "../types/types";
import { mailLogout } from "./mails";

export const startGoogleLogin = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user));
      });
  };
};

export const login = (user) => ({
  type: types.login,
  payload: user,
});

export const startLogout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();

    dispatch(logout());
    dispatch(mailLogout());
  };
};

export const logout = () => ({
  type: types.logout,
});
