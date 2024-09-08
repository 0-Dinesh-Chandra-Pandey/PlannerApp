import { useState } from "react";
import "./TaskStatus.css";

const TaskStatus = ({updateStatusActive, isCompleted}) => {
    
    const handleClick = (value) => {
        updateStatusActive(value);
    }
    
    return (
        <div className="task-status-container">
            <div
                className={`task-status-box ${
                    !isCompleted && "task-status-active"
                }`}
                onClick={() => handleClick(!isCompleted)}
            >
                Active
            </div>
            <div
                className={`task-status-box ${
                    isCompleted && "task-status-active"
                }`}
                onClick={() => handleClick(!isCompleted)}
            >
                Completed
            </div>
        </div>
    );
};

export default TaskStatus;
