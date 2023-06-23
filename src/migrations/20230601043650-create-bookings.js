/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      playerid: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
      },
      availabilityid: {
        type: Sequelize.INTEGER,
        references: { model: 'availabilities', key: 'id' },
      },
      fieldid: {
        type: Sequelize.INTEGER,
        references: { model: 'fields', key: 'id' },
      },
      active: {
        type: Sequelize.BOOLEAN,
      },
      createdat: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedat: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('bookings');
  },
};
