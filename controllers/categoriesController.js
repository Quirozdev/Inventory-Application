const { Category } = require('../services/db');
const { validateCategory } = require('../middlewares/validations');
const { validationResult } = require('express-validator');

exports.categoriesList = async (req, res) => {
  const categories = await Category.findAll();
  res.render('categories', {
    title: 'Categories',
    categories,
  });
};

exports.createCategoryGet = async (req, res) => {
  res.render('create_category', {
    title: 'Create category',
  });
};

exports.createCategoryPost = [
  validateCategory,
  async (req, res, next) => {
    const result = validationResult(req);
    console.log(result.array());
    if (!result.isEmpty()) {
      return res.render('create_category', {
        title: 'Create category',
        errors: result.array(),
      });
    }
    try {
      await Category.create({
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body['image-url'],
      });
      res.redirect('/categories');
    } catch (err) {
      next(err);
    }
  },
];
