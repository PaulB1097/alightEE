import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  Form,
  ModalBody,
  FormGroup,
} from "react-bootstrap";

const AddEmpModal = (props) => {
  const [validated, setValidated] = useState(false);
  const [newUserDepartment, setNewUserDepartment] = useState("");
  const [teamLeaders, setTeamLeaders] = useState([]);

  useEffect(() => {
    displayTeamLiders(newUserDepartment);
  }, [newUserDepartment]);

  useEffect(() => {
    const firstAvailableDepartment = props.departments[0].DepartmentName;
    setTeamLeaders(props.getTeamLidersByDeparment(firstAvailableDepartment));
  }, []);

  const handleSubmit = (event) => {
    setValidated(true);

    if (event.target.EmployeeName.value !== "CEO") {
      const employeeToTeamLeader = props.employees.filter(
        (employee) => employee.EmployeeName === event.target.TeamLead.value
      );

      fetch(process.env.REACT_APP_API + "employee", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          EmployeeID: employeeToTeamLeader[0].EmployeeID,
          CNP: employeeToTeamLeader[0].CNP,
          EmployeeName: employeeToTeamLeader[0].EmployeeName,
          Email: employeeToTeamLeader[0].Email,
          DepartmentName: employeeToTeamLeader[0].DepartmentName,
          JobTitle: "TeamLead",
          TeamLead: employeeToTeamLeader[0].TeamLead,
        }),
      }).then(() => {
        fetch(process.env.REACT_APP_API + "employee", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            CNP: event.target.CNP.value,
            EmployeeName: event.target.EmployeeName.value,
            Email: event.target.Email.value,
            DepartmentName: event.target.DepartmentName.value,
            JobTitle: event.target.JobTitle.value,
            TeamLead: event.target.TeamLead.value,
          }),
        });
      });
    }
  };

  const displayTeamLiders = (department) => {
    const teamLeaderList = props.getTeamLidersByDeparment(department);
    setTeamLeaders(teamLeaderList);
    // console.log(teamLeaderList);
  };

  const handleFormOnChange = (event) => {
    event.preventDefault();
    setNewUserDepartment(event.target.value);
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
            Add Employee
          </Modal.Title>
        </Modal.Header>
        <ModalBody>
          <Row>
            <Col sm={6}>
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="CNP">
                  <Form.Label>CNP</Form.Label>
                  <Form.Control
                    type="text"
                    name="CNP"
                    required
                    placeholder="CNP"
                  />
                </Form.Group>

                <Form.Group controlId="EmployeeName">
                  <Form.Label>EmployeeName</Form.Label>
                  <Form.Control
                    type="text"
                    name="EmployeeName"
                    required
                    placeholder="EmployeeName"
                  />
                </Form.Group>

                <Form.Group controlId="Email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="Email"
                    required
                    placeholder="Email"
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="DepartmentName">
                  <Form.Label>DepartmentName</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={(event) => {
                      handleFormOnChange(event);
                    }}
                  >
                    {props.departments.map((dep) => (
                      <option key={dep.DepartmentName}>
                        {dep.DepartmentName}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="JobTitle">
                  <Form.Label>JobTitle</Form.Label>
                  <Form.Control
                    type="text"
                    name="JobTitle"
                    defaultValue="employee"
                    placeholder="JobTitle"
                    disabled
                  />
                </Form.Group>
                <Form.Group controlId="TeamLead">
                  <Form.Label>TeamLead</Form.Label>
                  <Form.Control as="select">
                    {teamLeaders.map((teamLeader) => (
                      <option key={teamLeader.EmployeeName}>
                        {teamLeader.EmployeeName}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <FormGroup>
                  <Button variant="primary" type="submit">
                    Add Employee
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

export default AddEmpModal;
