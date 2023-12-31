const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController.js');

router.get('/', categoriesController.categoriesList);

router.get('/create', categoriesController.createCategoryGet);

router.post('/create', categoriesController.createCategoryPost);

module.exports = router;
