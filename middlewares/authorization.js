const { Article } = require("../models");

async function authorization(req, res, next) {
  try {
    let { id } = req.params
    console.log(id, "<< req.params.id");
    let article = await Article.findByPk(id);
    if (!article) {
      throw { name: "NotFound" };
    }
    console.log(article.authorId, "<< article")
    console.log(req.user.id, "<< user");

    if (article.authorId !== req.user.id) {
      throw { name: "Forbidden" };
    }

    next();

  } catch (error) {
    if (error.name === "Forbidden") {
        res.status(403).json({ message: "You're not authorized" });
    } else if (error.name === "NotFound") {
        res.status(404).json({ message: "Article not found" });
    } else {
        res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = authorization;
