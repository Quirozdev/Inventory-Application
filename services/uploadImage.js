const multer = require('multer');
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public');
  },
  filename: (req, file, cb) => {
    const extension = file.mimetype.split('/')[1];
    cb(null, `images/image-${Date.now()}.${extension}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.split('/')[1] === 'png') {
    cb(null, true);
  } else {
    cb(new Error('Not an image'), false);
  }
};

const uploadImage = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

module.exports = uploadImage;
