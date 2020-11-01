import dbConnect from 'utils/dbConnect';

import User from 'models/User';
import Movie from 'models/Movie';

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const user = await User.findById(id).populate('movies');

        if (!user) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
