'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Projects', [{
      title: 'Un vélo pour Sam',
      user_id: 3,
      price: 200,
      time_laps: 3,
      description: 'Résolution 2019 ! Aller à mon travail en vélo, mais j\'ai pas de vélo...',
      interests: '0.05',
      state: 'valid',
      createdAt: '2019-01-03 11:36:58.540 +00:00',
      updatedAt: '2019-01-03 11:36:58.540 +00:00'
    },
    {
      title: 'Un mac pour Maeva',
      user_id: 2,
      price: 1000,
      time_laps: 8,
      description: 'La seule de l\'équipe à pas en avoir, aidons la à basculer du bon côté de la force!',
      interests: '0%',
      state: 'unvalid',
      createdAt: '2019-01-03 11:36:58.540 +00:00',
      updatedAt: '2019-01-03 11:36:58.540 +00:00'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Projects', null, {});
  }
};
