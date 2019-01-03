'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
        firstName: 'Sam',
        lastName: 'Chery',
        email: 'chery.samantha@yahoo.fr',
        createdAt: '2019-01-03 11:36:58.540 +00:00',
        updatedAt: '2019-01-03 11:36:58.540 +00:00'
      },
      {
        firstName: 'Maeva',
        lastName: '',
        email: 'maeva@gmail.com',
        createdAt: '2019-01-03 11:36:58.540 +00:00',
        updatedAt: '2019-01-03 11:36:58.540 +00:00'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};