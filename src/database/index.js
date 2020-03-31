import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

// MODELS IMPORTS
import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import Transporter from '../app/models/Transporter';
import File from '../app/models/File';
import Deliver from '../app/models/Deliver';

const models = [User, Recipient, Transporter, File, Deliver];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(
        model =>
          model.associate &&
          model.associate(this.connection.models)
      );
  }
}

export default new Database();
