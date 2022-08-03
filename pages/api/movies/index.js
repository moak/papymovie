import { getSession } from 'next-auth/react';

import dbConnect from 'utils/dbConnect';
import Movie from 'models/Movie';
import Feed from 'models/Feed';
import User from 'models/User';

export default async (req, res) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const movies = await Movie.find();

        res.status(200).json({ success: true, data: movies.reverse() });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const { session } = await getSession({ req });

        const movie = await Movie.create({ ...req.body, user: session.userId });

        await Feed.create({ action: 'add', movie, user: session.userId });

        await User.findByIdAndUpdate(
          { _id: session.userId },
          { $push: { movies: movie._id }, updated_at: new Date().toUTCString() },
          { new: true },
        );

        res.status(201).json({ success: true, data: movie });
      } catch (error) {
        console.log('error', error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
