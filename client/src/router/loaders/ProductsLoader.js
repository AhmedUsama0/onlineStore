import { defer } from "react-router-dom";

const getProductsForPage = async (limit, offset) => {
    const res = await fetch(`http://localhost:5000/products?limit=${limit}&offset=${offset}`);
    const data = await res.json();
    return data;
}
const productsLoader = (params) => {
    const { page } = params;
    const limit = 4;
    const offset = (page - 1) * limit;
    const data = getProductsForPage(limit, offset);
    return defer({ data });
}

export default productsLoader;
