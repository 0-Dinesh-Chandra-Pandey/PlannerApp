import { Task } from "../models/task.model.js";

// CREATE TASK
const addTask = async (req, res) => {
    try {
        const task = new Task({
            ...req.body,
            user: req.params.userId,
        });

        await task.save();

        return res.status(200).send({ message: "Task added" });
    } catch (error) {
        res.status(400).send({ message: "Error! While adding task" });
    }
};

// SENDING TASK TO FRONTEND
const getTask = async (req, res) => {
    try {
        const data = req.task;

        return res
            .status(200)
            .send({ message: "Tasks fetched successfully!", data });
    } catch (error) {
        res.status(400).send({ message: "Error! While getting task" });
    }
};

// UPDATE TASK

const updateTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const updates = req.body;

        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(400).send({ message: "TASK FAILED TO UPDATE!!" });
        }

        return res.status(200).send({ message: "TASK UPDATED!!" });
    } catch (error) {
        return res
            .status(400)
            .send({ message: "ERROR WHILE TASK UPDATE!!", error });
    }
};

// DELETE TASK

const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;

        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(400).send({ message: "TASK FAILED TO UPDATE!!" });
        }

        return res.status(200).send({ message: "TASK DELETED!!" });
    } catch (error) {
        return res
            .status(400)
            .send({ message: "ERROR! WHILE DELETING THE TASK", error });
    }
};

export { addTask, getTask, updateTask, deleteTask };
