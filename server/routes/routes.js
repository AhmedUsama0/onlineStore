const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");

// product routes
router.get("/products", ProductController.makePagination);
router.get("/product/:id", ProductController.getById);
router.post("/product/buy", ProductController.buyProduct);
router.post("/product/confirm-payment", ProductController.paymentConfirmation);

module.exports = router;