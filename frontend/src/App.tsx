import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from "./store/user/action";
import { RootState } from "./types";

import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import { AppDispatch } from "./store/store";
import { ScreenLoading } from "./components/ScreenLoading";
import ActionPage from "./pages/ActionPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import NewUserPage from "./pages/NewUserPage";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuthentication() {
      const token = localStorage.getItem('@u');
      if (token) {
        await dispatch(fetchUser());
      }
      setLoading(false);
    }

    checkAuthentication();
  }, [dispatch]);

  if (loading) {
    return <ScreenLoading />
  }


  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={<HomePage />} 
        
        />
        <Route 
          path="/login" 
            element={user.isAuthenticated ? <Navigate to="/" /> : <AuthPage />} 
          />

        <Route
          path="/perfil"
          element={user.isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />}
        />

        <Route
          path="/actions"
          element={<ProtectedRoute element={<ActionPage />} permissions={[1, 2]} />}
        />
        <Route
          path="/new-user"
          element={<ProtectedRoute element={<NewUserPage />} permissions={[1]} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
