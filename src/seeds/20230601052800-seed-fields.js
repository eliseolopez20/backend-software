/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('fields', [
      {
        id: 13,
        enclousureid: 15,
        number: 1,
        maxplayers: 20,
        minplayers: 10,
        playeramount: 0,
        createdat: new Date(),
        updatedat: new Date(),
      },
      {
        id: 14,
        enclousureid: 15,
        number: 2,
        maxplayers: 20,
        minplayers: 10,
        playeramount: 0,
        createdat: new Date(),
        updatedat: new Date(),
      },
    ]);
  },

  down: (queryInterface) => queryInterface.bulkDelete('fields', null, {}),

};
