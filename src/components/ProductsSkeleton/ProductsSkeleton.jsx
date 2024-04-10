const ProductsSkeleton = () => {
  return (
    <div className="row row-gap-3">
      {Array(8)
        .fill(1)
        .map((_, index) => {
          return (
            <div className="product col-12 col-sm col-lg-3" key={index}>
              <div className="card" aria-hidden="true">
                <div className="placeholder-glow">
                  <div
                    className="card-img-top placeholder"
                    style={{ height: 300 }}
                  ></div>
                </div>
                <div className="card-body">
                  <h5 className="card-title placeholder-glow">
                    <span className="placeholder col-6"></span>
                  </h5>
                  <p className="card-text placeholder-glow">
                    <span className="placeholder col-7"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-8"></span>
                  </p>
                  <div className="placeholder-glow">
                    <button
                      className="w-100 btn placeholder"
                      aria-disabled="true"
                    ></button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ProductsSkeleton;
