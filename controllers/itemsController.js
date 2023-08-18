const { Item } = require('../models/db');
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

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.items_list = async (req, res) => {
  const items = await Item.findAll();
  res.render('items', {
    title: 'Items',
    items,
  });
};

exports.create_item_get = async (req, res) => {
  res.render('create_item', {
    title: 'Create item',
  });
};

exports.create_item_post = [
  upload.single('image-file'),
  async (req, res) => {
    console.log(req.file, req.body);
    res.send(req.file);
  },
];
