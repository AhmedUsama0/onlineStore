import { useNavigate } from "react-router-dom";
import { useCartItem } from "../../hooks";
import "./productitem.css";

const ProductItemReview = ({ product }) => {
  const { id, image, price, title, quantity } = product;
  const navigate = useNavigate();
  const handleCartItem = useCartItem();
  const decreaseQuantity = (e) => {
    e.stopPropagation();
    if (quantity === 0) return;
    handleCartItem({
      title,
      price,
      images: [image],
      id,
      quantity: -1,
    });
  };
  const increaseQuantity = (e) => {
    e.stopPropagation();
    handleCartItem({
      title,
      price,
      images: [image],
      id,
      quantity: 1,
    });
  };
  return (
    <li
      onClick={() => navigate(`/product/${id}`)}
      className="product-item list-group-item border-0 border-bottom border border-light-subtle"
    >
      <div className="row">
        <div className="col-10 d-flex align-items-center column-gap-2">
          <img src={image} alt="product" width="50" height="50" />
          <h5 className="text-capitalize fw-bold h6">{title}</h5>
        </div>
        <div className="col">
          <h4 className="fw-bold fs-5 mb-3">${(price * quantity).toFixed(2)}</h4>
          <div className="d-flex align-items-center column-gap-2">
            <button
              type="button"
              className="quantity-btn w-50 border rounded-2 fs-5 fw-semibold"
              onClick={decreaseQuantity}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              type="button"
              className="quantity-btn border w-50 rounded-2 fs-5 fw-semibold"
              onClick={increaseQuantity}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};
export default ProductItemReview;
