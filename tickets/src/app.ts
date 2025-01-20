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
import { createTicketRouter } from "./routes/create-ticket.routes";
import { getTicketsRouter } from "./routes/get-tickets.routes";
import { getTicketIdRouter } from "./routes/get-ticket-id.routes";
import { ticketUpdateRouter } from "./routes/ticket-update.routes";

app.use("/api/tickets", createTicketRouter);
app.use("/api/tickets", getTicketsRouter);
app.use("/api/tickets", getTicketIdRouter);
app.use("/api/tickets", ticketUpdateRouter);


// 3. Error handling
app.all("*", () => {
    throw new NotFoundError();
});
app.use(errorHandler);

export { app };