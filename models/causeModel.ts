import mongoose, { Document, Schema } from 'mongoose';

export interface ICause extends Document {
  causeTitle: string;
  description: string;
  category: string;
  location: string;
  volunteerDate: Date;
  numberOfVolunteers: number;
  amountRaised: number;
  amountRequired: string;
  image?: string;
  ngoRef: mongoose.Types.ObjectId; // Reference to NGO
  ngoName: string;
  createdAt: Date;
}

const causeSchema = new Schema<ICause>(
  {
    causeTitle: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    volunteerDate: { type: Date, required: true },
    numberOfVolunteers: { type: Number, default: 0 },
    amountRaised: { type: Number, default: 0 },
    amountRequired: { type: String, required: true },
    image: { type: String, required: false },
    ngoRef: { type: mongoose.Schema.Types.ObjectId, ref: 'NGO', required: true },
    ngoName: String,
    createdAt: { type: Date, default: Date.now },
  },

  {
    collection: 'causes',
  }
);

export const Cause = mongoose.model<ICause>('Cause', causeSchema);
