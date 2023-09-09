import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import { Routes, Route } from 'react-router-dom';
import Edit from './components/Edit';
import Details from './components/Details';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Navbar/>
      <ToastContainer />
      <Routes >
        <Route exact  path="/" element={<Home/>} />
        <Route path="/register" element={<Register/>} />
        <Route path='/edit/:id' element={<Edit/>} />
        <Route path='/user/:id' element={<Details/>} />
      </Routes>


    </>
  );
}

export default App;
