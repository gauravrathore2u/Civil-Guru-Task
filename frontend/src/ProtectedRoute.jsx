import React, { useEffect, useState } from 'react';
import { verifyToken } from './apis/api';
import { Navigate, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isNavigate, setIsNavigate] = useState(false);
  console.log("test");

  useEffect(() => {
    async function checkToken() {
      try {
        if (!localStorage.getItem("token")) {
          setIsNavigate(true);
        } else {
          let resp = await verifyToken(localStorage.getItem("token"));
          if (resp?.data?.result !== 1) {
            setIsNavigate(true);
          }
          else{
            setIsNavigate(false);
          }
        }
      } catch (error) {
        console.error("Error while verifying token:", error);
        setIsNavigate(true);
      }
    }

    checkToken();
  }, []);

  if (isNavigate) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
