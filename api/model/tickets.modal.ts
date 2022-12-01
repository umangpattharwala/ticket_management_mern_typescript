import { model, Schema, Model, Document } from 'mongoose';

export interface ITickets extends Document {
    id: Number;
    status: Number;
}

const TicketsSchema: Schema = new Schema({
    id: { type: Number, required: true },
    status: { type: Number, required: true }}
);

export const TicketsModel: Model<ITickets> = model<ITickets>('tickets', TicketsSchema);