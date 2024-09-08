import { createSlice } from "@reduxjs/toolkit";

const authData = JSON.parse(localStorage.getItem("AUTH_DATA"));

const initialState = {
    user: authData || null,
    loggedIn: authData !== null,
};

const authDetails = createSlice({
    name: "authDetails",
    initialState,
    reducers: {
        setAuthData: (state, action) => {
            state.user = action.payload; // set the user data
            state.loggedIn = Boolean(action.payload); // set the user logged in status
        },
        resetData: (state) => {
            // it will reset the state
            state.user = null;
            state.loggedIn = false;
        }
    },
});

export const { setAuthData, resetData } = authDetails.actions;

export default authDetails.reducer;
