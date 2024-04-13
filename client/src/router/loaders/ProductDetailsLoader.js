const ProductDetailsLoader = (params) => {
    return fetch(`https://api.escuelajs.co/api/v1/products/${params.id}`)
}

export default ProductDetailsLoader;