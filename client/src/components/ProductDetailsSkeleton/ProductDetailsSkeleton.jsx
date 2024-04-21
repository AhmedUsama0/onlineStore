const ProductDetailsSkeleton = () => {
  return (
    <section className="mt-3 pt-5">
      <div className="row">
        <div className="col-12 col-sm-6 placeholder-glow">
          <div
            className="placeholder w-100 rounded-4"
            style={{ height: "636px" }}
          ></div>
        </div>
        <div className="col-12 col-sm-4 offset-sm-2">
          <h2 className="placeholder-glow fs-1">
            <span className="placeholder w-100"></span>
          </h2>
          <p className="placeholder-glow d-flex flex-column row-gap-2 mt-4">
            <span className="placeholder col-10"></span>
            <span className="placeholder col-8"></span>
            <span className="placeholder col-8"></span>
            <span className="placeholder col-6"></span>
            <span className="placeholder col-4"></span>
            <span className="placeholder col-2"></span>
          </p>
          <div className="rate placeholder-glow mt-5">
            <span className="placeholder col-6"></span>
          </div>
          <div className="d-flex flex-column row-gap-2 border-top border-bottom border-light-subtle pb-2 pt-2 mt-4 placeholder-glow">
            <span className="placeholder col-6"></span>
            <span className="placeholder col-6"></span>
          </div>
          <div className="placeholder-glow mt-4">
            <button className="btn placeholder col-6"></button>
          </div>
          <div className="mt-4 d-flex justify-content-between placeholder-glow">
            <button className="btn col-5 placeholder"></button>
            <button className="btn col-5 placeholder"></button>
          </div>
          <div className="placeholder-glow mt-5" style={{ height: "210px" }}>
            <div className="placeholder w-100 h-100"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsSkeleton;
