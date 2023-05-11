import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home/Home';
import Login, { AppMode } from './Login/Login';
import Admin from './Admin/Admin';
import React from 'react';

interface PrivateRouteProps {
  isAuthenticated: boolean;
  redirectPath?: string;
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  isAuthenticated,
  redirectPath = '/login',
  children,
}) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  return <>{children}</>;
};

interface RouterProps {
  isAuthenticated: boolean;
  liftLoginState: () => void
}

export const Router: React.FC<RouterProps> = ({ isAuthenticated, liftLoginState }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={<Home />} />
        <Route 
          path="/login" 
          element={<Login liftLoginState={liftLoginState} />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} redirectPath={"/login"} >
              <Admin />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};