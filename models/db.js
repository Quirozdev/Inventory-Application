const { Sequelize } = require('sequelize');
const ItemModel = require('./item');
const CategoryModel = require('./category');

const sequelize = new Sequelize(process.env.MYSQL_URI);

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

async function connectToDB() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database', error);
    process.exit(1);
  }
}

module.exports = {
  Item,
  Category,
  connectToDB,
};
