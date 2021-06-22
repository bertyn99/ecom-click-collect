const express = require("express");
const product = require("../controller/productController");
const verifyTokenUser = require("../middleware/verifyToken");
const router = express.Router()

router.get('/', product.getProducts);
router.get('/:id', product.getProduct);
router.post('/', product.createProduct);
router.patch('/:id', product.updateProduct);
router.delete('/:id', product.deleteProduct);






module.exports = router;
