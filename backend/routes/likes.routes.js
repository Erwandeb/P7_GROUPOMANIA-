const router = require('express').Router();
const likesController = require('../controllers/likes.controllers');
const authentification = require("../middlewares/authentification.js");
const multer = require("../middlewares/multer-config");


router.get("/:postId", authentification, likesController.getAllLikes);
router.post("/:postId", authentification , likesController.liked);


module.exports = router;