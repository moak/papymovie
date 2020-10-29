import dbConnect from '../../../utils/dbConnect';
import Movie from '../../../models/Movie';

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const movie = await Movie.findById(id);

        if (!movie) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: movie });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const movie = await Movie.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!movie) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: movie });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deletedNote = await Movie.deleteOne({ _id: id });

        if (!deletedNote) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
