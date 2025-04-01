// Header.jsx
import React from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ProfileMenu } from "../ProfileMenu/ProfileMenu";
import { toggleMenu } from "../Slices/MenuSlice";
import "./Header.css";

const Header = () => {
    const { isAuth } = useSelector((state) => state.auth);
    const { menuOpen } = useSelector((state) => state.menu);
    const dispatch = useDispatch();

    return (
        <header className="header">
            <div className="header__content">
                <div className="header__left">
                    <button
                        className="header__menu-button"
                        onClick={() => dispatch(toggleMenu(!menuOpen))}
                        aria-label="Toggle menu"
                    >
                        <span className="header__menu-icon">☰</span>
                    </button>
                </div>

                <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
                    <ul className="header__nav-list">
                        <li className="header__nav-item">
                            <Link className="header__nav-link" to="/home" onClick={() => dispatch(toggleMenu(false))}>Главная</Link>
                        </li>
                        <li className="header__nav-item">
                            <Link className="header__nav-link" to="/about" onClick={() => dispatch(toggleMenu(false))}>О нас</Link>
                        </li>
                    </ul>
                </nav>
                <form className="header__search-form">
                    <input
                        type="text"
                        className="header__search-input"
                        placeholder="Поиск..."
                        aria-label="Поиск"
                    />
                    <button type="submit" className="header__search-button">
                        <svg className="header__search-icon" viewBox="0 0 24 24" width="18" height="18">
                            <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                        </svg>
                    </button>
                </form>

                <div className="header__right">
                    {isAuth ? (
                        <ProfileMenu className="header__profile-menu" />
                    ) : (
                        <div className="header__auth-buttons">
                            <Link className="header__auth-button" to="/auth">
                                Войти
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;