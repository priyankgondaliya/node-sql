"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Reviews",
      [
        {
          userId: 3,
          postId: 1,
          rating: 5,
          comment: "Excellent post!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          postId: 1,
          rating: 4,
          comment: "Great read, thanks for sharing.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          postId: 2,
          rating: 3,
          comment: "Good post but could use more details.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Reviews", null, {});
  },
};
