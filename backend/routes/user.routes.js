const userController = require('../controllers/user.controllers');
const authentification = require("../middlewares/authentification.js");
const multer = require("../middlewares/multer-config");


 /*
router.get("/", authentification, userController.getAllUser);
router.get("/:id", authentification , userController.getOneUser);
router.put("/:id", authentification , userController.modifyUser );
router.delete("/:id", authentification , userController.deleteUser);
*/

//module.exports = router;