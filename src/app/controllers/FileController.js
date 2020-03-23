import File from '../models/File';
import Transporter from '../models/Transporter';

class FileController {
  async store(req, res) {
    const avatar = File.findByPk(req.params.id);
    if (!avatar) {
      return res.status(401).json({
        error: 'Avatar already exists. Use update() method.'
      });
    }

    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path
    });

    const transporter = await Transporter.findByPk(id);
    if (!transporter) {
      return res.status(400).json({ error: 'ID not found' });
    }

    transporter.avatar_id = file.id;
    await transporter.save();

    return res.json(file);
  }
}

export default new FileController();
