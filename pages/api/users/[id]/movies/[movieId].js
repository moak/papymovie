import { getSession } from 'next-auth/react';

import dbConnect from 'utils/dbConnect';
import Movie from 'models/Movie';
import User from 'models/User';

export default async (req, res) => {
  const {
    query: { id, movieId },
    method,
  } = req;

  await dbConnect();

  const { session } = await getSession({ req });

  switch (method) {
    case 'GET':
      try {
        if (!session) {
          return res.status(400).json({ success: false });
        }

        const movie = await Movie.findOne({ user: id, themoviedbId: movieId });

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
        if (!session) {
          return res.status(400).json({ success: false });
        }

        Movie.findOneAndUpdate(
          { user: id, _id: movieId },
          { description: req.body.description, rating: req.body.rating },
          { new: true },
          (error) => {
            if (error) {
              return res.status(404).send({ success: false, error });
            }
            return res.send({ success: true });
          },
        );
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        if (!session) {
          return res.status(400).json({ success: false });
        }

        const deletedMovie = await Movie.deleteOne({ _id: movieId });

        if (!deletedMovie) {
          return res.status(400).json({ success: false });
        }

        User.findOneAndUpdate({ _id: session.userId }, { $pull: { movies: movieId } }).exec(),
          res.status(200).json({ success: true });
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
