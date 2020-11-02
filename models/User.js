const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: false, unique: true },
    password: { type: String },
    active: { type: Boolean },
    verified: { type: Boolean, default: false },
    suspended: { type: Boolean, default: false },
    suspended_reason: { type: String },
    suspended_count: { type: Number, default: 0 },
    suspended_history: [
      {
        reason: { type: String },
        created_at: { type: Date, default: new Date().toUTCString() },
      },
    ],
    register_token: String,
    request_password_token: String,
    has_requested_password: Boolean,
    created_at: Date,
    updated_at: Date,
    token: { type: String },
    lang: { type: String },
    country: { type: String },
    admin: Boolean,
    movies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
      },
    ],
    moviesToWatch: [
      {
        themoviedbId: String,
        title: String,
        image: String,
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    followings: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    usePushEach: true,
  },
);

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
