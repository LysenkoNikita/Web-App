import React from 'react';
import Button from './Button';

const Navigation = () => {
  return (
    <div className="nav_form" style={{display: 'flex', flexWrap: 'nowrap', justifyContent: 'center'}}>
        <nav className="navigation" style={{maragin: "50"}}>
            <Button onClick={() => alert("Домашняя страница")}>Домашняя страница</Button>
            <Button onClick={() => alert("О нас")}>О нас</Button>
            <Button onClick={() => alert("Контакты")}>Контакты</Button>
        </nav>
    </div>
  );
}

export default Navigation;