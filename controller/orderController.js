const Order = require("../db/Model/ORDER");
const database = require("../db/connexion");
const Strip = require('stripe');
const stripe = new Strip(process.env.STRIPE_SK);

async function getOrder(req, res) {
    const _id = req.params.id

    try {
        const order = await Order.findById(_id);
        console.log(order);
        if (!order) {
            throw Error
        }
        res.status(200).send(order)
    } catch (e) {
        res.status(404).send("This is a wrong id we cant find your orders")
    }

}




async function getAllOrders(req, res) {
    try {
        const orders = await Order.find();
        if (!orders) {
            throw new Error
        }
        res.status(200).send(orders);
    } catch (e) {
        res.status(404).send("We cant find order")
    }
}

async function getYourOrders(req, res) {
    const _id = req.params.id
    try {
        const order = await Order.find({ user: req.user._id }).limit(10);
        console.log(order);
        if (!order) {
            throw new Error
        }
        res.status(200).send(order)
    } catch (e) {
        res.status(404).send("This is a wrong id we cant find your orders")
    }

}

async function createOrder(req, res) {
    console.log(req.body)

    const order = new Order(req.body);
    try {
        let ord = await order.save();
        console.log(ord)
        res.status(200).send(ord)
    } catch (e) {
        res.status(404).send(e)
    }

}

async function checkoutOrder(req, res) {
    const { amount } = req.body

    // Should calculate server side

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "eur"
        });
        res.status(200).send({ secret: paymentIntent.client_secret });
    } catch (error) {
        console.log("error", error);
        response.status(500).send("error" + error);
    }
}



async function updateOrder(req, res) {
    const id = req.params.id;
    const allowedUpdates = ['user', 'user', 'image', 'price', 'product', 'description', 'reviews'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        res.status(400).send({ error: 'Invalid Update!!' })
    }
    try {
        await Product.findOneAndUpdate({ '_id': req.params.id }, { $set: { ...req.body } }, { new: true, runValidators: true })

        res.status(201).json("Votre produit a bien été modifié")
    } catch (e) {
        res.status(400).json(e);
    }
}

async function deleteOrder(req, res) {
    try {
        const deletedOrd = await Order.findById(req.params.id);
        if (deletedOrd) {
            await deleteOrd.remove();
            res.send({ message: 'Order Deleted' });
        }
    } catch (e) {
        res.status(500).send(e)
    }
}

module.exports = {
    getOrder,
    getYourOrders,
    createOrder,
    updateOrder,
    deleteOrder,
    checkoutOrder,
    getAllOrders

}