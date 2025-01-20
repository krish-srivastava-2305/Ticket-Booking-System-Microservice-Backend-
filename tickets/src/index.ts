import mongoose from "mongoose";
import { app } from "./app";

// Database connection and server startup
const connect = async () => {

    // comment-out for testing
    if(!process.env.JWT_SECRET_KEY || !process.env.MONGO_URI) {
        throw new Error("JWT_SECRET_KEY or MONGO_URI is not defined");
    }
    
    try {
        // comment-out for testing
        await mongoose.connect(process.env.MONGO_URI);
        // await mongoose.connect("mongodb://localhost:27017/tickets");
        console.log("Connected to MongoDB");
        
        app.listen(3000, () => {
            console.log("Listening at http://localhost:3000");
        });
    } catch (err) {
        console.log(err);
    }
}

connect();