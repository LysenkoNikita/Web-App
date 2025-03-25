import React from 'react';
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";

import {ProfileMenu} from "../ProfileMenu/ProfileMenu";
import {toggleMenu} from "../Slices/MenuSlice";

import "./Navigation.css"

const Navigation = () => {
    const {isAuth} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    return (
        <div className="nav_form">
            <nav className="navigation">
                <div className="nav_container">
                    <div className="left_section">
                        {window.location.pathname === "/home" && (
                            <span className="menu_button" onClick={() => dispatch(toggleMenu())}>≡</span>
                        )}
                    </div>
                    <ul className="nav_navigation center_links">
                        <li className="nav_navigation_item">
                            <Link className="nav_navigation_item_link" to="/home">Главная</Link>
                        </li>
                        <li className="nav_navigation_item">
                            <Link className="nav_navigation_item_link" to="/contacts">Контакты</Link>
                        </li>
                        <li className="nav_navigation_item">
                            <Link className="nav_navigation_item_link" to="/about">О нас</Link>
                        </li>
                        <li className="nav_navigation_item">
                            <Link className="nav_navigation_item_link" to="/support">Поддержка</Link>
                        </li>
                    </ul>
                    <div className="right_section">
                        <ul className="nav_navigation right_links">
                            <li className="user_profile">
                                {isAuth ? (<ProfileMenu></ProfileMenu>) : (<Link className="nav_navigation_item_link" to="/auth">Войти</Link>)}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navigation;