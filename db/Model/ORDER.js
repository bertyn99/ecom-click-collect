const mongoose = require('mongoose');
/* const shippingSchema = {
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    carrier: { type: String },
    tracking: { type: String }

}; */

const paymentSchema = {
    paymentMethod: { type: String, required: true }
};

const orderItemSchema = new mongoose.Schema({
    qty: { type: Number, required: true },
    price: { type: String, required: true },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
});

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: "" },
    userRandom: {
        firstname: { type: String, default: "" },
        lastname: { type: String, default: "" }
    },
    orderItems: [orderItemSchema],
    payement: String,
    totalPrice: { type: Number },
    isPaid: { type: Boolean, default: true },
    orderAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['Prise de commande', 'Commande accepté', 'En préparation', 'prête', 'Remis'], default: "Prise de commande" },
}, {
    timestamps: true
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;