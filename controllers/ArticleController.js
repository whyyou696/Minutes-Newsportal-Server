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
  static async deleteArticlesById(req, res) {
    try {
      let { id } = req.params;
      let article = await Article.findByPk(id);
      if (!article) throw { name: "NotFound" };
      await article.destroy();
      res.status(200).json({ message: "Article has been deleted" });
    } catch (error) {
      //console.log(error);
      if (error.name === "NotFound") {
        res.status(404).json({ message: "Article not found" });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
  static async getArticleById(req, res) {
    try {
      let { id } = req.params;
      let article = await Article.findByPk(id);
      if (!article) throw { name: "NotFound" };
      res.status(200).json(article);
    } catch (error) {
      if (error.name === "NotFound") {
        res.status(404).json({ message: "Article not found" });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  static async updateArticleById(req, res) {
    try {
      let { title, content, imgUrl, categoryId, authorId } = req.body;
      let { id } = req.params;
      let article = await Article.findByPk(id);
      if (!article) throw { name: "NotFound" };
      await article.update({
        title,
        content,
        imgUrl,
        categoryId,
        authorId,
      });

      res.status(200).json({ message: "Article has been updated" });
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        let message = error.errors[0].message;
        res.status(400).json({ message: message });
      } else if (error.name === "NotFound") {
        res.status(404).json({ message: "Article not found" });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
};
