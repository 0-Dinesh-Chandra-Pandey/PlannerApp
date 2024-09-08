import { useEffect, useState } from "react";
import "./TaskPriority.css";

const TaskPriority = ({ level }) => {
    const [stars, setStars] = useState(0);

    useEffect(() => {
        if (level === "veryHigh") {
            setStars(5);
        } else if (level === "high") {
            setStars(4);
        } else if (level === "normal") {
            setStars(3);
        } else if (level === "low") {
            setStars(2);
        } else {
            setStars(1);
        }
    }, []);

    const starsDiv = () => {
        const starsArr = [];

        for (let i = 1; i <= stars; i++) {
            starsArr.push(
                <div key={i} className="stars" title={`Priority: ${level}`}>
                    <i className="ri-star-smile-fill"></i>
                </div>
            );
        }

        return starsArr;
    };

    return <div className="priority-stars">{starsDiv()}</div>;
};

export default TaskPriority;
