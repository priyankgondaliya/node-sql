const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticateToken = require("../middleware/authenticateToken");
// const upload = require("../middlewares/uploadMiddleware");
const upload = require("../middleware/uploadMiddleware");
const { validateRegister, validateLogin } = require("../validations/auth");

router.post(
  "/register",
  //   validateRegister,
  upload.single("profilePic"),
  authController.register
);
router.post("/login", validateLogin, authController.login);
router.post(
  "/change-password",
  authenticateToken,
  authController.changePassword
);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

module.exports = router;
