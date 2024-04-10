import Product from "../Product/Product";
const ProductsList = ({ products,searchQuery }) => {
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
