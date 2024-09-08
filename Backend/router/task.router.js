import express from "express";
import { addTask, deleteTask, getTask, updateTask } from "../controllers/task.controller.js";
import { taskMiddleware } from "../middlewares/task.middleware.js";

const taskRouter = express.Router();

taskRouter.post("/:userId/addTask", addTask);
taskRouter.get("/:userId/getTask", taskMiddleware, getTask);

taskRouter.put("/:taskId/updateTask", updateTask);

taskRouter.delete("/:taskId/deleteTask", deleteTask);

export default taskRouter