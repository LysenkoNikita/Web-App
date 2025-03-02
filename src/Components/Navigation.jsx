import React from 'react';
import {useNavigate} from "react-router-dom";
import Button from './Button';

const Navigation = () => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/'); // Переход на страницу "О нас"
    };

    const goToAbout = () => {
        navigate('/about'); // Переход на страницу "О нас"
    };

    const goToContact = () => {
        navigate('/contacts'); // Переход на страницу "Контакты"
    };
  return (
    <div className="nav_form" style={{display: 'flex', flexWrap: 'nowrap', justifyContent: 'center'}}>
        <nav className="navigation" style={{maragin: "50"}}>
            <Button onClick={goToHome}>Домашняя страница</Button>
            <Button onClick={goToAbout}>О нас</Button>
            <Button onClick={goToContact}>Контакты</Button>
        </nav>
    </div>
  );
}

export default Navigation;