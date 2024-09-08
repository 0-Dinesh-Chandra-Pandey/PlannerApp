import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
}

const fetchUsersTask = createAsyncThunk(
    "fetchUserTasks",
    async (userId, { rejectWithValue }) => {        
        try {
            const tasks = await fetch(`/api/task/${userId}/getTask`, {
                method: "GET",
            });
            
            if (!tasks.ok) {
                const errorMessage = await tasks.json();
                return rejectWithValue(errorMessage);
            }
            
            return await tasks.json();
            
        } catch (error) {
            return rejectWithValue(error);   
        }
    }
);

const getUserTasks = createSlice({
    name: "userTasks",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUsersTask.pending, (state) => {
            state.loading = true;
        }).addCase(fetchUsersTask.fulfilled, (state, action) => {
           state.tasks = action.payload
           state.loading = false; 
        }).addCase(fetchUsersTask.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });
    }
});

export { fetchUsersTask }

export default getUserTasks.reducer;