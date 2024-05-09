import "./App.css";
import { Route, Routes } from "react-router-dom";

import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import Mail from "./Components/Mail";
import MailEditor from "./Components/pages/MailEditor";
import Sent from "./Components/pages/SentMail";

import InboxMail from "./Components/pages/InboxMail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Mail />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/mail" element={<Mail />} />
      <Route path="/MailEditor" element={<MailEditor />} />
      <Route path="/SentMail" element={<Sent />} />
      <Route path="/inbox" element={<InboxMail />} />
    </Routes>
  );
}

export default App;
