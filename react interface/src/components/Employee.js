import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from "react-bootstrap";
import AddEmpModal from "./AddEmpModal";
import EditEmployeeModal from "./EditEmpModal";

function Employee() {
  const [state, setState] = useState({
    departments: [],
    employees: [],
    teamLeaders: [],
    showAddModal: false,
    showEditModal: false,
    EmployeeID: "",
    EmployeeCNP: "",
    EmployeeName: "",
    EmployeeDepartmentName: "",
    EmployeeEmail: "",
    EmployeeJobTitle: "",
    EmployeeTeamLead: "",
  });

  const refresh = () => {
    Promise.all([
      fetch(process.env.REACT_APP_API + "employee"),
      fetch(process.env.REACT_APP_API + "employee/GetAllDepartments"),
    ]).then(async (employeeFetchResponses) => {
      const resp0 = employeeFetchResponses[0]; // resp propser naming
      const resp1 = employeeFetchResponses[1];

      const employees = await resp0.json();
      const departments = await resp1.json();

      setState({
        employees: employees,
        departments: departments,
      });
    });
  };

  useEffect(() => {
    refresh();
  }, []);

  const deleteEmp = async (EmployeeID, EmployeeName) => {
    if (window.confirm("Are you sure")) {
      if (EmployeeName === "CEO") {
        // console.log("there");
        if (
          window.confirm(
            "If you delete the CEO then all departments and all employees are deleted"
          )
        ) {
          fetch(
            process.env.REACT_APP_API +
              "employee/DeleteAllEmployeesAndDepartments",
            {
              method: "DELETE",
              header: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          ).then(() => refresh());
        }
      } else {
        fetch(process.env.REACT_APP_API + "employee/" + EmployeeID, {
          method: "DELETE",
          header: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }).then(() => refresh());
      }
    }
  };

  const getTeamLidersByDeparment = (department) => {
    const teamLeaders = state.employees.filter((employee) => {
      if (department === null) {
        return employee.DepartmentName;
      }
      return (
        employee.DepartmentName === department ||
        employee.EmployeeName === "CEO"
      );
    });
    return teamLeaders;
  };

  return (
    <div>
      <Table className="mt-4" striped bordered hover size="sm">
        <thead>
          <tr>
            <td>EmployeeID</td>
            <td>CNP</td>
            <td>EmployeeName</td>
            <td>Email</td>
            <td>DepartmentName</td>
            <td>JobTitle</td>
            <td>TeamLead</td>
            <td>Options</td>
          </tr>
        </thead>
        <tbody>
          {state.employees.map((employee) => (
            <tr key={employee.EmployeeID}>
              <td>{employee.EmployeeID}</td>
              <td>{employee.CNP}</td>
              <td>{employee.EmployeeName}</td>
              <td>{employee.Email}</td>
              <td>{employee.DepartmentName}</td>
              <td>{employee.JobTitle}</td>
              <td>{employee.TeamLead}</td>
              <td>
                <ButtonToolbar>
                  <Button
                    className="mr-2"
                    variant="danger"
                    onClick={() =>
                      deleteEmp(employee.EmployeeID, employee.EmployeeName)
                    }
                  >
                    Delete
                  </Button>
                  <Button
                    className="mr-2"
                    variant="info"
                    onClick={() =>
                      setState({
                        ...state,
                        showEditModal: true,
                        EmployeeID: employee.EmployeeID,
                        EmployeeCNP: employee.CNP,
                        EmployeeName: employee.EmployeeName,
                        EmployeeDepartmentName: employee.DepartmentName,
                        EmployeeEmail: employee.Email,
                        EmployeeJobTitle: employee.JobTitle,
                        EmployeeTeamLead: employee.TeamLead,
                      })
                    }
                  >
                    Edit
                  </Button>
                </ButtonToolbar>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ButtonToolbar>
        <Button
          variant="primary"
          onClick={() => {
            if (state.departments.length > 0) {
              setState({ ...state, showAddModal: true });
            } else {
              alert("There are no departments in the list");
            }
          }}
        >
          Add Employee
        </Button>
      </ButtonToolbar>

      {state.showAddModal && (
        <AddEmpModal
          show={state.showAddModal}
          onHide={() => setState({ ...state, showAddModal: false })}
          refresh={refresh}
          departments={state.departments}
          employees={state.employees}
          getTeamLidersByDeparment={getTeamLidersByDeparment}
        ></AddEmpModal>
      )}

      {state.showEditModal && (
        <EditEmployeeModal
          show={state.showEditModal}
          EmployeeID={state.EmployeeID}
          EmployeeCNP={state.EmployeeCNP}
          EmployeeName={state.EmployeeName}
          EmployeeEmail={state.EmployeeEmail}
          EmployeeDepartmentName={state.EmployeeDepartmentName}
          EmployeeJobTitle={state.EmployeeJobTitle}
          EmployeeTeamLead={state.EmployeeTeamLead}
          onHide={() => setState({ ...state, showEditModal: false })}
          refresh={refresh}
        ></EditEmployeeModal>
      )}
    </div>
  );
}

export default Employee;
