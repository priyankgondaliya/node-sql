const { User } = require("../models");
const { getPagination, getPagingData } = require("../middleware/pagination");

exports.getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "name", "email", "profilePic"],
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch user",
      error: error.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  try {
    const data = await User.findAndCountAll({
      attributes: ["id", "name", "email", "profilePic"],
      limit,
      offset,
    });
    const response = getPagingData(data, page, limit);

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: response,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};
