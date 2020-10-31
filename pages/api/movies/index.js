import { getSession } from 'next-auth/client';

import dbConnect from '../../../utils/dbConnect';
import Movie from '../../../models/Movie';
// import User from '../../../models/User';

dbConnect();

export default async (req, res) => {
  const { method } = req;
  const session = await getSession({ req });

  switch (method) {
    case 'GET':
      try {
        console.log('session', session);
        // const user = await User.findById(session.id);

        const movies = await Movie.find({ user: session.id });
        // console.log('movies', movies);
        // // console.log('session', session);

        res.status(200).json({ success: true, data: movies.reverse() });
      } catch (error) {
        console.log('error', error);

        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const movie = await Movie.create({ ...req.body, user: session.id });

        res.status(201).json({ success: true, data: movie });
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
