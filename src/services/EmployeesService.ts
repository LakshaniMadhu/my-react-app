import axios from 'axios';
const API_URL = 'http://localhost:8080/api/employees'; // Replace with your backend API URL
export const getEmployees = async () => {
 const response = await axios.get(API_URL);
 return response.data;
};
