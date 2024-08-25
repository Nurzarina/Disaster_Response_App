import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

export default connectMongoDB;


// Example Mongoose model and save method with logging
import User from "../models/User.model.js";

const createUser = async (userData) => {
    try {
        console.log("Data to be saved:", userData);
        const newUser = new User(userData);
        await newUser.save();
        console.log("User saved successfully:", newUser);
    } catch (error) {
        console.error("Error saving user:", error.message);
    }
};
