import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "aws-amplify/auth";

export const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      await getCurrentUser();
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  // Carga inicial mientras verifica la sesión en Cognito
  if (isAuthenticated === null) {
    return (
      <div className='flex h-screen items-center justify-center bg-slate-900 text-white'>
        <p>Cargando sesión...</p>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to='/admin/login' replace />;
};
