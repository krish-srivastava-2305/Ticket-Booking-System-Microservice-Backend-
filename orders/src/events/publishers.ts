import { Publisher } from "@ksticketinservice/common";

export class TicketPublisher extends Publisher {
    name = "tickets";
    subject = ["ticket.>"];
}

