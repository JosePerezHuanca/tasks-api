'use strict';

const { ForeignKeyConstraintError } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('tasks',{
      type: 'foreign key',
      name:'tasks_userId_fkey',
      fields: ['userId'],
      references:{
        table: 'users',
        field: 'id'
      },
      onDelete:'cascade'
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
await queryInterface.removeConstraint('tasks','tasks_userId_fkey');
  }
};
