import { getSession } from 'next-auth/react';

import dbConnect from 'utils/dbConnect';
import User from 'models/User';
import Feed from 'models/Feed';
import Comment from 'models/Comment';

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  const { session } = await getSession({ req });

  switch (method) {
    case 'POST':
      try {
        const userCommentingId = session.userId;
        const feedLikedId = id;

        const body = JSON.parse(req.body);

        if (!userCommentingId) {
          return res.send({ success: false, test: 3 });
        }

        if (!body.comment) {
          return res.send({ success: false, test: 2 });
        }

        const feedCommented = await Feed.findById(feedLikedId).populate({
          path: 'comments',
          populate: [
            {
              path: 'user',
              model: 'User',
              select: '_id username email image',
            },
          ],
        });
        const userCommenting = await User.findById(session.userId);

        if (!feedCommented || !userCommenting) {
          return res.status(404).send('not_found');
        }

        const newComment = new Comment({
          user: userCommenting,
          movie: feedCommented.movie,
          content: body.comment,
          created_at: new Date().toUTCString(),
        });

        return newComment.save((err, createdComment) => {
          if (err) {
            return res.send({ success: false, err });
          }

          feedCommented.comments.push(createdComment);

          return feedCommented.save((err, updatedFeed) => {
            if (err) {
              return res.send({ success: false, err });
            }
            return res.send({
              success: true,
              data: updatedFeed,
            });
          });
        });
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
