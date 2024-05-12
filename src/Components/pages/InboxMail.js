import { ListGroup } from "react-bootstrap";
import MailList from "./MailList";
import { useEffect, useState } from "react";
import { authActions } from "../../Store/AuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useApi from "../../Hooks/useApi";

const InboxMail = () => {
  // const [Mails, setMails] = useState([]);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  // useEffect(() => {
  //   fetchinboxMails();
  // }, []);
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     fetchinboxMails();
  //   }, 2000);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);

  // const fetchinboxMails = () => {
  //   const getMailID = localStorage.getItem("email");
  //   const firebaseemail = getMailID.replace(/[.]/g, "");
  //   fetch(
  //     `https://mail-18d8e-default-rtdb.firebaseio.com/inbox/${firebaseemail}.json`
  //   )
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch data");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       const mails = Object.values(data);
  //       setMails(mails);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // };

  const getMailID = localStorage.getItem("email");
  const firebaseemail = getMailID.replace(/[.]/g, "");
  const [Mails] = useApi(
    `https://mail-18d8e-default-rtdb.firebaseio.com/inbox/${firebaseemail}.json`
  );
  // console.log(Mails);

  const inboxmaildeletehandler = () => {};

  const mailId = localStorage.getItem("email");

  const logouthandler = () => {
    dispatch(authActions.logout());
    Navigate("/SignIn");
  };

  return (
    <>
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
            <p>{mailId}</p>
            <button onClick={logouthandler}>Logout</button>
          </ul>
        </div>

        <div className="blankarea">
          <div>
            {!Mails ? (
              <>
                <div className="d-flex mt-5 pt-5 justify-content-center align-items-center">
                  <h4>Your inbox is empty!</h4>
                </div>
              </>
            ) : (
              <ListGroup variant="flush">
                {Mails.map((mail, index) => (
                  <MailList
                    mail={mail}
                    key={index}
                    check={false}
                    onDelete={inboxmaildeletehandler}
                  />
                ))}
              </ListGroup>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default InboxMail;
