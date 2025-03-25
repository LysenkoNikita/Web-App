import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";

import Button from "../Button/Button";
import Sun_icon from "../../Img/Theme/light.png";
import Moon_icon from "../../Img/Theme/dark.png";
import {ThemeContext} from "../Context/context";
import {logout} from "../Slices/AuthSlice";

import "./ProfileMenu.css"


export const ProfileMenu = () => {
    const {user} = useSelector((state) => state.auth);
    const {theme, toggleTheme} = useContext(ThemeContext);
    const icon = theme === "light" ? Sun_icon : Moon_icon;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <div className="profile">
            <span className={"profile-user"}>{user.username}</span>
            <div className="dropdown_menu">
                <div className="theme_toggle">
                    <span>Тема: </span>
                    <img className="icon" src={icon} onClick={toggleTheme} alt="Сменить тему" />
                </div>
                <Button className={"btn_profile"} onClick={() => navigate("/profile")}>Профиль</Button>
                <Button className={"btn_logout"} onClick={() => dispatch(logout())}>Выйти</Button>
            </div>
        </div>
    )
}