const { Category } = require('../services/db');
const { validateCategory } = require('../middlewares/validations');
const { validationResult } = require('express-validator');

exports.categoriesList = async (req, res) => {
  const categories = await Category.findAll();
  console.log(categories);
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
