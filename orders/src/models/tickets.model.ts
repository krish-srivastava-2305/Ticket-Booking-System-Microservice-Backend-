import mongoose from "mongoose";
import { Order } from "./orders.model";

interface TicketAttrs {
    title: string;
    price: number;
    version: number;
}

export interface TicketDoc extends mongoose.Document {
    title: string;
    price: number;
    version: number;
    isReserved(): Promise<boolean>;
}

interface TicketModel extends mongoose.Model<TicketDoc> {
    build(attrs: TicketAttrs): TicketDoc;
}

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    version: {
        type: Number,
        required: true
    }
})

ticketSchema.statics.build = (attrs: TicketAttrs) => {
    return new Ticket(attrs);
}

ticketSchema.methods.isReserved = async function () {
    const existingOrder = await Order.findOne({
        ticket: this,
        status: {
            $in: ["created", "pending", "completed"]
        }
    });

    return !!existingOrder;
}

const Ticket = mongoose.model<TicketDoc, TicketModel>("Ticket", ticketSchema);

export { Ticket };
