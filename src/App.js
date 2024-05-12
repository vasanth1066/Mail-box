import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";

import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import Mail from "./Components/Mail";
import MailEditor from "./Components/pages/MailEditor";
import Sent from "./Components/pages/SentMail";

import InboxMail from "./Components/pages/InboxMail";

import { useSelector } from "react-redux";

function App() {
  const isLogin = useSelector((state) => state.auth.isLogin);
  // const isLogin = localStorage.getItem("isLogin");
  // console.log("isLogin", isLogin);

  return (
    <Routes>
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/SignUp" element={<SignUp />} />
      {isLogin && <Route path="/mail" element={<Mail />} />}
      {isLogin && <Route path="/MailEditor" element={<MailEditor />} />}
      {isLogin && <Route path="/SentMail" element={<Sent />} />}
      {isLogin && <Route path="/inbox" element={<InboxMail />} />}

      {!isLogin && (
        <Route path="/*" element={<Navigate replace to="/SignIn" />}></Route>
      )}
      {isLogin && (
        <Route path="/*" element={<Navigate replace to="/mail" />}></Route>
      )}
    </Routes>
  );
}

export default App;
