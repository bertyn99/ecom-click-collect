const { filter } = require('compression');
const mongoose = require('mongoose');

function distinct(v) {
    console.log(this.ingredients);
    return v
}

const reviewSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        rating: { type: Number, default: 0 },
        comment: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);
const prodctSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    price: { type: Number, default: 0, required: true },
    ingredients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient',
        set: distinct
    }],
    category: { type: String, enum: ["dessert", "poke", "boisson"], required: true },
    description: { type: String, required: true },

    /*  rating: { type: Number, default: 0, required: true }, 
        numReviews: { type: Number, default: 0, required: true }, */
    reviews: [reviewSchema],
});

const Product = mongoose.model('Product', prodctSchema);

module.exports = Product;