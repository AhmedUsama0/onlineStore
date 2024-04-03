import { useLoaderData, useParams } from "react-router-dom";
import { useSearchQuery } from "../../hooks";
import { PaginationButtons, Product } from "../../components";
import { motion } from "framer-motion";
import "./landingpage.css";
import {
  landingImageVariants,
  mianTitleVariants,
} from "../../motion-variants/variants";
const LandingPage = () => {
  const { page } = useParams();
  const { products, numberOfPages } = useLoaderData();
  const { searchQuery } = useSearchQuery();
  const filteredProducts = products.filter(
    (product) =>
      (product = product.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase()))
  );
  return (
    <>
      <motion.section
        variants={landingImageVariants}
        initial="hidden"
        animate="visible"
        className="landing-header mt-4"
      >
        <motion.h2
          variants={mianTitleVariants}
          className="text-capitalize h-100 d-flex align-items-center px-5 lh-base h1 fw-bold"
          style={{ color: "var(--green-color)" }}
        >
          grab up to 50% off on <br /> selected product
        </motion.h2>
      </motion.section>

      <section className="products mt-5">
        <h3 className="text-capitalize fw-bold mb-4">products for you!</h3>
        <div className="row row-gap-3">
          {filteredProducts.map((product, index) => {
            return <Product product={product} key={product.id} />;
          })}
        </div>
        <div className="mt-5 d-flex justify-content-center">
          <PaginationButtons numberOfPages={numberOfPages} currentPage={page} />
        </div>
      </section>
    </>
  );
};

export default LandingPage;
