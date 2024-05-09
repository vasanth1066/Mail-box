import React from "react";
import { useNavigate } from "react-router-dom";
import "./Mail.css";

const Mail = () => {
  const Navigate = useNavigate();
  const OnComposemail = () => {
    Navigate("/MailEditor");
  };
  return (
    <div>
      <div>
        <div className="nav_bar_vertical">
          <ul>
            <h5>Mail Box</h5>
            <li>
              <a href=" /mail"> &#9993; Home</a>{" "}
            </li>
            <li>
              <a href="/inbox">&#10003; Inbox</a>{" "}
            </li>
            <li>
              <a href="/SentMail">&#10146; Sent</a>{" "}
            </li>
            <li>
              <a href="/MailEditor">&#9998; Compose</a>{" "}
            </li>
            <li>
              <a href="/trash"> &#10006; Trash</a>{" "}
            </li>
          </ul>
        </div>
        <div>
          <div className="nav_bar">
            <button>Logout</button>
          </div>
        </div>
        <div className="blankarea">
          <h3>Mail Box Client</h3>
          <img src="mail.jpg"></img>

          <button className="btn_btn" onClick={OnComposemail}>
            &#9755; To Compose New Mail
          </button>
        </div>
      </div>
    </div>
  );
};
export default Mail;
