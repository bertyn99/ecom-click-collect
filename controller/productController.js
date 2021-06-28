const Product = require("../db/Model/PRODUCT");

const cloudinary = require('../utils/cloudinary');
const path = require('path')
//multer

async function getProducts(req, res) {
    try {
        const products = await Product.find().populate('ingredients');
        if (!products) {
            throw new Error
        }
        res.status(200).send(products);
    } catch (e) {
        res.status(404).send("We cant find product")
    }
}

async function getProduct(req, res) {
    const id = req.params.id;
    try {
        const product = await Product.findOne({ _id: id }).populate('ingredients');
        if (!product) return res.status(400).send("This is a wrong product id");
        res.status(200).send(product);
    } catch (e) {
        res.status(404).send(e)
    }
}

async function createProduct(req, res) {

    const product = new Product({ ...req.body });
    console.log(product);
    try {
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                upload_preset: "hawa_product_default"
            })
            product.image = result.secure_url;
        }

        await product.save();
        res.status(201).send(product);
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
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                upload_preset: "hawa_product_default"
            })
            req.body.image = result.secure_url;
        }
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
    deleteProduct

}