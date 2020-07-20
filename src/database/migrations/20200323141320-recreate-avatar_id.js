module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'transporters',
      'avatar_id',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'files',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    );
  },

  down: queryInterface => {
    return queryInterface.removeColumn(
      'transporters',
      'avatar_id'
    );
  }
};