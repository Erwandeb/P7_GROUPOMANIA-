const router = require('express').Router();
const commentController = require('../controllers/comment.controllers');
const authentification = require("../middlewares/authentification.js");



router.get("/", authentification, commentController.getAllComment);
router.post("/create", authentification , commentController.createComment );
router.put("/:id", authentification , commentController.modifyComment );
router.delete("/:id", authentification , commentController.deleteComment);


module.exports = router;