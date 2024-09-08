import TaskChart from "../DashboardComponents/TaskChart/TaskChart";
import UserOverviewBox from "../DashboardComponents/UserOverviewBox/UserOverviewBox";
import UserHeader from "../DashboardComponents/UserDetailsHeader/Header";
import "./MyAccount.css";
import { useEffect, useState } from "react";
import { fetchData } from "../../store/slices/userDataSlice";
import { useDispatch, useSelector } from "react-redux";

// Function to calculate productivity score
const calculateProductivityScore = (obj) => {
    let calculatedScore = obj[obj.length - 1].score;    
    
    return calculatedScore;
};

const MyAccount = () => {
    const token = JSON.parse(localStorage.getItem("AUTH_DATA")).token;
    const userData = useSelector((state) => state.userData);
    const dispatch = useDispatch();
    const [dataState, setDataState] = useState();

    useEffect(() => {
        dispatch(fetchData(token));
    }, []);

    useEffect(() => {
        setDataState(userData.data);
        localStorage.setItem("USER_DATA", JSON.stringify(userData.data));
    }, [userData]);

    return (
        <div className="main-grid-container">
            <UserHeader
                loading={userData.loading}
                name={dataState && dataState.name}
                username={dataState && dataState.username}
            />

            <div className="main-account-container">
                <div className="user-overview">
                    <UserOverviewBox
                        number={dataState && dataState.taskCompletedThisMonth}
                        title={"Task Completed this month"}
                    />
                    <UserOverviewBox
                        number={dataState && dataState.totalTaskCompleted}
                        title={"Total task completed"}
                    />
                    {/* TEMPORARILY PRODUCTIVITY SCORE SET TO ZERO */}
                    <UserOverviewBox
                        number={
                            dataState &&
                            calculateProductivityScore(
                                dataState.productivityScore
                            )
                        }
                        title={"Productivity Score"}
                    />
                </div>

                <div className="charts">
                    <TaskChart scoreObj={dataState && dataState.productivityScore} />
                </div>
            </div>
        </div>
    );
};

export default MyAccount;
