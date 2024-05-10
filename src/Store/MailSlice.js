import { createSlice } from "@reduxjs/toolkit";

const MailSlice = createSlice({
  name: "email",
  initialState: {
    recieved: [],
    send: [],
    unread: "",
    email:
      localStorage.getItem("email")?.replace(".", "")?.replace("@", "") || "",
  },

  reducers: {
    recievedMail(state, action) {
      state.recieved.push(action.payload);
    },
    sendMail(state, action) {
      state.send = action.payload;
    },
    unreadMessage(state, action) {
      state.unread = action.payload;
    },
  },
});

export const MailActions = MailSlice.actions;
export default MailSlice;
