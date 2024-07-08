const { body } = require("express-validator");

const validateRegister = [
  // Name validation
  body("name").trim().notEmpty().withMessage("Name is required."),

  // Email validation
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Invalid email format."),

  // Password validation
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
];

const validateLogin = [
  // Email validation
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Invalid email format."),

  // Password validation
  body("password").trim().notEmpty().withMessage("Password is required."),
];

module.exports = {
  validateRegister,
  validateLogin,
};
