import File from '../models/File';
import Transporter from '../models/Transporter';

class FileController {
  async index(req, res) {
    const avatar = await File.findByPk(req.userId.avatar_id);

    if (!avatar) {
      return res.status(400).json({
        error: 'User has no avatar, please upload an image'
      });
    }

    return res.json(avatar.url);
  }

  async store(req, res) {
    const user = req.userId;

    const avatar = await File.findByPk(user.avatar_id);
    if (avatar) {
      return res.status(401).json({
        error: 'Avatar already exists. Use update() method.'
      });
    }

    const { originalname: name, filename: path } = req.file;
    const file = await File.create({
      name,
      path
    });

    user.avatar_id = file.id;
    await user.save();

    return res.json(file);
  }

  async checkUserExists(req, res, next) {
    const { id } = req.params;

    const user = await Transporter.findByPk(id);
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    req.userId = user;

    return next();
  }
}

export default new FileController();
