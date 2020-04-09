import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

// MODELS IMPORTS
import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import Transporter from '../app/models/Transporter';
import File from '../app/models/File';
import Delivery from '../app/models/Delivery';
import Problem from '../app/models/Problem';

const models = [
  User,
  Recipient,
  Transporter,
  File,
  Delivery,
  Problem
];

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
