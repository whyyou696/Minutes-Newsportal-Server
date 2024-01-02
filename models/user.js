"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Article, {
        foreignKey: "authorId",
      });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "username is required",
          },
          notEmpty: {
            msg: "username is required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "email is required",
          },
          notEmpty: {
            msg: "email is required",
          },
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "password is required",
          },
          notEmpty: {
            msg: "password is required",
          },
          len: {
            args: [5],
            msg: "password must be at least 5 characters",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "Staff",
      },
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
