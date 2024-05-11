import { configureStore } from "@reduxjs/toolkit";
import MailSlice from "./MailSlice";
import authSlice from "./AuthSlice";

const store = configureStore({
  reducer: { mail: MailSlice.reducer, auth: authSlice.reducer },
});

export default store;
