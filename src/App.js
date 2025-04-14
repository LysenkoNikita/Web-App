import React, {useEffect} from 'react';
import {Route, Routes, Navigate, useLocation, Outlet} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";

import {Templates} from "./Pages/Templates/Templates";
import {Auth} from "./Pages/Auth/Auth";
import {Home} from "./Pages/Home/Home";
import {About} from "./Pages/About";
import {Profile} from "./Pages/Profile/Profile";
import {Contacts} from "./Pages/Contacts";
import {Feedback} from "./Pages/Feedback/Feedback";
import {CreateGame} from "./Pages/CreateGame/CreateGame";
import {GamePage} from "./Pages/GamePage/GamePage";
import AdminUsers from "./Pages/AdminUsers/AdminUsers";

import "./App.css"
import {login} from "./Components/Slices/AuthSlice";


const App = () => {
  return (
      <Routers />
  );
}

const Routers = () => {

    const { isAuth, user} = useSelector((state) => state.auth);
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
        }}, [dispatch])

    return (
        <Routes>
            <Route path="/" element={location.pathname === "/" ? ( <Navigate to="/home" replace />) : ( <Templates /> )}>
                <Route path="home" element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="contacts" element={<Contacts />} />
                <Route path="support" element={<Feedback />} />
                <Route path="games/:id" element={<GamePage />} />
                <Route path="profile" element={isAuth ? (<Profile user={user}/>): (<Home />)} />
                <Route element={<ProtectedRoute allowedRoles={["isAdmin", "isEditor"]}/>}>
                    <Route path={"createGame"} element={<CreateGame />} />
                </Route>
                <Route element={<ProtectedRoute allowedRoles={["isAdmin"]}/>}>
                    <Route path={"userspanel"} element={<AdminUsers />} />
                </Route>
            </Route>
            <Route path="/auth" element={isAuth ? (<Navigate to={location.state?.from || "/home"} replace />) : (<Auth />)} />
            <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
    );
}

export default App;