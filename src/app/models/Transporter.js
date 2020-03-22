import { DataTypes, Model } from 'sequelize';

class Transporter extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        avatar_id: DataTypes.STRING
      },
      {
        sequelize
      }
    );
    return this;
  }

  /* static associate(models) {
    // this.hasMany(models.)
  } */
}

export default Transporter;
