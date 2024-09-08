import "./TaskDetails.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TaskPriority from "../../components/DashboardComponents/TaskDetailsPriority/TaskPriority";
import { updateTask } from "../../store/slices/updateTask";
import { updateUser } from "../../store/slices/updateUser";
import { fetchData } from "../../store/slices/userDataSlice";
import { fetchUsersTask } from "../../store/slices/userTasks";
import { deleteTask } from "../../store/slices/deleteTask";

const TaskDetails = () => {
    const { taskId } = useParams();
    const [userTasks, setUserTasks] = useState(
        JSON.parse(localStorage.getItem("USER_TASKS"))
    );
    const currentTask = userTasks.filter((item) => item._id === taskId);
    const userData = useSelector((state) => state.userData.data);
    const authData = JSON.parse(localStorage.getItem("AUTH_DATA"));
    const taskUpdate = useSelector((state) => state.updateTask);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const lastProductivityScore =
        userData?.productivityScore[userData?.productivityScore.length - 1];

    useEffect(() => {
        if (location.pathname.includes(`/dashboard/monthOverview/${taskId}`)) {
            // SETTING TASK ID TO LOCAL STORAGE TO GET IT FOR FURTHER OPERATIONS
            localStorage.setItem("TASK_ID", taskId);
        }

        // DELETING THE TASK ID WHILE LEAVING THE PAGE
        return () => {
            localStorage.removeItem("TASK_ID");
        };
    }, [taskId, location]);

    const showDaysLeft = () => {
        // Getting deadline date
        const deadlineDay = new Date(currentTask[0].deadline);        
        const dateToday = new Date();       

        const differenceInMilliseconds = deadlineDay - dateToday;                
        
        return Math.round(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    };

    const setComplete = () => {
        dispatch(
            updateTask({
                taskId,
                updatedData: { isCompleted: true },
            })
        );

        dispatch(
            updateUser({
                userId: userData?._id,
                updatedData: {
                    taskCompletedThisMonth:
                        userData?.taskCompletedThisMonth + 1,
                    totalTaskCompleted: userData?.totalTaskCompleted + 1,
                    productivityScore: {
                        // new productivity score
                        score: lastProductivityScore?.score + 2, // adding two on completing on task
                    },
                },
            })
        );

        navigate("/dashboard/monthOverview");
    };

    // DELETING OR DROPPING THE TASK
    const handleDeleteTask = (isCompleted) => {
        dispatch(deleteTask({ taskId }));

        // REDUCING THE PRODUCTIVITY SCORE
        if (!isCompleted) {
            if (lastProductivityScore === 0 && lastProductivityScore - 4 > 0) return;

            dispatch(
                updateUser({
                    userId: userData?._id,
                    updatedData: {
                        productivityScore: {
                            // new productivity score
                            score: lastProductivityScore?.score - 4, // adding four on completing on task
                        },
                    },
                })
            );
        }

        navigate("/dashboard/monthOverview");
    };

    // FETCHING USER ON TASK UPDATIOON
    useEffect(() => {
        dispatch(fetchUsersTask(authData?.userId));
        dispatch(fetchData(authData.token));
    }, [taskUpdate]);
    return (
        <div className="task-main-container">
            {currentTask.map((item) => {
                return (
                    <div className="task-card" key={item._id}>
                        <div className="task-header">
                            <h2 className="task-title">{item.title}</h2>
                            <div className="task-actions">
                                <button
                                    className="task-button-done"
                                    onClick={setComplete}
                                    disabled={item.isCompleted && true}
                                    title={
                                        item.isCompleted
                                            ? "Task Completed"
                                            : "Click to set completed!"
                                    }
                                >
                                    {item.isCompleted ? "COMPLETED" : "DONE"}
                                </button>
                                <button
                                    className="task-button-drop"
                                    onClick={() =>
                                        handleDeleteTask(item.isCompleted)
                                    }
                                >
                                    {item.isCompleted ? "DELETE" : "DROP"}
                                </button>
                            </div>
                        </div>
                        <p className="task-created">Created on: {item.start}</p>
                        <p className="task-description">{item.description}</p>
                        <div className="task-details">
                            <div className="task-detail">
                                <p>DAYS LEFT</p>
                                <span
                                    className="days-left"
                                    title={`Deadline on: ${item.deadline}`}
                                    style={{
                                        color:
                                            showDaysLeft() < 7
                                                ? "#f50000"
                                                : "#1d8a2f",
                                        fontSize: "16px",
                                        fontWeight: "500",
                                    }}
                                >
                                    {showDaysLeft()} Days
                                </span>
                            </div>
                            <div className="task-detail">
                                <p>PRIORITY</p>
                                <span className="priority-level">
                                    <TaskPriority level={item.priority} />
                                </span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default TaskDetails;
