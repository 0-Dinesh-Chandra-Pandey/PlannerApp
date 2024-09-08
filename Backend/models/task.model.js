import { Schema, model } from "mongoose";

const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        priority: {
            type: String,
            default: "normal",
        },
        deadline: {
            type: String,
            required: true,
        },
        isCompleted: {
            type: Boolean,
            default: false
        },
        start: {
            type: String,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    },
    { timestamps: true }
);

export const Task = new model("Task", taskSchema);
