import Delivery from '../models/Delivery';
import Transporter from '../models/Transporter';

class PickupController {
  async pickup(req, res) {
    const { transporter_id } = req.params;

    const isTransporter = await Transporter.findByPk(
      transporter_id
    );
    if (!isTransporter) {
      return res
        .status(400)
        .json({ error: 'ID not found' });
    }

    const { delivery_id } = req.body;

    const deliveries = await Delivery.findAll({
      where: { transporter_id }
    });

    if (!deliveries) {
      return res
        .status(401)
        .json({ error: `You have no delivery requests` });
    }

    const isDelivery = deliveries.find(
      delivery => delivery.id === delivery_id
    );
    if (!isDelivery) {
      return res.status(400).json({
        error: `No delivery with the provided ID`
      });
    }

    if (isDelivery.start_date) {
      return res.status(400).json({
        error: 'This delivery has already been picked up'
      });
    }

    const now = new Date();

    /*  if (now.getHours() < 8 || now.getHours() > 18) {
      return res.status(401).json({
        error:
          'Pickup requests can only be made between 8:00 and 18:00'
      });
    } */

    // isDelivery.update({ start_date: now });

    return res.json({ number: deliveries.length });
  }
}

export default new PickupController();
