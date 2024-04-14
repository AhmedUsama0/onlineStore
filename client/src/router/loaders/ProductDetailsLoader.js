const ProductDetailsLoader = (params) => {
    return fetch(`http://localhost:5000/product/${params.id}`)
}

export default ProductDetailsLoader;