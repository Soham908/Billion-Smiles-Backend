import mongoose, { Document, Schema } from "mongoose";

// Define IUser interface for User document
export interface IUser extends Document {
  username: string;
  password: string;
  userCausePreferences: string[];
  badgesEarned: string[];
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    userCausePreferences: { type: [String], default: [] },
    badgesEarned: { type: [String], default: [] },
  },
  {
    collection: "userData",
  }
);

const User = mongoose.model<IUser>("userModel", userSchema);

export default User;
