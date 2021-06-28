const express = require("express");
const product = require("../controller/productController");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router()

//multer
const upload = require("../utils/multer");

router.get('/', product.getProducts);
router.get('/:id', product.getProduct);
router.post('/', verifyToken, upload.single('image'), product.createProduct);
router.patch('/:id', verifyToken, upload.single('image'), product.updateProduct);
router.delete('/:id', verifyToken, product.deleteProduct);






module.exports = router;
