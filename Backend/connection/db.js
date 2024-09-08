import mongoose from "mongoose";

const connectDB = async () => {
    const URI = process.env.DATABASE_URI;
    try {
        await mongoose.connect(URI);
        console.log("Connected to the database sucessfully!");
    } catch (error) {
        console.log("ERROR! While connecting to the database!!", error);
        process.exit(0);
    }
}

export default connectDB;