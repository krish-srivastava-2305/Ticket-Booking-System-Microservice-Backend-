import mongoose, { Schema } from "mongoose";
import { OrderStatus } from "@ksticketinservice/common";
import { TicketDoc } from "./tickets.model";

interface OrderAttrs {
    userId: string;
    ticket: TicketDoc;
    status: OrderStatus;
    expiresAt: Date;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attrs: OrderAttrs): OrderDoc;
}

interface OrderDoc extends mongoose.Document {
    userId: string;
    ticket: TicketDoc;
    status: OrderStatus;
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
        enum: Object.values(OrderStatus),
        default: OrderStatus.Created
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