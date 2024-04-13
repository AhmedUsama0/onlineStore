import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { useCartItem } from "../../hooks";
import { motion } from "framer-motion";
import "./productdetails.css";
const ProductDetails = () => {
  const { title, price, description, images, id } = useLoaderData();
  const [quantity, setQuantity] = useState(1);
  const handleCartItem = useCartItem();

  const numberOfMonths = 5;
  const taxes = 2;
  const allowedPriceForInstallments = 30;

  return (
    <section className="product-details-wrapper mt-3 pt-5 border-top border-light-subtle">
      <div className="row">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="product-img col-12 col-sm-6"
        >
          <img
            src={images[0]}
            alt="product img"
            className="rounded-4 img-fluid"
          />
        </motion.div>
        <motion.div
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
          className="product-details col-12 col-sm-4 offset-sm-2"
        >
          <h2 className="text-capitalize fw-bold">{title}</h2>
          <p className="text-capitalize text-secondary h6 fw-semibold mt-2 mb-2">
            {description}
          </p>
          <div className="rate">
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
          </div>
          <div className="price border-top border-bottom border-light-subtle mt-3 mb-3 pt-4 pb-4">
            <p className="fw-semibold h3">
              ${price.toFixed(2)}{" "}
              {price >= allowedPriceForInstallments &&
                `or $${(price / numberOfMonths + taxes).toFixed(2)}/month`}
            </p>
            {price >= allowedPriceForInstallments && (
              <p className="text-secondary h6 text-capitalize">
                suggested payments with {numberOfMonths} months special
                financing
              </p>
            )}
          </div>
          <div className="quantity-wrapper d-flex align-items-center overflow-hidden rounded-4">
            <button
              className="btn fs-4 border-0"
              type="button"
              onClick={(e) => {
                setQuantity((q) => (q !== 1 ? q - 1 : q));
              }}
            >
              -
            </button>
            <input
              onChange={(e) => setQuantity(e.target.value)}
              className="form-control border-0 text-center fs-4 shadow-none"
              type="text"
              value={quantity}
              aria-label="readonly input example"
              readOnly
              style={{ background: "unset" }}
            />
            <button
              className="btn fs-4 border-0"
              type="button"
              onClick={(e) => setQuantity((q) => q + 1)}
            >
              +
            </button>
          </div>
          <div className="buy-wrapper mt-4 d-flex gap-2">
            <button
              style={{ backgroundColor: "var(--green-color)" }}
              type="button"
              className="btn text-capitalize w-50 rounded-5 text-white"
            >
              buy now
            </button>
            <motion.button
              whileHover={{ backgroundColor: "var(--green-color)" }}
              transition={{duration: 0}}
              type="button"
              className="btn btn-outline-secondary text-capitalize w-50 rounded-5"
              onClick={(e) => {
                e.stopPropagation();
                handleCartItem({
                  id,
                  title,
                  price,
                  images,
                  quantity: quantity,
                });
              }}
            >
              add to cart
            </motion.button>
          </div>
          <div className="delivery-wrapper mt-5">
            <div className="free-delivery border border-light-subtle d-flex align-items-center p-3">
              <i
                className="fa-solid fa-truck align-self-start pt-1 px-2"
                style={{ color: "var(--orange-color)" }}
              ></i>
              <div className="free">
                <h5 className="text-capitalize">free delivery</h5>
                <p className="text-decoration-underline text-secondary text-capitalize">
                  enter your post code for delivery availablity
                </p>
              </div>
            </div>
            <div className="return-delivery border border-top-0 border-light-subtle d-flex align-items-center p-3">
              <i
                className="fa-solid fa-wallet align-self-start pt-1 px-2"
                style={{ color: "var(--orange-color)" }}
              ></i>
              <div className="free">
                <h5 className="text-capitalize">return delivery</h5>
                <p className="text-secondary text-capitalize">
                  free 30days delivery returns.
                  <span className="text-decoration-underline">details</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductDetails;
