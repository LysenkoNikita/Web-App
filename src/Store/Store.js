import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../Components/Slices/AuthSlice";
import ContentReducer from "../Components/Slices/ContentSlice";
import MenuReducer from "../Components/Slices/MenuSlice";

const store = configureStore({
    reducer: {
        auth: AuthReducer,
        menu: MenuReducer,
        content: ContentReducer
    }
});

export default store;