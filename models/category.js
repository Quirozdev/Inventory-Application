const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    imageUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    url: {
      type: DataTypes.VIRTUAL,
      get() {
        return `/categories/${this.id}`;
      },
    },
  });
  return Category;
};
