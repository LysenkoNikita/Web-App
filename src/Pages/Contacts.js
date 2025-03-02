import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Navigation from "../Components/Navigation";
import Button from "../Components/Button";
import React, {useContext} from "react";
import {ThemeContext} from "../Context/context";
import Container from "../Components/Container";
import RegistrationForm from "../Components/Feedback";

export const Contacts = () => {
    const {toggleTheme} = useContext(ThemeContext);
    return (
        <>
            <Header>
                <Navigation />
                <Button onClick={toggleTheme}>Переключить тему</Button>
            </Header>
            <Container>
                <RegistrationForm />
            </Container>
            <Footer />
        </>
    );
}