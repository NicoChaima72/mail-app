import React from "react";
import { useDispatch } from "react-redux";
// import { startGoogleLogin } from "../actions/auth";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { googleLogin } from "../features/auth/authSlice";

const LoginScreen = () => {
  const dispatch = useDispatch();

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    // dispatch(startGoogleLogin());
    dispatch(googleLogin());
  };

  return (
    <div className=" w-screen h-full grid grid-cols-12">
      <div className="hidden lg:flex lg:col-span-6 w-full h-full flex-col p-5 bg-gradient-to-r from-sky-600 to-sky-300">
        {/* <h2 className="text-white text-4xl mt-7 mb-5 ml-10">
          The new Mail App
        </h2> */}
        <img
          src={process.env.PUBLIC_URL + "/images/mail-undraw.svg"}
          alt=""
          className="w-9/12 mx-auto my-auto"
        />
      </div>
      <div className="col-span-12 lg:col-span-6 border-l flex p-6 pt-10 md:p-16 xl:p-32 flex-col w-full min-h-screen overflow-y-auto">
        <div className="">
          <h1 className="text-4xl font-medium">Mail App</h1>
          <div className="mt-10">
            <div className="mb-4">
              <label htmlFor="">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="block w-full border rounded p-2"
                disabled
              />
            </div>
            <div className="mb-4">
              <label htmlFor="">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="block w-full border rounded p-2"
                disabled
              />
            </div>
            <button className="cursor-not-allowed mt-5 flex bg-gradient-to-r from-sky-600 to-sky-400 text-white w-full justify-center rounded p-3 space-x-2">
              <p>Sign Up</p>
              <ArrowForwardIcon></ArrowForwardIcon>
            </button>
            <div className="relative border-t border-gray-400 mt-8 mb-7">
              <p
                className="absolute bg-white text-gray-400 px-3"
                style={{
                  top: "-14px",
                  left: "50%",
                  transform: "translate(-50%, 0)",
                }}
              >
                or
              </p>
            </div>
            <button
              className="flex rounded items-center justify-center border-2 border-sky-500 px-2 py-3 bg-white w-full "
              onClick={handleGoogleLogin}
            >
              <img
                src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
                alt="google logo"
                className="w-6 bg-white"
              />
              <p className="pl-2 pr-4 text-sm">Continue with google</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
