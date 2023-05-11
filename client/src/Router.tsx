import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home/Home';
import Login, { AppMode } from './Login/Login';
import Admin from './Admin/Admin';
import React from 'react';

interface PrivateRouteProps {
  isAuthenticated: boolean;
  path: string;
  element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthenticated, path, element }) => {
  return isAuthenticated ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" />
  );
};

interface RouterProps {
  isAuthenticated: boolean;
  liftLoginState: () => void
}

export const Router: React.FC<RouterProps> = ({ isAuthenticated, liftLoginState }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login liftLoginState={liftLoginState}/>} />
        <Route
          path="/admin"
          element={<PrivateRoute
            isAuthenticated={isAuthenticated}
            path="/admin"
            element={<Admin />}
          />}
        />
      </Routes>
    </BrowserRouter>
  );
};