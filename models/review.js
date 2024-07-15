"use strict";
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "Review",
    {
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
      rating: DataTypes.INTEGER,
      comment: DataTypes.STRING,
    },
    {
      indexes: [
        {
          fields: ["userId"],
        },
        {
          fields: ["postId"],
        },
        {
          fields: ["userId", "postId"],
        },
      ],
    }
  );

  Review.associate = function (models) {
    // associations can be defined here
    Review.belongsTo(models.User, { foreignKey: "userId" });
    Review.belongsTo(models.Post, { foreignKey: "postId" });
  };

  return Review;
};
