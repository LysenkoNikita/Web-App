import React  from "react";
import { Outlet } from 'react-router-dom';

import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

import "./Templates.css"

const Templates = () => {
    return (
        <div className="MainBody">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

export default Templates;