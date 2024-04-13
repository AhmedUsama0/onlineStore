import { Header } from "../components";
import { Outlet } from "react-router-dom";
import { CartProvider, SearchQueryProvider } from "../Contexts";

const MainLayout = () => {
  return (
    <CartProvider>
      <SearchQueryProvider>
        <Header />
        <Outlet />
      </SearchQueryProvider>
    </CartProvider>
  );
};
export default MainLayout;
