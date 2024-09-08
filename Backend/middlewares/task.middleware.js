import { Task } from "../models/task.model.js";

const taskMiddleware = async (req, res, next) => {
    try {
        const userId = req.params.userId;
                

        if (!userId) {
            return res.status(400).send({
                message: "User id doesn't found!",
            });
        }
        
        // FINDING ALL THE TASK ADDED BY THE USER
        const tasks = await Task.find({ user: userId });

        req.task = tasks;
        
        next();
    } catch (error) {
        return res.status(400).send({ message: "Task fetching failed..", error });
    }
};

export { taskMiddleware };
