const router = require('express').Router();
const postController = require('../controllers/post.controllers');
const authentification = require("../middlewares/authentification.js");
const multer = require("../middlewares/multer-config");


 
router.get("/", authentification, postController.getAllPost);
router.get("/:id", authentification , postController.getOnePost);

router.post("/create", authentification , postController.createPost );
router.put("/:id", authentification , postController.modifyPost );
router.delete("/:id", authentification , postController.deletePost);




module.exports = router;