import { natsWrapper } from "./events/init";
import { OrderCreatedListener } from "./events/listener";
import { OrderExpiredPublisher } from "./events/publisher";


// Database connection and server startup
const connect = async () => {

    if(!process.env.NATS_URL) {
        throw new Error("NATS_URL is not defined");
    }

    if(!process.env.REDIS_HOST) {
        throw new Error("REDIS_HOST is not defined");
    }

    if(!process.env.REDIS_PORT) {
        throw new Error("REDIS_PORT is not defined");
    }

    try {
        // Connect to NATS
        await natsWrapper.connect(process.env.NATS_URL);

        // Handle NATS connection close
        process.on("SIGINT", () => { 
            console.log("SIGINT received");
            natsWrapper.client.close();
            process.exit(0);
         });
        process.on("SIGTERM", () => {
            console.log("SIGTERM received");
            natsWrapper.client.close();
            process.exit(0);
        });

        new OrderExpiredPublisher(natsWrapper.client).createStream();

        const listener = new OrderCreatedListener(natsWrapper.client);
        setInterval(() => {
            listener.listen();
        }, 1000);

    } catch (err) {
        console.log(err);
    }
}

connect();