import mongoose, { Schema, Document } from 'mongoose';

interface IActivityLog extends Document {
  campaignId: mongoose.Types.ObjectId;
  campaignTitle: string;
  companyId: mongoose.Types.ObjectId;
  activityType: string;
  message: string;
  timestamp: Date;
}

const activityLogSchema = new Schema<IActivityLog>(
  {
    campaignId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' },
    campaignTitle: { type: String, required: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    activityType: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { collection: 'activityLogs' }
);

export const ActivityLog = mongoose.model<IActivityLog>('ActivityLog', activityLogSchema);
