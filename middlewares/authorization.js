const { Article } = require("../models");
async function authorization(req, res, next) {
  try {
    let article = await Article.findByPk(req.params.id);
    if (!article) {
      throw { name: "NotFound" };
    }
    if (article.authorId !== req.user.id) {
      throw { name: "Forbidden" };
    }
    
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authorization;
