import File from '../models/File';
import Transporter from '../models/Transporter';

class FileController {
  async index(req, res) {
    const avatar = await File.findByPk(
      req.transporter.avatar_id
    );

    if (!avatar) {
      return res.status(400).json({
        error: 'User has no avatar, please upload an image'
      });
    }

    return res.json(avatar.url);
  }

  async store(req, res) {
    const avatar = await File.findByPk(
      req.transporter.avatar_id
    );
    if (avatar) {
      return res.status(401).json({
        error: 'Avatar already exists.'
      });
    }

    const { originalname: name, filename: path } = req.file;
    const newFile = await File.create({
      name,
      path
    });

    const transporter = await Transporter.findByPk(
      req.transporter.avatar_id
    );

    transporter.avatar_id = newFile.id;
    await transporter.save();

    return res.json(newFile);
  }

  async checkTransporter(req, res, next) {
    const { id } = req.params;

    const transporter = await Transporter.findByPk(id);
    if (!transporter) {
      return res
        .status(400)
        .json({ error: 'Transporter not found' });
    }
    req.transporter = transporter;

    return next();
  }
}

export default new FileController();
