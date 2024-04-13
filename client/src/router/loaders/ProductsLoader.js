import { defer } from "react-router-dom";

const getProductsPerPage = async (offset, numberOfProductsPerPage) => {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${numberOfProductsPerPage}`);
    const productsPerPage = await res.json();
    return productsPerPage;
}
const productsLoader = async (params) => {
    const page = params.page;
    const numberOfProductsPerPage = 12;
    const offset = (page - 1) * numberOfProductsPerPage;

    const productsRes = await fetch("https://api.escuelajs.co/api/v1/products");
    const products = await productsRes.json();
    const numberOfProducts = products.length;

    const numberOfPages = Math.ceil(numberOfProducts / numberOfProductsPerPage);
    const productsPerPage = getProductsPerPage(offset, numberOfProductsPerPage);
    return defer({
        products: productsPerPage,
        numberOfPages
    })
}

export default productsLoader;
