import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuth: Boolean(localStorage.getItem("user"))
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            state.user = action.payload;
            state.isAuth = true;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logout(state) {
            state.user = null;
            state.isAuth = false;
            localStorage.removeItem("user");
        },
        setUser(state, action) {
            // Обновляем только указанные поля пользователя
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
                localStorage.setItem("user", JSON.stringify(state.user));
            }
        },
    },
});

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;