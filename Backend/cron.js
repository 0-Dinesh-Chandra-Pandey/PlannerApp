import cron from "node-cron";
import { resetTaskCompletedThisMonth } from "./controllers/auth.controller.js";

const scheduleResetData = () => {
    try {
        // scheduling reset usertask
        cron.schedule("0 0 1 * *", () => {
            resetTaskCompletedThisMonth();
        });

    } catch (error) {
        console.log(error);
        
    }
};

// const deleteTaskAfterDeadline = () => {
//     try {
        
//     }
// }

export { scheduleResetData };
