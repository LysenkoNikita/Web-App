import React, {useContext} from "react";

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Navigation from "../Components/Navigation";
import Button from "../Components/Button";
import {ThemeContext} from "../Context/context";
import Container from "../Components/Container";
import Counter from "../Components/Counter";

export const Home = () => {
    const {toggleTheme} = useContext(ThemeContext);
    return (
        <>
            <Header>
                <Navigation />
                <Button onClick={toggleTheme}>Переключить тему</Button>
            </Header>
            <Container>
                <Counter />
            </Container>
            <Footer />
        </>
    );
}
