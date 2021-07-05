const express = require("express");
const ingredient = require("../controller/ingredientController");
const verifyToken = require("../middleware/verifyToken");

exports.router = (function () {
    const apiIngredient = express.Router();

    //create ingredients
    apiIngredient.route("/").post(verifyToken, ingredient.create)

    //update ingredients
    apiIngredient.route("/:id").patch(verifyToken, ingredient.update)

    //list of ingredients
    apiIngredient.route("/").get(ingredient.getIngredients)


    //get ingredient
    apiIngredient.route("/:id").get(ingredient.getIngredient)

    return apiIngredient;
})();