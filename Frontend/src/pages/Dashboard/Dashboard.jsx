import { Route, Routes } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import "./Dashboard.css";
import MonthOverview from "../../components/MonthOverview/MonthOverview";
import AddTask from "../../components/AddTask/AddTask";
import MyAccount from "../../components/MyAccount/MyAccount";
import { useSelector } from "react-redux";
import DashboardLoader from "../../components/DashboardComponents/DashboardLoader/DashboardLoader";
import TaskDetails from "../TaskDetails/TaskDetails";

const Dashboard = () => {
    const addUserData = useSelector((state) => state.addUserTask);

    return (
        <div className="dashboard-container">
            <div className="grid-items sidebar-wrapper">
                <Sidebar />
            </div>
            <div className="grid-items main-content-wrapper">
                {addUserData.loading && <DashboardLoader />}
                
                <Routes>
                    <Route path="monthOverview" element={<MonthOverview />} />
                    <Route path="addTask" element={<AddTask />} />
                    <Route path="myAccount" element={<MyAccount />} />
                    <Route path="monthOverview/:taskId" element={<TaskDetails />} />
                </Routes>
            </div>
        </div>
    );
};

export default Dashboard;
