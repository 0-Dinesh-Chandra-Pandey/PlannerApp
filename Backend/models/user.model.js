import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    taskCompletedThisMonth: {
        type: Number,
        default: 0,
    },
    totalTaskCompleted: {
        type: Number,
        default: 0,
    },
    productivityScore: [
        {
            date: {
                type: Date,
                default: Date.now,
            },
            score: {
                type: Number,
                required: true,
                default: 0,
            },
        },
    ],
});

// Securing the password
userSchema.pre("save", async function (next) {
    const user = this;

    if (!user.isModified("password")) {
        next();
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password, saltRound);

        user.password = hashPassword;
    } catch (error) {
        next(error);
    }
});

// Comparing password
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// JSON web token
userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                username: this.username.toString(),
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "10d",
            }
        );
    } catch (error) {
        console.log(error);
    }
};

export const User = new model("User", userSchema);
