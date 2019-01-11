'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Projects', [{
      title: 'Un vélo pour Sam',
      price: 200,
      timeLaps: 3,
      description: 'Résolution 2019 ! Aller à mon travail en vélo, mais j\'ai pas de vélo...',
      interests: 0.05,
      state: 'valid',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Un mac pour Maeva',
      price: 1000,
      timeLaps: 8,
      description: 'La seule de l\'équipe à pas en avoir, aidons la à basculer du bon côté de la force!',
      interests: 0,
      state: 'valid',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
}
