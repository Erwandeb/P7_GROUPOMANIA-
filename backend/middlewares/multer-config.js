const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storagePostsImages = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images/posts");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    callback(null, name);
  },
});

const storageUserProfilPictures = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images/profil-pictures");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    callback(null, name);
  },
});

module.exports = {
  postImageUpload: multer({ 
    storage: storagePostsImages,
    fileFilter: (req, file, cb) => {
      if (Object.keys(MIME_TYPES).includes(file.mimetype)) {
        cb(null, true);
      } else {
        throw new Error('new Error');
      }
    }
  }).array("images", 10),
  profilPictureUpload: multer({ 
    storage: storageUserProfilPictures,
    fileFilter: (req, file, cb) => {
      if (Object.keys(MIME_TYPES).includes(file.mimetype)) {
        cb(null, true);
      } else {
        throw new Error('new Error');
      }
    }
  }).single("image"),
};