import { motion, useAnimate } from "framer-motion";
import { purchaseMessageVariants } from "../../motion-variants/variants";

const PurchaseMessage = ({ showPurchaseMessage, setShowPurchaseMessage }) => {
  const [scope, animate] = useAnimate();

  const hideMessage = async () => {
    await animate(scope.current, { scale: 0 });
    setShowPurchaseMessage(false);
  };
  return (
    <>
      {showPurchaseMessage && (
        <div
          className="d-flex justify-content-center align-items-center top-0 start-0 position-fixed w-100 h-100"
          style={{ zIndex: 2000, backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <motion.div
            ref={scope}
            variants={purchaseMessageVariants}
            initial="hidden"
            animate="visible"
            className="message-container row-gap-3 rounded-3 d-flex flex-column align-items-center justify-content-around bg-light pt-3 pb-3 w-25"
            style={{ height: "150px" }}
          >
            <h5 className="text-capitalize">purchase successfully</h5>
            <button
              type="button"
              className="btn btn-success text-capitalize w-25"
              onClick={hideMessage}
            >
              ok
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default PurchaseMessage;
