import { Publisher } from "@ksticketinservice/common";

export class OrderExpiredPublisher extends Publisher {
    name = "order-expired";
    subject = ["expired.order"];
}

