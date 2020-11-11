import dbConnect from 'utils/dbConnect';
import Feed from 'models/Feed';
import User from 'models/User';
import Movie from 'models/Movie';
import Comment from 'models/Comment';

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const feed = await Feed.find({})
          .populate('movie')
          .populate('user')
          .populate({
            path: 'comments',
            populate: [
              {
                path: 'User',
                model: 'User',
                select: '_id username email image',
              },
            ],
          });

        res.status(200).json({ success: true, data: feed.reverse() });
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
