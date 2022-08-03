const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String },
    token: { type: String },
    lang: { type: String },
    country: { type: String },
    movies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
      },
    ],
    moviesToWatch: [
      {
        themoviedbId: { type: String, required: false },
        title: { type: String, required: false },
        image: { type: String, required: false },
        mediaType: { type: String, required: false },
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
    updated_at: { type: Date },
  },
  {
    usePushEach: true,
  },
);

module.exports = mongoose.models?.User || mongoose.model('User', UserSchema);
