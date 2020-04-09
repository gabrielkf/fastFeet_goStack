import * as Yup from 'yup';
import { Op } from 'sequelize';

import Delivery from '../models/Delivery';
import Transporter from '../models/Transporter';
import Recipient from '../models/Recipient';

import Mail from '../../lib/Mail';

class DeliveryController {
  // CREATE
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
    const isRecipient = await Recipient.findByPk(
      recipient_id
    );
    if (!isRecipient) {
      return res
        .status(400)
        .json({ error: 'Invalid recipient' });
    }

    // check if deliver is already registered
    const alreadyScheduled = await Delivery.findOne({
      where: {
        product_name,
        transporter_id,
        recipient_id
      }
    });
    if (alreadyScheduled) {
      return res
        .status(400)
        .json({ error: 'Deliver already registered' });
    }

    const newDeliver = await Delivery.create({
      product_name,
      transporter_id,
      recipient_id
    });

    const message = {
      to: `${isTransporter.name} <${isTransporter.email}>`,
      subject: 'New delivery pickup',
      text: `The product ${product_name} is available to be taken to ${isRecipient.name}`
    };
    await Mail.sendMail(message);

    return res.json(newDeliver);
  }

  // READ (for transporters)
  async index(req, res) {
    const { transporter_id } = req.params;

    const isTransporter = await Transporter.findByPk(
      transporter_id
    );
    if (!isTransporter) {
      return res
        .status(400)
        .json({ error: 'ID not found' });
    }

    const { finished } = req.body;

    const deliveries = await Delivery.findAll({
      where: {
        transporter_id,
        end_date: finished
          ? {
              [Op.ne]: null
            }
          : null
      }
    });

    if (!deliveries.length) {
      return res.status(400).json({
        error: `You have no ${
          finished ? '' : 'un'
        }finished deliveries`
      });
    }

    return res.json(deliveries);
  }

  // UPDATE (for transporters)
  async update(req, res) {
    return res.send();
  }
}

export default new DeliveryController();
