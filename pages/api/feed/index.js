import dbConnect from 'utils/dbConnect';
import Feed from 'models/Feed';

export default async (req, res) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const feed = await Feed.find({}).populate('movie').populate('user');

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
