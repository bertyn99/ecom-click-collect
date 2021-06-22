const mongoose = require('mongoose');
const shippingSchema = {
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    carrier: { type: String },
    tracking: { type: String }

};

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
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: "", required },
    userRandom: {
        firstname: { type: String, required: true, default: "" },
        lastname: { type: String, required: true, default: "" }
    },
    orderItems: [orderItemSchema],
    payement: paymentSchema,
    totalPrice: { type: Number },
    taxPrice: { type: Number },
    isPaid: { type: Boolean, default: false },
    orderAt: { type: Date },
    isCollected: { type: Boolean, default: false },
}, {
    timestamps: true
});

const Order = mongoose.model("Order", orderSchema);
export default Order;