import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { validateUser } from "./Login/Login";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const REDIRECT_TO_LOGIN = <Navigate to={"/login"} replace />

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
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