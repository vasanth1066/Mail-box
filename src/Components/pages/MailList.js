import { ListGroup, Row, Col, Form, Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { useSelector } from "react-redux";
import store from "../../Store";

const MailList = (props) => {
  const [hasread, setHasread] = useState(false);
  const { mail } = props;
  console.log(store.getState().mail.recieved);

  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const reducerData = useSelector((state) => state.mail.recieved);
  const reducerData2 = useSelector((state) => state.mail.unread);
  console.log(reducerData2, "reducerData", reducerData);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const onClickHandler = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setHasread(true);

    const getMailID = localStorage.getItem("email");
    const firebaseemail = getMailID.replace(/[.]/g, "");
    fetch(
      `https://mail-18d8e-default-rtdb.firebaseio.com/emails/${firebaseemail}/-NxTEfas5IKKC6WtGB43.json`,
      {
        method: "PATCH",
        body: JSON.stringify({ hasread: true }),
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
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      <ListGroup.Item
        className={`mb-1 py-2 border-bottom  ${
          isHovered ? "bg-secondary rounded bg-opacity-80" : ""
        }`}
        onClick={onClickHandler}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: "pointer" }}
      >
        <Row>
          <Col lg="3">
            <div className="d-flex">
              <Form>
                <Form.Check
                  checked={mail.isChecked}
                  onChange={() => {}}
                  onClick={(e) => e.stopPropagation()}
                />
              </Form>

              <p className="fw-bold ps-2 m-0">
                {" "}
                {!hasread && <>&#x1f535;</>}
                {mail.sender}
              </p>
            </div>{" "}
          </Col>
          <Col lg="8" className="pt-1 pt-lg-0">
            <div>
              <span className="fw-bold">{mail.subject}</span>
              <span className="ps-4">{mail.emailContent}</span>{" "}
            </div>
          </Col>
        </Row>
      </ListGroup.Item>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <p>
              <strong>From : {mail.sender} </strong>
            </p>
            <h5>
              <strong>To : {mail.recipient} </strong>
            </h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 style={{ textAlign: "center" }}>Subject - {mail.subject}</h4>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
        <Modal.Body>
          <p>
            <strong>Content:</strong>
            <div> {mail.emailContent}</div>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MailList;
