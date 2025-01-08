import mongoose, { Document, Schema } from "mongoose";

interface ICompany extends Document {
  companyName: string;
  description?: string;
  industryType: string;
  companyEmail: string;
  companyAddress?: string;
  companyLogoUrl?: string;
  managerName: string;
  managerEmail: string;
  campaigns: mongoose.Types.ObjectId[];
  causesSupported: mongoose.Types.ObjectId[];
  registrationNumber?: string;
  companyWebsite?: string;
  joinedDate: Date;
  isActive: boolean;
}

const companySchema: Schema<ICompany> = new Schema(
  {
    companyName: { type: String, required: true },
    description: { type: String, required: false },
    industryType: { type: String, required: false },
    companyEmail: { type: String, required: true, unique: true },
    companyAddress: { type: String, required: false },
    companyLogoUrl: { type: String, required: false },
    managerName: { type: String, required: true },
    managerEmail: { type: String, required: true, unique: true },
    campaigns: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Campaign",
      },
    ],
    causesSupported: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cause",
      },
    ],
    registrationNumber: { type: String, required: false },
    companyWebsite: { type: String, required: false },
    joinedDate: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
  },
  {
    collection: "companies",
    timestamps: true,
  }
);

const Company = mongoose.model<ICompany>("Company", companySchema);

export default Company;

