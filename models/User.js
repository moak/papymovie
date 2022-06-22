const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: false, unique: true },
    password: { type: String },
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
    created_at: { type: Date, default: new Date().toUTCString() },
    updated_at: { type: Date, default: new Date().toUTCString() },
  },
  {
    usePushEach: true,
  },
);

module.exports = mongoose.models?.User || mongoose.model('User', UserSchema);
