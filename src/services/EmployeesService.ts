import axios from 'axios';
const API_URL = 'http://localhost:8080/api/students'; // Replace with your backend API URL
export const getStudents = async () => {
 const response = await axios.get(API_URL);
 return response.data;
};
