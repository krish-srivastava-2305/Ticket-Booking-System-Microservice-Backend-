import { Listener, NotFoundError } from "@ksticketinservice/common";
import { JsMsg } from "nats";
import { Ticket } from "../models/ticket.model";

export class OrderListener extends Listener {
    name: string = "orders";
    durableName: string = "orders-service-durable";

    onMessage(data: JsMsg): void {
        
        if(data.subject === "order.created") {
            const { id, version, userId, status, ticket } = JSON.parse(data.data.toString());
            this.orderCreated(id, ticket);
        }
        if(data.subject === "order.cancelled") {
            const { id, ticket } = JSON.parse(data.data.toString());
            console.log("Order cancelled", id, ticket);
            this.orderCancelled(id, ticket);
        }
    }

    async orderCreated(id: string, ticket: { id: string, price: string }) {
        const existingTicket = await Ticket.findById(ticket.id);
        if(!existingTicket) {
            throw new NotFoundError();
        }
        existingTicket.set({ orderId: id });
        await existingTicket.save();
    }

    async orderCancelled(id: string, ticket: string) {
        const existingTicket = await Ticket.findById(ticket);
        if(!existingTicket) {
            throw new NotFoundError();
        }
        existingTicket.set({ orderId: undefined });
        await existingTicket.save();
    }
}

