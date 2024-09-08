import express from "express";
import { register, login, userData, updateUser } from "../controllers/auth.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { loginSchema, signupSchema } from "../validator/auth.validator.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", validate(signupSchema), register);
authRouter.post("/login", validate(loginSchema), login);

authRouter.get("/userData", authMiddleware, userData);

authRouter.put("/:user/updateUser", updateUser)

export default authRouter;
