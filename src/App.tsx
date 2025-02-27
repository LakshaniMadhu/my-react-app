import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListStudentComponent from './components/ListStudentComponent';
import AddStudentComponent from './components/AddStudent';
import Header from './components/Header';
import Footer from './components/Footer';
const App: React.FC = () => {
return (
<div>
<Header />
<Router>
<Routes>
<Route path="/" element={<ListStudentComponent />} />
<Route path="/add-student"
element={<AddStudentComponent />} />
<Route path="/update-student/:id"
element={<AddStudentComponent />} />
</Routes>
</Router>
<Footer />
</div>
);
};
export default App;

