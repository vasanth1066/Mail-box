import { useRef, useState } from "react";
import { Container, Form, Button, InputGroup } from "react-bootstrap";

import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { useNavigate } from "react-router-dom";

import store from "../../Store";

const MailEditor = () => {
  console.log(store.getState().mail.recieved);
  const toRef = useRef();
  const subjectRef = useRef();
  const Navigate = useNavigate();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isLoading, setIsLoading] = useState(false);

  const handleEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const onSubmitHandler = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const to = toRef.current.value;
    const subject = subjectRef.current.value;
    const editorContent = editorState.getCurrentContent().getPlainText();

    const getMailID = localStorage.getItem("email");
    const firebaseemail = getMailID.replace(/[.]/g, "");
    console.log("inedirtor-----------", firebaseemail);

    const email = {
      recipient: to,
      subject: subject,
      emailContent: editorContent,
      sender: getMailID,
      hasread: false,
      id: Math.random(),
    };
    fetch(
      `https://mail-18d8e-default-rtdb.firebaseio.com/emails/${firebaseemail}.json`,
      {
        method: "POST",
        body: JSON.stringify(email),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errormessage = "Authentication Failed";
            throw new Error(errormessage);
          });
        }
      })
      .then((data) => {
        console.log(data.name);
        setIsLoading(false);
        alert("Successfully mail send!!!");

        Navigate("/mail");
      })
      .catch((err) => {
        alert(err.message);
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
            <li>
              <a href="/trash"> &#10006; Trash</a>{" "}
            </li>
          </ul>
        </div>
        <div className="blankarea">
          <Container>
            <Form onSubmit={onSubmitHandler} className="p-1">
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">To</InputGroup.Text>
                <Form.Control
                  placeholder="example@gmail.com"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  ref={toRef}
                  required
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Subject</InputGroup.Text>
                <Form.Control
                  placeholder=""
                  aria-label="subject"
                  aria-describedby="basic-addon2"
                  ref={subjectRef}
                  required
                />
              </InputGroup>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Editor
                  toolbarClassName="py-3 border-bottom bg-light"
                  wrapperClassName="card mt-3"
                  editorClassName="card-body pt-0 "
                  editorStyle={{ minHeight: "20rem" }}
                  editorState={editorState}
                  onEditorStateChange={handleEditorStateChange}
                  options={{}}
                />
              </Form.Group>
              <div>
                <Button
                  type="submit"
                  variant="info "
                  className="bg-gradient shadow rounded-0 px-4"
                >
                  {isLoading ? "Sending" : "Send"}
                </Button>
              </div>
            </Form>
          </Container>
        </div>
      </div>
    </>
  );
};

export default MailEditor;
