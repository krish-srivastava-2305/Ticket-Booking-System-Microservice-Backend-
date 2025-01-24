import mongoose from "mongoose";
import { app } from "./app";

// Database connection and server startup
const connect = async () => {
    if(!process.env.JWT_SECRET_KEY || !process.env.MONGO_URI) {
        throw new Error("JWT_SECRET_KEY or MONGO_URI is not defined");
    }
    
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
        
        app.listen(3000, () => {
            console.log("Listening at http://localhost:3000");
        });
    } catch (err) {
        console.log(err);
    }
}

connect();