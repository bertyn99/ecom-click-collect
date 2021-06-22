const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    name: { type: String },
    type: { type: String, enum: ['base', 'veggies', 'toppings', 'protein', 'sauce'] },
    isInStock: { type: Boolean, default: true },
}, {
    timestamps: true
})

const Ingredient = mongoose.model("Ingredient", ingredientSchema);
module.exports = Ingredient;