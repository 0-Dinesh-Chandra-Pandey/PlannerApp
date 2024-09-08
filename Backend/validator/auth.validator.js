import { z } from "zod";

const signupSchema = z.object({
    name: z.string({ required_error: "Name is required" }).trim(),
    username: z.string({ required_error: "username is required" }).trim(),
    password: z
        .string({ required_error: "password is required" })
        .trim()
        .min(7, { message: "Password should have minimum 7 characters" }),
});

const loginSchema = z.object({
    username: z.string({ required_error: "username is required" }).trim(),
    password: z
        .string({ required_error: "password is required" })
        .trim()
        .min(7, { message: "Password should have minimum 7 characters" }),
});

export { signupSchema, loginSchema };
