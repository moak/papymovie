import { getSession } from 'next-auth/react';

import dbConnect from 'utils/dbConnect';
import User from 'models/User';

export default async (req, res) => {
  const { method } = req;

  await dbConnect();

  const { session } = await getSession({ req });

  switch (method) {
    case 'POST':
      try {
        if (!session) {
          res.status(400).json({ success: false, error: 'invalid' });
        }

        // const body = JSON.parse(JSON.stringify(req.body));

        const user = await User.findById(session.userId);

        // console.log('user', user);
        // console.log('user.isInMoviesToWatch', user.isInMoviesToWatch);
        const isInMoviesToWatch = !!user.moviesToWatch.find(
          (movieToWatch) => movieToWatch.themoviedbId === req.body.themoviedbId,
        );

        console.log('isInMoviesToWatch', isInMoviesToWatch);
        if (isInMoviesToWatch) {
          await User.findByIdAndUpdate(
            { _id: session.userId },
            { $pull: { moviesToWatch: { themoviedbId: req.body.themoviedbId } } },
            { new: true },
          );
          res.status(201).json({ success: true, isInMoviesToWatch });
        } else {
          console.log('insert', {
            themoviedbId: req.body.themoviedbId,
            title: req.body.title,
            image: req.body.image,
            mediaType: req.body.mediaType,
          });

          await User.findByIdAndUpdate(
            { _id: session.userId },
            {
              $push: {
                moviesToWatch: {
                  mediaType: req.body.mediaType,
                  image: req.body.image,
                  themoviedbId: req.body.themoviedbId.toString(),
                  title: req.body.title,
                },
              },
            },
            { new: true },
          );

          res.status(201).json({ success: true, isInMoviesToWatch });
        }
      } catch (error) {
        console.log('error', error);
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
