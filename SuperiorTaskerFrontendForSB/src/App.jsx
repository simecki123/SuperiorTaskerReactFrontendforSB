import {useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import './App.css'
import LoginScreen from './loginComponent/LoginComponent';
import RegisterScreen from './registerComponent/RegisterComponent';
import TryMeComponent from './TryMePage/TryMeComponent';
import PropTypes from 'prop-types';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/" />;
  };

  ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired
  };

  return (
    <>
       <Router>
        <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/mainpage" element={
              <ProtectedRoute>
                <TryMeComponent />
              </ProtectedRoute>
            } />
        </Routes>
       </Router>
    </>
  )
}

export default App
