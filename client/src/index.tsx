import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Router } from './Router';
import { AppMode, validateUser } from './Login/Login';

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
      .catch((e) => {
        console.error(e)
        setIsAuthenticated(false);
      });
  }, []);

  function liftLoginState(): void {
    validateUser()
    .then((result) => {
      setIsAuthenticated(result);
    })
    .catch((e) => {
      console.error(e)
      setIsAuthenticated(false);
    });
  }

  return (
    <React.StrictMode>
      <Router 
        isAuthenticated={isAuthenticated}
        liftLoginState={liftLoginState}
      />
    </React.StrictMode>
  );
};

root.render(<App />);