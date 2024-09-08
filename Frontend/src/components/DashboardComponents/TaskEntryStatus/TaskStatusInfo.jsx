import { useDispatch } from "react-redux";
import "./TaskStatusInfo.css";
import { closeDailogueBox } from "../../../store/slices/addTask";

const TaskStatusInfo = ({ submissionStatus }) => {
    const dispatch = useDispatch();  
  
    const handleClose = () => {
      dispatch(closeDailogueBox());
    }
  
    return (
        <div className="main-status-container">
            <div className="content-box">
                <div className={submissionStatus? "icon-box-success"
                  : "icon-box-reject"
                }>
                    {
                      submissionStatus ? <i className="ri-check-fill"></i> : <i className="ri-close-fill"></i>
                    }
                </div>
                <div className={submissionStatus? "text-box-success"
                  : "text-box-reject"
                }>
                    <p>
                        {submissionStatus
                            ? "Task added sucessfully"
                            : "Failed to Add Task"}
                    </p>
                    <button onClick={() => handleClose()}>
                        {submissionStatus
                            ? "Close"
                            : "Try Again"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskStatusInfo;
