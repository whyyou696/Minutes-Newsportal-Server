const { Article } = require("../models/index");
const {v2: cloudinary} = require('cloudinary');
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});


module.exports = class ArticleController {
  static async getArticles(req, res, next) {
    try {
      let articles = await Article.findAll();
      res.status(200).json(articles);
    } catch (error) {
      //console.log(error);
      //res.status(500).json({ message: "Internal Server Error" });
      next(error)
    }
  }
  static async postArticles(req, res, next) {
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
      // if (
      //   error.name === "SequelizeValidationError" ||
      //   error.name === "SequelizeUniqueConstraintError"
      // ) {
      //   let message = error.errors[0].message;
      //   res.status(400).json({ message: message });
      // } else {
      //   res.status(500).json({ message: "Internal Server Error" });
      // }
      next(error)
    }
  }
  static async deleteArticlesById(req, res, next) {
    try {
      let { id } = req.params;
      let article = await Article.findByPk(id);
      if (!article) throw { name: "NotFound" };
      await article.destroy();
      res.status(200).json({ message: "Article has been deleted" });
    } catch (error) {
      //console.log(error);
      // if (error.name === "NotFound") {
      //   res.status(404).json({ message: "Article not found" });
      // } else {
      //   res.status(500).json({ message: "Internal Server Error" });
      // }
      next(error)
    }
  }
  static async getArticleById(req, res, next) {
    try {
      let { id } = req.params;
      let article = await Article.findByPk(id);
      if (!article) throw { name: "NotFound" };
      res.status(200).json(article);
    } catch (error) {
      // if (error.name === "NotFound") {
      //   res.status(404).json({ message: "Article not found" });
      // } else {
      //   res.status(500).json({ message: "Internal Server Error" });
      // }
      next(error)
    }
  }

  static async updateArticleById(req, res, next) {
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
      next(error)
    }
  }
  static async articleUploadImage(req, res, next) {
    try {
        const { id } = req.params
        const article = Article.findByPk(id)
        if (!article) {
            throw { name: "NotFound" }
        }
        const bufferStr = req.file.buffer.toString("base64");
        const uploadData = `data:${req.file.mimetype};base64,${bufferStr}`;
        const uploadToCloud = await cloudinary.uploader.upload(uploadData, {
            public_id: req.file.originalname,
            folder: "ch1-newsportal",
            resource_type: "auto"
        })
         console.log(uploadToCloud);
        await Article.update({ imgUrl: uploadToCloud.secure_url }, {
            where: {
                id: id
            }
        })

        res.status(200).json("Successfully Upload Image")
    } catch (error) {
         console.log(error);
        // res.status(500).json({ message: "Internal Server Error" });
        next(error)
    }
}

};
