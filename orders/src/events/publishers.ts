import { Publisher } from "@ksticketinservice/common";

export class OrderPublisher extends Publisher {
    name = "orders";
    subject = ["order.>"];
}

