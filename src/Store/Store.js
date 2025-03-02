import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../Components/CounterSlice";

const store = configureStore({
    reducer: {
        counter: counterReducer,
    }
});

export default store;