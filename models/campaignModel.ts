import mongoose, { Document, Schema } from 'mongoose';

export interface ICampaign extends Document {
  imageUrl: string;
  campaignTitle: string;
  // campaignCause: mongoose.Types.ObjectId; // Reference to Cause
  campaignCause: string
  causeName: string;
  startDate: Date;
  endDate: Date;
  campaignDescription: string;
  hashtags: string[];
  targetAmount: number;
  amountRaised: number;
//   company: mongoose.Types.ObjectId; // Reference to Company
company: string;
  campaignManager: string;
  contactEmail: string;
  // ngoReference: mongoose.Types.ObjectId; // Reference to NGO
  ngoReference: string;
  ngoName: string;
  location: string;
  progress: number;
  campaignStatus: 'Ongoing' | 'Completed' | 'Preset';
  createdAt: Date;
  selectedFeatures: string[],
  supporterCount: number,
  supporterUsersRef: [mongoose.Types.ObjectId],
  targetLikes: number
}

const campaignSchema = new Schema<ICampaign>(
  {
    imageUrl: { type: String, required: true },
    campaignTitle: { type: String, required: true },
    // campaignCause: { type: mongoose.Schema.Types.ObjectId, ref: 'Cause'},
    campaignCause: String,
    causeName: { type: String, required: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, required: false },
    campaignDescription: { type: String, required: true },
    hashtags: { type: [String], required: false },
    targetAmount: { type: Number, required: true },
    amountRaised: { type: Number, default: 0 },
    // company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    company: String,
    campaignManager: { type: String, required: true },
    contactEmail: { type: String, required: true },
    // ngoReference: { type: mongoose.Schema.Types.ObjectId, ref: 'NGO'},
    ngoReference: String,
    ngoName: { type: String },
    location: { type: String, required: true },
    progress: { type: Number, default: 0 },
    campaignStatus: {
      type: String,
      enum: ['Ongoing', 'Completed', 'Preset'],
      default: 'Ongoing',
    },
    createdAt: { type: Date, default: Date.now },
    selectedFeatures: [String],
    supporterCount: {type: Number, default: 0},
    supporterUsersRef: { type: [mongoose.Schema.Types.ObjectId] },
    targetLikes: Number
  },
  {
    collection: 'campaigns',
  }
);

export const Campaign = mongoose.model<ICampaign>('campaigns', campaignSchema);
