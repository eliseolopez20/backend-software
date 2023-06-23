/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('fields', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      enclousureid: {
        type: Sequelize.INTEGER,
        references: { model: 'enclousures', key: 'id' },
      },
      number: {
        type: Sequelize.INTEGER,
      },
      maxplayers: {
        type: Sequelize.INTEGER,
      },
      minplayers: {
        type: Sequelize.INTEGER,
      },
      playeramount: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('fields');
  },
};
