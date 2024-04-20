import { useCart } from "../../hooks";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ProductItemReview,
  PurchaseMessage,
  CheckoutModal,
} from "../../components";
import "./checkout.css";
import { Link } from "react-router-dom";
const CheckOut = () => {
  const { cart } = useCart();
  const [purchaseMessage, setPurchaseMessage] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);

  const PriceSection = ({ price, priceTitle }) => {
    return (
      <div className="d-flex align-items-center justify-content-between">
        <p className="text-capitalize text-secondary">{priceTitle}</p>
        <p className="fw-bold fs-5">${price}</p>
      </div>
    );
  };
  if (cart.length !== 0) {
    const subTotal = cart
      .map((item) => item.price * item.quantity)
      .reduce((total, price) => total + price);
    const shippingFee = subTotal / 100;
    const tax = (subTotal * 15) / 100;
    const totalCost = (subTotal + shippingFee + tax)?.toFixed(2);
    return (
      <section className="checkout">
        {showCheckout && (
          <CheckoutModal
            totalCost={totalCost}
            setPurchaseMessage={setPurchaseMessage}
            setShowCheckout={setShowCheckout}
          />
        )}
        {purchaseMessage.trim() !== "" && (
          <PurchaseMessage
            setPurchaseMessage={setPurchaseMessage}
            purchaseMessage={purchaseMessage}
          />
        )}
        <h2 className="text-capitalize fs-5 fw-bold">
          review items and shipping
        </h2>
        <div className="row m-0">
          <div
            className="col-12 col-sm-7 border rounded-2 p-0 text-danger"
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
            <motion.button
              whileHover={{ opacity: 0.9 }}
              style={{ backgroundColor: "var(--green-color)" }}
              className="btn text-white text-capitalize w-100 mt-4 p-2 fs-5 fw-semibold"
              onClick={() => setShowCheckout(true)}
            >
              place order
            </motion.button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "calc(100vh - 100px)" }}
    >
      <div className="message">
        <p className="fs-4 text-center text-capitalize m-0 mb-3">
          your cart is empty
        </p>
        <Link
          to="/"
          className="text-capitalize d-block mx-auto text-decoration-none btn btn-outline-secondary"
        >
          explore products
        </Link>
      </div>
    </div>
  );
};

export default CheckOut;
