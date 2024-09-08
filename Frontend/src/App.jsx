import {
    Routes,
    Route,
    useNavigate,
    useParams,
    useLocation,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Logout from "./pages/Logout/Logout";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NotFoundPage from "./pages/ErrorPage/Error";

function App() {
    const authData = useSelector((state) => state.authInfo);
    const navigate = useNavigate();
    const authDataInLS = localStorage.getItem("AUTH_DATA");
    const [taskDetails, setTaskDetails] = useState(null);
    const location = useLocation();

    useEffect(() => {
        /* 
            HERE TACKLING THE PROBLEM WHEN THE USER CLOSED APP ON SHOWING DETAILS ON VIEWMORE 
            ON RE LOGIN IT WHEN THE URL IN ONLY AT "/" ROUTE IT WILL REMOVE TASKID
        */
        if (location.pathname.charAt(1) === "") {
            localStorage.removeItem("TASK_ID");
        }
    }, []);

    useEffect(() => {
        // If user is logged in, navigate to dashboard or specific task
        const taskId = localStorage.getItem("TASK_ID");

        if (authData.user && authDataInLS) {
            if (taskId) {
                setTaskDetails(taskId);
            } else {
                navigate("/dashboard/monthOverview");
            }
        } else {
            navigate("/");
        }
    }, [authData]);

    return (
        <>
            <Routes>
                {authData.user && authDataInLS ? (
                    <>
                        <Route
                            path="/dashboard/*"
                            element={<Dashboard taskDetails={taskDetails} />}
                        />
                        <Route path="/logout" element={<Logout />} />
                    </>
                ) : (
                    <Route path="/" element={<Home />} />
                )}

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    );
}

export default App;
