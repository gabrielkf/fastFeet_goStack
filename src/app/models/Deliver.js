import { DataTypes, Model } from 'sequelize';

class Deliver extends Model {
  static init(sequelize) {
    super.init(
      {
        signature_id: DataTypes.STRING,
        product_name: DataTypes.STRING,
        start_date: DataTypes.DATE,
        end_date: DataTypes.DATE,
        cancelled_at: DataTypes.DATE
      },
      {
        sequelize
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Transporter, {
      foreignKey: 'transporter_id',
      as: 'transporter'
    });

    this.belongsTo(models.Recipient, {
      foreignKey: 'recipient_id',
      as: 'recipient'
    });
  }
}

export default Deliver;
