import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Router } from './Router';
import { validateUser } from './Login/Login';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    validateUser()
      .then((result) => {
        setIsAuthenticated(result);
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  }, []);

  return (
    <React.StrictMode>
      <Router isAuthenticated={isAuthenticated} />
    </React.StrictMode>
  );
};

root.render(<App />);

