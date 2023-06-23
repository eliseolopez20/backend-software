/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('enclousures', [
      {
        id: 15,
        ownerid: 2,
        name: 'Deportes UC',
        address: 'Vicuna Mackena 1314',
        district: 'Macul',
        phonenumber: '+56290755252',
        socialmedia: '@deportesuc',
        email: 'deportes@uc.cl',
        createdat: new Date(),
        updatedat: new Date(),
      },
      {
        id: 3,
        ownerid: 1,
        name: 'Fortín Cruzado',
        address: 'Camino las Flores 13000',
        district: 'Las Condes',
        phonenumber: '+56290755252',
        socialmedia: '@fortincruzado',
        email: 'fortincruzado@gmail.com',
        createdat: new Date(),
        updatedat: new Date(),
      },
    ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: (queryInterface) => queryInterface.bulkDelete('enclousures', null, {}),

};
