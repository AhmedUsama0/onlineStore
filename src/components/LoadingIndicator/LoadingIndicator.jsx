const LoadingIndicator = () => {
  return (
    <div
      style={{ zIndex: 500 }}
      className=" row-gap-3 d-flex flex-column justify-content-center align-items-center position-absolute top-0 start-0 bg-light w-100 vh-100"
    >
      <div
        className="spinner-border"
        role="status"
        style={{
          color: "var(--light-green-color)",
          width: "10rem",
          height: "10rem",
        }}
      ></div>
    </div>
  );
};

export default LoadingIndicator;
