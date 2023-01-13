const router = require('express').Router();
const commentController = require('../controllers/comment.controllers');
const authentification = require("../middlewares/authentification.js");



router.get("/:postId", authentification, commentController.getAllComment);
router.post("/create", authentification , commentController.createComment );
router.put("/:commentId", authentification , commentController.modifyComment );
router.delete("/:commentId", authentification , commentController.deleteComment);


module.exports = router;