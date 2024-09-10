import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const checkUserLogin = createAsyncThunk(
    "userLogin",
    async (authData, { rejectWithValue }) => {
        try {
            const response = await fetch(
                "https://plannerapp-backend.onrender.com/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(authData),
                }
            );
            
            // checking response if error returning error
            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData);
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const loginUser = createSlice({
    name: "login",
    initialState: [
        {
            username: "",
            password: "",
            loading: false,
            error: null,
            success: null,
        },
    ],
    reducers: {
        setUserInfo: (state, action) => {
            const { name, value } = action.payload; // Getting user input
            // Storing the user input dynamically in state
            return {
                ...state,
                [name]: value,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkUserLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkUserLogin.fulfilled, (state, action) => {                
                // Setting the access token to local storage 
                localStorage.setItem("AUTH_DATA", JSON.stringify(action.payload));
                state.loading = false;
                state.success = "Logged in successfully!";
            })
            .addCase(checkUserLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export { checkUserLogin };

export const { setUserInfo } = loginUser.actions;

export default loginUser.reducer;
