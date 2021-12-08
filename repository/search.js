const db = require("../models");
const { Op } = require("sequelize");

module.exports.search = async (query) => {
  try {
    // User
    const users = db.User.findAll({
      where: { firstName: { [Op.like]: `%${query}%` } },
    });

    // Posts
    const posts = db.Post.findAll({
      where: { title: { [Op.like]: `%${query}%` } },
    });

    const results = await Promise.all([users, posts]);
    console.log("results", results);
    return [...results[0], ...results[1]];
  } catch (err) {
    console.log(err);
    return [];
  }
};
