import { ListGroup, Row, Col, Modal, Button } from "react-bootstrap";
import { useState } from "react";
// import { useSelector } from "react-redux";
// import store from "../../Store";

const MailList = (props) => {
  const { onDelete, check } = props;
  const [mail, setMail] = useState(props.mail);
  // console.log(store.getState().mail.recieved);

  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // const reducerData = useSelector((state) => state.mail.recieved);
  // const reducerData2 = useSelector((state) => state.mail.unread);
  // console.log(reducerData2, "reducerData", reducerData);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const onClickHandler = () => {
    setShowModal(true);
  };

  const updatehasRead = () => {
    const getMailID = localStorage.getItem("email");
    const firebaseemail = getMailID.replace(/[.]/g, "");
    fetch(
      `https://mail-18d8e-default-rtdb.firebaseio.com/emails/${firebaseemail}/${mail.name}.json`,
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
          setMail((prevMail) => ({
            ...prevMail,
            hasread: true,
          }));
          return res.json();
        } else {
          return res.json().then((data) => {
            let errormessage = "Authentication Failed";
            throw new Error(errormessage);
          });
        }
      })
      .then((data) => {
        // console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    {
      check && updatehasRead();
    }
  };
  const handleDelete = () => {
    onDelete(mail.id);
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
              <p className="fw-bold ps-2 m-0">
                {" "}
                {!mail.hasread && <>&#x1f535;</>}
                {mail.sender}
              </p>
            </div>{" "}
          </Col>
          <Col lg="10" className="pt-1 pt-lg-0">
            <div>
              <span className="fw-bold">{mail.subject}</span>
              <span className="ps-4">{mail.emailContent}</span>{" "}
            </div>
          </Col>
          <Col lg="1">
            {isHovered && (
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            )}
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
            {mail.emailContent}
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
