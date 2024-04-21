import { useAsyncValue } from "react-router-dom";
import { convertRatingToStars } from "../../utils";
const ProductInfo = () => {
  const { title, rating, description, price } = useAsyncValue();

  const numberOfMonths = 5;
  const taxes = 2;
  const allowedPriceForInstallments = 30;

  return (
    <>
      <h2 className="text-capitalize fw-bold">{title}</h2>
      <p className="text-capitalize text-secondary h6 fw-semibold mt-2 mb-2">
        {description}
      </p>
      <div className="rate">{convertRatingToStars(rating)}</div>
      <div className="price border-top border-bottom border-light-subtle mt-3 mb-3 pt-4 pb-4">
        <p className="fw-semibold h3">
          ${price.toFixed(2)}{" "}
          {price >= allowedPriceForInstallments &&
            `or $${(price / numberOfMonths + taxes).toFixed(2)}/month`}
        </p>
        {price >= allowedPriceForInstallments && (
          <p className="text-secondary h6 text-capitalize">
            suggested payments with {numberOfMonths} months special financing
          </p>
        )}
      </div>
    </>
  );
};

export default ProductInfo;
