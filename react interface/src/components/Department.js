import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from "react-bootstrap";
import AddDepModal from "./AddDepModal";
import EditDepModal from "./EditDepModal";

function Department() {
  const [state, setState] = useState({
    departments: [],
    employees: [],
    showAddModal: false,
    showEditModal: false,
    depid: "", //proper naming
    depname: "", //proper naming
  });
  const AddCEOEmploy = () => {
    if (state.departments.length === 0) {
      fetch(process.env.REACT_APP_API + "employee", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          CNP: "1111111111111",
          DepartmentName: "CEO",
          EmployeeName: "CEO",
          Email: "CEO@yahoo.com",
          JobTitle: "CEO",
          TeamLead: "CEO",
        }),
      });
    }
  };

  const refresh = () => {
    Promise.all([
      fetch(process.env.REACT_APP_API + "department"),
      fetch(process.env.REACT_APP_API + "department/GetAllEmployee"),
    ]).then(async (employeeFetchResponses) => {
      const resp0 = employeeFetchResponses[0]; // resp proper naming
      const resp1 = employeeFetchResponses[1];

      const departments = await resp0.json();
      const employees = await resp1.json();
      setState({
        employees: employees,
        departments: departments,
      });
    });
  };

  useEffect(() => {
    refresh();
  }, []);

  const deleteDepartment = async (DepartmentID, DepartmentName) => {
    if (window.confirm("Are you sure")) {
      if (checkIfExistEmployeeInDepartment(DepartmentName)) {
        alert("The department cannot be deleted because it contains employees");
      } else if (
        state.departments.length === 1 &&
        state.employees.length === 1
      ) {
        alert(
          "The last department cannot be deleted as long as there is a CEO"
        );
      } else {
        fetch(process.env.REACT_APP_API + "department/" + DepartmentID, {
          method: "DELETE",
          header: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }).then(() => refresh());
      }
    }
  };

  // const checkIfExistCEO = (departmentName) => {
  //   return state.employees.some((employee) => employee.JobTitle === "CEO");
  // };
  const checkIfExistEmployeeInDepartment = (departmentName) => {
    return state.employees.some(
      (employee) => employee.DepartmentName === departmentName
    );
  };

  // console.log(checkIfExistEmployeeInDepartment(61));
  return (
    <div>
      <Table className="mt-4" striped bordered hover size="sm">
        <thead>
          <tr>
            <td>DepartmentID</td>
            <td>DepartmentName</td>
            <td>Options</td>
          </tr>
        </thead>
        <tbody>
          {state.departments.map((dep) => (
            <tr key={dep.DepartmentID}>
              <td>{dep.DepartmentID}</td>
              <td>{dep.DepartmentName}</td>
              <td>
                <ButtonToolbar>
                  <Button
                    className="mr-2"
                    variant="danger"
                    onClick={() =>
                      deleteDepartment(dep.DepartmentID, dep.DepartmentName)
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
                        depid: dep.DepartmentID,
                        depname: dep.DepartmentName,
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
          onClick={() => setState({ ...state, showAddModal: true })}
        >
          Add Department
        </Button>
      </ButtonToolbar>

      <AddDepModal
        show={state.showAddModal}
        onHide={() => setState({ ...state, showAddModal: false })}
        refresh={refresh}
        AddCEOEmploy={AddCEOEmploy}
      ></AddDepModal>

      <EditDepModal
        show={state.showEditModal}
        DepartmentID={state.depid}
        DepartmentName={state.depname}
        onHide={() => setState({ ...state, showEditModal: false })}
        refresh={refresh}
      ></EditDepModal>
    </div>
  );
}

export default Department;
