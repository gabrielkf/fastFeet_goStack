module.exports = {
  up: queryInterface => {
    return queryInterface.removeColumn(
      'transporters',
      'avatar_id'
    );
  },

  down: () => {}
};
