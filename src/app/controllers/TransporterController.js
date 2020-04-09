import * as Yup from 'yup';
import Transporter from '../models/Transporter';
import User from '../models/User';

class TransporterController {
  async index(req, res) {
    const transporters = await Transporter.findAll({
      attributes: ['id', 'name', 'email']
    });

    return res.json(transporters);
  }

  async store(req, res) {
    // VALIDATION
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required()
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Failed Validation'
      });
    }

    // check if already exists (by email)
    const { name, email } = req.body;
    const transporterExists = await Transporter.findOne({
      where: { email }
    });
    if (transporterExists) {
      return res.status(400).json({
        error: 'Transporter already registered'
      });
    }

    // creates new entry in POSTGRES
    const newTransporter = await Transporter.create({
      name,
      email
    });
    return res.json(newTransporter);
  }

  // UPDATE (AdmPass, UserEmail, [newValue])
  async update(req, res) {
    const admin = await User.findByPk(req.userId);

    if (!admin) {
      return res.status(401).json({
        error: 'Invalid token'
      });
    }

    const {
      adminPass,
      transporterEmail,
      updates
    } = req.body;

    // CHECKS ADMIN PASSWORD
    if (
      adminPass &&
      !(await admin.checkPassword(adminPass))
    ) {
      return res
        .status(401)
        .json({ error: 'Wrong password' });
    }

    // CHECKS IF USER EXISTS
    const transporter = await Transporter.findOne({
      where: { email: transporterEmail }
    });
    if (!transporter) {
      return res.json({
        error: 'No transporter by that email'
      });
    }

    const props = Object.keys(updates);
    for (let i = 0; i < props.length; i += 1) {
      if (transporter[props[i]]) {
        transporter[props[i]] = updates[props[i]];
      }
    }

    await transporter.save();

    return res.json(transporter);
  }

  async delete(req, res) {
    const admin = await User.findByPk(req.userId);

    const { adminPass, transporterEmail } = req.body;

    if (
      adminPass &&
      !(await admin.checkPassword(adminPass))
    ) {
      return res
        .status(401)
        .json({ error: 'Wrong password' });
    }

    const { id } = req.params;
    const transporter = await Transporter.findByPk(id);

    if (!transporter) {
      return res.status(400).json({
        error: 'Invalid Transporter ID'
      });
    }

    if (transporter.email !== transporterEmail) {
      return res.status(401).json({
        error: 'Invalid transporter email'
      });
    }

    await transporter.destroy();

    return res.send('DELETED');
  }
}

export default new TransporterController();
