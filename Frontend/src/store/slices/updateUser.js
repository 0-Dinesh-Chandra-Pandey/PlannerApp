import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {};

const updateUser = createAsyncThunk(
    "updateUser",
    async ({ userId, updatedData }, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `/api/auth/${userId}/updateUser`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedData),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData);
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const updateUserSlice = createSlice({
    name: "updateUser",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            });
    },
});

export { updateUser };

export default updateUserSlice.reducer;