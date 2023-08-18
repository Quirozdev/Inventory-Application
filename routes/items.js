const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');

router.get('/', itemsController.itemsList);

router.get('/create', itemsController.createItemGet);

router.post('/create', itemsController.createItemPost);

module.exports = router;
