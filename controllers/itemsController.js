const { Item } = require('../services/db');
const { validateItem } = require('../middlewares/validations');
const { validationResult } = require('express-validator');

exports.itemsList = async (req, res) => {
  const items = await Item.findAll();
  console.log(items);
  res.render('items', {
    title: 'Items',
    items,
  });
};

exports.createItemGet = async (req, res) => {
  res.render('create_item', {
    title: 'Create item',
  });
};

exports.createItemPost = [
  validateItem,
  async (req, res, next) => {
    const result = validationResult(req);
    console.log(result.array());
    if (!result.isEmpty()) {
      return res.render('create_item', {
        title: 'Create item',
        errors: result.array(),
      });
    }
    try {
      await Item.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        numberInStock: req.body.stock,
      });
      res.redirect('/items');
    } catch (err) {
      next(err);
    }
  },
];
