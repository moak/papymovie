import { getSession } from 'next-auth/react';

import dbConnect from 'utils/dbConnect';
import Movie from 'models/Movie';
import Feed from 'models/Feed';
import User from 'models/User';

dbConnect();

export default async (req, res) => {
  const { method } = req;
  const { session } = await getSession({ req });

  console.log('session in post', session);
  switch (method) {
    case 'GET':
      try {
        const movies = await Movie.find({ user: session.userId });

        res.status(200).json({ success: true, data: movies.reverse() });
      } catch (error) {
        console.log('error', error);

        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const movie = await Movie.create({ ...req.body, user: session.userId });

        await Feed.create({ action: 'add', movie, user: session.userId });

        await User.findByIdAndUpdate(
          { _id: session.userId },
          { $push: { movies: movie._id } },
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
