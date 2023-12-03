"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Users", "employee_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Employees',
        key: 'emp_no',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the 'employee_id' column from the 'Users' table
    await queryInterface.removeColumn("Users", "employee_id");
  },
};
