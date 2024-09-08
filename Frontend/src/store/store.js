import { configureStore } from "@reduxjs/toolkit";
import loginUser from "./slices/loginSlice.js";
import signupUser from "./slices/signupSlice.js";
import authDetails from "./slices/authSlice.js";
import userTask from "./slices/addTask.js";
import userData from "./slices/userDataSlice.js"
import getUserTask from "./slices/userTasks.js"
import updateTaskSlice from "./slices/updateTask.js";
import updateUserSlice from "./slices/updateUser.js";
import deleteTaskSlice from "./slices/deleteTask.js";


const store = configureStore({
    reducer: {
        loginData: loginUser,
        signupData: signupUser,
        authInfo: authDetails,
        addUserTask: userTask,
        userData: userData,
        userTasks: getUserTask,
        updateTask: updateTaskSlice,
        updateUser: updateUserSlice,
        deleteTask: deleteTaskSlice
    },
});

export default store;
