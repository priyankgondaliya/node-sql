const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authenticateToken = require("../middleware/authenticateToken");

router.post("/", authenticateToken, postController.createPost);
router.get("/", authenticateToken, postController.getPosts);
router.put("/:id", authenticateToken, postController.updatePost);
router.delete("/:id", authenticateToken, postController.deletePost);

module.exports = router;