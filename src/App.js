import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import JobsList from './pages/JobsList';
import Nav from './components/Nav';
import JobDetails from './pages/JobDetails';
import PostAJob from './pages/PostAJob';

function App() {
  return (
    <Router>
      <Nav/>
      <Routes>
        <Route path='/' element={<JobsList/>}/>
        <Route path='/jobDetails/:id' element={<JobDetails/>}/>
        <Route path='postAJob' element={< PostAJob/>}/>
      </Routes>
      <ToastContainer position="top-center" autoClose={2000} />
    </Router>
  );
}

export default App;
