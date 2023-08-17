const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');

router.get('/', itemsController.items_list);

router.get('/create', itemsController.create_item_get);

module.exports = router;
