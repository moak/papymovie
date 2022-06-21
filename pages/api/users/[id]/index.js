import dbConnect from 'utils/dbConnect';

import User from 'models/User';
import Movie from 'models/Movie';

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const user = await User.findById(id)
          .populate({ path: 'movies', options: { sort: { created_at: -1 } } })
          .populate('followers')
          .populate('followings');

        if (!user) {
          return res.status(400).json({ success: false, error: 'user_not_found' });
        }

        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false, error: 'catch' });
      }
      break;

    default:
      res.status(400).json({ success: false, error: 'default' });
      break;
  }
};
