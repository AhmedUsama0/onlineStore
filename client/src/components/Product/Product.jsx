import { useNavigate } from "react-router-dom";
import { useCartItem } from "../../hooks";
import { motion } from "framer-motion";
import { convertRatingToStars } from "../../utils";
import {
  productVariants,
  addToCartButton,
} from "../../motion-variants/variants";
const Product = ({ product }) => {
  const { title, price, description, image, rating, id } = product;
  const navigate = useNavigate();
  const handleCartItem = useCartItem();

  return (
    <div
      className="product col-12 col-sm col-lg-3"
      role="button"
      onClick={() => navigate(`/product/${id}`)}
    >
      <motion.div
        variants={productVariants}
        initial="hidden"
        whileInView="inView"
        whileHover="inHover"
        viewport={{ once: true }}
        className="card position-relative h-100"
      >
        <i
          className="fa-regular fa-heart position-absolute end-0 m-2 p-2 rounded-5"
          style={{ backgroundColor: "#fff" }}
        ></i>
        <img
          src={`http://localhost:5000/${image}`}
          alt="clothes"
          className="card-img-top"
          height="300"
        />
        <div className="card-body d-flex flex-column justify-content-between">
          <div className="card-title d-flex justify-content-between flex-fill">
            <h5 className="text-capitalize h5 fw-bold">{title}</h5>
            <div className="price fw-bold h4">
              <sup className="h6 fw-bold">$</sup>
              {price.toString().split(".")[0]}
              <sup className="h6 fw-bold">
                .{price.toFixed(2).toString().split(".")[1]}
              </sup>
            </div>
          </div>
          <p className="card-text text-capitalize h6 text-secondary fw-semibold text-truncate">
            {description}
          </p>
          <div className="rate">{convertRatingToStars(rating)}</div>
          <motion.button
            variants={addToCartButton}
            whileHover="inHover"
            type="button"
            className="btn btn-outline-secondary rounded-5 mt-3 text-capitalize"
            onClick={(e) => {
              e.stopPropagation();
              handleCartItem({ id, title, price, image, quantity: 1 });
            }}
          >
            add to cart
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Product;
