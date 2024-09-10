import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const createUserAccount = createAsyncThunk(
    "createUser",
    async (authData, { rejectWithValue }) => {
        try {
            // sending user data to database
            const response = await fetch(
                `https://plannerapp-backend.onrender.com/api/auth/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(authData),
                }
            );
            
            if (!response.ok) {
                const errorMessage = await response.json();
                return rejectWithValue(errorMessage);
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
        name: "",
        username: "",
        password: "",
        loading: false,
        error: null,
        success: null,
}


const signupUser = createSlice({
    name: "signup",
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            const { name, value } = action.payload; // Getting user input

            // Storing the user input dynamically in state
            return {
                ...state,
                [name]: value,
            };
        },
        clearSignupFields: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUserAccount.pending, (state) => {
                // if the request is pending
                state.loading = true;
                state.error = null;
            })
            .addCase(createUserAccount.fulfilled, (state, action) => {
                // if the request is fullfilled
                // Setting the access token to local storage 
                localStorage.setItem("AUTH_DATA", JSON.stringify(action.payload));
                
                state.loading = false;
                state.success = "Account created successfully!";
            })
            .addCase(createUserAccount.rejected, (state, action) => {
                // if the request is rejected
                state.loading = false;
                state.error = action.payload; // Error message from rejectWithValue
            });
    },
});

export { createUserAccount };

export const { setUserInfo, clearSignupFields } = signupUser.actions;

export default signupUser.reducer;
