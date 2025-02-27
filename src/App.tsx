import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import AddEmployeeComponent from './components/AddEmployee';
import Header from './components/Header';
import Footer from './components/Footer';
const App: React.FC = () => {
return (
<div>
<Header />
<Router>
<Routes>
<Route path="/" element={<ListEmployeeComponent />} />
<Route path="/add-employee"
element={<AddEmployeeComponent />} />
<Route path="/update-employee/:id"
element={<AddEmployeeComponent />} />
</Routes>
</Router>
<Footer />
</div>
);
};
export default App;

