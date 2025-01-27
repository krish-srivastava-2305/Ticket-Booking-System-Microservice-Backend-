import { Listener } from "@ksticketinservice/common";
import { JsMsg } from "nats";
import { expirationQueue } from "../queue/expiration-queue";


export class OrderCreatedListener extends Listener {
    name: string = "order-expiring";
    durableName: string = "expiration-service-durable";
    async onMessage(m: JsMsg) {
        try {
            const { orderId } = JSON.parse(m.data.toString());
            console.log("Order expiring", orderId);
            await expirationQueue.add("expiration-queue", {
                orderId,
            }, {
                delay: 1000*60*15
            });
            console.log("Expiration job added for orderId", orderId);
        } catch (error) {
            console.error("Error processing order created event", error);
        }
    }
}
