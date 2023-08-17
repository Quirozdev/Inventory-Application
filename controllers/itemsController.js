const { Item } = require('../models/db');

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

exports.create_item_post = async (req, res) => {
  // TODO
};
