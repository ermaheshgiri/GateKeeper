import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import VisitorForm from './pages/VisitorForm';
import VisitorList from './pages/VisitorList';
import SecurityCheckIn from './pages/SecurityCheckIn';
import SecurityCheckOut from './pages/SecurityCheckOut';
import PrivateRoute from './components/PrivateRoute';
import './styles.css';

export default function App(){
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />
      <Route path="/visitors/create" element={<PrivateRoute><VisitorForm/></PrivateRoute>} />
      <Route path="/visitors" element={<PrivateRoute><VisitorList/></PrivateRoute>} />
      <Route path="/security/checkin" element={<PrivateRoute><SecurityCheckIn/></PrivateRoute>} />
      <Route path="/security/checkout" element={<PrivateRoute><SecurityCheckOut/></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
