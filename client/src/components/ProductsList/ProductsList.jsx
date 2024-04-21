import { useAsyncValue } from "react-router-dom";
import Product from "../Product/Product";
const ProductsList = ({ searchQuery }) => {
  const { products } = useAsyncValue();
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
