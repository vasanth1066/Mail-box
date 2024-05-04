import "./App.css";
import { Route, Routes } from "react-router-dom";

import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import Mail from "./Components/Mail";
import MailEditor from "./Components/pages/MailEditor";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/mail" element={<Mail />} />
      <Route path="/MailEditor" element={<MailEditor />} />
    </Routes>
  );
}

export default App;
