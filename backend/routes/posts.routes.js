const router = require('express').Router();
const postController = require('../controllers/posts.controllers');
const authentification = require("../middlewares/authentification.js");
const multer = require("../middlewares/multer-config");


 
router.get("/", authentification, postController.getAllPost);
router.get("/:authorid", authentification , postController.getOnePost);

router.post("/create", authentification , postController.createPost );
router.put("/:postid", authentification , postController.modifyPost );
router.delete("/:postid", authentification , postController.deletePost);




module.exports = router;