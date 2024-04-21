import { useLoaderData, Await } from "react-router-dom";
import { Suspense, useState } from "react";
import { useCartItem } from "../../hooks";
import { motion } from "framer-motion";
import { ProductDetailsSkeleton, ProductInfo } from "../../components";
import "./productdetails.css";
const ProductDetails = () => {
  const { data } = useLoaderData();
  const [quantity, setQuantity] = useState(1);
  const handleCartItem = useCartItem();

  return (
    <section className="product-details-wrapper mt-3 pt-5 border-top border-light-subtle">
      <div className="row">
        <Suspense fallback={<ProductDetailsSkeleton />}>
          <Await resolve={data}>
            {(data) => (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="product-img col-12 col-sm-6"
                >
                  <img
                    src={`http://localhost:5000/${data.image}`}
                    alt="product img"
                    className="rounded-4 img-fluid"
                  />
                </motion.div>
                <motion.div
                  initial={{ x: "100vw" }}
                  animate={{ x: 0 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                  className="product-details col-12 col-sm-4 offset-sm-2"
                >
                  <ProductInfo />
                  <div className="quantity-wrapper d-flex align-items-center overflow-hidden rounded-4">
                    <button
                      className="btn fs-4 border-0"
                      type="button"
                      onClick={(e) => {
                        setQuantity((q) => (q !== 1 ? q - 1 : q));
                      }}
                    >
                      -
                    </button>
                    <input
                      onChange={(e) => setQuantity(e.target.value)}
                      className="form-control border-0 text-center fs-4 shadow-none"
                      type="text"
                      value={quantity}
                      aria-label="readonly input example"
                      readOnly
                      style={{ background: "unset" }}
                    />
                    <button
                      className="btn fs-4 border-0"
                      type="button"
                      onClick={(e) => setQuantity((q) => q + 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="buy-wrapper mt-4 d-flex gap-2">
                    <button
                      style={{ backgroundColor: "var(--green-color)" }}
                      type="button"
                      className="btn text-capitalize w-50 rounded-5 text-white"
                    >
                      buy now
                    </button>
                    <motion.button
                      whileHover={{ backgroundColor: "var(--green-color)" }}
                      transition={{ duration: 0 }}
                      type="button"
                      className="btn btn-outline-secondary text-capitalize w-50 rounded-5"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCartItem({
                          ...data,
                          quantity: quantity,
                        });
                      }}
                    >
                      add to cart
                    </motion.button>
                  </div>
                  <div className="delivery-wrapper mt-5">
                    <div className="free-delivery border border-light-subtle d-flex align-items-center p-3">
                      <i
                        className="fa-solid fa-truck align-self-start pt-1 px-2"
                        style={{ color: "var(--orange-color)" }}
                      ></i>
                      <div className="free">
                        <h5 className="text-capitalize">free delivery</h5>
                        <p className="text-decoration-underline text-secondary text-capitalize">
                          enter your post code for delivery availablity
                        </p>
                      </div>
                    </div>
                    <div className="return-delivery border border-top-0 border-light-subtle d-flex align-items-center p-3">
                      <i
                        className="fa-solid fa-wallet align-self-start pt-1 px-2"
                        style={{ color: "var(--orange-color)" }}
                      ></i>
                      <div className="free">
                        <h5 className="text-capitalize">return delivery</h5>
                        <p className="text-secondary text-capitalize">
                          free 30days delivery returns.
                          <span className="text-decoration-underline">
                            details
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </Await>
        </Suspense>
      </div>
    </section>
  );
};

export default ProductDetails;
