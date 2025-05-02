
import { ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getCurrentUser } from "./authUtils";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const currentUser = getCurrentUser();
  const location = useLocation();
  
  useEffect(() => {
    if (!currentUser) {
      toast.error("Please log in or register to access this page");
    }
  }, [currentUser]);
  
  if (!currentUser) {
    // Redirect to login and remember where they were trying to go
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
