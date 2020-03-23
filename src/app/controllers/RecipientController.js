import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const { city, zipcode } = req.body;
    if (zipcode) {
      const recipients = await Recipient.findAll({
        where: { zipcode }
      });
      if (recipients) {
        return res.json(recipients);
      }
    }

    const recipients = await Recipient.findAll({
      where: { city }
    });

    if (!recipients) {
      return res.json({
        error: 'No recipients found'
      });
    }

    return res.json(recipients);
  }

  async store(req, res) {
    // VALIDATION
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      zipcode: Yup.string().required(),
      state: Yup.string()
        .required()
        .max(2),
      city: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Required field is empty'
      });
    }

    // CHECK IF EXISTS IN DATABASE
    const recipientExists = await Recipient.findOne({
      where: { name: req.body.name }
    });
    if (recipientExists) {
      return res.status(400).json({
        error: 'Recipient already registered'
      });
    }

    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }
}

export default new RecipientController();
