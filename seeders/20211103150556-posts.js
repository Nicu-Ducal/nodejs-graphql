'use strict';

const db = require("../models");
const faker = require("faker")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const allUsers = await db.User.findAll()
    const posts = []
    for (let i = 0; i < 200; i++) {
      const userId = Math.floor(Math.random() * allUsers.length)
      posts.push({
        // id: i
        userId: userId,
        title: faker.lorem.sentence(),
        body: faker.lorem.paragraphs(),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    
    await queryInterface.bulkInsert('Posts', posts)
  },

  down: async (queryInterface, Sequelize) => {
    
  }
};