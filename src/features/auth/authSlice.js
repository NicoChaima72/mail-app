import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { firebase, googleAuthProvider } from "../../firebase/firebaseConfig";

const initialState = {
  loading: false,
  user: {},
  error: "",
};

export const googleLogin = createAsyncThunk("auth/googleLogin", () => {
  return firebase
    .auth()
    .signInWithPopup(googleAuthProvider)
    .then(({ user }) => user);
});

export const logout = createAsyncThunk("auth/logout", async () => {
  return await firebase.auth().signOut();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(googleLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(googleLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(googleLogin.rejected, (state, action) => {
      state.loading = false;
      state.user = {};
      state.error = action.payload.message;
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
      state.user = {};
    });
  },
});

export default authSlice.reducer;
export const { login } = authSlice.actions;
