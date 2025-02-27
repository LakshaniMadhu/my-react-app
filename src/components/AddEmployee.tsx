import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addStudent,
  getStudentById,
  updateStudent,
} from "../services/StudentService";
const AddStudentComponent: React.FC = () => {
  const [studentId, setStudentId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    if (id) {
      const fetchStudent = async () => {
        const student = await getStudentById(Number(id));
        setStudentId(String(student.id));
        setFirstName(student.firstName);
        setLastName(student.lastName);
        setEmail(student.email);
      };
      fetchStudent();
    }
  }, [id]);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Validation
    if (!studentId || !firstName || !lastName || !email) {
      setErrorMessage("All fields are required!");
      return;
    }
    if (!/^\d+$/.test(studentId)) {
      setErrorMessage("ID must be a numeric value!");
      return;
    }
    const student = { id: studentId, firstName, lastName, email };
    try {
      if (id) {
        await updateStudent(Number(id), student);
      } else {
        await addStudent(student);
      }
      navigate("/");
    } catch (error) {
      console.error("Failed to save student:", error);
      setErrorMessage("An error occurred while saving the student.");
    }
  };
  return (
    <div className="container mt-3">
      <h3 className="text-primary text-center">
        {id ? "Update Student" : "Add Employee"}
      </h3>
      {errorMessage && <div className="alert alertdanger">{errorMessage}</div>}
      <form onSubmit={handleSubmit} className="card p-3 shadow">
        <div className="form-group mb-3">
          <label htmlFor="studentId">ID</label>
          <input
            type="text"
            id="studentId"
            className="form-control"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
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
          {id ? "Update Student" : "Add Student"}
        </button>
      </form>
    </div>
  );
};
export default AddStudentComponent;
