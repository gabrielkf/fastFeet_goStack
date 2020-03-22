module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'transporters',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        avatar_id: {
          type: Sequelize.STRING,
          allowNull: true
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false
        }
      }
    );
  },

  down: queryInterface => {
    return queryInterface.dropTable(
      'transporters'
    );
  }
};
