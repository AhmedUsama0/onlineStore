import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { CheckOut, LandingPage, ProductDetails } from "../views";
import ProductsLoader from "./loaders/ProductsLoader";
import ProductDetailsLoader from "./loaders/ProductDetailsLoader";
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route path="product/:id" element={<ProductDetails />} loader={({ params }) => ProductDetailsLoader(params)} />
            <Route path=":page" element={<LandingPage />} loader={({ params }) => ProductsLoader(params)} />
            <Route path="checkout" element={<CheckOut />} />
        </Route>
    )
)


export default router;