module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'delivers',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        recipient_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'recipients',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          allowNull: false
        },
        transporter_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'transporters',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          allowNull: false
        },
        signature_id: {
          type: Sequelize.STRING,
          allowNull: true
        },
        product_name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        start_date: {
          type: Sequelize.DATE,
          allowNull: true
        },
        end_date: {
          type: Sequelize.DATE,
          allowNull: true
        },
        cancelled_at: {
          type: Sequelize.DATE,
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
    return queryInterface.dropTable('delivers');
  }
};
