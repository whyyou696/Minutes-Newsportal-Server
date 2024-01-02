'use strict';
const fs = require('fs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = JSON.parse(fs.readFileSync('./data/category.json', 'utf-8')).map(el => {
      el.name, el.createdAt = el.updatedAt = new Date();
      return el
    })
    await queryInterface.bulkInsert('Categories', data, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {
      truncate: true,
      restartIdentity: true,
      cascade: true
    })
  }
};
