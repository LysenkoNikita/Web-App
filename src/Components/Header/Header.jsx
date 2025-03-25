import React from 'react';

import "./Header.css"

const Header = ({children}) => (
    <header>
        <div className="header_container">
            {children}
        </div>
    </header>
);

export default Header;