import { getSession } from 'next-auth/react';

import dbConnect from 'utils/dbConnect';
import Movie from 'models/Movie';
import Feed from 'models/Feed';
import User from 'models/User';

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  const { session } = await getSession({ req });

  switch (method) {
    case 'GET':
      try {
        const movie = await Movie.findById(id);

        if (!movie) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: movie });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const movie = await Movie.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        await Feed.create({ action: 'edit', movie, user: movie.user });

        if (!movie) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: movie });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deletedMovie = await Movie.deleteOne({ _id: id });

        if (!deletedMovie) {
          return res.status(400).json({ success: false });
        }

        User.findOneAndUpdate(
          { _id: session.userId },
          { $pull: { movies: id } },
          { new: true },
        ).exec(),
          res.status(200).json({ success: true, data: {} });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
