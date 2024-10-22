import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from "./store/user/action";
import { RootState } from "./types";
import { AppDispatch } from "./store/store";
import { getToken } from "./utils";

import { ProtectedRoute } from "./components/ProtectedRoute";
import { ScreenLoading } from "./components/ScreenLoading";

import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ActionPage from "./pages/ActionPage";
import NewUserPage from "./pages/NewUserPage";
import EditUserPage from "./pages/EditUserPage";
import ListUserPage from "./pages/ListUserPage";
import NewNoticePage from "./pages/NewNoticePage";
import { ListNoticesPage } from "./pages/ListNoticesPage";
import { EditNoticePage } from "./pages/EditNoticePage";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuthentication() {
      const token = getToken()
      if (token) {
        await dispatch(fetchUser());
      }
      setTimeout(() => {
        setLoading(false);
      }, 500);
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

        <Route
          path="/list-user"
          element={<ProtectedRoute element={<ListUserPage />} permissions={[1]} />}
        />

        <Route
          path="/edit-user/:userId"
          element={<ProtectedRoute element={<EditUserPage />} permissions={[1]} />}
        />

        <Route
          path="/new-notice"
          element={<ProtectedRoute element={<NewNoticePage />} permissions={[1, 2]} />}
        />
        <Route
          path="/list-notice"
          element={<ProtectedRoute element={<ListNoticesPage />} permissions={[1, 2]} />}
        />
        <Route
          path="/edit-notice/:noticeId"
          element={<ProtectedRoute element={<EditNoticePage />} permissions={[1, 2]} />}
        />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
