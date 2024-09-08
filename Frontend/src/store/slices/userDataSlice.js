import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
};

const fetchData = createAsyncThunk(
    "getUserData",
    async (token, { rejectWithValue }) => {
        try {
            const response = await fetch(
                "/api/auth/userData",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
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

const userData = createSlice({
    name: "userData",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload?.data;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export { fetchData };

export default userData.reducer;
