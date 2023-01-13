const router = require('express').Router();
const userController = require('../controllers/user.controllers');
const authentification = require("../middlewares/authentification.js");
const upload = require('../middlewares/multer-config');


router.put("/modify", authentification , upload.profilPictureUpload, userController.modifyUser);


module.exports = router;