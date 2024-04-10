import { Await, useLoaderData, useParams } from "react-router-dom";
import { useSearchQuery } from "../../hooks";
import { motion } from "framer-motion";
import { Suspense } from "react";
import "./landingpage.css";
import {
  PaginationButtons,
  ProductsList,
  ProductsSkeleton,
} from "../../components";
import {
  landingImageVariants,
  mainTitleVariants,
} from "../../motion-variants/variants";
const LandingPage = () => {
  const { page } = useParams();
  const { products, numberOfPages } = useLoaderData();
  const { searchQuery } = useSearchQuery();
  return (
    <>
      <motion.section
        variants={landingImageVariants}
        initial="hidden"
        animate="visible"
        className="landing-header mt-4"
      >
        <motion.h2
          variants={mainTitleVariants}
          className="text-capitalize h-100 d-flex align-items-center px-5 lh-base h1 fw-bold"
          style={{ color: "var(--green-color)" }}
        >
          grab up to 50% off on <br /> selected product
        </motion.h2>
      </motion.section>

      <section className="products mt-5">
        <h3 className="text-capitalize fw-bold mb-4">products for you!</h3>
        <Suspense fallback={<ProductsSkeleton />}>
          <Await resolve={products}>
            {(resolvedProducts) => (
              <>
                <div className="row row-gap-3">
                  {resolvedProducts.length !== 0 ? (
                    <ProductsList
                      products={resolvedProducts}
                      searchQuery={searchQuery}
                    />
                  ) : (
                    <h2 className="alert alert-danger text-capitalize text-center">
                      products not found
                    </h2>
                  )}
                </div>
                <div className="mt-5 d-flex justify-content-center">
                  <PaginationButtons
                    numberOfPages={numberOfPages}
                    currentPage={page}
                  />
                </div>
              </>
            )}
          </Await>
        </Suspense>
      </section>
    </>
  );
};

export default LandingPage;
