import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./events/init";

// Database connection and server startup
const connect = async () => {

    if(!process.env.JWT_SECRET_KEY || !process.env.MONGO_URI || !process.env.NATS_URL) {
        throw new Error("JWT_SECRET_KEY or MONGO_URI or NATS_URL is not defined");
    }
    
    try {
        // Connect to NATS
        await natsWrapper.connect(process.env.NATS_URL);

        // Handle NATS connection close
        process.on("SIGINT", () => { 
            console.log("SIGINT received");
            natsWrapper.client.close();
            process.exit(0);
         });
        process.on("SIGTERM", () => {
            console.log("SIGTERM received");
            natsWrapper.client.close();
            process.exit(0);
        });

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
        
        // Start the server
        app.listen(3000, () => {
            console.log("Listening at http://localhost:3000");
        });
    } catch (err) {
        console.log(err);
    }
}

connect();