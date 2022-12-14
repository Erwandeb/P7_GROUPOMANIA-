const router = require('express').Router();
const commentController = require('../controllers/comment.controllers');
const authentification = require("../middlewares/authentification.js");
const multer = require("../middlewares/multer-config");


 
router.get("/", authentification, commentController.getAllComment);
router.get("/:id", authentification , commentController.getOneComment);

router.post("/create", authentification , commentController.createComment );
router.put("/:id", authentification , commentController.modifyComment );
router.delete("/:id", authentification , commentController.deleteComment);


module.exports = router;