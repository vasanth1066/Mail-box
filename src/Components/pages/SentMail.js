import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";

import MailList from "./MailList";

const Sent = () => {
  const [sentMails, setSentMails] = useState([]);
  const [loading, setLoading] = useState(true);

  const onDeleteHandler = (mail) => {
    const id = mail.id;
    const name = mail.name;
    const updatedSentMails = sentMails.filter((mail) => mail.id !== id);
    setSentMails(updatedSentMails);

    const getMailID = localStorage.getItem("email");
    const firebaseemail = getMailID.replace(/[.]/g, "");
    fetch(
      `https://mail-18d8e-default-rtdb.firebaseio.com/emails/${firebaseemail}/${name}.json`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (response.ok) {
          // Handle successful deletion
        } else {
          throw new Error("Failed to delete mail");
        }
      })
      .catch((error) => {
        console.error("Error deleting mail:", error);
      });
  };

  useEffect(() => {
    fetchSentMails();
  }, []);

  const fetchSentMails = () => {
    const getMailID = localStorage.getItem("email");
    const firebaseemail = getMailID.replace(/[.]/g, "");
    fetch(
      `https://mail-18d8e-default-rtdb.firebaseio.com/emails/${firebaseemail}.json`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        const keys = Object.values(data);
        let mails = [];
        keys.forEach((key) => {
          const mailwithid = {
            ...data[key],
            Mailid: key,
          };

          mails.push(mailwithid.Mailid);
        });
        setSentMails(mails);
        setLoading(false);
        // console.log(mails);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
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
          </ul>
        </div>
        <div></div>
        <div className="blankarea">
          <div className="border-bottom d-flex align-items-center py-2 px-1 mt-5 mt-lg-0">
            <h2> Sented Mail</h2>
          </div>
          {sentMails.length === 0 ? (
            <>
              <div className="text-center mt-5">
                <h5>No sent messages!</h5>
                <>
                  <a href="/MailEditor">Send an mail</a> now!
                </>
              </div>
            </>
          ) : (
            <ListGroup variant="flush">
              {sentMails.map((mail) => (
                <MailList
                  mail={mail}
                  key={mail.id}
                  onDelete={() => onDeleteHandler(mail)}
                  check={true}
                />
              ))}
            </ListGroup>
          )}
        </div>
      </div>
    </>
  );
};

export default Sent;
