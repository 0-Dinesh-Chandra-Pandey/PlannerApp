import { useDispatch, useSelector } from "react-redux";
import MainHead from "../DashboardComponents/MainHead/MainHead";
import "./AddTask.css";
import {
    addUserTask,
    setTaskData,
    defaultDeadline,
    setDeadline,
    resetTaskData,
} from "../../store/slices/addTask";
import { useRef, useState } from "react";
import TaskStatusInfo from "../DashboardComponents/TaskEntryStatus/TaskStatusInfo";

const AddTask = () => {
    const dispatch = useDispatch();
    const deadlineRef = useRef();
    const descriptionRef = useRef();
    const titleRef = useRef();
    const taskInput = useSelector((state) => state.addUserTask);
    const _date = new Date();
    const today = _date.toISOString().split("T")[0];
    const [validationError, setValidationError] = useState(false);
    const [deadlineFlexible, setDeadlineFlexible] = useState(false);
    const [deadlineDate, setDeadlineDate] = useState(taskInput.deadline);

    // Handling input data saving in state
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "start" && !deadlineFlexible) {
            const currentDate = new Date(value);
            const dateAfter30Days = new Date(currentDate);
            dateAfter30Days.setDate(currentDate.getDate() + 30);

            const formattedDate = dateAfter30Days.toISOString().split("T")[0];

            // SETTING DEADLINE
            setDeadlineDate(formattedDate);

            dispatch(setDeadline(formattedDate));
        }

        if (name === "deadline") {
            setDeadlineDate(value);
        }

        dispatch(setTaskData({ name, value }));
    };

    // Toggling flexible and inflexible deadline dates-
    const flexibleDeadline = (e) => {
        const isChecked = e.target.checked;
        setDeadlineFlexible(!deadlineFlexible);

        deadlineRef.current.disabled = !isChecked;
    };

    // ADDING DATA TO DATABASE
    const addTaskToDatabase = (e) => {
        e.preventDefault();

        const refs = {
            title: titleRef,
            description: descriptionRef,
        };

        // FORM VALIDATION
        // Check for empty fields
        const emptyProperty = Object.entries(taskInput).filter(
            ([key, value]) => !value && refs[key]?.current
        );

        // If empty, highlight the fields
        let isValid = true;
        emptyProperty.forEach(([key]) => {
            refs[key].current.classList.add("required");
            isValid = false; // Mark form as invalid
        });

        // Remove the "required" class from non-empty fields
        Object.entries(refs).forEach(([key, ref]) => {
            if (taskInput[key]) {
                ref.current.classList.remove("required");
            }
        });

        // If the form is valid, submit it
        if (isValid) {
            dispatch(addUserTask(taskInput));
            setValidationError(false);

            // Reset the form fields
            titleRef.current.value = "";
            descriptionRef.current.value = "";
            setDeadlineDate(defaultDeadline()); // Reset deadline to today's date or initial value
            setDeadlineFlexible(false); // Reset the flexible deadline checkbox
            deadlineRef.current.disabled = true; // Re-disable the deadline input
            dispatch(resetTaskData());
        } else {
            setValidationError(true);
        }
    };

    return (
        <div className="main-grid-container">
            <MainHead title={"Add a task"} />

            <div className="add-task-main">
                {taskInput.showDialogueBox && (
                    <TaskStatusInfo
                        submissionStatus={taskInput.submissionStatus}
                    />
                )}

                <form>
                    <div className="formBox">
                        <label htmlFor="title">Title</label>
                        <input
                            placeholder="Enter the title"
                            onChange={handleChange}
                            name="title"
                            ref={titleRef}
                        />
                    </div>

                    <div className="formBox">
                        <label htmlFor="description">Description</label>
                        <textarea
                            placeholder="Enter the description"
                            onChange={handleChange}
                            name="description"
                            ref={descriptionRef}
                        />
                    </div>

                    <div className="formBox">
                        <label htmlFor="priority">Priority</label>
                        <select name="priority" onChange={handleChange}>
                            <option value="normal">Normal</option>
                            <option value="veryLow">Very Low</option>
                            <option value="low">Low</option>
                            <option value="high">High</option>
                            <option value="veryHigh">Very High</option>
                        </select>
                    </div>

                    <div className="deadlineBox">
                        <div className="dateBox">
                            <div className="separator-box">
                                <label htmlFor="start">Start Date</label>
                                <input
                                    type="date"
                                    name="start"
                                    defaultValue={today}
                                    onChange={handleChange}
                                    min={today}
                                />
                            </div>
                            <div className="separator-box">
                                <label htmlFor="deadline">Deadline Date</label>
                                <input
                                    type="date"
                                    name="deadline"
                                    disabled
                                    onChange={handleChange}
                                    ref={deadlineRef}
                                    value={deadlineDate}
                                    min={today}
                                />
                            </div>
                        </div>
                        <div className="checkbox">
                            <input
                                type="checkbox"
                                onChange={flexibleDeadline}
                            />{" "}
                            <p>Flexible Deadline</p>
                        </div>
                    </div>

                    <div className="buttonBox">
                        <button onClick={addTaskToDatabase}>Add Task</button>
                        <p
                            className="error-message"
                            style={{
                                display: validationError ? "block" : "none",
                            }}
                        >
                            Title and Description are required!
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTask;
