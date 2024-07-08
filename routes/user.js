const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateToken = require("../middleware/authenticateToken");

router.get("/me", authenticateToken, userController.getUserDetails);

module.exports = router;
