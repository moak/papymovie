import dbConnect from 'utils/dbConnect';
import Comment from 'models/Comment';

export default async (req, res) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const comments = await Comment.find({});

        res.status(200).json({ success: true, data: comments });
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
