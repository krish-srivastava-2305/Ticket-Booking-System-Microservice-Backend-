import express, { json } from "express";

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
app.listen(3000, () => {
    console.log("Listensing at http://localhost:3000");
})
