import { model, Schema, Model, Document } from 'mongoose';

export interface IStatus extends Document {
    id: string;
    status: string;
    next: string;
    prev: string;
}

const StatusSchema: Schema = new Schema({
    id: { type: String, required: true },
    status: { type: String, required: true },
    next: { type: String, required: true },
    prev: { type: String, required: true }}
);

export const StatusModel: Model<IStatus> = model<IStatus>('status', StatusSchema);