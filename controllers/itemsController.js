const { Item } = require('../services/db');
const { Category } = require('../services/db');
const { validateItem } = require('../middlewares/validations');
const { validationResult } = require('express-validator');

exports.itemsList = async (req, res) => {
  const items = await Item.findAll();
  res.render('items', {
    title: 'Items',
    items,
  });
};

exports.getItemDetails = async (req, res, next) => {
  const { id } = req.params;
  const item = await Item.findOne({
    where: {
      id: id,
    },
    include: Category,
  });
  console.log(item);
  if (item === null) {
    const err = new Error('Item not found');
    err.status = 404;
    return next(err);
  }
  res.render('item_details', {
    item,
  });
};

exports.createItemGet = async (req, res) => {
  const itemCategories = await Category.findAll();
  res.render('create_item', {
    title: 'Create item',
    categories: itemCategories,
  });
};

exports.createItemPost = [
  validateItem,
  (req, res, next) => {
    if (!Array.isArray(req.body.category)) {
      req.body.category =
        typeof req.body.category === 'undefined'
          ? []
          : new Array(req.body.category);
    }
    next();
  },
  async (req, res, next) => {
    console.log(req.body);
    const categories = req.body.category;
    console.log(categories);
    const result = validationResult(req);
    console.log(result.array());
    if (!result.isEmpty()) {
      return res.render('create_item', {
        title: 'Create item',
        errors: result.array(),
      });
    }

    try {
      const item = await Item.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        numberInStock: req.body.stock,
        imageUrl: req.body['image-url'],
      });

      await Promise.all(
        categories.map(async (categoryId) => {
          const category = await Category.findByPk(categoryId);
          await item.addCategory(category);
        })
      );

      res.redirect(item.url);
    } catch (err) {
      next(err);
    }
  },
];
