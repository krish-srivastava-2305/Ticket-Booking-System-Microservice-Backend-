import mongoose, { Schema } from "mongoose";
import { TicketDoc } from "./tickets.model";

interface OrderAttrs {
    userId: string;
    ticket: TicketDoc;
    status: string;
    expiresAt: Date;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attrs: OrderAttrs): OrderDoc;
}

interface OrderDoc extends mongoose.Document {
    userId: string;
    ticket: TicketDoc;
    status: string;
    expiresAt: Date;
}

const orderSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket",
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["created", "cancelled", "completed", "pending"],
        default: "created"
    },
    expiresAt: {
        type: mongoose.Schema.Types.Date,
        required: true
    }
})

orderSchema.statics.build = (attrs: OrderAttrs) => {
    return new Order(attrs);
}

const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);

export { Order };