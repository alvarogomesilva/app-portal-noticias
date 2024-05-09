import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../types";

export const ProtectedRoute = ({ element, permissions }) => {
    const user = useSelector((state: RootState) => state.user);
    
    if (!user.isAuthenticated) {
      return <Navigate to="/login" />;
    }

    if (!permissions.includes(user.currentUser.roleId)) {
      return <Navigate to="/" />;
    }

    return element;
  };