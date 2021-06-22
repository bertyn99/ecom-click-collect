const express = require("express");
const product = require("../controller/productController");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router()

router.get('/', product.getProducts);
router.get('/:id', product.getProduct);
router.post('/', verifyToken, product.createProduct);
router.patch('/:id', verifyToken, product.updateProduct);
router.delete('/:id', verifyToken, product.deleteProduct);






module.exports = router;
