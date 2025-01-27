import Queue from "bull";
import { OrderExpiredPublisher } from "../events/publisher";
import { natsWrapper } from "../events/init";

interface Payload {
    orderId: string;
}

const expirationQueue = new Queue<Payload>("expiration-queue", {
    redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || "6379")
    }
});

expirationQueue.process(async (job) => {
    new OrderExpiredPublisher(natsWrapper.client).publish("expired.order", {
        orderId: job.data.orderId
    });
});

export { expirationQueue };
