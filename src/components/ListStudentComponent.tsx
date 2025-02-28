import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { deleteStudent, getStudents } from "../services/StudentService";
interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

const ListStudentComponent: React.FC = () => {
  const [students, setStudents] = React.useState<Student[]>([]);
  const navigate = useNavigate();
  React.useEffect(() => {
    const fetchStudents = async () => {
      const data = await getStudents();
      setStudents(data);
    };
    fetchStudents();
  }, []);
  const handleUpdate = (id: number) => {
    navigate(`/update-/${id}`);
  };
  const handleDelete = async (id: number) => {
    try {
      await deleteStudent(id);
      setStudents((prev) => prev.filter((Student) => Student.id !== id));
    } catch (error) {
      console.error("Failed to delete student:", error);
    }
    
  };
  const handleAddStudent = () => {
    navigate('/add-student');
    };
   
  return (
    <div className="container mt-3">
      <h3 className="text-primary">Student List</h3>
      <button className="btn btn-primary mb-3"
onClick={handleAddStudent}>
 Add Student
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
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.email}</td>
              <td>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleUpdate(student.id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(student.id)}
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
export default ListStudentComponent;
