"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addIndex("Reviews", ["userId"], {
      name: "index_on_userId",
    });
    await queryInterface.addIndex("Reviews", ["postId"], {
      name: "index_on_postId",
    });
    await queryInterface.addIndex("Reviews", ["userId", "postId"], {
      name: "index_on_userId_and_postId",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex("Reviews", "index_on_userId");
    await queryInterface.removeIndex("Reviews", "index_on_postId");
    await queryInterface.removeIndex("Reviews", "index_on_userId_and_postId");
  },
};
