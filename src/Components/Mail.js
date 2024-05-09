import React from "react";
import { useNavigate } from "react-router-dom";
import SentMail from "./pages/SentMail";

const Mail = () => {
  const Navigate = useNavigate();
  const OnComposemail = () => {
    Navigate("/MailEditor");
  };
  return (
    <div>
      <h3 className="fw-bold">Welcome</h3>
      <button className="btn btn-primary" onClick={OnComposemail}>
        Compose
      </button>
    </div>
  );
};
export default Mail;
