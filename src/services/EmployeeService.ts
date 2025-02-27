import axios from 'axios';
const API_URL = 'http://localhost:8080/api/employees'; // Replace with yourbackend API URL
export const getStudents = async () => {
 const response = await axios.get(API_URL);
 return response.data;
};
export const addStudents = async (student: {id:string; firstName: string;
lastName: string; email: string }) => {
 const response = await axios.post(API_URL, student);
 return response.data;
};
export const getStudentById = async (id: number) => {
 const response = await axios.get(`${API_URL}/${id}`);
 return response.data;
};
export const updateStudent = async (id: number, student: { firstName:
string; lastName: string; email: string }) => {
 const response = await axios.put(`${API_URL}/${id}`, student);
 return response.data;
};
export const deleteStudent = async (id: number) => {
 const response = await axios.delete(`${API_URL}/${id}`);
 return response.data;
};
