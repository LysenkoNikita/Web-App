import { configureStore } from "@reduxjs/toolkit";

import AuthReducer from "../Components/Slices/AuthSlice";
import ContentReducer from "../Components/Slices/ContentSlice";
import MenuReducer from "../Components/Slices/MenuSlice";

import {authApi} from "../Components/api/authApi";
import {commentsApi} from '../Components/api/commentsApi';
import {createrApi} from '../Components/api/createrApi';
import {gamesApi} from '../Components/api/gamesApi';
import {homeApi} from '../Components/api/homeApi';
import {profileApi} from '../Components/api/profileApi';


const store = configureStore({
    reducer: {
        auth: AuthReducer,
        menu: MenuReducer,
        content: ContentReducer,
        [authApi.reducerPath]: authApi.reducer,
        [commentsApi.reducerPath]: commentsApi.reducer,
        [createrApi.reducerPath]: createrApi.reducer,
        [gamesApi.reducerPath]: gamesApi.reducer,
        [homeApi.reducerPath]: homeApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware)
            .concat(commentsApi.middleware)
            .concat(createrApi.middleware)
            .concat(gamesApi.middleware)
            .concat(homeApi.middleware)
            .concat(profileApi.middleware),
});

export default store;