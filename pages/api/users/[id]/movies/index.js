import { getSession } from 'next-auth/react';

import dbConnect from 'utils/dbConnect';
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
        const userFollowingId = session.userId;
        const userFollowedId = id;

        if (userFollowingId === userFollowedId) {
          return res.send({ success: false, error: 'following_yourself' });
        }

        const userFollowed = await User.findById(userFollowedId);

        if (!userFollowed) {
          return res.status(404).send('not_found');
        }

        const isFollowing = userFollowed.followers.find((follower) => follower == userFollowingId);

        let promises = null;

        if (isFollowing) {
          promises = [
            User.findOneAndUpdate(
              { _id: userFollowedId },
              { $pull: { followers: userFollowingId } },
              { new: true },
            ).exec(),
            User.findOneAndUpdate(
              { _id: userFollowingId },
              { $pull: { followings: userFollowedId } },
              { new: true },
            ).exec(),
          ];

          // eslint-disable-next-line no-undef
          Promise.all(promises).then((values) =>
            res.send({ success: true, data: values[0].followers }),
          );
        } else {
          promises = [
            User.findOneAndUpdate(
              { _id: userFollowedId },
              {
                $push: {
                  followers: userFollowingId,
                },
              },
              { new: true, upsert: true },
            ).exec(),
            User.findOneAndUpdate(
              { _id: userFollowingId },
              {
                $push: {
                  followings: userFollowed,
                },
              },
              { new: true, upsert: true },
            ).exec(),
          ];
          // eslint-disable-next-line no-undef
          Promise.all(promises).then((values) => {
            return res.send({ success: true, data: values[0].followers });
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
