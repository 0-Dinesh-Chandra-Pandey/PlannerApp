import { NavLink } from "react-router-dom";
import "./sidebar.css";
import sidebarIcon from "../../assets/icon.png";

const Sidebar = () => {
    return (
        <div className="sidebar-container">
            <div id="logo">
                <div className="icon">
                    <img src={sidebarIcon} alt="" />
                </div>
                <h1>
                    Planner<span>App</span>
                </h1>
            </div>

            <div id="sidebar-options">
                <NavLink to="/dashboard/monthOverview" className="nav-link">
                    <i className="ri-search-eye-line"></i>{" "}
                    <span>Month's Overview</span>
                </NavLink>
                <NavLink to="/dashboard/addTask" className="nav-link">
                    <i className="ri-menu-add-line"></i> <span>Add Task</span>
                </NavLink>
                <NavLink to="/dashboard/myAccount" className="nav-link">
                    <i className="ri-account-box-line"></i>{" "}
                    <span>My Account</span>
                </NavLink>
            </div>
        </div>
    );
};

export default Sidebar;
