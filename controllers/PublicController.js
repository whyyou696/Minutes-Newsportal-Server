const { Article } = require("../models");

module.exports = class PublicController {
    static async getPublics(req,res) {
        try {
            let articles = await Article.findAll();
            res.status(200).json(articles);
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
    static async getPublicById(req,res) {
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
}