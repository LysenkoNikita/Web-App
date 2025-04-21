import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Routes, Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "./Components/Slices/AuthSlice";
import "./App.css";

// Lazy-loaded components
const Templates = lazy(() => import("./Pages/Templates/Templates"));
const Auth = lazy(() => import("./Pages/Auth/Auth"));
const Home = lazy(() => import("./Pages/Home/Home"));
const About = lazy(() => import("./Pages/About"));
const Profile = lazy(() => import("./Pages/Profile/Profile"));
const Contacts = lazy(() => import("./Pages/Contacts"));
const Feedback = lazy(() => import("./Pages/Feedback/Feedback"));
const CreateGame = lazy(() => import("./Pages/CreateGame/CreateGame"));
const GamePage = lazy(() => import("./Pages/GamePage/GamePage"));
const AdminUsers = lazy(() => import("./Pages/AdminUsers/AdminUsers"));

const App = () => {
    return (
        <Suspense fallback={<div>Загрузка...</div>}>
            <Routers />
        </Suspense>
    );
}

const Routers = () => {
    const { isAuth, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const location = useLocation();

    const ProtectedRoute = ({ allowedRoles }) => {
        if (!user || !allowedRoles.some(role => user[role] === 1))
            return <Navigate to="/home" replace />;

        return <Outlet />;
    };

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            dispatch(login(userData));
        }
    }, [dispatch]);

    return (
        <Routes>
            <Route path="/" element={location.pathname === "/" ?
                (<Navigate to="/home" replace />) :
                (
                    <Suspense fallback={<div>Загрузка...</div>}>
                        <Templates />
                    </Suspense>
                )}>
                <Route path="home" element={
                    <Suspense fallback={<div>Загрузка...</div>}>
                        <Home />
                    </Suspense>
                } />
                <Route path="about" element={
                    <Suspense fallback={<div>Загрузка...</div>}>
                        <About />
                    </Suspense>
                } />
                <Route path="contacts" element={
                    <Suspense fallback={<div>Загрузка...</div>}>
                        <Contacts />
                    </Suspense>
                } />
                <Route path="support" element={
                    <Suspense fallback={<div>Загрузка...</div>}>
                        <Feedback />
                    </Suspense>
                } />
                <Route path="games/:id" element={
                    <Suspense fallback={<div>Загрузка...</div>}>
                        <GamePage />
                    </Suspense>
                } />
                <Route path="profile" element={
                    isAuth ? (
                        <Suspense fallback={<div>Загрузка...</div>}>
                            <Profile user={user} />
                        </Suspense>
                    ) : (
                        <Navigate to="/home" replace />
                    )
                } />
                <Route element={<ProtectedRoute allowedRoles={["isAdmin", "isEditor"]} />}>
                    <Route path="createGame" element={
                        <Suspense fallback={<div>Загрузка...</div>}>
                            <CreateGame />
                        </Suspense>
                    } />
                </Route>
                <Route element={<ProtectedRoute allowedRoles={["isAdmin"]} />}>
                    <Route path="userspanel" element={
                        <Suspense fallback={<div>Загрузка...</div>}>
                            <AdminUsers />
                        </Suspense>
                    } />
                </Route>
            </Route>
            <Route path="/auth" element={
                isAuth ? (
                    <Navigate to={location.state?.from || "/home"} replace />
                ) : (
                    <Suspense fallback={<div>Загрузка...</div>}>
                        <Auth />
                    </Suspense>
                )
            } />
            <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
    );
}

export default App;