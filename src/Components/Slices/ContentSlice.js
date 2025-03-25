import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: null,
    id: null,
    author: null,
    title: null,
    lab: null,
    feedback: null,
};

const contentSlice = createSlice({
    name: "content",
    initialState,
    reducers: {
        getItem(state, action) {
            state.data = action.payload;
            state.id = state.data.id;
            state.title = state.data.title;
            state.author = state.data.author;
            state.feedback = state.data.feedback;
            state.lab = state.data.lab;
        }
    },
});

export const { getItem } = contentSlice.actions;
export default contentSlice.reducer;