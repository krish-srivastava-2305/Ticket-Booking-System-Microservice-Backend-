import { Listener } from "@ksticketinservice/common";
import { JsMsg } from "nats";

export class OrderListener extends Listener {
    name: string = "orders";
    durableName: string = "orders-service-durable";

    onMessage(data: JsMsg): void {
        console.log("Order created event received", data);
    }
}

