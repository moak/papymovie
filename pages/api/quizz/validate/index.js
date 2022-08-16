import dbConnect from 'utils/dbConnect';
import Quizz from 'models/Quizz';
import UserQuizz from 'models/UserQuizz';

export default async (req, res) => {
  const { method } = req;

  await dbConnect();

  const body = JSON.parse(req.body);

  switch (method) {
    case 'POST':
      try {
        const quizzDB = await Quizz.findById(body._id);

        let isSuccess =
          quizzDB.quizz[body.lang].choices[body.answer] === quizzDB.quizz[body.lang].answer;

        const userQuizz = await UserQuizz.findOne({ quizz: quizzDB, user: body.userId });

        if (body.userId && !userQuizz) {
          const newUserQuizz = new UserQuizz({
            user: body.userId,
            quizz: quizzDB,
            isSuccess,
          });

          await newUserQuizz.save();
        }

        return res.status(200).json({
          isSuccess,
          userQuizz: !!userQuizz,
          answer: quizzDB.quizz[body.lang].answer,
        });
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
