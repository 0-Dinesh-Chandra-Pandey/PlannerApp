import { useEffect, useState } from "react";
import MainHead from "../DashboardComponents/MainHead/MainHead";
import TaskCard from "../DashboardComponents/TaskCard/TaskCard";
import TaskStatus from "../DashboardComponents/TaskStatus/TaskStatus";
import "./MonthOverview.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersTask } from "../../store/slices/userTasks";
import DashboardLoader from "../DashboardComponents/DashboardLoader/DashboardLoader";
import { deleteTask } from "../../store/slices/deleteTask";
import { updateUser } from "../../store/slices/updateUser";

const dayLeftCalculator = (inputDeadline) => {
    const deadline = new Date(inputDeadline);
    const dateToday = new Date();

    const differenceInMilliseconds = deadline - dateToday;

    return Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
};

const MonthOverview = () => {
    const dispatch = useDispatch();
    const userId = JSON.parse(localStorage.getItem("AUTH_DATA")).userId;
    const userTasks = useSelector((state) => state.userTasks);
    const [tasks, setTasks] = useState();
    const [isCompleted, setIsCompleted] = useState(false);
    const [showLoader, setShowLoader] = useState(true);
    const userData = useSelector((state) => state.userData.data);
    const lastProductivityScore =
        userData?.productivityScore[userData?.productivityScore.length - 1];
    const filteredTasks =
        tasks &&
        tasks.filter(
            (item) =>
                (isCompleted && item.isCompleted) ||
                (!isCompleted && !item.isCompleted)
        );

    const updateStatusActive = (value) => {
        setIsCompleted(value);
    };

    // FETCHING USER'S TASKS
    useEffect(() => {
        localStorage.removeItem("TASK_ID");
        dispatch(fetchUsersTask(userId));
    }, []);

    // setting user tasks
    useEffect(() => {
        userTasks && setTasks(userTasks.tasks?.data);

        // DELETING THE TASKS AFTER THE DEADLINE
        tasks &&
            tasks.forEach((task) => {
                const dayLeft = dayLeftCalculator(task?.deadline);
                const taskId = task?._id;
                
                if (dayLeft < 0) {
                    taskId && dispatch(deleteTask({taskId})); // deleting task

                    if (lastProductivityScore === 0 && lastProductivityScore - 4 > 0 ) return;
                    // decreasing the user productivity score
                    dispatch(
                        updateUser({
                            userId: task?.user,
                            updatedData: {
                                productivityScore: {
                                    // new productivity score
                                    score: lastProductivityScore?.score - 4, // adding four on completing on task
                                },
                            },
                        })
                    );
                }
            });

        userTasks &&
            localStorage.setItem(
                "USER_TASKS",
                JSON.stringify(userTasks.tasks?.data)
            );
    }, [userTasks]);

    // ADDING DELAY IN LOADER
    useEffect(() => {
        if (!userTasks.loading) {
            const loaderTimer = setTimeout(() => {
                setShowLoader(false);
            }, 700);

            return () => clearTimeout(loaderTimer);
        }
    }, [userTasks.loading]);

    return (
        <div className="main-grid-container">
            <MainHead title="Tasks for this month" />

            <div className="main-overview-container">
                <TaskStatus
                    isCompleted={isCompleted}
                    updateStatusActive={updateStatusActive}
                />

                <div className="tasks-container">
                    {showLoader ? (
                        <div className="tasks-loader">
                            <DashboardLoader />
                        </div>
                    ) : tasks && filteredTasks.length > 0 ? (
                        filteredTasks.map((item) => (
                            <TaskCard
                                key={item._id}
                                title={item.title}
                                start={item.start}
                                deadline={item.deadline}
                                priority={item.priority}
                                taskId={item._id}
                                isCompleted={item.isCompleted}
                                hoverVal={dayLeftCalculator(item.deadline)}
                            />
                        ))
                    ) : (
                        <p>Nothing to show here!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MonthOverview;
