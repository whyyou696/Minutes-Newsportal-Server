const { Category } = require("../models");

module.exports = class CategoryController {
  static async getCategories(req, res, next) {
    try {
      let categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (error) {
      //res.status(500).json({ message: "Internal Server Error" });
      next(error)
    }
  }

  static async postCategories(req, res, next) {
    try {
      let data = await Category.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      // console.log(error);
      // if (error.name === "SequelizeValidationError") {
      //   res.status(400).json({ message: error.errors[0].message });
      // } else {
      //   res.status(500).json({ message: "Internal Server Error" });
      // }
      next(error)
    }
  }
  static async updateCategoriesById(req, res, next) {
    try {
      let { name } = req.body;
      let id = req.params.id;
      let category = await Category.findByPk(id);

      if (!category) {
        throw { name: "NotFound" };
      }
      await category.update({ name });
      res.status(200).json({ message: "Category has been updated" });
    } catch (error) {
      // if (error.name === "SequelizeValidationError") {
      //   res.status(400).json({ message: error.errors[0].message });
      // } else {
      //   res.status(500).json({ message: "Internal Server Error" });
      // }
      next(error)
    }
  }
  static async deleteCategoriesById(req, res, next) {
    try {
      let { id } = req.params;
      let category = await Category.findByPk(id);
      if (!category) {
        throw { name: "NotFound" };
      }
      await category.destroy();
      res.status(200).json({ message: "Category has been deleted" });
    } catch (error) {
      // if (error.name === "NotFound") {
      //   res.status(404).json({ message: "Category not found" });
      // } else {
      //   res.status(500).json({ message: "Internal Server Error" });
      // }
      next(error)
    }
  }
};
