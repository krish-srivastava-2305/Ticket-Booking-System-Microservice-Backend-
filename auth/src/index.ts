import express, { json } from "express";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import { errorHandler } from "./middlewares/error-handler.middleware";
import { NotFoundError } from "./errors/not-found-error";


const app = express();

// 1. Middleware setup
app.set("trust proxy", true);
app.use(json());
app.use(cookieSession({
    signed: false,
    // secure: true
}));

// 2. Routes
import { getUserRouter } from "./routes/get-user.routes";
import { signinRouter } from "./routes/signin.routes";
import { signoutRouter } from "./routes/signout.routes";
import { signupRouter } from "./routes/signup.routes";

app.use("/api/users", getUserRouter);
app.use("/api/users", signinRouter);
app.use("/api/users", signupRouter);
app.use("/api/users", signoutRouter);

// 3. Error handling
app.all("*", () => {
    throw new NotFoundError();
});
app.use(errorHandler);

// 4. Database connection and server startup
const connect = async () => {
    if(!process.env.JWT_SECRET_KEY) {
        throw new Error("JWT_SECRET_KEY is not defined");
    }
    
    try {
        await mongoose.connect("mongodb://auth-mongo-cluster-srv:27017/auth");
        console.log("Connected to MongoDB");
        
        app.listen(3000, () => {
            console.log("Listening at http://localhost:3000");
        });
    } catch (err) {
        console.log(err);
    }
}

connect();