import { getSession } from 'next-auth/react';

import dbConnect from 'utils/dbConnect';
import Quizz from 'models/Quizz';
import UserQuizz from 'models/UserQuizz';

export default async (req, res) => {
  const { method } = req;

  await dbConnect();

  const { session } = (await getSession({ req })) || {};

  switch (method) {
    case 'GET':
      try {
        let query = {};
        if (session?.userId) {
          const userQuizzes = await UserQuizz.find({ user: session?.userId });

          const userQuizzesIds = userQuizzes.reduce((acc, current) => {
            acc.push(current.quizz);

            return acc;
          }, []);
          query = { _id: { $nin: userQuizzesIds } };
        }

        const countQuery = await Quizz.where(query).countDocuments();

        const quizzDB = await Quizz.findOne(query).skip(
          Math.floor(Math.random() * (countQuery - 1 + 1) + 1),
        );

        return res.status(200).json({ success: true, data: quizzDB });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
