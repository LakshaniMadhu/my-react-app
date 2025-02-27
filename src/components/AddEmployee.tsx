import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addEmployee,
  getEmployeeById,
  updateEmployee,
} from "../services/EmployeeService";
const AddEmployeeComponent: React.FC = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    if (id) {
      const fetchEmployee = async () => {
        const employee = await getEmployeeById(Number(id));
        setEmployeeId(String(employee.id));
        setFirstName(employee.firstName);
        setLastName(employee.lastName);
        setEmail(employee.email);
      };
      fetchEmployee();
    }
  }, [id]);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Validation
    if (!employeeId || !firstName || !lastName || !email) {
      setErrorMessage("All fields are required!");
      return;
    }
    if (!/^\d+$/.test(employeeId)) {
      setErrorMessage("ID must be a numeric value!");
      return;
    }
    const employee = { id: employeeId, firstName, lastName, email };
    try {
      if (id) {
        await updateEmployee(Number(id), employee);
      } else {
        await addEmployee(employee);
      }
      navigate("/");
    } catch (error) {
      console.error("Failed to save employee:", error);
      setErrorMessage("An error occurred while saving the employee.");
    }
  };
  return (
    <div className="container mt-3">
      <h3 className="text-primary text-center">
        {id ? "Update Employee" : "Add Employee"}
      </h3>
      {errorMessage && <div className="alert alertdanger">{errorMessage}</div>}
      <form onSubmit={handleSubmit} className="card p-3 shadow">
        <div className="form-group mb-3">
          <label htmlFor="employeeId">ID</label>
          <input
            type="text"
            id="employeeId"
            className="form-control"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
            disabled={!!id}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            className="form-control"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            className="form-control"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? "Update Employee" : "Add Employee"}
        </button>
      </form>
    </div>
  );
};
export default AddEmployeeComponent;
