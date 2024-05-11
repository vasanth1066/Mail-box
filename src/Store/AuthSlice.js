import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isLogin: localStorage.getItem("isLogin"),
  idToken: localStorage.getItem("idToken"),
  mailId: localStorage.getItem("email"),
  userMailid: "",
};

const authSlice = createSlice({
  name: "authenticationSlice",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.idToken = action.payload;
      localStorage.setItem("isLogin", true);
      state.isLogin = true;
    },
    getMailid(state, action) {
      state.userMailid = action.payload;
      state.mailId = localStorage.getItem("email");
    },

    logout(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("isLogin");
      localStorage.removeItem("email");

      state.isLogin = false;
      state.idToken = null;

      localStorage.clear();
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
