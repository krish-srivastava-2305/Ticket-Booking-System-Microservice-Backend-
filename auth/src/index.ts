import express, { json } from "express";
import mongoose from "mongoose";

const app = express();

app.use(json());


import { getUserRouter } from "./routes/get-user.routes";
import { signinRouter } from "./routes/signin.routes";
import { signoutRouter } from "./routes/signout.routes";
import { signupRouter } from "./routes/signup.routes";

app.use("/api/users", getUserRouter);
app.use("/api/users", signinRouter);
app.use("/api/users", signupRouter);
app.use("/api/users", signoutRouter);

import { errorHandler } from "./middlewares/error-handler.middleware";
import { NotFoundError } from "./errors/not-found-error";


app.all("*", () => {
    throw new NotFoundError()
})
app.use(errorHandler);

const connect = async () => {
    try {
        const connection = await mongoose.connect("mongodb://auth-mongo-cluster-srv:27017/auth");
        console.log("Connected to MongoDB");
    }  catch (err) {
        console.log(err);
    }

    app.listen(3000, () => {
        console.log("Listensing at http://localhost:3000");
    })
}

connect();




