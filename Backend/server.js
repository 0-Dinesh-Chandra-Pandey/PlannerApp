import express from "express";
import authRouter from "./router/auth.router.js";
import connectDB from "./connection/db.js";
import dotenv from "dotenv"
import errorMiddleware from "./middlewares/error.middleware.js";
import taskRouter from "./router/task.router.js";
import cors from "cors";
import { scheduleResetData } from "./cron.js";

const app = express();
dotenv.config("./.env");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/task", taskRouter);

app.use(errorMiddleware);


scheduleResetData();

const PORT = process.env.PORT || 3030;

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static("Frontend/dist")); 
// }

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Your app is starting at port", PORT);
    });
});