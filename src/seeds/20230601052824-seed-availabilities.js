/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('availabilities', [
      {
        id: 91,
        fieldid: 14,
        timestart: new Date(2023, 6, 1, 10),
        timeend: new Date(2023, 6, 1, 11),
        available: true,
        createdat: new Date(),
        updatedat: new Date(),
      },
      {
        id: 92,
        fieldid: 13,
        timestart: new Date(2023, 6, 1, 10),
        timeend: new Date(2023, 6, 1, 11),
        available: true,
        createdat: new Date(),
        updatedat: new Date(),
      },
      {
        id: 93,
        fieldid: 14,
        timestart: new Date(2023, 6, 1, 11),
        timeend: new Date(2023, 6, 1, 12),
        available: true,
        createdat: new Date(),
        updatedat: new Date(),
      },
      {
        id: 94,
        fieldid: 13,
        timestart: new Date(2023, 6, 1, 11),
        timeend: new Date(2023, 6, 1, 12),
        available: false,
        createdat: new Date(),
        updatedat: new Date(),
      },
    ]);
  },

  down: (queryInterface) => queryInterface.bulkDelete('availabilities', null, {}),
};
