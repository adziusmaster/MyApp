import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home/Home';
import Login from './Login/Login';
import Admin from './Admin/Admin';

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
}

export const Router: React.FC<RouterProps> = ({ isAuthenticated }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
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