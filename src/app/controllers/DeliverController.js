import * as Yup from 'yup';
import Deliver from '../models/Deliver';
import Transporter from '../models/Transporter';
import Recipient from '../models/Recipient';

class DeliverController {
  //* CREATE *//
  async store(req, res) {
    const schema = Yup.object().shape({
      product_name: Yup.string().required(),
      transporter_id: Yup.number().required(),
      recipient_id: Yup.number().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Failed validation' });
    }

    const {
      product_name,
      transporter_id,
      recipient_id
    } = req.body;

    // check if trasporter exists
    const isTransporter = await Transporter.findByPk(
      transporter_id
    );
    if (!isTransporter) {
      return res
        .status(400)
        .json({ error: 'Invalid transporter' });
    }

    // check if recipient exists
    const isRecipient = await Recipient.findByPk(recipient_id);
    if (!isRecipient) {
      return res
        .status(400)
        .json({ error: 'Invalid recipient' });
    }

    // check if deliver is already registered
    const deliverAlreadyExists = await Deliver.findOne({
      where: {
        product_name,
        transporter_id,
        recipient_id
      }
    });
    if (deliverAlreadyExists) {
      return res
        .status(400)
        .json({ error: 'Deliver already registered' });
    }

    const newDeliver = await Deliver.create({
      product_name,
      transporter_id,
      recipient_id
    });

    return res.json(newDeliver);
  }
}

export default new DeliverController();
