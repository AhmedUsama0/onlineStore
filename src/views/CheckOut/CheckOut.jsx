import { PayPalButtons } from "@paypal/react-paypal-js";
import { useCart } from "../../hooks";
import { ProductItemReview, PurchaseMessage } from "../../components";
import { useState } from "react";
import "./checkout.css";
const CheckOut = () => {
  const { cart } = useCart();
  const subTotal = cart
    .map((item) => item.price * item.quantity)
    .reduce((total, price) => total + price);

  const shippingFee = subTotal / 100;
  const tax = (subTotal * 15) / 100;
  const totalCost = (subTotal + shippingFee + tax).toFixed(2);

  const [showPurchaseMessage, setShowPurchaseMessage] = useState(false);

  const PriceSection = ({ price, priceTitle }) => {
    return (
      <div className="d-flex align-items-center justify-content-between">
        <p className="text-capitalize text-secondary">{priceTitle}</p>
        <p className="fw-bold fs-5">${price}</p>
      </div>
    );
  };

  return (
    <section className="checkout">
      <PurchaseMessage
        showPurchaseMessage={showPurchaseMessage}
        setShowPurchaseMessage={setShowPurchaseMessage}
      />
      <h2 className="text-capitalize fs-5 fw-bold">
        review items and shipping
      </h2>
      <div className="row m-0">
        <div
          className="col-12 col-sm-7 border rounded-2 p-0"
          style={{ height: "fit-content" }}
        >
          <ul className="list-group">
            {cart.map((product) => {
              return <ProductItemReview product={product} key={product.id} />;
            })}
          </ul>
        </div>
        <div className="col-12 col-sm p-0 offset-sm-1">
          <h2 className="text-capitalize fs-5 fw-bold">pricing details</h2>
          <div
            className="p-2 rounded-2"
            style={{ backgroundColor: "var(--main-background-color)" }}
          >
            <PriceSection priceTitle="subtotal" price={subTotal} />
            <PriceSection priceTitle="shipping fee" price={shippingFee} />
            <PriceSection priceTitle="tax (15%)" price={tax} />
            <PriceSection priceTitle="total" price={totalCost} />
          </div>
          <button
            style={{ backgroundColor: "var(--green-color)" }}
            className="btn text-white text-capitalize w-100"
            onClick={() => setShowPurchaseMessage(true)}
          >
            place order
          </button>
          <PayPalButtons
            style={{ color: "blue", label: "checkout" }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: totalCost,
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then(function (details) {
                setShowPurchaseMessage(true);
                // alert("Transaction completed by " + details.payer.name.given_name);
                console.log(details);
                // Call your server to save the transaction
              });
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default CheckOut;
