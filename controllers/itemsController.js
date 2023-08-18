const { Item } = require('../services/db');
const { validateItem } = require('../middlewares/validations');
const { validationResult } = require('express-validator');

exports.itemsList = async (req, res) => {
  const items = await Item.findAll();
  res.render('items', {
    title: 'Items',
    items,
  });
};

exports.createItemGet = async (req, res) => {
  res.render('create_item', {
    title: 'Create item',
    errors: [],
  });
};

exports.createItemPost = [
  validateItem,
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.render('create_item', {
        title: 'Create item',
        errors: result.array(),
      });
    }
    console.log(req.file, req.body);
    res.send(req.body);
  },
];
