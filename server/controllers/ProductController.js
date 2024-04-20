const Product = require("../models/Product");
const PayPal = require("../services/paypal");
const Mail = require("../services/mail");

class ProductController {
    static makePagination(req, res) {
        const limit = parseInt(req.query.limit);
        const offset = parseInt(req.query.offset);

        Product.getNumberOfProducts((err, data) => {
            const productsNumber = data[0].productsNumber;
            const numberOfPages = Math.ceil(productsNumber / limit);

            if (err) {
                return res.status(500).json({ message: "products error occured" });
            }

            Product.getLimitedNumberOfProducts(limit, offset, (err, data) => {
                if (err) {
                    return res.status(500).json({ message: "cannot fetch the products" });
                }
                res.json({
                    products: data,
                    numberOfPages
                });
            });

        });
    }

    static getById(req, res) {
        const { id } = req.params;
        Product.getById(id, (err, data) => {
            if (err) {
                return res.status(500).json({ message: "cannot fetch the product" });
            }
            res.json(data[0]);
        });
    }

    static buyProduct(req, res) {
        const { items } = req.body;
        const ids = items.map(item => item.id);


        Product.getById(ids, async (err, products) => {
            if (err) {
                return res.status(500).json({ message: "something wrong with products" });
            };

            const subTotal = items.reduce((sum, item) => {
                const productPrice = products.find(product => product.id === item.id).price;
                return sum + (productPrice * item.quantity);
            }, 0);


            try {
                const order = await PayPal.pay(subTotal, products, items);
                res.json({ id: order.result.id });
            }
            catch (err) {
                res.status(500).json({ message: "payment failed" });
            }
        })

    }

    static paymentConfirmation(req, res) {
        const { fullName, payerEmail, items } = req.body;
        Mail.send(fullName, payerEmail, items, (err, info) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "confirmation mail is not sent. please contact the support." });
            }
            res.json({ message: "a confirmation is sent to your email: " + payerEmail });
        })
    }
}


module.exports = ProductController;