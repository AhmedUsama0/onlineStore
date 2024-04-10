import { createBrowserRouter, createRoutesFromElements, Route,Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { CheckOut, LandingPage, ProductDetails } from "../views";
import ProductsLoader from "./loaders/ProductsLoader";
import ProductDetailsLoader from "./loaders/ProductDetailsLoader";
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="page/1" />} />
            <Route path="product/:id" element={<ProductDetails />} loader={({ params }) => ProductDetailsLoader(params)} red />
            <Route path="page/:page" element={<LandingPage />} loader={({ params }) => ProductsLoader(params)} />
            <Route path="checkout" element={<CheckOut />} />
        </Route>
    )
)


export default router;