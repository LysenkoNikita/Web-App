import React from 'react';
import Button from "./Button";

const Menu = ({ labs, onSelect }) => (

    <div>
        <nav style={{
        height: '100%', // Занимает всю высоту родителя
        display: 'flex', // Включаем Flexbox
        flexDirection: 'column', // Элементы внутри выстраиваются вертикально
        justifyContent: 'flex-start',
        width: '200px',
        padding: '1rem'
        }}>
        <h3>Список работ:</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
            {labs.map(lab => (
                <li key={lab.id} style={{ margin: '0.5rem 0' }}>
                    <Button
                        onClick={() => onSelect(lab.id)}
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            cursor: 'pointer'
                        }}
                    >
                        {lab.title}
                    </Button>
                </li>
                ))}
            </ul>
        </nav>
    </div>
);

export default Menu;