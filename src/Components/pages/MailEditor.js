import { useRef, useState } from "react";
import { Container, Form, Button, InputGroup } from "react-bootstrap";

import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import { useNavigate } from "react-router-dom";

const MailEditor = () => {
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
    const editorContent = convertToRaw(editorState.getCurrentContent());

    const email = {
      recipient: to,
      subject: subject,
      emailContent: editorContent,
      //   sender: mailSender,
    };
    fetch("https://mail-18d8e-default-rtdb.firebaseio.com/emails.json", {
      method: "POST",
      body: JSON.stringify(email),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errormessage = "Authentication Failed";
            if (data && data.error && data.error.message) {
              errormessage = data.error.message;
            }

            throw new Error(errormessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        setIsLoading(false);
        alert("Successfully mail send!!!");
        Navigate("/mail");
      })
      .catch((err) => {
        alert(err.message);
      });

    // try {
    //   const response = await axios.post(
    //     "https://react-mailbox-client-4f470-default-rtdb.firebaseio.com/emails.json",
    //     email,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );
    //   const data = response.data;
    //   if (response.status === 200) {
    //     console.log(data);
    //     dispatch(showNotification({ message: "Sent", variant: "success" }));
    //   }
    // } catch (error) {
    //   console.log(error.message);
    // } finally {
    //   setIsLoading(false);
    // }
  };
  return (
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
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
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
  );
};

export default MailEditor;
