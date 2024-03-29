import React from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  Form,
  ModalBody,
  FormGroup,
} from "react-bootstrap";

const AddDepModal = (props) => {
  // proper naming
  const handleSubmit = (event) => {
    event.preventDefault();
    props.AddCEOEmploy();
    fetch(process.env.REACT_APP_API + "department", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        DepartmentName: event.target.DepartmentName.value,
      }),
    }).then(() => props.refresh());
  };

  return (
    <div className="container">
      <Modal
        show={props.show}
        onHide={props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Department
          </Modal.Title>
        </Modal.Header>
        <ModalBody>
          <Row>
            <Col sm={6}>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="DepartmentName">
                  <Form.Label>DepartmentName</Form.Label>
                  <Form.Control
                    type="text"
                    name="DepartmentName"
                    required
                    placeholder="DepartmentName"
                  />
                </Form.Group>
                <FormGroup>
                  <Button variant="primary" type="submit">
                    Add Department
                  </Button>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </ModalBody>
        <Modal.Footer>
          <Button variant="danger" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddDepModal;
