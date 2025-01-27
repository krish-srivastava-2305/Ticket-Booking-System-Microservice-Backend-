import { Publisher } from "@ksticketinservice/common";

export class OrderPublisher extends Publisher {
    name = "orders";
    subject = ["order.>"];
}

export class OrderExpiredPublisher extends Publisher {
    name = "order-expiring";
    subject = ["expiration.order"];
}

