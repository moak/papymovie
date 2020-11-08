import { getSession } from 'next-auth/client';

import dbConnect from 'utils/dbConnect';
import Movie from 'models/Movie';
import Feed from 'models/Feed';
import User from 'models/User';

dbConnect();

export default async (req, res) => {
  const { method } = req;
  const session = await getSession({ req });

  switch (method) {
    case 'POST':
      try {
        if (!session) {
          res.status(400).json({ success: false, error: 'invalid' });
        }

        const user = await User.findById(session.id);

        const isInMoviesToWatch = !!user.moviesToWatch.find(
          (movieToWatch) => movieToWatch.themoviedbId === req.body.themoviedbId,
        );

        if (isInMoviesToWatch) {
          await User.findByIdAndUpdate(
            { _id: session.id },
            { $pull: { moviesToWatch: { themoviedbId: req.body.themoviedbId } } },
            { new: true },
          );
          res.status(201).json({ success: true, isInMoviesToWatch });
        } else {
          await User.findByIdAndUpdate(
            { _id: session.id },
            {
              $push: {
                moviesToWatch: {
                  themoviedbId: req.body.themoviedbId,
                  title: req.body.title,
                  image: req.body.image,
                },
              },
            },
            { new: true },
          );

          res.status(201).json({ success: true, isInMoviesToWatch });
        }
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
