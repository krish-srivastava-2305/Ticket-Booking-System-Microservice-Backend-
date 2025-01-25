import { NatsConnection, connect } from "nats";

class NatsWrapper {
    private _client?: NatsConnection;

    get client() {
        if(!this._client) {
            throw new Error("Cannot access NATS client before connecting");
        }
        return this._client;
    }

    async connect(url: string) {
        this._client = await connect({
            servers: url
        });

        const info = this._client?.info;
        if(!info) {
            throw new Error("NATS connection failed");
        }
        console.log("Connected to NATS");
    }
}
export const natsWrapper = new NatsWrapper();
