const express = require("express");
const router = express.Router();
const ordersController = require("../controller/order");

router.post("/get-all-orders", ordersController.getAllOrders);
router.post("/order-by-user", ordersController.getOrderByUser);

router.post("/create-order", ordersController.postCreateOrder);
router.post("/update-order", ordersController.postUpdateOrder);
router.post("/updateO-data", ordersController.updateData);
router.post("/delete-order", ordersController.postDeleteOrder);
router.post("/return", ordersController.returnOrder);
router.post("/cancel", ordersController.cancelOrder);

module.exports = router;