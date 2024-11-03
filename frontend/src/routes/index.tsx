import { Navigate, Route, Routes } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { ScreenLoading } from "../components/ScreenLoading"
import { Home } from "../pages/Home"
import { Login } from "../pages/Login"
import { Profile } from "../pages/Profile"
import { Action } from "../pages/Action"
import { NewUser } from "../pages/NewUser"
import { ListUser } from "../pages/ListUser"
import { EditUser } from "../pages/EditUser"
import { NewNotice } from "../pages/NewNotice"
import { ListNotices } from "../pages/ListNotices"
import { EditNotice } from "../pages/EditNotice"
import { ProtectedRoute } from "./ProtectedRoute"


export const AppRoutes = () => {
    const { user, loading } = useAuth()

    if (loading) {
        return <ScreenLoading />
    }

    return (
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
    )
}

export default AppRoutes