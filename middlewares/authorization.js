const { Article, Category, User } = require("../models");
const user = require("../models/user");
async function authorizationArticle(req, res, next) {
  try {
    let { id } = req.params;
    let article = await Article.findByPk(id);
    if (!article) {
      throw { name: "NotFound" };
    }
    if (req.user.role === "Admin" || article.authorId === req.user.id) {
      next()
    } else {
      throw { name: "Forbidden" };
    }
  } catch (error) {
    next(error);
  }
}

async function authorizationCategory(req, res, next) {
  try {
    let { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      throw { name: "NotFound" };
    }
    if (req.user.role === "Admin") {
    next()
    } else {
      throw { name: "Forbidden" };
    }
  } catch (error) {
    next(error);
  }
}

async function authorizationAdmin(req, res, next) {
  try {
    if (req.user.role == "Admin") {
    next()
    } else {
      throw { name: "Forbidden" };
    }
  } catch (error) {
    console.log(error)
    console.log(req.user)
    next(error);
  }
}
module.exports = {
  authorizationArticle,
  authorizationCategory,
  authorizationAdmin,
};

