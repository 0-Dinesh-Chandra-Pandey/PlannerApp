import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const userID = JSON.parse(localStorage.getItem("AUTH_DATA"))?.userId || null; // GETTING USER ID FROM LOCAL STORAGE

// GIVING DEADLINE DEFAULT VALUE
const defaultDeadline = () => {
    const today = new Date();

    const defaultDeadline = new Date(today);

    defaultDeadline.setDate(today.getDate() + 30);

    const formattedDate = defaultDeadline.toISOString().split("T")[0];
    return formattedDate;
};

// Setting today's date
const todayDate = () => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    return formattedDate;
};

const initialState = {
    title: "",
    description: "",
    priority: "normal",
    deadline: defaultDeadline(),
    start: todayDate(),
    loading: false,
    showDialogueBox: false,
};

const addUserTask = createAsyncThunk(
    "addUserTask",
    async (inputTaskData, { rejectWithValue }) => {
        // Checking if userID valid or not
        try {
            // SENDING POST REQUEST
            const response = await fetch(
                `https://plannerapp-backend.onrender.com/api/task/${userID}/addTask`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(inputTaskData),
                }
            );

            // checking response
            if (!response.ok) {
                const errorData = await response.json();
                rejectWithValue(errorData);
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const userTask = createSlice({
    name: "createUserTask",
    initialState,
    reducers: {
        setTaskData: (state, action) => {
            const { name, value } = action.payload;

            return {
                ...state,
                [name]: value,
            };
        },
        setDeadline: (state, action) => {
            state.deadline = action.payload;
        },
        closeDailogueBox: (state) => {
            state.showDialogueBox = false;
        },
        resetTaskData: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(addUserTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(addUserTask.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload;
                state.showDialogueBox = true;
                state.submissionStatus = true;
            })
            .addCase(addUserTask.rejected, (state) => {
                state.loading = false;
                state.showDialogueBox = true;
                state.submissionStatus = false;
            });
    },
});

export { addUserTask, defaultDeadline };

export const {
    setTaskData,
    setDeadline,
    showDialogueBox,
    closeDailogueBox,
    resetTaskData,
} = userTask.actions;

export default userTask.reducer;
