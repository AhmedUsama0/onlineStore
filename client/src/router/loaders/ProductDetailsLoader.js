import { defer } from "react-router-dom";

const ProductDetailsLoader = (params) => {
    return defer({ data: fetch(`http://localhost:5000/product/${params.id}`).then(res => res.json()) })
}

export default ProductDetailsLoader;