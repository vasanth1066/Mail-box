import { ListGroup, Row, Col, Form } from "react-bootstrap";

const MailList = (props) => {
  const { mail } = props;

  return (
    <ListGroup.Item>
      <Row>
        <Col lg="3">
          <div className="d-flex">
            <Form>
              <Form.Check onClick={(e) => e.stopPropagation()} />
            </Form>

            <p className="fw-bold ps-3 m-0">
              <i
                className={`bi 
                         "invisible" 
                         bi-record-fill text-primary pe-1`}
              ></i>
              {mail.recipient}
            </p>
          </div>{" "}
        </Col>
        <Col lg="8" className="pt-1 pt-lg-0">
          <div>
            <span className="fw-bold">{mail.subject}</span>
            <span className="ps-2">{`${mail.emailContent.substring(
              0,
              70
            )}...`}</span>
          </div>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default MailList;
