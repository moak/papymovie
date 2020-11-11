import { getSession } from 'next-auth/client';

import dbConnect from '/utils/dbConnect';
import User from '/models/User';
import Movie from '/models/Movie';
import Feed from '/models/Feed';

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
        const userLikingId = session.id;
        const feedLikedId = id;

        if (!userLikingId) {
          return res.send({ success: false });
        }

        const feedLiked = await Feed.findById(feedLikedId);

        if (!feedLiked) {
          return res.status(404).send('not_found');
        }

        const isLiking = feedLiked.likes.find((user) => user == userLikingId);

        let promises = null;

        if (isLiking) {
          promises = [
            Feed.findOneAndUpdate(
              { _id: feedLikedId },
              { $pull: { likes: userLikingId } },
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
              likes: userLikingId,
            },
          };
          const isDisliked = feedLiked.dislikes.find((user) => user == userLikingId);

          if (isDisliked) {
            query.$pull = {
              dislikes: userLikingId,
            };
          }
          console.log('query', query);
          promises = [
            Feed.findOneAndUpdate({ _id: feedLikedId }, query, { new: true, upsert: true }).exec(),
          ];

          Promise.all(promises).then((values) => {
            return res.send({
              success: true,
              data: { likes: values[0].likes, dislikes: values[0].dislikes },
            });
          });
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
