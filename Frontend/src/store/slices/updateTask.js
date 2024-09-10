import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {};

const updateTask = createAsyncThunk(
    "updateTask",
    async ({ taskId, updatedData }, { rejectWithValue }) => {

        try {

            const response = await fetch(
                `https://plannerapp-backend.onrender.com/api/task/${taskId}/updateTask`,
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
            console.log(error);

            return rejectWithValue(error);
        }
    }
);

const updateTaskSlice = createSlice({
    name: "updateTask",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(updateTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.loading = false;
                state.changed = true;
                state.message = action.payload;
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.loading = false;
                state.changed = false;
                state.message = action.payload;
            });
    },
});

export { updateTask };

export default updateTaskSlice.reducer;
