import "./App.css";
import { Route, Routes } from "react-router-dom";

import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import Mail from "./Components/Mail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/mail" element={<Mail />} />
    </Routes>
  );
}

export default App;
