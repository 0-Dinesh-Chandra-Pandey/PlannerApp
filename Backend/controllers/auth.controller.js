import { User } from "../models/user.model.js";

const register = async (req, res, next) => {
    try {
        const { name, username, password } = req.body;

        const userExist = await User.findOne({ username });

        if (userExist) {
            return res.status(404).send({ message: "Username already exists" });
        }

        const newUser = await User.create({
            name,
            username,
            password,
            // Default productivity score
            productivityScore: [
                {
                    score: 0,
                },
            ],
        });

        res.status(200).send({
            message: "User created successfully!",
            token: await newUser.generateToken(),
            userId: await newUser._id.toString(),
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const userExist = await User.findOne({ username });

        if (!userExist) {
            return res
                .status(404)
                .send({ message: "User doesn't exist! Please Signup" });
        }

        const checkPass = await userExist.isPasswordCorrect(password);

        if (!checkPass) {
            return res.status(401).json({ message: "Invalid password" });
        }

        res.status(200).json({
            message: "User logged in sucessfully!!",
            token: await userExist.generateToken(),
            userId: userExist._id.toString(),
        });
    } catch (error) {
        next(error);
    }
};

// TO SEND USER DATA TO FRONTEND

const userData = async (req, res) => {
    try {
        const data = req.user;

        return res
            .status(200)
            .send({ message: "DATA FETCHED SUCCESSFULLY!!", data });
    } catch (error) {
        res.status(400).send({ message: error });
    }
};

// UPDATE USER DATA

const updateUser = async (req, res) => {
    try {
        const userId = req.params.user;
        const { productivityScore, ...updates } = req.body;

        const updateUser = await User.findByIdAndUpdate(
            userId,
            {
                $set: updates,
                $push: { productivityScore: productivityScore },
            },
            { new: true, runValidators: true }
        );

        if (!updateUser) {
            return res.status(400).send({ message: "Failed to update user" });
        }

        return res.status(200).send({ message: "User updated succesfully!" });
    } catch (error) {
        return res.status(400).send({ message: error });
    }
};


// Function to reset the taskCompletedThisMonth field
const resetTaskCompletedThisMonth = async () => {
  try {
    // Reset the taskCompletedThisMonth field to 0 for all users
    const numberReset = await User.updateMany(
      {},
      { $set: { taskCompletedThisMonth: 0 } }
    );

    console.log("Number of documents updated:", numberReset);

  } catch (error) {
    console.error("Error while resetting the task number this month:", error);
  }
};


export { register, login, userData, updateUser, resetTaskCompletedThisMonth };
