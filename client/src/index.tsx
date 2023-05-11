import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Router } from './Router';
import { AppMode, validateUser } from './Login/Login';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);

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
  
  if (isAuthenticated === undefined) {
    // Authentication status is being checked
    return <div>Loading...</div>;
  } else {
    // Authentication status check is complete, render the Router component
    return (
      <React.StrictMode>
        <Router 
          isAuthenticated={isAuthenticated}
          liftLoginState={liftLoginState}
        />
      </React.StrictMode>
    );
  }
};

root.render(<App />);