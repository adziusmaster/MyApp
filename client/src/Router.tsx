import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home/Home';
import Login, { AppMode, validateUser } from './Login/Login';
import Admin from './Admin/Admin';
import React, { useEffect, useState } from 'react';
import { PrivateRoute } from './PrivateRoutes';

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