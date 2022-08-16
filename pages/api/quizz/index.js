import dbConnect from 'utils/dbConnect';
import Quizz from 'models/Quizz';

export default async (req, res) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const quizzs = Quizz.find().exec();

        res.status(200).json({ success: true, data: quizzs });
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
