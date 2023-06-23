/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        id: 1,
        name: 'Tomas',
        lastname: 'Concha',
        email: 'tomas.concha@uc.cl',
        type: 'player',
        password: '$2a$05$yUuSEPQqtRB5QfacCJvzseqR4L4fk.eQ.gCi1ZPZwrICdcDsOggEe',
        createdat: new Date(),
        updatedat: new Date(),
      },
      {
        id: 0,
        name: 'ADMIN',
        lastname: '',
        email: 'admin@admin.cl',
        type: 'admin',
        password: '$2a$05$yUuSEPQqtRB5QfacCJvzseqR4L4fk.eQ.gCi1ZPZwrICdcDsOggEe',
        createdat: new Date(),
        updatedat: new Date(),
      },
      {
        id: 2,
        name: 'Jorge',
        lastname: 'Gonzalez',
        email: 'jorgegonzalez@gmail.com',
        type: 'owner',
        password: '$2a$05$yUuSEPQqtRB5QfacCJvzseqR4L4fk.eQ.gCi1ZPZwrICdcDsOggEe',
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

  down: (queryInterface) => queryInterface.bulkDelete('users', null, {}),

};
