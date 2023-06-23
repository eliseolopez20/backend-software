/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('availabilities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fieldid: {
        type: Sequelize.INTEGER,
        references: { model: 'fields', key: 'id' },
      },
      timestart: {
        type: Sequelize.DATE,
      },
      timeend: {
        type: Sequelize.DATE,
      },
      available: {
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
    await queryInterface.dropTable('availabilities');
  },
};
