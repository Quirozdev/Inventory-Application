const { Sequelize } = require('sequelize');
const ItemModel = require('../models/item');
const CategoryModel = require('../models/category');

const sequelize = new Sequelize(process.env.MYSQL_URI, {
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  logging: false,
});

const Item = ItemModel(sequelize);
const Category = CategoryModel(sequelize);

Item.belongsToMany(Category, { through: 'ItemCategories' });

Category.belongsToMany(Item, { through: 'ItemCategories' });

(async function connectToDB() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database', error);
    process.exit(1);
  }
})();

module.exports = {
  Item,
  Category,
};
