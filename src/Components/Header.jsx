import React from 'react';

const Header = ({children}) => (
    <header style={{
        backgroundColor: '#333',
        color: 'white',
        padding: '1rem',
        textAlign: 'center'
    }}>
        <h1>{children}</h1>
    </header>
);

export default Header;