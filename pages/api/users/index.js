import dbConnect from 'utils/dbConnect';
import User from 'models/User';

export default async (req, res) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const users = await User.find({});

        res.status(200).json({ success: true, data: users });
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
