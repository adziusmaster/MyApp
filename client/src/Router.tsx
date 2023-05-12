import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home/Home';
import Login, { AppMode, validateUser } from './Login/Login';
import Admin from './Admin/Admin';
import React, { useEffect, useState } from 'react';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const REDIRECT_TO_LOGIN = <Navigate to={"/login"} replace />

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    validateUser()
      .then(result => setIsLoggedIn(result))
      .catch(error => {
        console.error(error);
        setIsLoggedIn(false);
      });
  }, []);

  if (isLoggedIn === undefined) {
    return <div>Loading...</div>;
  }
  if (isLoggedIn) {
    return <>{children}</>;
  }
  return REDIRECT_TO_LOGIN;
};

interface RouterProps {
  liftLoginState: () => void
}

export const Router: React.FC<RouterProps> = ({ liftLoginState }) => {
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
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};