'use strict';
const fs = require('fs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = JSON.parse(fs.readFileSync('./data/article.json', 'utf-8')).map(el => {
      el.title, el.content, el.imgUrl, el.categoryId, el.authorId, el.createdAt = el.updatedAt = new Date();
      return el
    })
    await queryInterface.bulkInsert('Articles', data, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Articles', null, {
      truncate: true,
      restartIdentity: true,
      cascade: true
    })
  }
};
