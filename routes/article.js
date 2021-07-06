const express = require("express");
const article = require("../controller/articleController");
const verifyToken = require("../middleware/verifyToken");

//multer
const upload = require("../utils/multer");


exports.router = (function () {
    const apiArticle = express.Router();

    //create ingredients
    apiArticle.route("/").post(verifyToken, article.create)

    //update articles
    apiArticle.route("/:id").patch(verifyToken, article.update)

    //list of articles
    apiArticle.route("/").get(article.getArticles)


    //get article
    apiArticle.route("/:id").get(article.getArticle)

    return apiArticle;
})();