import mongoose, { Schema } from "mongoose";

interface TicketAttrs {
    userId: string;
    title: string,
    price: string
}

interface TicketDoc extends mongoose.Document {
    userId: string;
    title: string,
    price: string
}

interface TicketModel extends mongoose.Model<TicketDoc> {
    build(attrs: TicketAttrs): TicketDoc;
}

const ticketSchema: Schema<TicketDoc, TicketModel> = new Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }
});

ticketSchema.statics.build = (attrs: TicketAttrs) => {
    return new Ticket(attrs);
}

const Ticket = mongoose.model<TicketDoc, TicketModel>("Ticket", ticketSchema);

export { Ticket };
