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

// Add logging to verify job processing
expirationQueue.on('completed', (job) => {
    console.log(`Job completed with result ${job.returnvalue}`);
});

expirationQueue.on('failed', (job, err) => {
    console.error(`Job failed with error ${err}`);
});

expirationQueue.on('error', (error) => {
    console.error(`Queue error: ${error}`);
});

// Ensure the process function is correctly defined for the job type "expiration-queue"
expirationQueue.process("expiration-queue", async (job) => {
    console.log(`Processing job for orderId: ${job.data.orderId}`);
    new OrderExpiredPublisher(natsWrapper.client).publish("expired.order", {
        orderId: job.data.orderId
    });
});

export { expirationQueue };
