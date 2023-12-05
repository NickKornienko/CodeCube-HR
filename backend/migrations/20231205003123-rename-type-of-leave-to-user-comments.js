'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Timeoffs', 'type_of_leave', 'user_comments');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Timeoffs', 'user_comments', 'type_of_leave');
  }
};
