import { DataTypes, Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        path: DataTypes.STRING,
        url: {
          type: DataTypes.VIRTUAL,
          get() {
            return `http://localhost:3000/files/${this.path}`;
          }
        }
      },
      {
        sequelize
      }
    );

    return this;
  }

  static associate(models) {
    this.hasOne(models.User, {
      foreignKey: 'avatar_id',
      as: 'avatar'
    });
  }
}

export default File;
