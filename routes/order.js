const express = require("express");
const order = require("../controller/orderController");
const verifyTokenUser = require("../middleware/verifyTokenUser");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router()
router.get('/', order.getAllOrders);
router.get('/:id', order.getOrder);
router.get('user/:id', verifyTokenUser, order.getYourOrders);
router.post('/', order.createOrder);
router.post('/stripe', order.checkoutOrder)
router.patch('/:id', verifyToken, order.updateOrder);
router.delete('/:id', verifyToken, order.deleteOrder);






module.exports = router;
