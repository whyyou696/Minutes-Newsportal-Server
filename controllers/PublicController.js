const { Article } = require("../models");
const { Op } = require("sequelize");


module.exports = class PublicController {
  static async getPublics(req, res, next) {      
      try {
        const { filter, date, search } = req.query;
        //console.log(req.query)
        let option = { where: {}, order: [] };
        let order = date === "new" ? "DESC" : "ASC"
        if (date) {
          option.order = [["createdAt", order]];
        }
        // filtering
        if (filter) {
          if (filter.categoryId === "") {
            throw { name: "invalidValue" };
          } else if (!Number(filter.categoryId)) {
            throw { name: "invalidValue" };
          } else {
            let data = filter.categoryId.split(",").map((el) => ({
              [Op.eq]: el,
            }));
            option.where = {
              categoryId: {
                [Op.or]: data,
              },
            };
          }
        }
  
        if (search) {
          option.where = {
            title: {
              [Op.like]: `%${search}%`,
            },
          };
        }
  
        if(typeof +req.query.page !== "number" 
        || typeof +req.query.sie !== "number"){
          throw { name: "invalidValue" }
        }
        if(typeof +req.query.limit !== "number"){
          throw { name: "invalidparams" }
        }
        if (req.query.page) {
          option.limit = req.query.size  || 5;
          option.offset = (req.query.page - 1)* option.limit
        }
        const article = await Article.findAll(option)
        res.status(200).json({count: article.length, article})
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
