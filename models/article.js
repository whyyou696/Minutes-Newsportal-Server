"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Article.belongsTo(models.User, {
        foreignKey: "authorId",
      });
      Article.belongsTo(models.Category, {
        foreignKey: "categoryId",
      });
    }
  }
  Article.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Article title is required",
          },
          notEmpty: {
            msg: "Article title is required",
          },
        },
      },
      content: {
        type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Article content is required",
        },
        notEmpty: {
          msg: "Article content is required",
        },
      }},
      imgUrl: DataTypes.STRING,
      categoryId: {
        type: DataTypes.INTEGER,
        references:{
          model: 'Categories',
          key: 'id'
        },
      },
      authorId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: 'id'
        },
      }
    },
    {
      sequelize,
      modelName: "Article",
    }
  );
  return Article;
};
