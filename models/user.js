"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      resetPasswordToken: DataTypes.STRING,
      resetPasswordExpires: DataTypes.DATE,
    },
    {}
  );
  User.associate = function (models) {
    User.hasMany(models.Post, { foreignKey: "userId" });
  };
  return User;
};
