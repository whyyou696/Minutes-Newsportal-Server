const { Article } = require("../models");

module.exports = class PublicController {
  static async getPublics(req, res, next) {
    try {
      let articles = await Article.findAll();
      res.status(200).json(articles);
    } catch (error) {
      //res.status(500).json({ message: "Internal Server Error" });
      next(error);
    }
  }
  static async getPublicById(req, res, next) {
    try {
      let { id } = req.params;
      let articles = await Article.findByPk(id);
      if (!articles) throw { name: "NotFound" };
      res.status(200).json(articles);
    } catch (error) {
      // if (error.name === "NotFound") {
      //   res.status(404).json({ message: "Article not found" });
      // } else {
      //   res.status(500).json({ message: "Internal Server Error" });
      // }
      next(error);
    }
  }
};
