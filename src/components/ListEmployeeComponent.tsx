import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { deleteEmployee, getEmployees } from "../services/EmployeeService";
interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

const ListEmployeeComponent: React.FC = () => {
  const [employees, setEmployees] = React.useState<Employee[]>([]);
  const navigate = useNavigate();
  React.useEffect(() => {
    const fetchEmployees = async () => {
      const data = await getEmployees();
      setEmployees(data);
    };
    fetchEmployees();
  }, []);
  const handleUpdate = (id: number) => {
    navigate(`/update-employee/${id}`);
  };
  const handleDelete = async (id: number) => {
    try {
      await deleteEmployee(id);
      setEmployees((prev) => prev.filter((employee) => employee.id !== id));
    } catch (error) {
      console.error("Failed to delete employee:", error);
    }
    
  };
  const handleAddEmployee = () => {
    navigate('/add-employee');
    };
   
  return (
    <div className="container mt-3">
      <h3 className="text-primary">Employee List</h3>
      <button className="btn btn-primary mb-3"
onClick={handleAddEmployee}>
 Add Employee
 </button>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleUpdate(employee.id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(employee.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ListEmployeeComponent;
