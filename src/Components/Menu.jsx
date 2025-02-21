import React from 'react';
import Button from "./Button";

const Menu = ({ labs, onSelect }) => (
    <nav style={{
        width: '200px',
        backgroundColor: '#f4f4f4',
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
);

export default Menu;