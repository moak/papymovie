import { getSession } from 'next-auth/react';

import dbConnect from 'utils/dbConnect';
import User from 'models/User';

dbConnect();

export default async (req, res) => {
  const { method } = req;
  const { session } = await getSession({ req });

  switch (method) {
    case 'POST':
      try {
        if (!session) {
          res.status(400).json({ success: false, error: 'invalid' });
        }

        const user = await User.findById(session.userId);

        const isInMoviesToWatch = !!user.moviesToWatch.find(
          (movieToWatch) => movieToWatch.themoviedbId === req.body.themoviedbId,
        );

        if (isInMoviesToWatch) {
          await User.findByIdAndUpdate(
            { _id: session.userId },
            { $pull: { moviesToWatch: { themoviedbId: req.body.themoviedbId } } },
            { new: true },
          );
          res.status(201).json({ success: true, isInMoviesToWatch });
        } else {
          await User.findByIdAndUpdate(
            { _id: session.userId },
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
