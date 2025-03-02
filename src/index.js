import React from 'react';
import {Provider} from 'react-redux'

import store from './Store/Store';
import {createRoot} from 'react-dom/client';
import {ThemeProvider} from './Context/context';
import {BrowserRouter} from "react-router-dom"

import "./App.css"
import App from './App.js';

const root = createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </BrowserRouter>
    </Provider>

)

