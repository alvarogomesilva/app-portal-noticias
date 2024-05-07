import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from "./store/user/action";
import { RootState } from "./types";

import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import { AppDispatch } from "./store/store";
import { Loading } from "./components/Loading";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
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
    return <Loading/>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <AuthPage />} />
        <Route path="/perfil" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
