import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    customerId: { type: String, required: true },
    status: { type: String, required: true },
    gateway: { type: String, required: true },
    type: { type: String, required: true },
    token: { type: String, required: true }
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;