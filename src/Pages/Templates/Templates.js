import React  from "react";
import { Outlet } from 'react-router-dom';

import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Navigation from "../../Components/Navigation/Navigation";

import "./Templates.css"

export const Templates = () => {
    return (
        <div className="MainBody">
            <Header>
                <Navigation />
            </Header>
            <Outlet />
            <Footer />
        </div>
    );
}