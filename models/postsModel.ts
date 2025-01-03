import mongoose, { Document, Schema } from 'mongoose';

// Define Comment Interface
export interface IComment {
  userId: mongoose.Types.ObjectId;
  commentUsername: string;
  commentText: string;
  createdAt?: Date;
}

// Define Like Interface
export interface ILike {
  userId: mongoose.Types.ObjectId;
  likedUsername: string;
}

// Define Post Interface
export interface IPost extends Document {
  userId: mongoose.Types.ObjectId;
  imageUrl: string;
  caption: string;
  campaignId: mongoose.Types.ObjectId;
  tags: string[];
  likes: number;
  likedBy: ILike[];
  comments: IComment[];
  visibility: 'public' | 'private';
  shares: number;
}

// Define Comment Schema
const commentSchema = new Schema<IComment>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true },
  commentUsername: { type: String },
  commentText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Define Post Schema
const postSchema = new Schema<IPost>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true },
  imageUrl: { type: String, required: true },
  caption: { type: String, trim: true, maxLength: 500 },
  campaignId: { type: mongoose.Schema.Types.ObjectId, ref: 'campaigns' },
  tags: [{ type: String, trim: true }],
  likes: { type: Number, default: 0 },
  likedBy: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel' }, likedUsername: { type: String } }],
  comments: [commentSchema],
  visibility: { type: String, enum: ['public', 'private'], default: 'public' },
  shares: { type: Number, default: 0 },
}, {
  timestamps: true,
});

// Create Post Model
const Post = mongoose.model<IPost>('Post', postSchema);

export default Post;
