import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from "./store/user/action";
import { RootState } from "./types";
import { AppDispatch } from "./store/store";
import { getToken } from "./utils/getToken";

import { ProtectedRoute } from "./components/ProtectedRoute";
import { ScreenLoading } from "./components/ScreenLoading";

import { Profile } from "./pages/Profile";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Action } from "./pages/Action";
import { NewUser } from "./pages/NewUser";
import { EditUser } from "./pages/EditUser";
import { ListUser } from "./pages/ListUser";
import { NewNotice } from "./pages/NewNotice";
import { ListNotices } from "./pages/ListNotices";
import { EditNotice } from "./pages/EditNotice";

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
          element={<Home />}

        />
        <Route
          path="/login"
          element={user.isAuthenticated ? <Navigate to="/" /> : <Login />}
        />

        <Route
          path="/perfil"
          element={user.isAuthenticated ? <Profile /> : <Navigate to="/login" />}
        />

        <Route
          path="/actions"
          element={<ProtectedRoute element={<Action />} permissions={[1, 2]} />}
        />
        <Route
          path="/new-user"
          element={<ProtectedRoute element={<NewUser />} permissions={[1]} />}
        />

        <Route
          path="/list-user"
          element={<ProtectedRoute element={<ListUser />} permissions={[1]} />}
        />

        <Route
          path="/edit-user/:userId"
          element={<ProtectedRoute element={<EditUser />} permissions={[1]} />}
        />

        <Route
          path="/new-notice"
          element={<ProtectedRoute element={<NewNotice />} permissions={[1, 2]} />}
        />
        <Route
          path="/list-notice"
          element={<ProtectedRoute element={<ListNotices />} permissions={[1, 2]} />}
        />
        <Route
          path="/edit-notice/:noticeId"
          element={<ProtectedRoute element={<EditNotice />} permissions={[1, 2]} />}
        />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
