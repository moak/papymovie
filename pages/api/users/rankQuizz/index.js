import { getSession } from 'next-auth/react';

import dbConnect from 'utils/dbConnect';
import User from 'models/User';
import UserQuizz from 'models/UserQuizz';

export default async (req, res) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const test = await UserQuizz.aggregate([
          {
            $group: {
              _id: '$user',
              user: { $push: '$user' },
              total: { $sum: 1 },
              ok: {
                $sum: { $cond: ['$isSuccess', 1, 0] },
              },
              ko: {
                $sum: { $cond: ['$isSuccess', 0, 1] },
              },
            },
          },
          { $sort: { ok: -1 } },
        ]);

        const finalUsers = await UserQuizz.populate(test, { path: 'user', select: 'name image' });

        return res.status(200).json({ success: true, data: finalUsers });
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
