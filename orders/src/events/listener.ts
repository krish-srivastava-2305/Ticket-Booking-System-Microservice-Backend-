import { Listener } from "@ksticketinservice/common";
import { JsMsg } from "nats";
import { Ticket } from "../models/tickets.model";
import { Order } from "../models/orders.model";
import { OrderPublisher } from "./publishers";
import { natsWrapper } from "./init";

export class TicketListener extends Listener {
    name = "tickets";
    durableName = "ticket-listener";
    
    async onMessage(msg: JsMsg): Promise<void> {
        const data = JSON.parse(msg.data.toString());
        
        switch(msg.subject) {
            case "ticket.created":
                await this.handleTicketCreated(data);
                break;
            case "ticket.updated":
                await this.handleTicketUpdated(data);
                break;
        }
        
        msg.ack();
    }

    private async handleTicketCreated(data: any) {
        const { id, title, price, version } = data;
        
        const ticket = Ticket.build({
            id,
            title,
            price,
            version
        });
        await ticket.save();
        console.log('Ticket created:', ticket);
    }

    private async handleTicketUpdated(data: any) {
        const { id, title, price, version } = data;
        
        const ticket = await Ticket.findById(id);
        if (!ticket || ticket.version >= version) {
            throw new Error('Ticket not found');
        }
        
        ticket.set({ title, price, version });
        await ticket.save();
        console.log('Ticket updated:', ticket);
    }
}

export class OrderListener extends Listener {
    name = "order-expired";
    durableName = "order-listener";

    async onMessage(msg: JsMsg): Promise<void> {
        try {
            const { orderId } = JSON.parse(msg.data.toString());
            const order = await Order.findById(orderId);
            if (!order) {
                throw new Error("Order not found");
            }
            if (order.status === "completed") {
                return;
            }
            order.set({
                status: "cancelled"
            });
            new OrderPublisher(natsWrapper.client).publish("order.cancelled", {
                id: order.id,
                ticket: order.ticket
            });
            await order.save();
        } catch (error) {
            console.error("Error processing order expired event", error);
        }
    }
}

