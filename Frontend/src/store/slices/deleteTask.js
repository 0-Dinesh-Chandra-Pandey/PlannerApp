import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {}

const deleteTask = createAsyncThunk(
    "deleteTask",
    async ({ taskId }, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `https://plannerapp-backend.onrender.com/api/task/${taskId}/deleteTask`,
                {
                    method: "DELETE",
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

const deleteTaskSlice = createSlice({
    name: "deleteTask",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(deleteTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            });
    },
});

export { deleteTask };

export default deleteTaskSlice.reducer;