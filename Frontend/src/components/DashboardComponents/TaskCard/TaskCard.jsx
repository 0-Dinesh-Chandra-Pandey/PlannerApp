import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./TaskCard.css";
import { updateTask } from "../../../store/slices/updateTask";
import { fetchUsersTask } from "../../../store/slices/userTasks";
import { updateUser } from "../../../store/slices/updateUser";
import { fetchData } from "../../../store/slices/userDataSlice";

const TaskCard = ({ title, start, deadline, priority, taskId, isCompleted, hoverVal }) => {
    const [starColor, setStarColor] = useState();
    const dispatch = useDispatch();
    const authData = JSON.parse(localStorage.getItem("AUTH_DATA"));
    const taskUpdate = useSelector((state) => state.updateTask);
    const userData = useSelector((state) => state.userData.data);
    const lastProductivityScore =
        userData?.productivityScore[userData?.productivityScore.length - 1];

    useEffect(() => {
        if (priority === "normal") {
            setStarColor("#007BFF"); // Blue for normal priority
        } else if (priority === "verylow") {
            setStarColor("#D3D3D3"); // Light Gray for very low priority
        } else if (priority === "low") {
            setStarColor("#28A745"); // Green for low priority
        } else if (priority === "high") {
            setStarColor("#FFC107"); // Orange for high priority
        } else if (priority === "veryHigh") {
            setStarColor("#DC3545"); // Red for very high priority
        }
    }, []);

    const setCompleted = () => {
        if (isCompleted) return;
    
        // UPDATING TASK
        dispatch(
            updateTask({
                taskId,
                updatedData: { isCompleted: true },
            })
        );
    
        // UPDATING THE USER
        dispatch(
            updateUser({
                userId: userData?._id,
                updatedData: {
                    taskCompletedThisMonth:
                        userData?.taskCompletedThisMonth + 1,
                    totalTaskCompleted: userData?.totalTaskCompleted + 1,
                    productivityScore: {
                        // new productivity score
                        score: lastProductivityScore.score + 2, // adding two on completing on task
                    },
                },
            })
        );
    };

    // FETCHING THE TASK WHEN THE TASK IS UPDATED
    useEffect(() => {
        dispatch(fetchUsersTask(authData?.userId));
        dispatch(fetchData(authData.token));
    }, [taskUpdate]);

    return (
        <div className="task-card-container" title={`Approx. ${hoverVal} days left`}>
            <div className="title-line">
                <h2>{title}</h2>
                <span
                    style={{ color: starColor }}
                    title={`Priority: ${priority}`}
                >
                    <i className="ri-star-fill"></i>
                </span>
            </div>

            <div className="dates">
                <p>
                    Created on: <br /> <span>{start}</span>
                </p>
                <p>
                    Deadline on: <br /> <span>{deadline}</span>
                </p>
            </div>

            <div className="buttons">
                <a href={`/dashboard/monthOverview/${taskId}`}>View More</a>
                {!isCompleted && (
                    <button onClick={setCompleted} className="task-card-button">
                        Done
                    </button>
                )}
            </div>
        </div>
    );
};

export default TaskCard;
