import React from "react";
import { useDispatch } from "react-redux";
import { startGoogleLogin } from "../actions/auth";

const LoginScreen = () => {
  const dispatch = useDispatch();

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    dispatch(startGoogleLogin());
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleGoogleLogin}>Login with google</button>
    </div>
  );
};

export default LoginScreen;
