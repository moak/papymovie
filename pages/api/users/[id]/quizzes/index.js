import { getSession } from 'next-auth/react';

import dbConnect from 'utils/dbConnect';
import UserQuizz from 'models/UserQuizz';

export default async (req, res) => {
  const { method } = req;

  await dbConnect();

  const { session } = await getSession({ req });

  switch (method) {
    case 'GET':
      try {
        const userId = session.userId;

        const ok = await UserQuizz.countDocuments({ user: userId, isSuccess: true }).exec();
        const ko = await UserQuizz.countDocuments({ user: userId, isSuccess: false }).exec();

        return res.status(200).json({ success: true, data: { total: ok + ko, ok, ko } });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
