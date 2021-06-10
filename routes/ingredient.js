const express = require("express");
const ingredient = require("../controller/ingredientController");
const verifyToken = require("../middleware/verifyToken");

exports.router = (function () {
    const apiIngredient = express.Router();

    //create ingredients
    apiIngredient.route("/").post(ingredient.create)

    //update ingredients
    apiIngredient.route("/:id/edit").patch(ingredient.update)

    //list of ingredients
    apiIngredient.route("/").get(ingredient.getIngredients)


    //get ingredient
    apiIngredient.route("/:id").get(ingredient.getIngredient)

    return apiIngredient;
})();