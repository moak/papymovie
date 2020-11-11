import { getSession } from 'next-auth/client';

import dbConnect from 'utils/dbConnect';
import User from 'models/User';
import Movie from 'models/Movie';
import Feed from 'models/Feed';

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  const session = await getSession({ req });

  switch (method) {
    case 'POST':
      try {
        const userDislikingId = session.id;
        const feedDislikedId = id;

        if (!userDislikingId) {
          return res.send({ success: false });
        }

        const feedLiked = await Feed.findById(feedDislikedId);

        if (!feedLiked) {
          return res.status(404).send('not_found');
        }

        const isDisliking = feedLiked.dislikes.find((user) => user == userDislikingId);

        let promises = null;

        if (isDisliking) {
          promises = [
            Feed.findOneAndUpdate(
              { _id: feedDislikedId },
              { $pull: { dislikes: userDislikingId } },
              { new: true },
            ).exec(),
          ];

          Promise.all(promises).then((values) =>
            res.send({
              success: true,
              data: { likes: values[0].likes, dislikes: values[0].dislikes },
            }),
          );
        } else {
          const query = {
            $push: {
              dislikes: userDislikingId,
            },
          };
          const isLiked = feedLiked.likes.find((user) => user == userDislikingId);

          if (isLiked) {
            query.$pull = {
              likes: userDislikingId,
            };
          }

          promises = [
            Feed.findOneAndUpdate({ _id: feedDislikedId }, query, {
              new: true,
              upsert: true,
            }).exec(),
          ];

          Promise.all(promises).then((values) => {
            return res.send({
              success: true,
              data: { likes: values[0].likes, dislikes: values[0].dislikes },
            });
          });
        }
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
