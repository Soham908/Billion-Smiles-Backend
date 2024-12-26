const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true },
  commentUsername: { type: String },
  commentText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'userModel',
      required: true,
    },
    
    imageUrl: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      trim: true,
      maxLength: 500,
    },

    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'campaigns',
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    likes: {
      type: Number,
      default: 0,
    },

    likedBy: [
      {
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'userModel'},
        likedUsername: {type: String}
      }
    ],

    comments: [commentSchema],

    visibility: {
      type: String,
      enum: ['public', 'private'],
      default: 'public',
    },

    shares: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
