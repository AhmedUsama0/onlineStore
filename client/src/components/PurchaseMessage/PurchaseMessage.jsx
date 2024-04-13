import { motion, useAnimate } from "framer-motion";
import { modalVariants } from "../../motion-variants/variants";

const PurchaseMessageSVG = ({ purchaseMessage }) => {
  return (
    <>
      {purchaseMessage === "purchase completed successfully" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          height="100"
          width="100"
          className="w-100 mt-3 mb-3"
        >
          <path
            fill="#198754"
            d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
          />
        </svg>
      )}
      {purchaseMessage === "purchase not completed" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          height="100"
          width="100"
          className="w-100 mt-3 mb-3"
        >
          <path
            fill="#DC3545"
            d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"
          />
        </svg>
      )}
    </>
  );
};

const PurchaseMessage = ({ setPurchaseMessage, purchaseMessage }) => {
  const [scope, animate] = useAnimate();

  const hideMessage = async () => {
    await animate(scope.current, { scale: 0 });
    setPurchaseMessage("");
  };
  return (
    <div
      className="d-flex justify-content-center align-items-center top-0 start-0 position-fixed w-100 h-100"
      style={{ zIndex: 3000, backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <motion.div
        ref={scope}
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        className="message-container rounded-3 bg-light pt-3 pb-3 col-10 col-sm-8 col-md-6 col-lg-5 col-xl-4 col-xxl-3"
        style={{ minHeight: "150px" }}
      >
        <h5
          className={`text-capitalize text-center ${
            purchaseMessage === "purchase completed successfully"
              ? "text-success"
              : "text-danger"
          }`}
        >
          {purchaseMessage}
        </h5>
        <PurchaseMessageSVG purchaseMessage={purchaseMessage} />
        <button
          type="button"
          className={`btn text-capitalize d-block m-auto w-25 ${
            purchaseMessage === "purchase completed successfully"
              ? "btn-success"
              : "btn-danger"
          }`}
          onClick={hideMessage}
        >
          ok
        </button>
      </motion.div>
    </div>
  );
};

export default PurchaseMessage;
