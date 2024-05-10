import { configureStore } from "@reduxjs/toolkit";
import MailSlice from "./MailSlice";

const store = configureStore({
  reducer: { mail: MailSlice.reducer },
});

export default store;
