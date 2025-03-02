import React from 'react';

import {Route, Routes} from "react-router-dom";
import {Home} from "../Pages/Home";
import {About} from "../Pages/About";
import {Contacts} from "../Pages/Contacts";

const Content = ({ lab }) => {
    return (
        <Routes>
            <Route path={"/"} element={<Home/>}/>
            <Route path={"/About"} element={<About/>}/>
            <Route path={"/Contacts"} element={<Contacts/>}/>
        </Routes>
    )}
export default Content;