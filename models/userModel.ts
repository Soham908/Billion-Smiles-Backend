import mongoose, { Document, Schema } from "mongoose";
import { causeSchema, ICause } from "./causeModel";

interface INGODetails {
  ngoName: string,
  ngoRegisteration: string
}
const ngoDetailsSchema = new Schema<INGODetails>({
  ngoName: String,
  ngoRegisteration: String
})

export interface IUser extends Document {
  username: string;
  password: string;
  userCausePreferences: string[];
  badgesEarned: string[];
  userType?: "User" | "NGO" | "Company",
  ngoDetails: INGODetails,
  causes: mongoose.Types.ObjectId[]
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    userCausePreferences: { type: [String], default: [] },
    badgesEarned: { type: [String], default: [] },
    userType: {
      type: String,
      enum: ["User", "NGO", "Company"],
      default: 'User',
    },
    ngoDetails: ngoDetailsSchema,
    causes: { type: [mongoose.Schema.Types.ObjectId] }
  },
  {
    collection: "userData",
  }
);

const User = mongoose.model<IUser>("userModel", userSchema);

export default User;
