import mongoose from 'mongoose';

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
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, default: 0, required: true },
    ingredients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient',
    }],
    category: { type: String, enum: ["dessert", "poke", "boisson"], required: true },
    description: { type: String, required: true },

    /*  rating: { type: Number, default: 0, required: true }, 
        numReviews: { type: Number, default: 0, required: true }, */
    reviews: [reviewSchema],
});

const Product = mongoose.model('Product', prodctSchema);

export default Product;