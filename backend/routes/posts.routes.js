const router = require('express').Router();
const postController = require('../controllers/posts.controllers');
const authentification = require("../middlewares/authentification.js");
const multer = require("../middlewares/multer-config");


 
router.get("/", authentification, postController.getAllPost);
router.get("/:postid", authentification , postController.getOnePost);

router.post("/create", authentification, multer, postController.createPost );
router.put("/:postid", authentification, multer, postController.modifyPost );
router.delete("/:postid", authentification, multer, postController.deletePost);

module.exports = router;