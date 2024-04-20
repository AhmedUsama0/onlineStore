import { useAsyncValue } from "react-router-dom";
import Product from "../Product/Product";
const ProductsList = ({ searchQuery }) => {
  const { products } = useAsyncValue();

  if (products.length === 0) {
    return (
      <div className="alert alert-danger text-center text-capitalize">no products found</div>
    );
  }
  return (
    <>
      {products
        .filter(
          (product) =>
            (product = product.title
              .toLowerCase()
              .includes(searchQuery.toLowerCase()))
        )
        .map((product, index) => (
          <Product product={product} key={product.id} />
        ))}
    </>
  );
};

export default ProductsList;
