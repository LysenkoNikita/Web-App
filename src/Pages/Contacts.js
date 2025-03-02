import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Navigation from "../Components/Navigation";
import Button from "../Components/Button";
import React, {useContext} from "react";
import {ThemeContext} from "../Context/context";
import Container from "../Components/Container";

export const Contacts = () => {
    const {toggleTheme} = useContext(ThemeContext);
    return (
        <>
            <Header>
                <Navigation />
                <Button onClick={toggleTheme}>Переключить тему</Button>
            </Header>
            <Container>
                <h2>Contacts</h2>
            </Container>
            <Footer />
        </>
    );
}