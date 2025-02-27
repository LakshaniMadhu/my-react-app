import axios from 'axios';
const API_URL = 'http://localhost:8080/api/employees'; // Replace with yourbackend API URL
export const getEmployees = async () => {
 const response = await axios.get(API_URL);
 return response.data;
};
export const addEmployee = async (employee: {id:string; firstName: string;
lastName: string; email: string }) => {
 const response = await axios.post(API_URL, employee);
 return response.data;
};
export const getEmployeeById = async (id: number) => {
 const response = await axios.get(`${API_URL}/${id}`);
 return response.data;
};
export const updateEmployee = async (id: number, employee: { firstName:
string; lastName: string; email: string }) => {
 const response = await axios.put(`${API_URL}/${id}`, employee);
 return response.data;
};
export const deleteEmployee = async (id: number) => {
 const response = await axios.delete(`${API_URL}/${id}`);
 return response.data;
};
