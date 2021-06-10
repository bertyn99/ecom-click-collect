const Product = require("../db/Model/PRODUCT");


async function getProducts(req, res) {
    try {
        const products = await Product.find();
        if (!products) {
            throw new Error
        }
        res.status(200).send(order);
    } catch (e) {
        res.status(404).send("We cant find product")
    }
}

async function getProduct(req, res) {
    const id = req.params.id;
    try {
        const product = await Product.findOne({ _id: id });
        if (!product) return res.status(400).send("This is a wrong product id");
        res.status(200).json(product);
    } catch (e) {
        res.status(404).send(e)
    }
}

async function createProduct(req, res) {
    const product = new Product({ ...req.body });
    try {
        await product.save();
        res.status(201).json({ products })
    } catch (e) {
        res.status(400).send(e);
    }
}

async function updateProduct(req, res) {
    const id = req.params.id;
    const allowedUpdates = ['name', 'image', 'price', 'ingredients', 'category', 'description', 'reviews'];
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


async function deleteProduct(req, res) {
    try {
        await Ingredient.deleteOne({ _id: req.params.id })

        res.status(201).json("Votre produit a bien été effacer")
    } catch (e) {
        res.status(400).json(e);
    }
}


module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,

}