const multer = require('multer');
const path = require('path');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/products');
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const filename = `${Date.now()}_${Math.floor(Math.random() * 987654321)}${ext}`;
      cb(null, filename);
    },
});

const multerFilter = (req, file, cb) => {
  if (path.extname(file.originalname) === ".jpg" || path.extname(file.originalname) === ".png") {
    cb(null, true);
  } else {
    cb(new Error("Not an image File!!"), false);
  }
};
  

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

module.exports = upload;