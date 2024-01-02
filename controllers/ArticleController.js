const { Article } = require("../models");

module.exports = class ArticleController {
  static async getArticles(req, res) {
    try {
      let articles = await Article.findAll();
      res.status(200).json(articles);
    } catch (error) {
      //console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async postArticles(req, res) {
    try {
      let { title, content, imgUrl, categoryId, authorId } = req.body;
      let article = await Article.create({
        title,
        content,
        imgUrl,
        categoryId,
        authorId,
      });
      res.status(201).json(article);
    } catch (error) {
      //console.log(error.name);
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        let message = error.errors[0].message;
        res.status(400).json({ message: message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
};
