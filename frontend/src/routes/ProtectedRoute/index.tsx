import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const ProtectedRoute = ({ element, permissions }) => {
  const { user } = useAuth()
  
  if (!user.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!permissions.includes(user.currentUser.roleId)) {
    return <Navigate to="/" />;
  }

  return element;
};