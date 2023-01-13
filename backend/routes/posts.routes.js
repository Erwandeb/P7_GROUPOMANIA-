const router = require('express').Router();
const postController = require('../controllers/posts.controllers');
const authentification = require("../middlewares/authentification.js");
const upload = require('../middlewares/multer-config');

router.get("/", authentification, postController.getAllPost);
router.get("/:postid", authentification , postController.getOnePost);

router.post("/create", authentification, upload.postImageUpload, postController.createPost );
router.put("/:postid", authentification, upload.postImageUpload, postController.modifyPost );
router.delete("/:postid", authentification, upload.postImageUpload, postController.deletePost);

module.exports = router;