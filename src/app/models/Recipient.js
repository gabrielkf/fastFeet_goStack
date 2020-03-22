import { DataTypes, Model } from 'sequelize';

class Recipient extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        zipcode: DataTypes.STRING,
        state: DataTypes.STRING,
        city: DataTypes.STRING,
        street: DataTypes.STRING,
        number: DataTypes.INTEGER,
        complement: DataTypes.STRING
      },
      {
        sequelize,
        tableName: 'recipients'
      }
    );
    return this;
  }
}

export default Recipient;
