import express, { json } from "express";
import cookieSession from "cookie-session";
import { errorHandler } from "@ksticketinservice/common";
import { NotFoundError } from "@ksticketinservice/common";
import { currentUserMiddleware } from "@ksticketinservice/common";


const app = express();

// 1. Middleware setup
app.set("trust proxy", true);
app.use(json());
app.use(cookieSession({
    signed: false,
    // secure: true
}));
app.use(currentUserMiddleware);

// 2. Routes
import { createOrderRouter } from "./routes/create.routes";
import { deleteOrderRouter } from "./routes/delete.routes";
import { getOrderByIdRouter } from "./routes/get-order-by-id.routes";
import { getOrdersRouter } from "./routes/get-orders.routes";

app.use("/api/orders", createOrderRouter);
app.use("/api/orders", deleteOrderRouter);
app.use("/api/orders", getOrderByIdRouter);
app.use("/api/orders", getOrdersRouter);


// 3. Error handling
app.all("*", () => {
    throw new NotFoundError();
});
app.use(errorHandler);

export { app };