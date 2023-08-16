const { Sequelize } = require('sequelize');
const ItemModel = require('./item');
const CategoryModel = require('./category');

const sequelize = new Sequelize(`mysql://root:@localhost:3306/inventory`);

const Item = ItemModel(sequelize);
const Category = CategoryModel(sequelize);

Item.belongsToMany(Category, {
  through: 'ItemCategories',
  foreignKey: 'itemId',
});
Category.belongsToMany(Item, {
  through: 'ItemCategories',
  foreignKey: 'categoryId',
});

module.exports = {
  Item,
  Category,
};

(async () => {
  await sequelize.sync({ force: true });
})();
