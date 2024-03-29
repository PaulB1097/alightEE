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

const EditEmployeeModal = (props) => {
  console.log(props);
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(process.env.REACT_APP_API + "employee", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        EmployeeID: event.target.EmployeeID.value,
        CNP: event.target.CNP.value,
        EmployeeName: event.target.EmployeeName.value,
        Email: event.target.Email.value,
        DepartmentName: event.target.DepartmentName.value,
        JobTitle: event.target.JobTitle.value,
        TeamLead: event.target.TeamLead.value,
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
            Edit Employee
          </Modal.Title>
        </Modal.Header>
        <ModalBody>
          <Row>
            <Col sm={6}>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="EmployeeID">
                  <Form.Label>EmployeeID</Form.Label>
                  <Form.Control
                    type="text"
                    name="EmployeeID"
                    required
                    disabled
                    defaultValue={props.EmployeeID}
                    placeholder="EmployeeID"
                  />
                </Form.Group>
                <Form.Group controlId="CNP">
                  <Form.Label>CNP</Form.Label>
                  <Form.Control
                    type="text"
                    name="CNP"
                    required
                    disabled
                    defaultValue={props.EmployeeCNP}
                    placeholder="CNP"
                  />
                </Form.Group>

                <Form.Group controlId="EmployeeName">
                  <Form.Label>EmployeeName</Form.Label>
                  <Form.Control
                    type="text"
                    name="EmployeeName"
                    required
                    defaultValue={props.EmployeeName}
                    placeholder="EmployeeName"
                  />
                </Form.Group>

                <Form.Group controlId="Email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="Email"
                    required
                    defaultValue={props.EmployeeEmail}
                    placeholder="Email"
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="DepartmentName">
                  <Form.Label>DepartmentName</Form.Label>
                  <Form.Control
                    type="text"
                    name="DepartmentName"
                    required
                    defaultValue={props.EmployeeDepartmentName}
                    placeholder="DepartmentName"
                  />
                </Form.Group>

                <Form.Group controlId="JobTitle">
                  <Form.Label>JobTitle</Form.Label>
                  <Form.Control
                    type="text"
                    name="JobTitle"
                    required
                    defaultValue={props.EmployeeJobTitle}
                    placeholder="JobTitle"
                  />
                </Form.Group>
                <Form.Group controlId="TeamLead">
                  <Form.Label>TeamLead</Form.Label>
                  <Form.Control
                    type="text"
                    name="TeamLead"
                    required
                    defaultValue={props.EmployeeTeamLead}
                    placeholder="TeamLead"
                  />
                </Form.Group>
                <FormGroup>
                  <Button variant="primary" type="submit">
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

export default EditEmployeeModal;
