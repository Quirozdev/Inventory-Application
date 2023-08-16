const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Item = sequelize.define('Item', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    // category: {
    //   allowNull: false,
    // },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    numberInStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Item;
};
