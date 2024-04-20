const paypal = require("@paypal/checkout-server-sdk");


class PayPal {
    static async pay(subTotal, products, items) {

        const Environment = process.env.NODE_ENV === "production" ?
            paypal.core.LiveEnvironment : paypal.core.SandboxEnvironment;

        const paypalClient = new paypal.core.PayPalHttpClient(new Environment
            (process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET));

        const orderRequest = new paypal.orders.OrdersCreateRequest();

        const shippingFee = subTotal / 100;
        const tax = (subTotal * 15) / 100;
        const totalCost = (subTotal + shippingFee + tax).toFixed(2);


        orderRequest.prefer("return=representation");

        orderRequest.requestBody({
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: totalCost,
                        breakdown: {
                            item_total: { currency_code: "USD", value: subTotal },
                            shipping: { currency_code: "USD", value: shippingFee },
                            tax_total: { currency_code: "USD", value: tax }
                        }
                    },
                    items: products.map(product => {
                        const quantity = items.find(item => item.id === product.id).quantity;
                        return {
                            name: product.title,
                            unit_amount: {
                                value: product.price,
                                currency_code: "USD"
                            },
                            quantity: quantity
                        }
                    })
                }
            ]
        });

        return paypalClient.execute(orderRequest);
    }
}

module.exports = PayPal;