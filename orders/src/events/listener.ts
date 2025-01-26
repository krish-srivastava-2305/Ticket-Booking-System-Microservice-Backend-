import { Listener } from "@ksticketinservice/common";
import { JsMsg } from "nats";
import { Ticket } from "../models/tickets.model";

class TicketListener extends Listener {
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

export default TicketListener;

