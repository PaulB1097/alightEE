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

const UpdateDepModal = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(process.env.REACT_APP_API + "department", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        DepartmentID: event.target.DepartmentID.value,
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
            Edit Department
          </Modal.Title>
        </Modal.Header>
        <ModalBody>
          <Row>
            <Col sm={6}>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="DepartmentID">
                  <Form.Label>DepartmentID</Form.Label>
                  <Form.Control
                    type="text"
                    name="DepartmentID"
                    required
                    disabled
                    defaultValue={props.DepartmentID}
                    placeholder="DepartmentID"
                  />
                </Form.Group>

                <Form.Group controlId="DepartmentName">
                  <Form.Label>DepartmentName</Form.Label>
                  <Form.Control
                    type="text"
                    name="DepartmentName"
                    required
                    defaultValue={props.DepartmentName}
                    placeholder="DepartmentName"
                  />
                </Form.Group>
                <FormGroup>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={props.onHide}
                  >
                    Edit Department
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

export default UpdateDepModal;
