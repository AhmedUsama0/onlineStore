import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart, useSearchQuery } from "../../hooks";
import { motion } from "framer-motion";
import { headerVariants } from "../../motion-variants/variants";
import { useEffect, useState } from "react";
import shopcart from "../../assets/shopcart.jpg";
import "./header.css";

const NavBar = () => {
  return (
    <nav className="col-5  d-flex justify-content-center">
      <ul className="nav column-gap-5" style={{ color: "var(--main-color)" }}>
        <NavLink
          to="/page/1"
          className="text-capitalize text-decoration-none position-relative pb-1"
          style={{ color: "var(--main-color)" }}
        >
          home
        </NavLink>
        <li className="text-capitalize">deals</li>
        <li className="text-capitalize">what's new</li>
        <li className="text-capitalize">delivery</li>
      </ul>
    </nav>
  );
};
const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useSearchQuery();
  return (
    <div className="search-container position-relative col-3 border rounded-5 overflow-hidden">
      <input
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
        type="text"
        className="form-control ps-3 border-0"
        id="search"
        placeholder="Search Product"
        style={{ backgroundColor: "var(--main-background-color)" }}
      />
      <label
        htmlFor="search"
        className=" position-absolute end-0 top-50 translate-middle px-1"
        style={{ color: "var(--main-color)" }}
      >
        <i className="fa-solid fa-magnifying-glass"></i>
      </label>
    </div>
  );
};
const CartItem = ({ item }) => {
  const { title, price, image, quantity, id } = item;
  const navigate = useNavigate();
  return (
    <li
      className="dropitem dropdown-item d-flex border-bottom border-light-sbutle justify-content-between align-items-center p-2"
      style={{ whiteSpace: "normal" }}
      role="button"
      onClick={() => navigate(`/product/${id}`)}
    >
      <div className="d-flex align-items-center column-gap-1 col-8">
        <img
          src={image}
          width="50"
          height="50"
          alt="product"
          className="img-fluid"
        />
        <h5 className="text-capitalize h6 fw-bold">{title}</h5>
      </div>
      <div className="fw-bold col-auto">
        <span className="h5 fw-bold">${(price * quantity).toFixed(2)}</span>
        <div
          className="fw-semibold text-secondary text-capitalize"
          style={{ fontSize: "0.8rem" }}
        >
          quantity: {quantity}
        </div>
      </div>
    </li>
  );
};
const Header = () => {
  const { cart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    setIsScrolled(scrollY >= 50 ? true : false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <motion.header
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className={`main__header sticky-top mt-4 rounded-5 px-2 ${
        isScrolled ? "header-scroll" : ""
      }`}
    >
      <div className="d-flex align-items-center flex-wrap">
        <div className="logo col d-flex align-items-center gap-2">
          <Link to="/page/1">
            <img
              className="rounded-circle"
              src={shopcart}
              style={{ width: "50px", height: "50px" }}
              alt="logo"
            />
          </Link>
          <h1 className="h2" style={{ color: "var(--green-color)" }}>
            Shopcart
          </h1>
        </div>
        <NavBar />
        <SearchBar />
        {/* start account-cart */}
        <div className="account-cart col d-flex align-items-center justify-content-around">
          <div className="dropdown dropdown-center">
            <div
              className="account d-flex align-items-center gap-2"
              style={{ color: "var(--main-color)" }}
              data-bs-toggle="dropdown"
              aria-expanded="false"
              data-bs-auto-close="inside"
              role="button"
            >
              <i className="fa-regular fa-user"></i>
              <span className="text-capitalize">account</span>
            </div>
            <ul className="dropdown-menu">
              <Link to="/checkout" className="dropdown-item text-capitalize">
                checkout
              </Link>
            </ul>
          </div>
          <div className="dropdown">
            <div
              className="cart d-flex align-items-center gap-2 position-relative dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              data-bs-auto-close="inside"
              role="button"
            >
              <span className="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-danger">
                {cart.length}
              </span>
              <i className="fa fa-cart-shopping"></i>
              <span className="text-capitalize">cart</span>
            </div>
            <motion.ul className="dropdown-menu dropdown-menu-end overflow-auto">
              {cart.map((item, index) => (
                <CartItem item={item} key={item.id} />
              ))}
            </motion.ul>
          </div>
        </div>
        {/* end account-cart */}
      </div>
    </motion.header>
  );
};

export default Header;
