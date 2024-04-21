import { useAsyncValue } from "react-router-dom";

const ProductsError = () => {
  const error = useAsyncValue();
  return (
    <p className="text center text-capitalize text-center fs-5 alert alert-danger">
      {error?.message ??
        "unexpected problem occured.please contact the support if the problem persist."}
    </p>
  );
};

export default ProductsError;
