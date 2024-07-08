"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
    },
    {}
  );
  Post.associate = function (models) {
    Post.belongsTo(models.User, { foreignKey: "userId" });
  };
  return Post;
};
