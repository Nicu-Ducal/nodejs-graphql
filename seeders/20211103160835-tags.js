const faker = require('faker')

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tags = []
    for (let i = 0; i < 200; i++) {
      const label = faker.lorem.words()
      tags.push({
        label,
        slug: label.replace(" ", "-"),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    
    await queryInterface.bulkInsert('Tags', tags)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
